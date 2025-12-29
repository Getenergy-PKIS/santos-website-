import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Shield, 
  Target, 
  Lightbulb, 
  CheckCircle2, 
  Layout, 
  ArrowRight, 
  ExternalLink,
  History,
  Scale,
  Zap,
  Globe,
  Award,
  Fingerprint
} from 'lucide-react';
import { GOVERNANCE_STATEMENT, DIVISIONS, PROGRAMS } from '../constants';
import IconWrapper from '../components/IconWrapper';

const About: React.FC = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Precise delay for React rendering to finish
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash, pathname]);

  const milestones = [
    { year: '2018', title: 'The Blueprint', desc: 'Conceptualization of a tech-driven educational advocacy model for the African continent.' },
    { year: '2019', title: 'Institutional Inception', desc: 'Formal registration of Santos Creations Educational Foundation as a membership-run ecosystem.' },
    { year: '2020', title: 'EduAid-Africa Launch', desc: 'Mobilization of relief efforts and scholarships during the global shift to digital learning.' },
    { year: '2021', title: 'Digital Architecture', desc: 'Deployment of the Technology & Digital Services Division (TDSD) and the CENTRA database.' },
    { year: '2022', title: 'Continental Expansion', desc: 'Surpassed 10+ active country nodes through the launch of the Local Chapter Services (LCS).' },
    { year: '2023', title: 'FinTech Integration', desc: 'Official rollout of the GFA Wallet and AGC (Afri Gold Coin) for transparent impact ledgering.' },
    { year: '2024', title: 'Media Powerhouse', desc: 'Establishment of Santos Media Division and launch of NESA Africa TV for advocacy storytelling.' }
  ];

  const principles = [
    { icon: <Shield className="text-blue-600" />, title: 'Absolute Transparency', desc: 'Every cent and action is ledgered via AGC, ensuring 100% accountability to our members and donors.' },
    { icon: <Scale className="text-indigo-600" />, title: 'Member-Led Governance', desc: 'Decisions are driven by verified members through decentralized chapter leadership and HQ audit.' },
    { icon: <Zap className="text-amber-600" />, title: 'Technological Excellence', desc: 'We leverage world-class digital infrastructure to bridge the gap between rural learners and global tools.' },
    { icon: <Globe className="text-emerald-600" />, title: 'Pan-African Solidarity', desc: 'Bridging the diaspora and local communities to create a unified front for educational reform.' }
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 mb-6 bg-blue-100 text-blue-700 rounded-full border border-blue-200">
              <span className="text-[10px] font-black uppercase tracking-widest">About Santos Creations</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 font-display leading-[1.1]">Architecting <br/><span className="text-blue-600">Educational Impact.</span></h1>
            <p className="text-xl text-slate-600 leading-relaxed font-medium">
              Santos Creations Educational Foundation (SCEF) is a membership-led pan-African organization designed for scale, total transparency, and generational impact.
            </p>
          </div>
        </div>
      </section>

      {/* 1. Vision & Mission & Founding Principles */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
            <div className="space-y-8">
              <div className="p-10 bg-blue-50 rounded-[2.5rem] border border-blue-100 shadow-sm transition-transform hover:-translate-y-1">
                <Target className="h-12 w-12 text-blue-600 mb-6" />
                <h3 className="text-3xl font-black text-slate-900 mb-4 font-display">Our Vision</h3>
                <p className="text-slate-700 leading-relaxed font-medium">
                  To build a seamlessly integrated education impact ecosystem that leverages technology, media, and local community governance to ensure every African child has access to quality educational tools and advocacy.
                </p>
              </div>
              <div className="p-10 bg-indigo-50 rounded-[2.5rem] border border-indigo-100 shadow-sm transition-transform hover:-translate-y-1">
                <Lightbulb className="h-12 w-12 text-indigo-600 mb-6" />
                <h3 className="text-3xl font-black text-slate-900 mb-4 font-display">Our Mission</h3>
                <p className="text-slate-700 leading-relaxed font-medium">
                  To deliver sustainable educational programs through specialized divisions that manage technology infrastructure, media production, business compliance, and local chapter coordination.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center space-x-2 px-3 py-1 mb-8 bg-blue-50 text-blue-600 rounded-full w-fit">
                <Fingerprint size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Founding Identity</span>
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-8 font-display uppercase tracking-tight">The Membership-Run <br/>Core Principles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {principles.map((p, i) => (
                  <div key={i} className="group">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mb-4 transition-colors group-hover:bg-white group-hover:shadow-md">
                      {p.icon}
                    </div>
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-2">{p.title}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-12">
                 <Link to="/membership" className="px-8 py-4 bg-slate-900 text-white font-black rounded-xl text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl flex items-center gap-3 w-fit">
                   Join the Movement <ArrowRight size={14} />
                 </Link>
              </div>
            </div>
          </div>

          {/* 2. Evolutionary Timeline */}
          <div className="py-24 border-t border-slate-100">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
              <div className="max-w-xl">
                <h2 className="text-4xl font-black text-slate-900 mb-4 font-display uppercase tracking-tight">Our Evolution</h2>
                <p className="text-lg text-slate-500 font-medium leading-relaxed">
                  From a strategic blueprint to a continental ecosystem. Tracking our journey of institutional scale.
                </p>
              </div>
              <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-200">
                 <History className="inline text-blue-600 mr-2" size={18} />
                 <span className="text-xs font-black text-slate-600 uppercase tracking-widest">Operational History</span>
              </div>
            </div>

            <div className="relative">
              {/* Vertical line for desktop */}
              <div className="hidden lg:block absolute left-[50%] top-0 bottom-0 w-[1px] bg-slate-200"></div>
              
              <div className="space-y-12 lg:space-y-0">
                {milestones.map((m, i) => (
                  <div key={m.year} className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-0 ${i % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Content */}
                    <div className="lg:w-1/2 flex justify-center px-4 lg:px-12">
                      <div className={`w-full max-w-md p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all ${i % 2 === 0 ? 'text-left' : 'lg:text-right'}`}>
                        <span className="text-3xl font-black text-blue-600 mb-2 block font-display">{m.year}</span>
                        <h4 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">{m.title}</h4>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">{m.desc}</p>
                      </div>
                    </div>
                    
                    {/* Node */}
                    <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center justify-center z-10">
                       <div className="w-12 h-12 rounded-full bg-white border-4 border-blue-600 flex items-center justify-center shadow-xl">
                         <div className="w-3 h-3 rounded-full bg-blue-600 animate-pulse"></div>
                       </div>
                    </div>

                    <div className="lg:w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-200 w-full my-32"></div>

          {/* Detailed Divisions Section */}
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 font-display uppercase tracking-tight">Ecosystem Architecture</h2>
            <p className="text-xl text-slate-500 max-w-4xl mx-auto leading-relaxed font-medium">
              SCEF is powered by five core operational units. This structure ensures that governance, growth, and impact happen simultaneously and transparently.
            </p>
          </div>

          <div className="space-y-32">
            {DIVISIONS.map((div, index) => (
              <div 
                key={div.id} 
                id={div.id} 
                className={`flex flex-col lg:flex-row gap-16 items-start scroll-mt-28 md:scroll-mt-32 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Sticky Side */}
                <div className="lg:w-5/12 lg:sticky lg:top-28 h-fit lg:min-h-[450px] flex flex-col z-10 py-4">
                  <div className={`${div.color} w-24 h-24 rounded-3xl flex items-center justify-center text-white mb-8 shadow-2xl shadow-slate-200/50 hover:scale-110 hover:rotate-3 transition-all duration-500`}>
                    <IconWrapper name={div.icon} className="h-12 w-12" />
                  </div>
                  <div className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-3">{div.shortName} UNIT</div>
                  <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-4xl font-black text-slate-900 font-display leading-tight">{div.name}</h3>
                  </div>
                  
                  <div className="mb-10">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Official Mandate</h4>
                    <div className="relative p-8 bg-slate-50 rounded-r-[2rem] border-l-4 border-l-blue-600 flex gap-4 overflow-hidden group">
                      <div className="absolute -bottom-8 -right-8 opacity-5 transition-transform group-hover:scale-110 duration-700">
                        <IconWrapper name={div.icon} className="h-40 w-40" />
                      </div>
                      <IconWrapper name={div.icon} className={`h-8 w-8 shrink-0 ${div.color.replace('bg-', 'text-')}`} />
                      <p className="text-xl text-slate-800 font-medium italic relative z-10">
                        &ldquo;{div.mandate}&rdquo;
                      </p>
                    </div>
                  </div>
                  
                  {/* CTAs */}
                  <div className="flex flex-wrap gap-4 mt-auto pb-4">
                    {div.ctas?.map((cta, i) => (
                      <Link key={i} to={cta.path.includes('/donate') ? '/eduaid' : cta.path} className="px-6 py-4 bg-white border border-slate-200 text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all flex items-center gap-3 shadow-sm hover:shadow-md">
                        {cta.label}
                        <ArrowRight size={14} className="text-blue-600" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Content Side */}
                <div className="lg:w-7/12 space-y-12">
                  <section className="bg-white border border-slate-100 p-10 md:p-12 rounded-[3rem] shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                       <IconWrapper name={div.icon} className="h-40 w-40" />
                    </div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Scope of Responsibility</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                      {div.responsibilities.map((res, i) => (
                        <li key={i} className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100/50 hover:bg-white hover:border-blue-100 transition-colors">
                          <IconWrapper name={div.icon} className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                          <span className="text-[13px] font-bold text-slate-700 leading-relaxed">{res}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {div.howItShowsUp && (
                    <section className="bg-white border border-slate-100 p-10 md:p-12 rounded-[3rem] shadow-sm relative overflow-hidden">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Platform manifestation</h4>
                      <div className="space-y-6 relative z-10">
                        {div.howItShowsUp.map((item, i) => (
                          <div key={i} className="flex items-start gap-5 group">
                            <IconWrapper name={div.icon} className={`h-5 w-5 mt-1 shrink-0 ${div.color.replace('bg-', 'text-')}`} />
                            <span className="text-base text-slate-600 font-medium leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {div.platforms && (
                    <section className="bg-slate-900 p-10 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/10 rounded-full blur-2xl"></div>
                      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8">Media Distribution Channels</h4>
                      <div className="flex flex-wrap gap-4 relative z-10">
                        {div.platforms.map((p, i) => (
                          <span key={i} className="px-6 py-3 bg-white/5 border border-white/10 text-white text-[11px] font-black rounded-xl uppercase tracking-wider hover:bg-white/10 transition-colors flex items-center gap-2">
                            <IconWrapper name={div.icon} className="h-3 w-3 text-blue-400" />
                            {p}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programmatic Impact Closing Block */}
      <section className="py-32 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-indigo-600/10 rounded-full blur-[100px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
             <div className="inline-flex items-center space-x-2 px-3 py-1 mb-8 bg-white/5 text-slate-400 rounded-full border border-white/10">
                <span className="text-[10px] font-black uppercase tracking-widest">Scaling Impact Globally</span>
             </div>
             <h2 className="text-4xl lg:text-6xl font-black mb-10 font-display leading-tight">One Ecosystem. <br/>Unlimited Potential.</h2>
             <p className="text-xl text-slate-400 mb-16 leading-relaxed font-medium">
               SCEF’s programs are specialized impact vehicles powered by our five operational divisions and local chapters. Together, we are creating a new standard for educational advocacy.
             </p>
             
             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-20">
               {PROGRAMS.map(prog => (
                 prog.externalUrl ? (
                   <a 
                     key={prog.slug} 
                     href={prog.externalUrl} 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center hover:bg-blue-600 hover:border-blue-600 transition-all group flex flex-col items-center justify-center gap-2"
                   >
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-white">{prog.name}</span>
                     <ExternalLink size={12} className="text-slate-500 group-hover:text-white opacity-40 group-hover:opacity-100" />
                   </a>
                 ) : (
                   <Link to={`/programs/${prog.slug}`} key={prog.slug} className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center hover:bg-blue-600 hover:border-blue-600 transition-all group flex items-center justify-center">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-white">{prog.name}</span>
                   </Link>
                 )
               ))}
             </div>

             <div className="flex flex-wrap justify-center gap-6">
               <Link to="/membership" className="px-10 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/30 uppercase tracking-widest text-xs">
                 Become a Member
               </Link>
               <Link to="/eduaid" className="px-10 py-5 bg-white text-slate-900 font-black rounded-2xl hover:bg-slate-100 transition-all uppercase tracking-widest text-xs">
                 Support the Mission
               </Link>
             </div>
          </div>
        </div>
      </section>

      {/* Governance Statement Block */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-10">
             <Shield className="h-16 w-16 text-slate-200" />
          </div>
          <h2 className="text-3xl font-black mb-12 font-display text-slate-900 uppercase tracking-tighter">Governance Pledge</h2>
          <blockquote className="text-3xl md:text-5xl font-light italic leading-[1.2] mb-16 text-slate-800 font-display">
            &ldquo;{GOVERNANCE_STATEMENT}&rdquo;
          </blockquote>
          <div className="h-px w-32 bg-blue-500 mx-auto mb-10"></div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Santos Creations Educational Foundation (SCEF)</p>
        </div>
      </section>
    </div>
  );
};

export default About;