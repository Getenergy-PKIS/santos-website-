
import React from 'react';
import { Heart, Scale, Zap, Clapperboard, Globe, Send } from 'lucide-react';

const Volunteer: React.FC = () => {
  const tracks = [
    { title: 'Media Volunteer', icon: <Clapperboard />, desc: 'Join the Santos Media team to tell stories of impact.' },
    { title: 'NESA Judge', icon: <Scale />, desc: 'Review award nominations and ensure academic rigor.' },
    { title: 'Chapter Volunteer', icon: <Globe />, desc: 'On-ground support for local chapter educational programs.' },
    { title: 'Tech Squad', icon: <Zap />, desc: 'Support TDSD with platform maintenance and exam tools.' }
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="py-24 bg-rose-600 text-white text-center">
         <div className="max-w-4xl mx-auto px-4">
            <Heart className="mx-auto mb-8" size={64} />
            <h1 className="text-5xl md:text-7xl font-black mb-8 font-display">Join the Squad.</h1>
            <p className="text-xl text-rose-100 font-medium">Give your time and expertise to scale education impact across Africa.</p>
         </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-24">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {tracks.map(t => (
               <div key={t.title} className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:border-rose-600 transition-all group">
                  <div className="w-16 h-16 bg-white text-rose-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-rose-600 group-hover:text-white transition-all">
                     {t.icon}
                  </div>
                  <h3 className="text-xl font-black mb-4">{t.title}</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{t.desc}</p>
               </div>
            ))}
         </div>

         <div className="max-w-3xl mx-auto bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border border-slate-100">
            <h2 className="text-3xl font-black mb-8 font-display text-center">Squad Application</h2>
            <form className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input placeholder="Full Name" className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm w-full" />
                  <select className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm w-full">
                     <option>Select Track</option>
                     {tracks.map(t => <option key={t.title}>{t.title}</option>)}
                  </select>
               </div>
               <textarea rows={4} placeholder="Summarize your experience and skills..." className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm w-full" />
               <button className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl uppercase tracking-widest text-xs flex items-center justify-center">
                  <Send size={16} className="mr-3" /> Submit Application
               </button>
            </form>
         </div>
      </div>
    </div>
  );
};

export default Volunteer;
