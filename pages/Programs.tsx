import React from 'react';
import { Link } from 'react-router-dom';
import { PROGRAMS } from '../constants';
import { ExternalLink, BookOpen, GraduationCap, Globe, Heart, Award, Bus, Map, LineChart, Users, HeartHandshake } from 'lucide-react';

const programIcons: Record<string, React.ReactNode> = {
  'NESA-Africa': <Award className="w-8 h-8 text-blue-600" />,
  'EduAid-Africa': <Heart className="w-8 h-8 text-rose-600" />,
  'Rebuild My School Africa': <Map className="w-8 h-8 text-amber-600" />,
  'Education Online Africa': <Globe className="w-8 h-8 text-indigo-600" />,
  'eLibrary Nigeria': <BookOpen className="w-8 h-8 text-emerald-600" />,
  'Women & Girls Education': <Users className="w-8 h-8 text-purple-600" />,
  'Special Needs Education Support': <Heart className="w-8 h-8 text-pink-600" />,
  'Census Advocacy': <LineChart className="w-8 h-8 text-slate-600" />,
  'Education Tourism': <Bus className="w-8 h-8 text-orange-600" />,
  'My Career My Life': <GraduationCap className="w-8 h-8 text-cyan-600" />,
};

const Programs: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=2000" alt="Library" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 mb-8 bg-white/5 text-blue-400 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest">
            Impact Portfolios
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 font-display tracking-tight uppercase">Programs & <span className="text-blue-500">Initiatives.</span></h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
            Our non-divisional programmatic units are delivered through specialized divisions and local chapters to create hyper-focused, scalable impact.
          </p>
        </div>
      </header>

      {/* Program Grid */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PROGRAMS.map((prog) => (
            <div key={prog.name} className="group p-12 rounded-[4rem] border border-slate-200 bg-white shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col">
              <div className="mb-10 bg-slate-50 w-20 h-20 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-50 transition-all border border-slate-100">
                {programIcons[prog.name] || <BookOpen className="w-10 h-10 text-blue-600" />}
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-6 font-display">{prog.name}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-10 font-medium flex-grow">
                Official SCEF programmatic initiative focused on driving education outcomes through {prog.name.toLowerCase().includes('media') ? 'broadcast' : 'targeted resources'} and impact narratives. Managed under the EduAid-Africa delivery framework.
              </p>
              
              <div className="flex flex-col gap-4 mt-auto">
                <Link 
                  to="/eduaid" 
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center hover:bg-rose-600 transition-colors shadow-xl"
                >
                  <Heart size={14} className="mr-2" /> Donate to Program
                </Link>
                <div className="flex justify-between items-center px-2">
                  <button className="flex items-center text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">
                    Learn More <ExternalLink className="ml-2 w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-[100px] opacity-50"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <HeartHandshake size={64} className="mx-auto text-rose-500 mb-10" />
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 font-display uppercase tracking-tight leading-tight">Propose a New <br/>Strategic Initiative.</h2>
          <p className="text-slate-500 mb-12 text-xl font-medium leading-relaxed">
            Do you have a project that aligns with SCEF's mission? Our divisions provide the technology, compliance, and media coverage needed to bring impact ideas to life.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-blue-600 transition-all shadow-2xl">
              Submit Proposal Bundle
            </button>
            <Link to="/eduaid" className="bg-rose-50 text-rose-600 border border-rose-100 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-rose-600 hover:text-white transition-all">
              Fund Existing Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;