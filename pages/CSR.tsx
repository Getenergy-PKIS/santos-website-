
import React from 'react';
import { Building2, PieChart, ShieldCheck, FileText, Send, ArrowRight } from 'lucide-react';

const CSR: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-blue-700 py-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=2400" alt="Corporate" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
           <h1 className="text-5xl md:text-7xl font-black mb-8 font-display leading-tight">CSR for Education <br /><span className="text-blue-300">Management.</span></h1>
           <p className="text-xl text-blue-100 max-w-2xl font-medium">Institutional partnerships, corporate grants, and accountable fund management for large-scale education impact.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-24">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
            <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm">
               <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
                  <PieChart size={32} />
               </div>
               <h3 className="text-2xl font-black mb-4">Impact Analytics</h3>
               <p className="text-slate-500 font-medium mb-10 leading-relaxed">Real-time dashboards for corporate sponsors to track their project allocations and ROI.</p>
               <button className="flex items-center text-[10px] font-black uppercase tracking-widest text-blue-600">Download Brochure <ArrowRight size={14} className="ml-2" /></button>
            </div>
            <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm">
               <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
                  <ShieldCheck size={32} />
               </div>
               <h3 className="text-2xl font-black mb-4">SOBCD Compliance</h3>
               <p className="text-slate-500 font-medium mb-10 leading-relaxed">Rigorous governance and policy enforcement ensuring every cent is accounted for.</p>
               <button className="flex items-center text-[10px] font-black uppercase tracking-widest text-blue-600">Audit Reports <ArrowRight size={14} className="ml-2" /></button>
            </div>
            <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm">
               <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
                  <Building2 size={32} />
               </div>
               <h3 className="text-2xl font-black mb-4">Legacy Projects</h3>
               <p className="text-slate-500 font-medium mb-10 leading-relaxed">School rebuilding and classroom naming rights for institutional partners.</p>
               <button className="flex items-center text-[10px] font-black uppercase tracking-widest text-blue-600">Project Map <ArrowRight size={14} className="ml-2" /></button>
            </div>
         </div>

         <div className="bg-slate-900 rounded-[4rem] p-12 md:p-24 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div>
                  <h2 className="text-4xl font-black mb-8 font-display">Become a Corporate Partner</h2>
                  <p className="text-slate-400 mb-12 text-lg font-medium leading-relaxed">Align your brand with education transformation. We provide the infrastructure, you provide the fuel.</p>
                  <div className="grid grid-cols-2 gap-8">
                     <div>
                        <p className="text-3xl font-black text-white">54+</p>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Countries Reached</p>
                     </div>
                     <div>
                        <p className="text-3xl font-black text-white">100%</p>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Compliance Rate</p>
                     </div>
                  </div>
               </div>
               <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-xl">
                  <h4 className="text-xl font-black mb-8">Request Partnership Pack</h4>
                  <form className="space-y-4">
                     <input placeholder="Organization Name" className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl font-bold text-sm" />
                     <input type="email" placeholder="Institutional Email" className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl font-bold text-sm" />
                     <button className="w-full py-6 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest text-[10px] hover:bg-blue-500 transition-all shadow-2xl">Send Request Bundle</button>
                  </form>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default CSR;
