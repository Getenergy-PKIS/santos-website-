
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Modality, Type, LiveServerMessage } from "@google/genai";
import { 
  Sparkles, Brain, Search, Map, Image as ImageIcon, Video, Mic, 
  MessageSquare, Send, Upload, Play, Loader2, Info, ArrowRight,
  ChevronDown, Maximize2, Globe, History, Radio, Volume2,
  Zap, FileCheck, MapPin, ShieldCheck
} from 'lucide-react';

// --- Utility Functions for Audio & Encoding ---
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const ImpactIntelligence: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ecosystem' | 'creative' | 'analyzer' | 'global' | 'live'>('ecosystem');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // Settings for generation
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [useThinking, setUseThinking] = useState(false);
  const [useSearch, setUseSearch] = useState(true);

  // Live API State
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState<string[]>([]);
  const liveSessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // --- Feature Implementations ---

  const runEcosystemQuery = async () => {
    setLoading(true);
    setResult(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const config: any = {};
      
      if (useThinking) {
        config.thinkingConfig = { thinkingBudget: 32768 };
      }
      
      if (useSearch) {
        config.tools = [{ googleSearch: {} }];
      }

      const response = await ai.models.generateContent({
        model: useThinking ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview',
        contents: prompt,
        config
      });

      setResult({
        text: response.text,
        grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks
      });
    } catch (err) {
      console.error(err);
      setResult({ error: "Intelligence sync failed. Please verify API configuration." });
    } finally {
      setLoading(false);
    }
  };

  const generateCreative = async () => {
    setLoading(true);
    setResult(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      if (prompt.toLowerCase().includes('video') || selectedFile) {
        // Veo Video Generation
        let operation = await ai.models.generateVideos({
          model: 'veo-3.1-fast-generate-preview',
          prompt: prompt,
          image: selectedFile ? {
            imageBytes: await blobToBase64(selectedFile),
            mimeType: selectedFile.type
          } : undefined,
          config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: aspectRatio as any
          }
        });

        while (!operation.done) {
          await new Promise(resolve => setTimeout(resolve, 5000));
          operation = await ai.operations.getVideosOperation({ operation });
        }
        
        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
        const res = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await res.blob();
        setResult({ videoUrl: URL.createObjectURL(blob) });
      } else {
        // Gemini Pro Image Generation
        if (!await (window as any).aistudio?.hasSelectedApiKey()) {
          await (window as any).aistudio?.openSelectKey();
        }
        
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-image-preview',
          contents: [{ text: prompt }],
          config: {
            imageConfig: { aspectRatio: aspectRatio as any, imageSize: "1K" }
          }
        });

        const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
        if (part?.inlineData) {
          setResult({ imageUrl: `data:image/png;base64,${part.inlineData.data}` });
        }
      }
    } catch (err) {
      console.error(err);
      setResult({ error: "Creative lab failed to synthesize. Verify permissions and try again." });
    } finally {
      setLoading(false);
    }
  };

  const analyzeMedia = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setResult(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = await blobToBase64(selectedFile);
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType: selectedFile.type } },
            { text: prompt || "Analyze this media and provide key insights relevant to educational impact." }
          ]
        }
      });
      setResult({ text: response.text });
    } catch (err) {
      console.error(err);
      setResult({ error: "Media analysis halted. System could not parse the provided data." });
    } finally {
      setLoading(false);
    }
  };

  const exploreGlobal = async () => {
    setLoading(true);
    setResult(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Get location for grounding
      const pos: any = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt || "List SCEF partner schools and impact zones nearby.",
        config: {
          tools: [{ googleMaps: {} }],
          toolConfig: {
            retrievalConfig: {
              latLng: {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude
              }
            }
          }
        }
      });
      
      setResult({
        text: response.text,
        maps: response.candidates?.[0]?.groundingMetadata?.groundingChunks
      });
    } catch (err) {
      console.error(err);
      setResult({ error: "Global discovery restricted. Verify location permissions." });
    } finally {
      setLoading(false);
    }
  };

  const startLiveConversation = async () => {
    if (isLiveActive) {
      liveSessionRef.current?.close();
      setIsLiveActive(false);
      return;
    }

    setIsLiveActive(true);
    setLiveTranscript([]);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = outputCtx;
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000'
              };
              sessionPromise.then(s => s.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.outputTranscription) {
              setLiveTranscript(prev => [...prev, `AI: ${message.serverContent?.outputTranscription?.text}`]);
            }
            if (message.serverContent?.inputTranscription) {
              setLiveTranscript(prev => [...prev, `You: ${message.serverContent?.inputTranscription?.text}`]);
            }
            
            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData) {
              const buffer = await decodeAudioData(decode(audioData), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outputCtx.destination);
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
            }
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          outputAudioTranscription: {},
          inputAudioTranscription: {},
          systemInstruction: "You are the SCEF Impact Assistant. Help the user understand the ecosystem through real-time voice conversation."
        }
      });
      
      liveSessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setIsLiveActive(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-slate-900 pt-32 pb-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 mb-6 bg-white/5 border border-white/10 rounded-full">
               <Sparkles size={14} className="text-blue-400" />
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">SCEF Intelligence Hub</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 font-display leading-[1.05]">
              Accelerating Impact via <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Unified Intelligence.</span>
            </h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">
              Explore our pan-African ecosystem through advanced generative models, spatial grounding, and real-time multimodal analysis.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
        <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-200/50 overflow-hidden min-h-[700px] flex flex-col lg:flex-row">
          
          {/* Tabs Sidebar */}
          <aside className="lg:w-72 bg-slate-50 border-r border-slate-100 flex flex-col">
            <nav className="p-8 space-y-2">
              {[
                { id: 'ecosystem', label: 'Ecosystem Chat', icon: <Brain size={18} /> },
                { id: 'creative', label: 'Creative Lab', icon: <ImageIcon size={18} /> },
                { id: 'analyzer', label: 'Media Analyzer', icon: <Search size={18} /> },
                { id: 'global', label: 'Global Explorer', icon: <Map size={18} /> },
                { id: 'live', label: 'Live Assistant', icon: <Radio size={18} /> },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setResult(null);
                  }}
                  className={`w-full flex items-center space-x-3 p-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${
                    activeTab === tab.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'text-slate-400 hover:text-slate-600 hover:bg-white'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
            <div className="mt-auto p-8 border-t border-slate-200">
               <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-2">System Status</p>
                  <div className="flex items-center space-x-2">
                     <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                     <span className="text-[10px] font-black text-slate-900 uppercase">Gemini 2.5/3.0 Online</span>
                  </div>
               </div>
            </div>
          </aside>

          {/* Feature Viewport */}
          <main className="flex-grow p-8 lg:p-12 flex flex-col h-full bg-white">
            
            {/* Ecosystem View */}
            {activeTab === 'ecosystem' && (
              <div className="space-y-8 h-full flex flex-col">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 mb-2 font-display">Ecosystem Intelligence</h2>
                  <p className="text-slate-500 font-medium">Use high-reasoning models to analyze complex foundation queries.</p>
                </div>
                
                <div className="flex-grow bg-slate-50 rounded-[2rem] p-8 border border-slate-100 overflow-y-auto">
                   {result ? (
                     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                        <div className="p-6 bg-white rounded-2xl border border-blue-100 shadow-sm prose max-w-none">
                           {result.text}
                        </div>
                        {result.grounding && (
                          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                             <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2 flex items-center">
                               <Globe size={12} className="mr-2" /> Grounded Search Sources
                             </p>
                             <div className="flex flex-wrap gap-2">
                                {result.grounding.map((chunk: any, i: number) => (
                                   <a key={i} href={chunk.web?.uri} target="_blank" className="px-3 py-1 bg-white border border-blue-100 rounded-full text-[10px] font-bold text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                                      {chunk.web?.title || "Source"}
                                   </a>
                                ))}
                             </div>
                          </div>
                        )}
                     </div>
                   ) : (
                     <div className="h-full flex flex-col items-center justify-center text-slate-300">
                        <Brain size={64} className="mb-4 opacity-20" />
                        <p className="font-bold text-sm uppercase tracking-widest">Awaiting impact query...</p>
                     </div>
                   )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => setUseThinking(!useThinking)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                        useThinking ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-400 border-slate-200'
                      }`}
                    >
                      <Brain size={12} /> <span>Thinking Mode</span>
                    </button>
                    <button 
                      onClick={() => setUseSearch(!useSearch)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                        useSearch ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-400 border-slate-200'
                      }`}
                    >
                      <Search size={12} /> <span>Search Grounding</span>
                    </button>
                  </div>
                  <div className="relative">
                    <textarea 
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Ask about the SCEF strategy, impact projections, or recent news..."
                      className="w-full p-6 bg-slate-100 border border-slate-200 rounded-[2rem] text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all resize-none h-24"
                    />
                    <button 
                      onClick={runEcosystemQuery}
                      disabled={loading || !prompt}
                      className="absolute right-4 bottom-4 p-4 bg-slate-900 text-white rounded-2xl hover:bg-blue-600 transition-all disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Creative Lab View */}
            {activeTab === 'creative' && (
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 mb-2 font-display">Creative Lab</h2>
                    <p className="text-slate-500 font-medium">Synthesize impact visuals and advocacy videos from prompts.</p>
                  </div>
                  <div className="flex space-x-2">
                    {['16:9', '9:16', '1:1'].map(ratio => (
                      <button 
                        key={ratio}
                        onClick={() => setAspectRatio(ratio)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black border transition-all ${
                          aspectRatio === ratio ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-400 border-slate-200'
                        }`}
                      >
                        {ratio}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div 
                      onClick={() => document.getElementById('fileUpload')?.click()}
                      className="aspect-square bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-slate-100 transition-all group overflow-hidden"
                    >
                      {previewUrl ? (
                        <img src={previewUrl} className="w-full h-full object-cover rounded-2xl" alt="Preview" />
                      ) : (
                        <>
                          <Upload size={32} className="text-slate-300 mb-4 group-hover:scale-110 transition-transform" />
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">Upload reference image <br />to animate (Veo)</p>
                        </>
                      )}
                      <input id="fileUpload" type="file" hidden accept="image/*" onChange={handleFileChange} />
                    </div>
                    <textarea 
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe the image or video you want to generate..."
                      className="w-full p-6 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-bold h-32 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <button 
                      onClick={generateCreative}
                      disabled={loading || (!prompt && !selectedFile)}
                      className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl uppercase tracking-widest text-xs flex items-center justify-center space-x-3 shadow-xl hover:bg-blue-600 transition-all"
                    >
                      {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : <Zap size={18} />}
                      <span>{selectedFile ? 'Animate with Veo' : 'Generate Asset'}</span>
                    </button>
                  </div>

                  <div className="bg-slate-900 rounded-[3rem] p-8 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group">
                     {result?.imageUrl ? (
                       <img src={result.imageUrl} className="w-full h-full object-contain rounded-2xl" alt="Generated" />
                     ) : result?.videoUrl ? (
                       <video src={result.videoUrl} controls autoPlay loop className="w-full h-full object-contain rounded-2xl" />
                     ) : (
                       <div className="text-center text-slate-700">
                          <ImageIcon size={64} className="mx-auto mb-4 opacity-10" />
                          <p className="text-[10px] font-black uppercase tracking-widest">SFEF Synthesizer Idle</p>
                       </div>
                     )}
                     {loading && (
                       <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center text-white p-12 text-center">
                          <Loader2 className="animate-spin mb-6 text-blue-400" size={48} />
                          <h4 className="text-xl font-black mb-2">Engaging Veo 3.1 Fast...</h4>
                          <p className="text-sm text-slate-400">Our creative models are weaving your vision into high-fidelity pixels. This may take a minute.</p>
                       </div>
                     )}
                  </div>
                </div>
              </div>
            )}

            {/* Media Analyzer View */}
            {activeTab === 'analyzer' && (
              <div className="space-y-8 flex flex-col h-full">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 mb-2 font-display">Media Hub Analyzer</h2>
                  <p className="text-slate-500 font-medium">Upload audio, video, or images for deep understanding and transcription.</p>
                </div>

                <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div 
                      onClick={() => document.getElementById('mediaUpload')?.click()}
                      className="aspect-video bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-slate-100 transition-all"
                    >
                      {selectedFile ? (
                        <div className="text-center">
                           <FileCheck size={32} className="text-emerald-500 mx-auto mb-2" />
                           <p className="text-xs font-black text-slate-900 uppercase">{selectedFile.name}</p>
                           <p className="text-[10px] font-bold text-slate-400 mt-1">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      ) : (
                        <>
                          <Video size={32} className="text-slate-300 mb-4" />
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">Select Audio, Video, or Image</p>
                        </>
                      )}
                      <input id="mediaUpload" type="file" hidden accept="video/*,audio/*,image/*" onChange={handleFileChange} />
                    </div>
                    <div className="relative">
                      <textarea 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="What should I look for? (e.g. 'Transcribe this speech' or 'Identify the chapter location')"
                        className="w-full p-6 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-bold h-24 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all resize-none"
                      />
                    </div>
                    <button 
                      onClick={analyzeMedia}
                      disabled={loading || !selectedFile}
                      className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl uppercase tracking-widest text-xs shadow-xl hover:bg-blue-600 transition-all"
                    >
                      Analyze Content
                    </button>
                  </div>

                  <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 overflow-y-auto max-h-[400px]">
                     {loading ? (
                       <div className="h-full flex flex-col items-center justify-center">
                          <Loader2 className="animate-spin mb-4 text-blue-600" />
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Running Multimodal Processing...</p>
                       </div>
                     ) : result?.text ? (
                       <div className="prose prose-sm max-w-none whitespace-pre-wrap font-medium text-slate-700">
                          {result.text}
                       </div>
                     ) : (
                       <div className="h-full flex flex-col items-center justify-center text-slate-300">
                          <History size={48} className="mb-4 opacity-10" />
                          <p className="text-[10px] font-black uppercase tracking-widest">Awaiting Media Payload</p>
                       </div>
                     )}
                  </div>
                </div>
              </div>
            )}

            {/* Global Explorer View */}
            {activeTab === 'global' && (
              <div className="space-y-8 flex flex-col h-full">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 mb-2 font-display">Global Impact Explorer</h2>
                  <p className="text-slate-500 font-medium">Locate nearby chapters, partner schools, and real-time impact zones.</p>
                </div>

                <div className="flex-grow bg-slate-950 rounded-[3rem] relative overflow-hidden flex flex-col">
                   <div className="absolute inset-0 opacity-20">
                      <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/40 via-transparent to-transparent"></div>
                      <div className="grid grid-cols-12 grid-rows-12 w-full h-full">
                        {Array.from({length: 144}).map((_, i) => (
                          <div key={i} className="border-[0.5px] border-white/5"></div>
                        ))}
                      </div>
                   </div>
                   
                   <div className="relative z-10 flex-grow p-8 flex flex-col justify-end">
                      {result ? (
                        <div className="bg-white p-8 rounded-[2rem] shadow-2xl animate-in slide-in-from-bottom-8 duration-500 max-h-[80%] overflow-y-auto">
                           <h4 className="text-lg font-black text-slate-900 mb-4">Discovery Results</h4>
                           <p className="text-sm text-slate-600 mb-6 font-medium leading-relaxed">{result.text}</p>
                           {result.maps && (
                             <div className="space-y-3">
                                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Verified Maps Locations</p>
                                {result.maps.map((chunk: any, i: number) => (
                                  <a key={i} href={chunk.maps?.uri} target="_blank" className="flex items-center p-3 bg-slate-50 rounded-xl hover:bg-blue-50 transition-colors border border-slate-100 group">
                                     <MapPin size={14} className="mr-3 text-blue-600" />
                                     <span className="text-xs font-bold text-slate-800">{chunk.maps?.title || "View on Map"}</span>
                                     <ArrowRight size={12} className="ml-auto text-slate-300 group-hover:translate-x-1 transition-transform" />
                                  </a>
                                ))}
                             </div>
                           )}
                        </div>
                      ) : (
                        <div className="text-center mb-12">
                           <Globe size={64} className="text-blue-500 mx-auto mb-6 animate-pulse" />
                           <p className="text-white text-xl font-bold font-display">Discover the SCEF Network</p>
                           <p className="text-slate-500 text-sm mt-2">Connecting your location to the mission.</p>
                        </div>
                      )}
                   </div>
                </div>

                <div className="flex space-x-4">
                  <input 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Search impact zones, chapters, or partner schools near you..."
                    className="flex-grow p-5 bg-white border border-slate-200 rounded-2xl font-bold text-sm shadow-sm"
                  />
                  <button 
                    onClick={exploreGlobal}
                    disabled={loading}
                    className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all flex items-center shadow-xl"
                  >
                    {loading ? <Loader2 className="animate-spin mr-2" /> : <Map className="mr-2" />}
                    Locate
                  </button>
                </div>
              </div>
            )}

            {/* Live Assistant View */}
            {activeTab === 'live' && (
              <div className="space-y-8 flex flex-col h-full items-center justify-center">
                <div className="text-center max-w-lg mb-12">
                   <h2 className="text-3xl font-black text-slate-900 mb-4 font-display uppercase tracking-tight">Multimodal Live Session</h2>
                   <p className="text-slate-500 font-medium">Experience human-like spoken interaction. Ask about programs, divisions, or foundation operations in real-time.</p>
                </div>

                <div className="relative">
                   <div className={`w-48 h-48 rounded-full flex items-center justify-center transition-all duration-700 ${
                     isLiveActive ? 'bg-blue-600 shadow-[0_0_80px_rgba(37,99,235,0.4)] scale-110' : 'bg-slate-100 border border-slate-200'
                   }`}>
                      {isLiveActive ? (
                        <div className="flex space-x-1.5 items-end h-12">
                           {[...Array(6)].map((_, i) => (
                             <div 
                               key={i} 
                               className="w-1.5 bg-white rounded-full animate-bounce"
                               style={{ animationDuration: `${0.5 + i * 0.1}s` }}
                             ></div>
                           ))}
                        </div>
                      ) : (
                        <Mic size={48} className="text-slate-300" />
                      )}
                   </div>
                   
                   <button 
                     onClick={startLiveConversation}
                     className={`absolute -bottom-8 left-1/2 -translate-x-1/2 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-2xl ${
                       isLiveActive ? 'bg-rose-600 text-white hover:bg-rose-700' : 'bg-slate-900 text-white hover:bg-blue-600'
                     }`}
                   >
                     {isLiveActive ? 'Terminate Session' : 'Initiate Live Sync'}
                   </button>
                </div>

                <div className="mt-16 w-full max-w-2xl bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 min-h-[150px] max-h-[300px] overflow-y-auto flex flex-col space-y-3">
                   {liveTranscript.length > 0 ? (
                     liveTranscript.map((t, i) => (
                       <p key={i} className={`text-sm font-bold ${t.startsWith('AI:') ? 'text-blue-600' : 'text-slate-600'}`}>
                         {t}
                       </p>
                     ))
                   ) : (
                     <p className="text-center text-slate-300 text-xs font-black uppercase tracking-[0.2em] mt-8">Voice Interface Ready</p>
                   )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm flex items-start space-x-6">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                 <Brain className="text-blue-600" />
              </div>
              <div>
                 <h4 className="text-lg font-black text-slate-900 mb-1">High Reasoning</h4>
                 <p className="text-sm text-slate-500 font-medium">Gemini 3.0 Pro models handle complex strategic planning queries with max thinking budget.</p>
              </div>
           </div>
           <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm flex items-start space-x-6">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0">
                 <ShieldCheck className="text-emerald-600" />
              </div>
              <div>
                 <h4 className="text-lg font-black text-slate-900 mb-1">Secure & Grounded</h4>
                 <p className="text-sm text-slate-500 font-medium">Verified search and spatial results via Google Search & Maps toolsets.</p>
              </div>
           </div>
           <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm flex items-start space-x-6">
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center shrink-0">
                 <Video className="text-rose-600" />
              </div>
              <div>
                 <h4 className="text-lg font-black text-slate-900 mb-1">Vision Enabled</h4>
                 <p className="text-sm text-slate-500 font-medium">Veo 3.1 Fast generates high-quality landscape/portrait videos for advocacy.</p>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default ImpactIntelligence;
