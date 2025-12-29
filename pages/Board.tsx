
import React, { useState, useEffect } from 'react';
import { Shield, Users, Landmark, Award, ChevronRight, Mail, Linkedin } from 'lucide-react';
import { api } from '../services/api';
import { BoardMember } from '../types';

const Board: React.FC = () => {
  const [members, setMembers] = useState<BoardMember[]>([]);
  const [activeGroup, setActiveGroup] = useState<string>('BOT');

  useEffect(() => {
    api.board.get().then(setMembers);
  }, []);

  const groups = [
    { id: 'BOT', label: 'Board of Trustees', icon: <Landmark size={20} /> },
    { id: 'BOA', label: 'Board of Advisors', icon: <Users size={20} /> },
    { id: 'BOD', label: 'Board of Directors', icon: <Shield size={20} /> },
    { id: 'Management', label: 'Executive Management', icon: <Award size={20} /> }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-slate-950 py-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2400" alt="Governance" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
           <h1 className="text-5xl md:text-7xl font-black mb-8 font-display">Governance <span className="text-blue-500">& Leadership.</span></h1>
           <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">The intellectual and moral bedrock of the Santos Creations Educational Foundation.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-24">
         <div className="flex flex-col lg:flex-row gap-16">
            <aside className="lg:w-72 shrink-0">
               <div className="space-y-2 sticky top-28">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 px-4">Hierarchy</p>
                  {groups.map(g => (
                    <button 
                      key={g.id}
                      onClick={() => setActiveGroup(g.id)}
                      className={`w-full flex items-center space-x-4 p-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeGroup === g.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'text-slate-500 hover:bg-white hover:text-blue-600'}`}
                    >
                       {g.icon} <span>{g.label}</span>
                    </button>
                  ))}
               </div>
            </aside>

            <div className="flex-grow">
               <div className="mb-16">
                  <h2 className="text-4xl font-black text-slate-900 mb-4 font-display">{groups.find(g => g.id === activeGroup)?.label}</h2>
                  <p className="text-slate-500 font-medium">Strategic oversight and institutional accountability group.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {members.filter(m => m.role === activeGroup || activeGroup === 'All').map(m => (
                    <div key={m.id} className="bg-white p-10 rounded-[3.5rem] border border-slate-100 hover:shadow-2xl transition-all duration-500 group flex flex-col md:flex-row gap-8 items-center">
                       <div className="w-32 h-32 rounded-full bg-slate-200 overflow-hidden shrink-0 border-4 border-slate-50 group-hover:border-blue-600 transition-colors">
                          <img src={m.photoUrl || `https://i.pravatar.cc/200?u=${m.id}`} className="w-full h-full object-cover" alt={m.name} />
                       </div>
                       <div className="text-center md:text-left flex-grow">
                          <h3 className="text-2xl font-black text-slate-900 mb-1">{m.name}</h3>
                          <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-4">{m.title}</p>
                          <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-3 mb-6">{m.bio}</p>
                          <div className="flex items-center space-x-4 justify-center md:justify-start">
                             <a href="#" className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all"><Mail size={14} /></a>
                             <a href="#" className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all"><Linkedin size={14} /></a>
                             <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 flex items-center ml-auto">View Full Bio <ChevronRight size={14} className="ml-1" /></button>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      <section className="py-24 bg-white border-t border-slate-100">
         <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-black mb-8 font-display">Governance Transparency</h2>
            <p className="text-lg text-slate-500 mb-12 max-w-3xl mx-auto">All board members are subject to the SCEF SOBCD compliance framework, ensuring total institutional integrity and accountability.</p>
            <div className="flex flex-wrap justify-center gap-12 grayscale opacity-40">
               <span className="font-black uppercase tracking-widest text-slate-500">GDPR Compliant</span>
               <span className="font-black uppercase tracking-widest text-slate-500">ISO 9001:2015</span>
               <span className="font-black uppercase tracking-widest text-slate-500">Verified Board</span>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Board;
