
import React, { useState, useEffect } from 'react';
import { Award as AwardIcon, Vote, UserPlus, ShieldCheck, Trophy, Search, Filter, Loader2 } from 'lucide-react';
import { api } from '../services/api';
import { Award } from '../types';

const Awards: React.FC = () => {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [votingId, setVotingId] = useState<string | null>(null);

  useEffect(() => {
    api.awards.list().then(data => {
      setAwards(data);
      setLoading(false);
    });
  }, []);

  const handleVote = async (id: string) => {
    const user = api.auth.me();
    if (!user) {
      alert("Please login to vote.");
      return;
    }
    setVotingId(id);
    const success = await api.awards.vote(id, user.uid);
    if (success) {
      const updated = await api.awards.list();
      setAwards(updated);
      alert("Vote recorded! 1 AGC has been debited.");
    } else {
      alert("Insufficient AGC balance to vote.");
    }
    setVotingId(null);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-slate-900 py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=2400" alt="Awards" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
           <div className="inline-flex items-center space-x-2 px-3 py-1 mb-8 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20 text-[10px] font-black uppercase tracking-widest">
              NESA Africa Program
           </div>
           <h1 className="text-5xl md:text-7xl font-black mb-8 font-display">NESA-Africa <span className="text-blue-500">Awards.</span></h1>
           <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-medium">Recognizing excellence in educational leadership, innovation, and community impact across Africa.</p>
           <div className="flex flex-wrap justify-center gap-4">
              <button className="px-10 py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 uppercase tracking-widest text-xs">Nominate Now</button>
              <button className="px-10 py-5 bg-white/5 text-white font-black rounded-2xl border border-white/10 uppercase tracking-widest text-xs backdrop-blur-md">View Categories</button>
           </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-24">
         <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/3">
               <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 sticky top-28">
                  <h3 className="text-xl font-black mb-6">Voting Rules</h3>
                  <ul className="space-y-4 mb-8">
                     {[
                       "Verified SCEF members only",
                       "1 Vote = 1 AGC Coin contribution",
                       "Max 10 votes per category",
                       "All votes are ledger-verified"
                     ].map((rule, i) => (
                       <li key={i} className="flex items-start text-sm font-bold text-slate-600">
                          <ShieldCheck size={16} className="mr-3 text-blue-500 shrink-0 mt-0.5" />
                          {rule}
                       </li>
                     ))}
                  </ul>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                     <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Your Power</p>
                     <p className="text-2xl font-black text-slate-900">100 AGC</p>
                     <button className="mt-4 w-full py-3 bg-slate-900 text-white text-[10px] font-black rounded-xl uppercase tracking-widest">Buy AGC & Vote</button>
                  </div>
               </div>
            </div>

            <div className="lg:w-2/3">
               <div className="flex items-center justify-between mb-12">
                  <h2 className="text-3xl font-black font-display">Active Nominations</h2>
                  <div className="flex space-x-2">
                     <button className="p-2 bg-white border border-slate-200 rounded-lg"><Filter size={16} /></button>
                     <button className="p-2 bg-white border border-slate-200 rounded-lg"><Search size={16} /></button>
                  </div>
               </div>

               {loading ? (
                 <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-blue-600" /></div>
               ) : (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {awards.map(aw => (
                       <div key={aw.id} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all">
                             <Trophy size={32} />
                          </div>
                          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">{aw.category}</p>
                          <h3 className="text-2xl font-black text-slate-900 mb-6">{aw.nomineeName}</h3>
                          <div className="h-2 w-full bg-slate-100 rounded-full mb-4 overflow-hidden">
                             <div className="h-full bg-blue-500 rounded-full" style={{width: '65%'}}></div>
                          </div>
                          <div className="flex justify-between items-center mb-10">
                             <span className="text-[10px] font-black text-slate-400 uppercase">Total Votes</span>
                             <span className="text-lg font-black text-slate-900">{aw.votes}</span>
                          </div>
                          <button 
                            disabled={votingId === aw.id}
                            onClick={() => handleVote(aw.id)}
                            className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl uppercase tracking-widest text-[10px] flex items-center justify-center hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10"
                          >
                             {votingId === aw.id ? <Loader2 className="animate-spin" /> : <Vote size={16} className="mr-2" />}
                             Cast AGC Vote
                          </button>
                       </div>
                    ))}
                 </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Awards;
