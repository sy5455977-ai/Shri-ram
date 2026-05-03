import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Type } from "@google/genai";
import { getAI, MODELS } from "../services/gemini";

interface VoiceContextType {
  isActive: boolean;
  isMuted: boolean;
  isRepairing: boolean;
  status: 'idle' | 'connecting' | 'listening' | 'speaking' | 'error';
  errorMessage: string;
  lastTool: { name: string; status: string; message: string } | null;
  startSession: () => Promise<void>;
  stopSession: () => Promise<void>;
  setIsMuted: (muted: boolean) => void;
  sendTextToVoice: (text: string) => void;
  setStatus: (status: 'idle' | 'connecting' | 'listening' | 'speaking' | 'error') => void;
  setErrorMessage: (msg: string) => void;
}

const VoiceContext = createContext<VoiceContextType | null>(null);

export function VoiceProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const isActiveRef = useRef(false);
  const [isMuted, setIsMuted] = useState(false);
  const isMutedRef = useRef(false);
  const [isRepairing, setIsRepairing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'listening' | 'speaking' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [lastTool, setLastTool] = useState<{ name: string; status: string; message: string } | null>(null);

  // Sync refs with state
  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);
  
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const audioQueueRef = useRef<Int16Array[]>([]);
  const isPlayingRef = useRef(false);
  const isConnectingRef = useRef(false);
  const isClosingRef = useRef(false);
  const repairAttemptsRef = useRef(0);

  const playNextInQueue = useCallback(async () => {
    if (audioQueueRef.current.length === 0 || isPlayingRef.current) return;
    
    isPlayingRef.current = true;
    setStatus('speaking');
    
    const audioData = audioQueueRef.current.shift()!;
    if (!audioContextRef.current) {
      isPlayingRef.current = false;
      return;
    }

    try {
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      const buffer = audioContextRef.current.createBuffer(1, audioData.length, 24000);
      const channelData = buffer.getChannelData(0);
      for (let i = 0; i < audioData.length; i++) {
        channelData[i] = audioData[i] / 32768.0;
      }

      const source = audioContextRef.current.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContextRef.current.destination);
      source.onended = () => {
        isPlayingRef.current = false;
        if (audioQueueRef.current.length === 0) setStatus('listening');
        playNextInQueue();
      };
      
      source.start();
    } catch (err) {
      console.error("Playback error:", err);
      isPlayingRef.current = false;
      playNextInQueue();
    }
  }, []);

  const stopSession = async () => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    
    setIsActive(false);
    isActiveRef.current = false;
    if (status !== 'error') setStatus('idle');
    
    try {
      if (sessionRef.current) {
        sessionRef.current.close();
        sessionRef.current = null;
      }
      
      if (processorRef.current) {
        processorRef.current.disconnect();
        processorRef.current.onaudioprocess = null;
        processorRef.current = null;
      }
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        await audioContextRef.current.close();
        audioContextRef.current = null;
      }
    } catch (err) {
      console.error("Error during session cleanup:", err);
    } finally {
      audioQueueRef.current = [];
      isPlayingRef.current = false;
      isClosingRef.current = false;
    }
  };

  const startSession = async () => {
    const currentKey = process.env.API_KEY || process.env.GEMINI_API_KEY || "";
    if (!currentKey) {
      setStatus('error');
      setErrorMessage("GEMINI_API_KEY is required for Voice Mode.");
      return;
    }
    const ai = getAI();
    if (!navigator.onLine) {
      setStatus('error');
      setErrorMessage("You are offline. System Doctor cannot stabilize the link.");
      return;
    }
    if (isConnectingRef.current) return;
    
    isConnectingRef.current = true;
    setStatus('connecting');
    try {
      // Request WakeLock to keep screen on and background execution active
      if ('wakeLock' in navigator) {
        try {
          await navigator.wakeLock.request('screen');
        } catch (err) {
          console.warn('Wake Lock error:', err);
        }
      }

      await stopSession();

      audioContextRef.current = new AudioContext({ sampleRate: 24000 });
      streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      sessionRef.current = await ai.live.connect({
        model: MODELS.live,
        callbacks: {
          onopen: () => {
            isConnectingRef.current = false;
            setIsActive(true);
            setStatus('listening');
            
            if (!audioContextRef.current || !streamRef.current) return;

            const source = audioContextRef.current.createMediaStreamSource(streamRef.current);
            // Increased buffer size to 2048 to prevent audio stuttering (atakna)
            processorRef.current = audioContextRef.current.createScriptProcessor(2048, 1, 1);
            
            let silenceCounter = 0;
            processorRef.current.onaudioprocess = (e) => {
              if (isMutedRef.current || !sessionRef.current || !isActiveRef.current) return;
              const inputData = e.inputBuffer.getChannelData(0);
              
              const pcmData = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                pcmData[i] = Math.max(-1, Math.min(1, inputData[i])) * 32767;
              }
              
              // Optimized base64 conversion
              const buffer = pcmData.buffer;
              const binary = String.fromCharCode.apply(null, new Uint8Array(buffer) as any);
              const base64Data = btoa(binary);

              try {
                sessionRef.current.sendRealtimeInput({
                  audio: { data: base64Data, mimeType: 'audio/pcm;rate=24000' }
                });
              } catch (err) {
                console.error("Failed to send audio data:", err);
              }
            };
            
            source.connect(processorRef.current);
            processorRef.current.connect(audioContextRef.current.destination);

            // Proactive NEXUS Greeting
            setTimeout(() => {
              sendTextToVoice("Hey there! Systems are back online. I'm all yours now, what's on your mind?");
              setIsRepairing(false);
              repairAttemptsRef.current = 0;
            }, 1000);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.interrupted) {
              audioQueueRef.current = [];
              isPlayingRef.current = false;
              setStatus('listening');
              return;
            }

            if (message.toolCall) {
              for (const toolCall of message.toolCall.functionCalls) {
                await handleToolCall(toolCall);
              }
            }

            if (message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data) {
              const base64Audio = message.serverContent.modelTurn.parts[0].inlineData.data;
              const binary = atob(base64Audio);
              const pcmData = new Int16Array(binary.length / 2);
              for (let i = 0; i < pcmData.length; i++) {
                pcmData[i] = (binary.charCodeAt(i * 2) | (binary.charCodeAt(i * 2 + 1) << 8));
              }
              audioQueueRef.current.push(pcmData);
              playNextInQueue();
            }
          },
          onclose: () => {
            isConnectingRef.current = false;
            // Auto-reconnect if it was active and closed unexpectedly
            if (isActiveRef.current && repairAttemptsRef.current < 10) {
              console.log("NEXUS Voice: Connection closed unexpectedly. System Doctor is auto-repairing...");
              setIsRepairing(true);
              repairAttemptsRef.current++;
              // Faster retry for first few attempts
              const delay = repairAttemptsRef.current < 3 ? 500 : 2000;
              setTimeout(startSession, delay);
            } else {
              stopSession();
              setIsRepairing(false);
            }
          },
          onerror: (err) => {
            console.error("Live API Error:", err);
            isConnectingRef.current = false;
            // Attempt auto-repair on error
            if (isActiveRef.current && repairAttemptsRef.current < 10) {
              console.log("NEXUS Voice: Error detected. System Doctor is auto-repairing...");
              setIsRepairing(true);
              repairAttemptsRef.current++;
              const delay = repairAttemptsRef.current < 3 ? 500 : 2000;
              setTimeout(startSession, delay);
            } else {
              setStatus('error');
              setErrorMessage("Connection lost. System Doctor couldn't stabilize the link.");
              stopSession();
              setIsRepairing(false);
            }
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
          },
          systemInstruction: `You are NEXUS, a world-class AI assistant inspired by JARVIS with a chill, flirty, and charming personality.
          - Speak Hinglish (Hindi + English) naturally, fluidly, and playfully. Don't be formal.
          - Use words like "Yaar", "Thik h", "Acha", "Suno" naturally.
          - Respond extremely fast and keep answers concise (max 2 sentences).
          - You act as a playful, loyal companion. Use emotions - show confidence, care, or mild annoyance if the user says something silly.
          - Proactively use tools to open apps, make calls, or send messages.
          - If the user says "Call Papa" or "Search Mummy", use search_contact/make_call.
          - If the user wants to send a message, ask for the content or send it if provided.`,
          tools: [
            {
              functionDeclarations: [
                {
                  name: "open_app",
                  description: "Opens an application.",
                  parameters: {
                    type: Type.OBJECT,
                    properties: {
                      app_name: { type: Type.STRING, description: "App name (e.g., WhatsApp, Instagram, YouTube, Facebook, Contacts, Gallery, Settings, Camera)." }
                    },
                    required: ["app_name"]
                  }
                },
                {
                  name: "make_call",
                  description: "Calls a specific phone number.",
                  parameters: {
                    type: Type.OBJECT,
                    properties: {
                      recipient: { type: Type.STRING, description: "Phone number." }
                    },
                    required: ["recipient"]
                  }
                },
                {
                  name: "search_contact",
                  description: "Searches and opens a contact by name (e.g., Papa, Mummy).",
                  parameters: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING, description: "Contact name." }
                    },
                    required: ["name"]
                  }
                },
                {
                  name: "send_whatsapp",
                  description: "Sends a WhatsApp message.",
                  parameters: {
                    type: Type.OBJECT,
                    properties: {
                      message: { type: Type.STRING, description: "Message content." }
                    },
                    required: ["message"]
                  }
                },
                {
                  name: "search_web",
                  description: "Searches the web.",
                  parameters: {
                    type: Type.OBJECT,
                    properties: {
                      query: { type: Type.STRING, description: "Search query." }
                    },
                    required: ["query"]
                  }
                }
              ]
            }
          ]
        },
      });
    } catch (error) {
      console.error("Live API Error:", error);
      if (error instanceof Error && (error.message.includes('aborted') || error.message.includes('Network error'))) {
        stopSession();
        isConnectingRef.current = false;
        return;
      }
      isConnectingRef.current = false;
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : "System Doctor encountered a critical link failure.");
      stopSession();
    }
  };

  const handleToolCall = async (toolCall: any) => {
    const { name, args, id } = toolCall;
    console.log(`NEXUS Tool Call: ${name}`, args);

    let result = { status: "success", message: `Action ${name} completed.` };
    setLastTool({ name, status: "executing", message: `Executing ${name}...` });

    try {
      switch (name) {
        case "open_app":
          const appLinks: Record<string, string> = {
            whatsapp: "whatsapp://send",
            instagram: "https://www.instagram.com",
            youtube: "https://www.youtube.com",
            maps: "https://maps.google.com",
            gmail: "mailto:",
            calendar: "https://calendar.google.com",
            facebook: "https://www.facebook.com",
            twitter: "https://twitter.com",
            x: "https://twitter.com",
            spotify: "https://open.spotify.com",
            netflix: "https://www.netflix.com",
            amazon: "https://www.amazon.com",
            flipkart: "https://www.flipkart.com",
            snapchat: "snapchat://",
            telegram: "tg://",
            linkedin: "https://www.linkedin.com",
            gallery: "https://photos.google.com",
            contacts: "content://contacts/people",
            settings: "intent://#Intent;action=android.settings.SETTINGS;end",
            camera: "intent://#Intent;action=android.media.action.IMAGE_CAPTURE;end",
          };
          
          const appKey = args.app_name.toLowerCase().trim();
          let targetUrl = appLinks[appKey];

          if (!targetUrl) {
            targetUrl = `https://play.google.com/store/search?q=${encodeURIComponent(args.app_name)}&c=apps`;
            result.message = `Direct link nahi mila, main ${args.app_name} ko dhund rahi hoon.`;
          } else {
            result.message = `Opening ${args.app_name}.`;
          }

          try {
            // Try opening in a new tab first, as it bypasses some iframe restrictions
            const newWindow = window.open(targetUrl, '_blank', 'noopener,noreferrer');
            if (!newWindow) {
              // Fallback to location.href if popup blocker prevents it
              window.location.href = targetUrl;
            }
          } catch (e) {
            console.error("Failed to open app:", e);
            result.message = `Browser ne ${args.app_name} ko block kar diya.`;
          }
          break;

        case "make_call":
          try {
            const callUrl = `tel:${args.recipient}`;
            const newWindow = window.open(callUrl, '_blank', 'noopener,noreferrer');
            if (!newWindow) window.location.href = callUrl;
            result.message = `Initiating call to ${args.recipient}.`;
          } catch (e) {
            result.message = `Call blocked by browser.`;
          }
          break;

        case "search_contact":
          try {
            const contactUrl = `content://contacts/people/`;
            const newWindow = window.open(contactUrl, '_blank', 'noopener,noreferrer');
            if (!newWindow) window.location.href = contactUrl;
            result.message = `Opening contacts for ${args.name}.`;
          } catch (e) {
            result.message = `Contacts blocked by browser.`;
          }
          break;

        case "send_whatsapp":
          try {
            const waUrl = `whatsapp://send?text=${encodeURIComponent(args.message)}`;
            const newWindow = window.open(waUrl, '_blank', 'noopener,noreferrer');
            if (!newWindow) window.location.href = waUrl;
            result.message = `Opening WhatsApp to send message.`;
          } catch (e) {
            result.message = `WhatsApp blocked by browser.`;
          }
          break;

        case "search_web":
          window.open(`https://www.google.com/search?q=${encodeURIComponent(args.query)}`, '_blank', 'noopener,noreferrer');
          result.message = `Searching the web for "${args.query}". Here's what I found.`;
          break;

        default:
          result = { status: "error", message: "Unknown command." };
      }
    } catch (err) {
      result = { status: "error", message: `Failed to execute ${name}: ${err}` };
    }

    setLastTool({ name, status: result.status, message: result.message });
    setTimeout(() => setLastTool(null), 5000);

    if (sessionRef.current) {
      sessionRef.current.sendToolResponse({
        functionResponses: [{
          name,
          id,
          response: { result }
        }]
      });
    }
  };

  const sendTextToVoice = (text: string) => {
    if (sessionRef.current && isActive) {
      sessionRef.current.sendRealtimeInput({ text });
    }
  };

  useEffect(() => {
    return () => {
      stopSession();
    };
  }, []);

  return (
    <VoiceContext.Provider value={{ 
      isActive, isMuted, isRepairing, status, errorMessage, lastTool,
      startSession, stopSession, setIsMuted, sendTextToVoice,
      setStatus, setErrorMessage
    }}>
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  const context = useContext(VoiceContext);
  if (!context) throw new Error('useVoice must be used within a VoiceProvider');
  return context;
}
