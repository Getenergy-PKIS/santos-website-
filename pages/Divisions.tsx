import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DIVISIONS } from '../constants';
import IconWrapper from '../components/IconWrapper';
import { Layout, ArrowRight, ExternalLink, CheckCircle2 } from 'lucide-react';

const Divisions: React.FC = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash, pathname]);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-24 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-blue-50 text-blue-600 rounded-full border border-blue-100">
            Structural Hierarchy
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 font-display">Organizational Structure</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Santos Creations Educational Foundation (SCEF) operates through five clearly defined divisions, ensuring uniting technology, governance, media, and growth.
          </p>
        </div>
      </header>

      {/* Divisions List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {DIVISIONS.map((div, index) => (
            <div 
              key={div.id} 
              id={div.id}
              className="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-slate-200 flex flex-col lg:flex-row hover:shadow-xl transition-all duration-500 scroll-mt-28 md:scroll-mt-32"
            >
              <div className={`${div.color} lg:w-1/3 p-12 flex flex-col justify-center text-white relative overflow-hidden lg:sticky lg:top-28 h-auto lg:h-[700px]`}>
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <IconWrapper name={div.icon} className="h-64 w-64" />
                </div>
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-8 border border-white/30 shadow-xl group hover:scale-105 transition-transform duration-500">
                    <IconWrapper name={div.icon} className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-2 text-white/80">{div.shortName} UNIT</div>
                  <h2 className="text-3xl font-extrabold mb-6 font-display leading-tight">{div.name}</h2>
                  <div className="h-1.5 w-16 bg-white/40 mb-8 rounded-full"></div>
                  
                  <div className="space-y-4">
                    {div.ctas?.map((cta, i) => (
                      <Link 
                        key={i} 
                        to={cta.path.includes('/donate') ? '/eduaid' : cta.path} 
                        className="flex items-center text-sm font-black uppercase tracking-widest text-white/90 group hover:text-white transition-colors"
                      >
                        <ArrowRight size={14} className="mr-3 group-hover:translate-x-2 transition-transform" />
                        {cta.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="lg:w-2/3 p-8 md:p-12 lg:p-16 bg-white relative">
                <div className="mb-12">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Primary Mandate</h3>
                  <div className="flex items-start gap-4">
                    <IconWrapper name={div.icon} className={`h-8 w-8 shrink-0 ${div.color.replace('bg-', 'text-')}`} />
                    <p className="text-2xl text-slate-800 font-medium leading-relaxed italic font-display">
                      &ldquo;{div.mandate}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Core Responsibilities</h3>
                    <ul className="space-y-4">
                      {div.responsibilities.map((res, i) => (
                        <li key={i} className="flex items-start">
                          <IconWrapper name={div.icon} className="h-5 w-5 text-blue-500 mr-3 shrink-0 mt-0.5" />
                          <span className="text-slate-600 text-sm font-bold leading-relaxed">{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-8">
                    {div.howItShowsUp && (
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Platform Manifestation</h3>
                        <ul className="space-y-3">
                          {div.howItShowsUp.map((item, i) => (
                            <li key={i} className="flex items-center text-slate-700 text-xs font-bold">
                              <IconWrapper name={div.icon} className="h-3.5 w-3.5 text-blue-600 mr-3 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {div.platforms && (
                      <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100/50">
                        <h3 className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-6">Media Platforms</h3>
                        <div className="grid grid-cols-1 gap-2">
                          {div.platforms.map((platform, i) => (
                            <div key={i} className="flex items-center text-blue-900 text-xs font-black uppercase tracking-widest">
                              <ExternalLink className="h-3 w-3 text-blue-500 mr-3" />
                              {platform}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 bg-slate-900 text-white p-12 lg:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] group-hover:scale-110 transition-transform"></div>
          <div className="relative z-10 text-center">
            <h3 className="text-3xl font-extrabold mb-6 font-display">Inter-Divisional Collaboration</h3>
            <p className="max-w-4xl mx-auto text-slate-300 text-lg leading-relaxed mb-8">
              While each division has a distinct mandate, they operate as a unified ecosystem. For example, **OMBDD** focuses on online growth and business development while collaborating with **Santos Media** for broadcast content production, all while under the compliance umbrella of **SOBCD**.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/resources/policies" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all uppercase text-[10px] tracking-widest">
                View Governance Charter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Divisions;