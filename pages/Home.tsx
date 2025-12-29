
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  Users, 
  Globe, 
  Landmark, 
  Heart, 
  MapPin, 
  Wallet,
  Zap,
  ArrowUpRight,
  ChevronRight,
  Activity,
  ShieldCheck,
  Cpu,
  TrendingUp,
  Clapperboard,
  Layers,
  Sparkles
} from 'lucide-react';
import { DIVISIONS, PROGRAMS, GOVERNANCE_STATEMENT } from '../constants';
import IconWrapper from '../components/IconWrapper';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

const AnimatedCounter: React.FC<CounterProps> = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo for smooth finish
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easedProgress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return <div ref={elementRef} className="tabular-nums inline-block">{count.toLocaleString()}{suffix}</div>;
};

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[95vh] flex items-center pt-20 pb-24 overflow-hidden bg-slate-950">
        {/* Background Graphics */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=2400" 
            alt="SCEF Hero" 
            className="w-full h-full object-cover opacity-10 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/90 to-blue-900/30"></div>
          
          {/* Animated SVG Grid Pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Floating Data Spheres */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-rose-600/10 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '3s'}}></div>
          
          {/* Central Energy Core Graphic */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full animate-[spin_20s_linear_infinite]">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full blur-sm"></div>
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-rose-500 rounded-full blur-sm"></div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]">
             <div className="absolute top-1/2 left-0 -translate-y-1/2 w-3 h-3 bg-indigo-500 rounded-full blur-sm"></div>
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center space-x-2 px-4 py-2 mb-10 bg-blue-600/20 rounded-full border border-blue-400/20 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-ping"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">Santos Creations Educational Foundation</span>
            </div>
            <h1 className="text-5xl md:text-[5.5rem] font-black text-white mb-10 leading-[1] font-display tracking-tight">
              A Member-Led <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-rose-400">Impact Ecosystem.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 mb-14 leading-relaxed max-w-2xl font-medium">
              Transforming education through specialized divisions, localized chapters, and data-driven governance across Africa and the diaspora.
            </p>
            <div className="flex flex-wrap gap-5 items-center">
              <Link to="/membership" className="px-12 py-6 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/40 hover:-translate-y-1 active:scale-95 uppercase tracking-widest text-[11px] flex items-center">
                Get Started Now <ArrowRight size={16} className="ml-3" />
              </Link>
              <Link to="/chapters" className="px-12 py-6 bg-white/5 text-white font-black rounded-2xl hover:bg-white/10 transition-all border border-white/10 backdrop-blur-md uppercase tracking-widest text-[11px]">
                Browse Chapters
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW SCEF WORKS (Operational Summary) */}
      <section className="bg-white py-24 border-y border-slate-100 shadow-sm relative overflow-hidden">
        {/* Background Graphic: Connection Dots */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                 <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="#3b82f6" />
                 </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
           </svg>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="shrink-0 text-center lg:text-left lg:border-r lg:border-slate-100 lg:pr-16">
              <h2 className="text-4xl font-black text-slate-900 mb-2 uppercase tracking-tighter font-display leading-none">Operational <br/>Pipeline</h2>
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mt-4">Real-Time Growth metrics</p>
            </div>
            
            <div className="flex-grow flex flex-wrap justify-center lg:justify-between items-center gap-12 lg:gap-4 relative">
              {/* Connector line graphic for desktop */}
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[1px] bg-slate-100 -translate-y-[4.5rem] z-0"></div>
              
              {[
                { icon: <Users size={20} />, val: 10000, suffix: '+', label: 'Members', step: '01' },
                { icon: <MapPin size={20} />, val: 500, suffix: '+', label: 'Chapters', step: '02' },
                { icon: <Heart size={20} />, val: 2, suffix: 'M+', label: 'Impact', step: '03' },
                { icon: <Zap size={20} />, val: 100, suffix: '+', label: 'Funded', step: '04' },
                { icon: <Landmark size={20} />, val: 5, suffix: '+', label: 'Divisions', step: '05' }
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center text-center group min-w-[140px] relative z-10">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-white border border-slate-200 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:scale-110 transition-all duration-500 shadow-xl shadow-slate-200/40">
                    <div className="text-slate-400 group-hover:text-white transition-colors">
                      {s.icon}
                    </div>
                  </div>
                  <div className="text-3xl font-black text-slate-900 mb-1 tracking-tighter font-display leading-none">
                    <AnimatedCounter end={s.val} suffix={s.suffix} />
                  </div>
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>

            <Link to="/start" className="shrink-0 bg-slate-900 text-white px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-2xl active:scale-95 group">
              Start Integration <ArrowRight size={14} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. DIVISIONS PREVIEW (Refined Architectural Cards) */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        {/* Background SVG Decoration */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[1000px] h-[1000px] border border-blue-600/5 rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[800px] h-[800px] border border-rose-600/5 rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <div className="inline-flex items-center space-x-2 px-3 py-1 mb-6 bg-blue-50 text-blue-600 rounded-full border border-blue-100">
              <Layers size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">Structural Foundation</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 font-display uppercase tracking-tight">Institutional Architecture</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
              Specialized operational units delivering governance, technology, and advocacy as one unified ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {DIVISIONS.map((div) => (
              <div 
                key={div.id} 
                className="group bg-white p-12 rounded-[4rem] border border-slate-200 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] hover:-translate-y-4 hover:scale-[1.02] transition-all duration-500 flex flex-col h-full relative overflow-hidden"
              >
                {/* Dynamic Ghost Icon in Background */}
                <div className={`absolute -bottom-12 -right-12 opacity-[0.03] scale-150 transition-all group-hover:scale-125 group-hover:opacity-[0.07] duration-1000 rotate-12 group-hover:rotate-0 ${div.color.replace('bg-', 'text-')}`}>
                   <IconWrapper name={div.icon} className="w-72 h-72" />
                </div>

                {/* Card Top: Functional Icon */}
                <div className="relative mb-12">
                  <div className={`${div.color} w-24 h-24 rounded-[2.5rem] flex items-center justify-center text-white relative z-10 group-hover:rotate-6 transition-transform duration-500 shadow-2xl shadow-slate-200`}>
                    <IconWrapper name={div.icon} className="h-10 w-10" />
                    {/* Pulsing glow effect on hover */}
                    <div className={`absolute inset-0 rounded-[2.5rem] ${div.color} opacity-0 group-hover:opacity-40 animate-ping`}></div>
                  </div>
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg z-20">
                     <Sparkles size={16} className="text-blue-500" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 flex-grow">
                  <div className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-4 flex items-center">
                    <span className="w-8 h-[2px] bg-blue-600/20 mr-4 rounded-full"></span>
                    {div.shortName}
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-6 leading-tight font-display tracking-tight group-hover:text-blue-600 transition-colors">{div.name}</h3>
                  
                  <p className="text-slate-500 text-base leading-relaxed mb-12 font-medium">
                    {div.mandate}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-8 border-t border-slate-100 relative z-10">
                  <Link to={`/about#${div.id}`} className="inline-flex items-center text-slate-900 font-black text-[11px] uppercase tracking-[0.2em] group/btn transition-all hover:text-blue-600 hover:gap-4">
                    <span>Analyze Mandate</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
            
            {/* Call to Governance Card */}
            <div className="bg-slate-900 rounded-[4rem] p-12 flex flex-col justify-center items-center text-center text-white relative overflow-hidden group hover:-translate-y-4 hover:scale-[1.02] transition-all duration-500">
               <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-rose-500"></div>
               
               <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform">
                 <ShieldCheck className="w-10 h-10 text-blue-400" />
               </div>
               
               <h3 className="text-2xl font-black mb-4 font-display uppercase tracking-tight">Compliance DNA</h3>
               <p className="text-slate-400 text-sm mb-10 leading-relaxed font-bold uppercase tracking-widest">Transparency is hardcoded into our ecosystem.</p>
               
               <Link to="/about/compliance" className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-2xl">
                 Access Registry
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CHAPTERS GRAPHIC (Hyper-Local Grid) */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
               <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-50 rounded-full blur-[80px] -z-10"></div>
               
               <div className="inline-block px-4 py-2 mb-8 bg-blue-50 border border-blue-100 rounded-full">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">SCEF Local Chapter system</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black mb-10 font-display leading-[1.05] tracking-tight">Hyper-Local. <br /> <span className="text-blue-600">Verified Impact.</span></h2>
              <p className="text-xl text-slate-500 mb-12 leading-relaxed font-medium">
                Our localized delivery model converts online starter chapters into verified real-time communities with physically present leadership and documented activities.
              </p>
              
              <div className="space-y-6 mb-16">
                 {[
                   { t: 'Starter Chapters', d: 'Community mobilization & digital onboarding.', color: 'text-indigo-600', icon: <Globe size={18}/> },
                   { t: 'Real-Time Chapters', d: 'Physical hubs with verified leadership.', color: 'text-rose-600', icon: <MapPin size={18}/> },
                   { t: 'Standardized Impact', d: 'Unified reporting across all tiers.', color: 'text-emerald-600', icon: <Activity size={18}/> }
                 ].map((item, i) => (
                    <div key={i} className="flex items-start space-x-5 group cursor-default">
                       <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center transition-colors group-hover:bg-blue-600 group-hover:text-white ${item.color}`}>
                          {item.icon}
                       </div>
                       <div>
                          <h4 className="font-black text-slate-900 mb-1">{item.t}</h4>
                          <p className="text-sm text-slate-500 font-medium">{item.d}</p>
                       </div>
                    </div>
                 ))}
              </div>

              <div className="flex flex-wrap gap-4">
                 <Link to="/local-chapters" className="px-10 py-5 bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-2xl hover:bg-blue-600 transition-all flex items-center">
                   Explore Chapter Map <MapPin size={14} className="ml-3" />
                 </Link>
                 <Link to="/local-chapters/start-online" className="px-10 py-5 bg-white border border-slate-200 text-slate-900 font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-slate-50 transition-all">
                   Launch Starter Chapter
                 </Link>
              </div>
            </div>
            
            {/* Visual Node Graphic */}
            <div className="relative">
              <div className="aspect-square bg-slate-50 rounded-[4rem] border border-slate-100 p-8 md:p-16 relative group">
                 <div className="absolute inset-0 opacity-10">
                    <svg width="100%" height="100%" className="animate-pulse">
                       <line x1="20%" y1="20%" x2="80%" y2="80%" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />
                       <line x1="80%" y1="20%" x2="20%" y2="80%" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />
                       <circle cx="50%" cy="50%" r="40%" fill="none" stroke="#3b82f6" strokeWidth="1" />
                    </svg>
                 </div>
                 
                 <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-8 w-full max-w-[400px]">
                       {[
                         { l: 'Accra', v: 'Verified', c: 'bg-emerald-500' },
                         { l: 'Lagos', v: 'Verified', c: 'bg-emerald-500' },
                         { l: 'London', v: 'Hybrid', c: 'bg-amber-500' },
                         { l: 'Starter', v: 'Online', c: 'bg-blue-500' }
                       ].map((node, idx) => (
                          <div key={idx} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 hover:scale-105 transition-transform group/node">
                             <div className="flex justify-between items-start mb-6">
                                <div className={`w-3 h-3 rounded-full ${node.c} shadow-[0_0_10px_rgba(16,185,129,0.5)]`}></div>
                                <Activity size={14} className="text-slate-200" />
                             </div>
                             <h4 className="text-xl font-black text-slate-900 mb-1">{node.l}</h4>
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{node.v} Node</p>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GFA WALLET GRAPHIC (FinTech Aesthetic) */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
           <div className="bg-gradient-to-br from-indigo-700 via-blue-800 to-indigo-900 rounded-[4rem] p-12 lg:p-24 text-white relative overflow-hidden shadow-3xl">
              <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    <path d="M 0 50 L 50 50 M 50 50 L 50 100 M 50 50 L 70 30 M 70 30 L 100 30" fill="none" stroke="white" strokeWidth="1"/>
                    <circle cx="0" cy="50" r="3" fill="white"/>
                    <circle cx="100" cy="30" r="3" fill="white"/>
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#circuit)" />
                </svg>
              </div>
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
                 <div className="lg:col-span-7">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-10 border border-white/20">
                       <Wallet size={32} />
                    </div>
                    <h2 className="text-5xl md:text-[5rem] font-black mb-8 font-display tracking-tight leading-[1] uppercase">Transparent <br/>Capital flow.</h2>
                    <p className="text-xl text-blue-100/80 mb-14 leading-relaxed font-medium max-w-xl">
                       Our GFA Wallet and AGC currency ensure that every cent donated is traceable to localized chapter programs. Zero leak, total impact.
                    </p>
                    <div className="flex flex-wrap gap-5">
                       <Link to="/wallet" className="px-10 py-5 bg-white text-indigo-900 font-black rounded-2xl uppercase tracking-widest text-[10px] shadow-2xl hover:bg-blue-50 transition-all flex items-center">
                          Open GFA Wallet <ArrowUpRight size={14} className="ml-3" />
                       </Link>
                       <Link to="/eduaid" className="px-10 py-5 bg-blue-600/40 text-white border border-white/20 font-black rounded-2xl uppercase tracking-widest text-[10px] backdrop-blur-md hover:bg-blue-600 transition-all">
                          Donate Fiat
                       </Link>
                    </div>
                 </div>
                 
                 <div className="lg:col-span-5 relative">
                    <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[3rem] shadow-2xl animate-in fade-in slide-in-from-right-12 duration-1000">
                       <div className="flex justify-between items-center mb-10">
                          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300">Live Transaction Stream</p>
                          <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></div>
                       </div>
                       <div className="space-y-6">
                          {[
                            { u: 'ACCRA_CH', a: '+540 AGC', t: 'Just Now', s: 'SUCCESS' },
                            { u: 'LAGOS_CH', a: '+1200 AGC', t: '2m ago', s: 'SUCCESS' },
                            { u: 'SCEF_HQ', a: '+50,000 NGN', t: '15m ago', s: 'VERIFIED' }
                          ].map((tx, idx) => (
                            <div key={idx} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors">
                               <div className="flex items-center space-x-4">
                                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-300"><Activity size={14}/></div>
                                  <div>
                                     <p className="text-xs font-black">{tx.u}</p>
                                     <p className="text-[8px] font-bold text-slate-500 uppercase">{tx.t}</p>
                                  </div>
                               </div>
                               <div className="text-right">
                                  <p className="text-sm font-black text-emerald-400">{tx.a}</p>
                                  <p className="text-[8px] font-black text-slate-500 tracking-widest">{tx.s}</p>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 6. FINAL GRAPHIC CTA (Continent Silhouette) */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-10 font-display tracking-tight uppercase">Scale the Mission.</h2>
          <p className="text-xl text-slate-500 mb-16 leading-relaxed font-medium">
            Join thousands of members architecting the future of African education today.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/membership" className="px-12 py-6 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all shadow-3xl uppercase tracking-widest text-[11px] group">
              Become a Verified Member <ArrowRight size={16} className="inline ml-3 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link to="/start" className="px-12 py-6 border-2 border-slate-900 text-slate-900 font-black rounded-2xl hover:bg-slate-50 transition-all uppercase tracking-widest text-[11px]">
              Ecosystem Onboarding
            </Link>
          </div>
          
          <div className="mt-24 pt-16 border-t border-slate-100 flex flex-wrap justify-center items-center gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
             <div className="flex flex-col items-center">
                <ShieldCheck size={32} className="mb-2 text-slate-900" />
                <span className="font-black text-slate-900 text-xs tracking-widest uppercase">SOBCD Compliant</span>
             </div>
             <div className="flex flex-col items-center">
                <Cpu size={32} className="mb-2 text-slate-900" />
                <span className="font-black text-slate-900 text-xs tracking-widest uppercase">TDSD Architecture</span>
             </div>
             <div className="flex flex-col items-center">
                <TrendingUp size={32} className="mb-2 text-slate-900" />
                <span className="font-black text-slate-900 text-xs tracking-widest uppercase">OMBDD Growth</span>
             </div>
             <div className="flex flex-col items-center">
                <Clapperboard size={32} className="mb-2 text-slate-900" />
                <span className="font-black text-slate-900 text-xs tracking-widest uppercase">Santos Media</span>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
