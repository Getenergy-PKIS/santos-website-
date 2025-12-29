
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LifeBuoy, Zap, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { firebase } from '../services/firebaseMock';

const Support: React.FC = () => {
  const { subpage } = useParams<{ subpage: string }>();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    await firebase.addDocument('supportTickets', {
      ...data,
      type: subpage || 'general',
      status: 'open'
    });
    
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl text-center">
           <CheckCircle2 size={64} className="mx-auto text-emerald-500 mb-8" />
           <h2 className="text-3xl font-black mb-4">Ticket Created</h2>
           <p className="text-slate-500 mb-10">Your request has been logged. Our TDSD team will respond via email within 24-48 hours.</p>
           <button onClick={() => setIsSuccess(false)} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs">Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-24 px-4">
       <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
             <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 font-display">Support Desk</h1>
             <p className="text-xl text-slate-500 font-medium">How can we help you navigate the SCEF ecosystem?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
             <Link to="/support/technical" className={`p-10 rounded-[2.5rem] border transition-all flex flex-col items-center text-center ${
               subpage === 'technical' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-100 hover:border-blue-600 group'
             }`}>
                <Zap className={`mb-6 ${subpage === 'technical' ? 'text-white' : 'text-blue-600 group-hover:scale-110 transition-transform'}`} size={32} />
                <h3 className="text-xl font-black mb-2">Technical Issue</h3>
                <p className={`text-sm mb-0 ${subpage === 'technical' ? 'text-blue-100' : 'text-slate-400'}`}>Report bugs, dashboard errors, or wallet connectivity issues.</p>
             </Link>
             <Link to="/support/feature-request" className={`p-10 rounded-[2.5rem] border transition-all flex flex-col items-center text-center ${
               subpage === 'feature-request' ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-slate-100 hover:border-emerald-600 group'
             }`}>
                <MessageSquare className={`mb-6 ${subpage === 'feature-request' ? 'text-white' : 'text-emerald-600 group-hover:scale-110 transition-transform'}`} size={32} />
                <h3 className="text-xl font-black mb-2">Feature Request</h3>
                <p className={`text-sm mb-0 ${subpage === 'feature-request' ? 'text-emerald-100' : 'text-slate-400'}`}>Suggest new tools or programs for the SCEF platform.</p>
             </Link>
          </div>

          <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-slate-100">
             <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Subject</label>
                      <input name="subject" required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl" placeholder="Describe the issue briefly" />
                   </div>
                   <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Priority</label>
                      <select name="priority" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm">
                         <option value="low">Low - Just feedback</option>
                         <option value="medium">Medium - Hurting experience</option>
                         <option value="high">High - Blocking impact</option>
                      </select>
                   </div>
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Detailed Description</label>
                   <textarea name="description" required rows={6} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl" placeholder="Provide as much detail as possible..." />
                </div>
                <button type="submit" className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-xl flex items-center justify-center">
                   <Send size={16} className="mr-2" />
                   Send Support Ticket
                </button>
             </form>
          </div>
       </div>
    </div>
  );
};

export default Support;
