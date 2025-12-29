
import React from 'react';
import { Calendar, Video, Award, ArrowRight, UserPlus } from 'lucide-react';

const Events: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-indigo-900 py-24 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
           <h1 className="text-5xl md:text-7xl font-black mb-8 font-display">Events & Webinars.</h1>
           <p className="text-xl text-indigo-200 max-w-2xl mx-auto font-medium">Join Africa's leading educational dialogues and live expo events.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-24">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
               <h2 className="text-3xl font-black font-display mb-10">Upcoming Schedule</h2>
               {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 flex flex-col md:flex-row gap-8 items-center hover:shadow-xl transition-all group">
                     <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex flex-col items-center justify-center shrink-0 border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <span className="text-[10px] font-black uppercase">Dec</span>
                        <span className="text-3xl font-black">1{i}</span>
                     </div>
                     <div className="flex-grow text-center md:text-left">
                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">Webinar Series</p>
                        <h3 className="text-2xl font-black text-slate-900 mb-4">EduAid-Africa: Scaling Digital Literacy in Rural Hubs</h3>
                        <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
                           <div className="flex items-center text-xs font-bold text-slate-500"><Video size={14} className="mr-2" /> Live on Google Meet</div>
                           <div className="flex items-center text-xs font-bold text-slate-500"><Calendar size={14} className="mr-2" /> 6:00 PM GMT+1</div>
                        </div>
                     </div>
                     <button className="px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-500/20">Register</button>
                  </div>
               ))}
            </div>

            <div>
               <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white sticky top-28">
                  <Award className="text-amber-500 mb-8" size={48} />
                  <h3 className="text-2xl font-black mb-6">Certificate Vault</h3>
                  <p className="text-slate-400 mb-10 text-sm font-medium leading-relaxed">Attended a SCEF event? Claim your verified blockchain-backed participation certificate.</p>
                  <button className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center">
                     Claim Certificate <ArrowRight size={14} className="ml-2" />
                  </button>
                  
                  <div className="mt-12 pt-12 border-t border-white/5">
                     <h4 className="text-sm font-black uppercase tracking-widest text-indigo-400 mb-6">Host an Event</h4>
                     <p className="text-xs text-slate-500 mb-8">Chapter leaders can request platform support for local events.</p>
                     <button className="w-full py-4 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Apply to Host</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Events;
