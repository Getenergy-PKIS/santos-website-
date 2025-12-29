import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Wallet, Landmark, Globe, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PROGRAMS } from '../constants';

const Donate: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=2400" alt="Donate" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
           <h1 className="text-5xl md:text-7xl font-black mb-8 font-display">Empower Africa.</h1>
           <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
             Support scholarships, rebuild schools, and drive education advocacy. Every contribution creates a verified impact narrative via EduAid-Africa.
           </p>
           <div className="flex flex-wrap justify-center gap-4">
              <Link to="/eduaid" className="px-10 py-5 bg-blue-600 text-white font-black rounded-2xl shadow-2xl shadow-blue-500/40 uppercase tracking-widest text-xs">Donate to EduAid-Africa</Link>
              <Link to="/eduaid" className="px-10 py-5 bg-white/10 text-white font-black rounded-2xl border border-white/20 backdrop-blur-md uppercase tracking-widest text-xs hover:bg-white/20 transition-all">Support with AGC</Link>
           </div>
        </div>
      </section>

      {/* Donation Options */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 flex flex-col group hover:bg-blue-600 hover:text-white transition-all duration-500">
             <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-white/10">
               <Heart className="text-rose-600 group-hover:text-white" size={32} />
             </div>
             <h3 className="text-2xl font-black mb-4">Direct Funding</h3>
             <p className="text-slate-500 group-hover:text-blue-100 mb-10 leading-relaxed font-medium">Standard fiat donations (USD/NGN) for EduAid relief programs.</p>
             <Link to="/eduaid" className="mt-auto text-[10px] font-black uppercase tracking-widest flex items-center group-hover:text-white">Proceed to EduAid &rarr;</Link>
          </div>
          <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 flex flex-col group hover:bg-emerald-600 hover:text-white transition-all duration-500">
             <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-white/10">
               <Wallet className="text-emerald-600 group-hover:text-white" size={32} />
             </div>
             <h3 className="text-2xl font-black mb-4">AGC Wallet</h3>
             <p className="text-slate-500 group-hover:text-emerald-100 mb-10 leading-relaxed font-medium">Transparent, low-fee donations using Afri Gold Coin via the EduAid-Africa portal.</p>
             <Link to="/eduaid" className="mt-auto text-[10px] font-black uppercase tracking-widest flex items-center group-hover:text-white">Donate via EduAid &rarr;</Link>
          </div>
          <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 flex flex-col group hover:bg-slate-900 hover:text-white transition-all duration-500">
             <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-white/10">
               <Landmark className="text-slate-900 group-hover:text-white" size={32} />
             </div>
             <h3 className="text-2xl font-black mb-4">Legacy Giving</h3>
             <p className="text-slate-500 group-hover:text-slate-400 mb-10 leading-relaxed font-medium">Institutional partnerships, grants, and high-impact corporate sponsorships.</p>
             <Link to="/csr" className="mt-auto text-[10px] font-black uppercase tracking-widest flex items-center group-hover:text-white">Partner with Us &rarr;</Link>
          </div>
        </div>

        {/* Program Specific Grid */}
        <div className="text-center mb-16">
           <h2 className="text-4xl font-black text-slate-900 mb-4 font-display uppercase tracking-tight">Support a Program</h2>
           <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">All program funding is centralized through the EduAid-Africa delivery framework.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {PROGRAMS.map(prog => (
             <div key={prog.name} className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group flex flex-col">
                <div className="mb-6 w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Zap size={18} />
                </div>
                <h4 className="text-lg font-black text-slate-900 mb-2">{prog.name}</h4>
                <p className="text-xs text-slate-400 mb-8 font-bold leading-relaxed flex-grow">Drive specific educational outcomes via EduAid-Africa framework.</p>
                <Link to="/eduaid" className="w-full text-center py-3 bg-slate-50 border border-slate-100 text-slate-900 font-black rounded-xl text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Support via EduAid</Link>
             </div>
           ))}
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
           <CheckCircle2 className="mx-auto h-16 w-16 text-blue-600 mb-8" />
           <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 font-display">Accountable Giving.</h2>
           <p className="text-xl text-slate-500 mb-12 font-medium leading-relaxed">
             SCEF ensures that 100% of your public donations go directly to program delivery via EduAid-Africa. Our administrative costs are covered by our separate corporate endowment and membership dues.
           </p>
           <div className="flex justify-center space-x-12 opacity-50 grayscale">
              <span className="font-black uppercase tracking-widest text-slate-500">AUDITED</span>
              <span className="font-black uppercase tracking-widest text-slate-500">TRANSPARENT</span>
              <span className="font-black uppercase tracking-widest text-slate-500">LEDGER-BACKED</span>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Donate;