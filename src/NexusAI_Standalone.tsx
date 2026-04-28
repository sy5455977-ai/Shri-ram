import React, { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';
import { 
  MessageSquare,
  Mic,
  Camera,
  Settings,
  Shield,
  Zap,
  Info,
  Menu,
  X,
  Plus,
  Search,
  Trash2,
  LogIn,
  LogOut,
  User as UserIcon,
  RefreshCw,
  Send,
  Loader2,
  Image as ImageIcon,
  Sparkles,
  Video,
  Brain,
  Paperclip,
  Copy,
  Check,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';

// Simple types to replace Firebase dependencies for standalone mode
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

// Optimization: Voice Assistant Logic
const VoiceAssistant = () => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sessionRef = useRef<any>(null);
  const audioQueueRef = useRef<Int16Array[]>([]);
  const isPlayingRef = useRef(false);

  const playNext = useCallback(async () => {
    if (audioQueueRef.current.length === 0 || isPlayingRef.current) return;
    isPlayingRef.current = true;
    const data = audioQueueRef.current.shift()!;
    if (!audioContextRef.current) return;
    const buffer = audioContextRef.current.createBuffer(1, data.length, 24000);
    buffer.getChannelData(0).set(Array.from(data).map(v => (v as any) / 32768));
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
    audioContextRef.current = null;
  };

  return { isActive, status, stop };
};

export default function NexusAI_Standalone() {
  const [mode, setMode] = useState<'chat' | 'voice' | 'vision'>('chat');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [performanceMode, setPerformanceMode] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      createdAt: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I am running in standalone mode. To enable full AI capabilities, please connect to Firebase.",
        createdAt: new Date()
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden font-sans">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: isSidebarOpen ? 300 : 0 }}
        className="bg-white/5 border-r border-white/10 flex flex-col overflow-hidden"
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Zap className="text-cyan-400 w-6 h-6" />
            <span className="text-xl font-bold">NEXUS AI</span>
          </div>
        </div>

        <div className="px-4 flex-1">
          <button className="w-full flex items-center justify-center space-x-2 p-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all">
            <Plus className="w-5 h-5 text-cyan-400" />
            <span>New Chat</span>
          </button>
        </div>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => setPerformanceMode(!performanceMode)}
            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5"
          >
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest font-bold">Performance</span>
            </div>
            <div className={`w-8 h-4 rounded-full relative ${performanceMode ? 'bg-cyan-500' : 'bg-white/20'}`}>
              <div className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${performanceMode ? 'left-5' : 'left-1'}`} />
            </div>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative">
        <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-[#050505]/50 backdrop-blur-md">
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 rounded-lg">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold uppercase tracking-tighter">NEXUS {mode}</h1>
          </div>

          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            {['chat', 'voice', 'vision'].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m as any)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${mode === m ? 'bg-cyan-500 text-black' : 'text-gray-400'}`}
              >
                {m}
              </button>
            ))}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl ${m.role === 'user' ? 'bg-white/10' : 'bg-cyan-500/10 border border-cyan-500/20'}`}>
                <div className="prose prose-invert text-sm">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-2xl flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                <span className="text-sm text-cyan-400">NEXUS is thinking...</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-[#050505] border-t border-white/10">
          <div className="max-w-4xl mx-auto flex items-center space-x-2 bg-white/5 p-2 rounded-2xl border border-white/10">
            <button className="p-3 text-gray-400 hover:text-cyan-400">
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask NEXUS anything..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm"
            />
            <button
              onClick={handleSend}
              className="p-3 bg-cyan-500 text-black rounded-xl hover:bg-cyan-400 transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
