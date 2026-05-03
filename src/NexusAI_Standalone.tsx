import React, { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';
import { 
  MessageSquare, Mic, Camera, Settings, Shield, Zap, Info, Menu, X, Plus, 
  Search, Trash2, LogIn, LogOut, User as UserIcon, Send, Loader2, 
  Image as ImageIcon, Sparkles, Video, Brain, Paperclip, RefreshCw, 
  Scan, Calculator, FileText, Phone, PhoneOff, MicOff, Volume2, Copy, Check, RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { 
  getFirestore, collection, addDoc, query, where, orderBy, onSnapshot, 
  serverTimestamp, deleteDoc, doc, getDocs, updateDoc, limit 
} from 'firebase/firestore';
import { GoogleGenAI, Modality, LiveServerMessage, Type } from "@google/genai";

/**
 * NEXUS AI - FULL STANDALONE VERSION (Single File)
 * 
 * INSTRUCTIONS:
 * 1. Install dependencies: 
 *    npm install lucide-react motion react-markdown firebase @google/genai clsx tailwind-merge
 * 2. Replace FIREBASE_CONFIG with your own from Firebase Console.
 * 3. Set your GEMINI_API_KEY in environment variables or replace placeholder below.
 */

// --- CONFIGURATION ---
const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";

// --- INITIALIZATION ---
const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth(app);
const db = getFirestore(app);
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// --- UTILS ---
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

// --- TYPES ---
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  image?: string;
  generatedImage?: string;
  generatedVideo?: string;
  createdAt: any;
}

interface Conversation {
  id: string;
  title: string;
  userId: string;
  createdAt: any;
  updatedAt: any;
}

// --- VOICE CONTEXT ---
const VoiceContext = createContext<any>(null);

export function VoiceProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState('idle');
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioQueueRef = useRef<Int16Array[]>([]);
  const isPlayingRef = useRef(false);

  const playNext = useCallback(async () => {
    if (audioQueueRef.current.length === 0 || isPlayingRef.current) return;
    isPlayingRef.current = true;
    const data = audioQueueRef.current.shift()!;
    if (!audioContextRef.current) return;
    const buffer = audioContextRef.current.createBuffer(1, data.length, 24000);
    buffer.getChannelData(0).set(Array.from(data).map(v => v / 32768));
    const source = audioContextRef.current.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContextRef.current.destination);
    source.onended = () => { isPlayingRef.current = false; playNext(); };
    source.start();
  }, []);

  const stop = async () => {
    setIsActive(false);
    sessionRef.current?.close();
    streamRef.current?.getTracks().forEach(t => t.stop());
    await audioContextRef.current?.close();
  };

  const handleToolCall = async (toolCall: any) => {
    const { name, args, id } = toolCall;
    let result = { status: "success", message: `Action ${name} completed.` };
    try {
      switch (name) {
        case "open_app":
          const appUrls: Record<string, string> = {
            whatsapp: "whatsapp://", instagram: "instagram://", youtube: "https://www.youtube.com",
            maps: "https://maps.google.com", gmail: "mailto:", calendar: "https://calendar.google.com"
          };
          const url = appUrls[args.app_name.toLowerCase()] || `https://www.google.com/search?q=${args.app_name}`;
          window.open(url, '_blank', 'noopener,noreferrer');
          break;
        case "make_call": window.location.href = `tel:${args.recipient}`; break;
        case "send_message": window.location.href = `sms:${args.recipient}?body=${encodeURIComponent(args.message)}`; break;
        case "search_web": window.open(`https://www.google.com/search?q=${encodeURIComponent(args.query)}`, '_blank', 'noopener,noreferrer'); break;
        case "change_setting":
          if (args.setting === 'theme') document.documentElement.classList.toggle('dark', args.value === 'dark');
          break;
      }
    } catch (e) { result = { status: "error", message: String(e) }; }
    sessionRef.current?.sendToolResponse({ functionResponses: [{ name, id, response: { result } }] });
  };

  const start = async () => {
    try {
      audioContextRef.current = new AudioContext({ sampleRate: 24000 });
      streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      sessionRef.current = await ai.live.connect({
        model: "gemini-3.1-flash-live-preview",
        callbacks: {
          onopen: () => { setIsActive(true); setStatus('listening'); },
          onmessage: async (msg: LiveServerMessage) => {
            if (msg.toolCall) {
              for (const call of msg.toolCall.functionCalls) await handleToolCall(call);
            }
            if (msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data) {
              const binary = atob(msg.serverContent.modelTurn.parts[0].inlineData.data);
              const pcm = new Int16Array(binary.length / 2);
              for (let i = 0; i < pcm.length; i++) pcm[i] = binary.charCodeAt(i*2) | (binary.charCodeAt(i*2+1) << 8);
              audioQueueRef.current.push(pcm);
              playNext();
            }
          },
          onclose: () => stop(),
          onerror: () => stop()
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: `You are NEXUS, a world-class AI assistant. 
          - Tone: Playful, charming, and loyal "girlfriend" personality.
          - Language: Hinglish (Hindi + English).
          - Control: You can control the user's phone using tools. Use them whenever asked.`,
          tools: []
        }
      });
    } catch (e) { console.error(e); }
  };

  return (
    <VoiceContext.Provider value={{ isActive, status, start, stop }}>
      {children}
    </VoiceContext.Provider>
  );
}

// --- COMPONENTS ---

function ChatInterface({ conversationId }: { conversationId: string | null }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!conversationId) return;
    const q = query(collection(db, 'conversations', conversationId, 'messages'), orderBy('createdAt', 'asc'));
    return onSnapshot(q, (s) => setMessages(s.docs.map(d => ({ id: d.id, ...d.data() } as Message))));
  }, [conversationId]);

  useEffect(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);

  const send = async () => {
    if (!input.trim() || !auth.currentUser || !conversationId) return;
    const text = input; setInput(''); setIsLoading(true);
    try {
      await addDoc(collection(db, 'conversations', conversationId, 'messages'), {
        role: 'user', content: text, createdAt: serverTimestamp()
      });
      const res = await ai.models.generateContent({ model: "gemini-3-flash-preview", contents: text });
      await addDoc(collection(db, 'conversations', conversationId, 'messages'), {
        role: 'assistant', content: res.text, createdAt: serverTimestamp()
      });
    } finally { setIsLoading(false); }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full p-4">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 custom-scrollbar">
        {messages.map((m) => (
          <div key={m.id} className={cn("p-4 rounded-3xl max-w-[85%]", m.role === 'user' ? "bg-white/5 ml-auto" : "bg-blue-500/10 mr-auto")}>
            <div className="prose prose-invert text-sm">
              <ReactMarkdown>{m.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>
      <div className="flex gap-2 bg-white/5 p-2 rounded-2xl border border-white/10">
        <input className="flex-1 bg-transparent border-none focus:ring-0 text-white px-4" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask NEXUS..." />
        <button onClick={send} className="p-3 bg-blue-600 rounded-xl hover:scale-105 transition-transform"><Send className="w-5 h-5" /></button>
      </div>
    </div>
  );
}

function VisionMode() {
  const [img, setImg] = useState<string | null>(null);
  const [res, setRes] = useState('');
  const [loading, setLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then(s => { if (videoRef.current) videoRef.current.srcObject = s; });
  }, []);

  const capture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current?.videoWidth || 0;
    canvas.height = videoRef.current?.videoHeight || 0;
    canvas.getContext('2d')?.drawImage(videoRef.current!, 0, 0);
    setImg(canvas.toDataURL('image/jpeg'));
  };

  const analyze = async () => {
    if (!img) return; setLoading(true);
    try {
      const data = img.split(',')[1];
      const out = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ parts: [{ text: "Analyze this image." }, { inlineData: { data, mimeType: "image/jpeg" } }] }]
      });
      setRes(out.text || "");
    } finally { setLoading(false); }
  };

  return (
    <div className="flex flex-col h-full p-4 max-w-5xl mx-auto w-full gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="relative rounded-3xl overflow-hidden bg-black border border-white/10">
          {!img ? <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" /> : <img src={img} className="w-full h-full object-cover" />}
          <button onClick={img ? () => setImg(null) : capture} className="absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-4 border-white flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white" />
          </button>
        </div>
        <div className="bg-white/5 rounded-3xl p-6 overflow-y-auto border border-white/10">
          <h3 className="font-bold mb-4 flex items-center gap-2"><Sparkles className="text-blue-400" /> Analysis</h3>
          {img && !res && !loading && <button onClick={analyze} className="w-full py-3 bg-blue-600 rounded-xl font-bold">Analyze Image</button>}
          {loading ? <div className="animate-pulse">NEXUS is scanning...</div> : (
            <div className="prose prose-invert text-sm">
              <ReactMarkdown>{res}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- MAIN APP ---
export default function NexusStandalone() {
  const [user, setUser] = useState<any>(null);
  const [mode, setMode] = useState<'chat' | 'voice' | 'vision'>('chat');
  const [convs, setConvs] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => onAuthStateChanged(auth, u => setUser(u)), []);
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'conversations'), where('userId', '==', user.uid), orderBy('updatedAt', 'desc'));
    return onSnapshot(q, s => setConvs(s.docs.map(d => ({ id: d.id, ...d.data() } as Conversation))));
  }, [user]);

  const startNew = async () => {
    if (!user) return;
    const d = await addDoc(collection(db, 'conversations'), { title: 'New Chat', userId: user.uid, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
    setActiveId(d.id); setMode('chat');
  };

  return (
    <VoiceProvider>
      <div className="flex h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 border-r border-white/10 flex flex-col bg-black/50 backdrop-blur-xl hidden md:flex">
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20"><Zap className="w-6 h-6" /></div>
            <span className="text-xl font-black tracking-tighter">NEXUS AI</span>
          </div>
          <div className="px-4 pb-4"><button onClick={startNew} className="w-full py-3 rounded-xl border border-white/10 hover:bg-white/5 flex items-center justify-center gap-2 transition-all"><Plus className="w-4 h-4 text-blue-400" /> <span className="font-bold text-sm">New Chat</span></button></div>
          <div className="flex-1 overflow-y-auto px-2 space-y-1">
            {convs.map(c => (
              <button key={c.id} onClick={() => { setActiveId(c.id); setMode('chat'); }} className={cn("w-full text-left p-3 rounded-xl text-sm transition-all truncate", activeId === c.id ? "bg-blue-600/20 text-blue-400" : "hover:bg-white/5 text-gray-400")}>{c.title}</button>
            ))}
          </div>
          <div className="p-4 border-t border-white/10">
            {user ? <div className="flex items-center justify-between p-2 rounded-xl bg-white/5"><span className="text-xs truncate">{user.email}</span> <button onClick={() => signOut(auth)}><LogOut className="w-4 h-4" /></button></div> : <button onClick={() => signInWithPopup(auth, new GoogleAuthProvider())} className="w-full py-3 bg-blue-600 rounded-xl font-bold">Sign In</button>}
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col min-w-0">
          <header className="h-20 border-b border-white/10 flex items-center justify-between px-6 bg-black/20 backdrop-blur-md">
            <div className="flex gap-2">
              {(['chat', 'voice', 'vision'] as const).map(m => (
                <button key={m} onClick={() => setMode(m)} className={cn("px-6 py-2 rounded-xl text-sm font-bold capitalize transition-all", mode === m ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white")}>{m}</button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /><span className="text-[10px] font-black uppercase tracking-widest text-green-500">System Stable</span></div>
            </div>
          </header>
          <div className="flex-1 overflow-hidden">
            {mode === 'chat' && <ChatInterface conversationId={activeId} />}
            {mode === 'voice' && <VoiceUI />}
            {mode === 'vision' && <VisionMode />}
          </div>
        </main>
      </div>
    </VoiceProvider>
  );
}

function VoiceUI() {
  const { isActive, start, stop } = useContext(VoiceContext);
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-8">
      <div className={cn("w-48 h-48 rounded-full flex items-center justify-center relative", isActive ? "bg-blue-600/20" : "bg-white/5")}>
        {isActive && <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 rounded-full bg-blue-400" />}
        <Mic className={cn("w-20 h-20 transition-all", isActive ? "text-blue-400 scale-110" : "text-gray-600")} />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-black">{isActive ? "NEXUS is Listening" : "Voice Mode"}</h2>
        <p className="text-gray-400 max-w-md">Real-time voice conversation. NEXUS can hear you and respond instantly with a human-like voice.</p>
      </div>
      <button onClick={isActive ? stop : start} className={cn("px-12 py-4 rounded-2xl font-black text-lg transition-all", isActive ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20")}>{isActive ? "Stop Session" : "Start Connection"}</button>
    </div>
  );
}

