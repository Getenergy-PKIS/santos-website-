import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Heart, CheckCircle2, ChevronRight, FileText, Send, Calendar, Wallet, HeartHandshake } from 'lucide-react';
import { api } from '../services/api';
import { Scholarship } from '../types';

const EduAid: React.FC = () => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    api.scholarships.list().then(setScholarships);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-emerald-600 py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-white/10 rounded-full blur-[100px]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
           <div className="inline-flex items-center space-x-2 px-3 py-1 mb-8 bg-emerald-700/50 text-emerald-100 rounded-full border border-emerald-500/30 text-[10px] font-black uppercase tracking-widest">
              SCEF Relief & Development Arm
           </div>
           <h1 className="text-5xl md:text-8xl font-black mb-8 font-display tracking-tight leading-[0.9]">EduAid-Africa <br /><span className="text-emerald-950/30">Impact Portal.</span></h1>
           <p className="text-xl text-emerald-50 max-w-2xl mx-auto mb-12 font-medium">Direct educational aid, relief, and scholarships for underprivileged regions. Fund a future or apply for academic support.</p>
           <div className="flex flex-wrap justify-center gap-4">
              <a href="#donate" className="px-10 py-5 bg-white text-emerald-900 font-black rounded-2xl shadow-2xl uppercase tracking-widest text-xs hover:-translate-y-1 transition-all">Support the Mission</a>
              <a href="#grants" className="px-10 py-5 bg-emerald-700 text-white font-black rounded-2xl border border-emerald-500 uppercase tracking-widest text-xs hover:bg-emerald-800 transition-all">Browse Scholarships</a>
           </div>
        </div>
      </section>

      {/* Donation Utility Section */}
      <section id="donate" className="py-24 bg-slate-50 border-b border-slate-200">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto mb-16">
               <HeartHandshake size={48} className="mx-auto text-rose-500 mb-6" />
               <h2 className="text-4xl font-black text-slate-900 mb-6 font-display uppercase tracking-tight">Fund Global Impact</h2>
               <p className="text-lg text-slate-500 font-medium">Your contributions are ledgered via AGC and directly deployed to chapter projects. Choose your preferred support method below.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
               <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 text-left hover:-translate-y-2 transition-transform">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
                     <Send size={24} />
                  </div>
                  <h3 className="text-2xl font-black mb-4">One-Time Fiat Support</h3>
                  <p className="text-sm text-slate-500 mb-10 font-medium leading-relaxed">Direct support via credit card or bank transfer. Impact certificates issued for all donations above $50.</p>
                  <button className="w-full py-4 bg-slate-900 text-white font-black rounded-xl uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all">Launch Payment Gateway</button>
               </div>
               <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 text-left hover:-translate-y-2 transition-transform">
                  <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8">
                     <Wallet size={24} />
                  </div>
                  <h3 className="text-2xl font-black mb-4">AGC Ledger Donation</h3>
                  <p className="text-sm text-slate-500 mb-10 font-medium leading-relaxed">Transparent blockchain-backed donation using Afri Gold Coin. View live delivery ledger entries.</p>
                  <Link to="/wallet" className="block w-full py-4 bg-indigo-600 text-white text-center font-black rounded-xl uppercase tracking-widest text-[10px] hover:bg-indigo-700 transition-all shadow-lg">Donate via GFA Wallet</Link>
               </div>
            </div>
         </div>
      </section>

      <div id="grants" className="max-w-7xl mx-auto px-4 py-32">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
               <h2 className="text-4xl font-black text-slate-900 mb-12 font-display uppercase tracking-tight">Relief Opportunities</h2>
               <div className="space-y-8">
                  {scholarships.map(s => (
                     <div key={s.id} className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
                        <div className="flex justify-between items-start mb-6">
                           <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                              <GraduationCap size={24} />
                           </div>
                           <span className="px-4 py-1 bg-white rounded-full text-[10px] font-black text-emerald-600 border border-emerald-100 uppercase tracking-widest">
                              {s.status}
                           </span>
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 mb-2 font-display">{s.title}</h3>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">{s.program} • {s.amount}</p>
                        <div className="flex flex-wrap gap-2 mb-10">
                           {s.criteria.map(c => (
                              <span key={c} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-500">{c}</span>
                           ))}
                        </div>
                        <button 
                          onClick={() => setShowForm(true)}
                          className="w-full py-5 bg-emerald-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center justify-center shadow-lg"
                        >
                           Launch Grant Application <ChevronRight size={14} className="ml-2" />
                        </button>
                     </div>
                  ))}
               </div>
            </div>

            <div className="relative">
               <div className="bg-slate-900 p-12 md:p-16 rounded-[4rem] text-white shadow-3xl sticky top-28 overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl group-hover:scale-110 transition-transform"></div>
                  <Heart className="text-rose-500 mb-10" size={56} />
                  <h3 className="text-3xl font-black mb-8 font-display uppercase tracking-tight">Institutional CSR Hub</h3>
                  <p className="text-slate-400 mb-12 text-lg font-medium leading-relaxed">We provide a turnkey framework for corporate CSR allocations. Our automated systems handle disbursement, monitoring, and live reporting for large-scale donors.</p>
                  
                  <div className="space-y-6 mb-16">
                     {[
                       "GDPR/NDPR Compliant data handling",
                       "Direct-to-student fund disbursement",
                       "Audit-ready transparency logs",
                       "Professional media storytelling"
                     ].map((item, i) => (
                       <div key={i} className="flex items-center space-x-5">
                          <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center shrink-0">
                             <CheckCircle2 className="text-emerald-500" size={16} />
                          </div>
                          <span className="text-sm font-bold text-slate-300">{item}</span>
                       </div>
                     ))}
                  </div>

                  <Link to="/csr" className="block w-full py-5 bg-white text-slate-900 text-center font-black rounded-2xl uppercase tracking-widest text-xs hover:bg-emerald-500 hover:text-white transition-all shadow-2xl">
                     Access CSR Partner Portal
                  </Link>
               </div>
            </div>
         </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4">
           <div className="bg-white w-full max-w-2xl rounded-[4rem] p-12 md:p-20 shadow-2xl relative animate-in fade-in zoom-in duration-300">
              <button onClick={() => setShowForm(false)} className="absolute top-10 right-10 text-slate-400 hover:text-slate-900 font-black text-sm uppercase tracking-widest transition-colors">Close Portal [X]</button>
              <h2 className="text-4xl font-black mb-4 font-display uppercase tracking-tight">Scholarship Application</h2>
              <p className="text-slate-500 mb-12 font-medium">Provisioning your application bundle for compliance review.</p>
              <form onSubmit={(e) => { e.preventDefault(); alert("Bundle Submitted for Review!"); setShowForm(false); }} className="space-y-8">
                 <div className="grid grid-cols-2 gap-6">
                    <input required placeholder="Legal First Name" className="p-5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm w-full" />
                    <input required placeholder="Legal Last Name" className="p-5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm w-full" />
                 </div>
                 <input type="email" required placeholder="Institutional/Academic Email" className="p-5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm w-full" />
                 <textarea required rows={4} placeholder="Summarize your academic track record and how this grant will scale your personal impact..." className="p-5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm w-full" />
                 <div className="p-10 border-2 border-dashed border-slate-200 rounded-[2.5rem] text-center hover:bg-slate-50 cursor-pointer group transition-all">
                    <FileText className="mx-auto text-slate-300 mb-4 group-hover:scale-110 transition-transform" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upload Academic Dossier (ID & Transcripts)</p>
                 </div>
                 <button type="submit" className="w-full py-6 bg-emerald-600 text-white font-black rounded-2xl uppercase tracking-widest text-xs shadow-xl flex items-center justify-center hover:bg-emerald-700 active:scale-95 transition-all">
                    <Send size={18} className="mr-3" /> Submit Compliance Bundle
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default EduAid;