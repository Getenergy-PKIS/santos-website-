
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { 
  MapPin, Search, Plus, Filter, Globe, ArrowRight, ShieldCheck, 
  CheckCircle2, Users, Target, Activity, Zap, Building2,
  ChevronRight, Award, Info, Upload, Clock, Heart, BookOpen,
  Layout, FileText, CheckCircle, XCircle
} from 'lucide-react';
import { api } from '../services/api';
import { Chapter, ChapterType, Status } from '../types';
import { PROGRAMS } from '../constants';

const LocalChapters: React.FC = () => {
  const { subpage } = useParams<{ subpage: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    setLoading(true);
    api.chapters.list().then(data => {
      setChapters(data);
      setLoading(false);
    });
  }, []);

  const filteredChapters = chapters.filter(c => 
    (c.name.toLowerCase().includes(search.toLowerCase()) || 
     c.city.toLowerCase().includes(search.toLowerCase()) ||
     c.country.toLowerCase().includes(search.toLowerCase())) &&
    (filterType === 'all' || c.type === filterType)
  );

  const renderHub = () => (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative py-32 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=2400" alt="Map" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
           <div className="inline-flex items-center space-x-2 px-3 py-1 mb-10 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20 text-[10px] font-black uppercase tracking-widest">
              Local Chapter Services (LCS)
           </div>
           <h1 className="text-5xl md:text-8xl font-black mb-8 font-display leading-tight">
              Join, Start, or <br />
              <span className="text-blue-500">Upgrade Chapters.</span>
           </h1>
           <p className="text-xl text-slate-400 mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
              SCEF is membership-run. Start online first to build structure and impact, then convert to verified Hybrid or Physical Chapters.
           </p>
           <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => navigate('/local-chapters/join')} className="px-10 py-5 bg-blue-600 text-white font-black rounded-2xl shadow-2xl uppercase tracking-widest text-xs hover:-translate-y-1 transition-all">Join a Chapter</button>
              <button onClick={() => navigate('/local-chapters/start-online')} className="px-10 py-5 bg-white text-slate-900 font-black rounded-2xl uppercase tracking-widest text-xs hover:-translate-y-1 transition-all">Start Online Chapter</button>
              <button onClick={() => navigate('/local-chapters/upgrade')} className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl uppercase tracking-widest text-xs hover:bg-white/10 transition-all backdrop-blur-md">Request Upgrade Review</button>
           </div>
        </div>
      </section>

      {/* Directory */}
      <section className="py-24 bg-slate-50">
         <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
               <div>
                  <h2 className="text-4xl font-black text-slate-900 mb-4 font-display uppercase tracking-tight">Chapter Directory</h2>
                  <p className="text-slate-500 font-medium italic">Verified SCEF communities across Africa and the diaspora.</p>
               </div>
               <div className="flex flex-wrap gap-2">
                  {['all', 'online', 'hybrid', 'physical'].map(t => (
                    <button 
                      key={t}
                      onClick={() => setFilterType(t)}
                      className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                        filterType === t ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-white border-slate-200 text-slate-400 hover:border-blue-600'
                      }`}
                    >
                      {t === 'all' ? 'All Tiers' : `SCEF ${t.charAt(0).toUpperCase() + t.slice(1)}`}
                    </button>
                  ))}
               </div>
            </div>

            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200/50 flex items-center mb-12">
               <Search className="text-slate-400 mr-4" size={20} />
               <input 
                 type="text" 
                 placeholder="Filter by country, city, or chapter name..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="flex-grow bg-transparent border-none focus:ring-0 font-bold text-sm"
               />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {loading ? (
                 Array.from({length: 6}).map((_, i) => <div key={i} className="h-80 bg-slate-200 rounded-[2.5rem] animate-pulse"></div>)
               ) : filteredChapters.length === 0 ? (
                 <div className="col-span-full py-24 text-center">
                    <Info size={48} className="mx-auto text-slate-300 mb-6" />
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No verified chapters found.</p>
                 </div>
               ) : (
                 filteredChapters.map(c => (
                    <div key={c.id} className="group bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                       <div className="flex justify-between items-start mb-8">
                          <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                             c.type === 'online' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                             c.type === 'hybrid' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                             'bg-emerald-50 text-emerald-600 border-emerald-100'
                          }`}>
                            {c.type === 'online' ? 'Starter' : c.type === 'hybrid' ? 'Real-Time' : 'Fully Real-Time'}
                          </div>
                          {c.verified && <ShieldCheck className="text-blue-500" size={20} />}
                       </div>
                       <h3 className="text-2xl font-black text-slate-900 mb-2 font-display">{c.name}</h3>
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-10 flex items-center">
                          <MapPin size={12} className="mr-1" /> {c.city}, {c.country}
                       </p>
                       <div className="flex items-center space-x-4 mb-10 pt-6 border-t border-slate-50">
                          <Users size={16} className="text-slate-300" />
                          <span className="text-[11px] font-black text-slate-500 uppercase">{c.memberCount} Verified Members</span>
                       </div>
                       <Link 
                         to={`/chapters/${c.country.toLowerCase()}/${c.state.toLowerCase()}/${c.city.toLowerCase()}/${c.slug}`}
                         className="w-full py-4 bg-slate-900 text-white font-black rounded-xl text-[10px] uppercase tracking-widest flex items-center justify-center group-hover:bg-blue-600 transition-colors shadow-xl shadow-slate-900/10"
                       >
                         View Microsite <ArrowRight size={14} className="ml-2" />
                       </Link>
                    </div>
                 ))
               )}
            </div>
         </div>
      </section>

      {/* Evolution Roadmap */}
      <section className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 font-display uppercase">The Path to Real-Time Impact</h2>
               <p className="text-lg text-slate-500 font-medium">Evolutionary growth is hardcoded into the SCEF structure.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { step: '01', title: 'Start Online', desc: 'Auto-provisioned microsite and wallet for community mobilization.', icon: <Globe size={24} /> },
                 { step: '02', title: 'Build Compliance', desc: 'Fill leadership roles, run activities, and record transparent impact.', icon: <Activity size={24} /> },
                 { step: '03', title: 'Go Real-Time', desc: 'Unlock full physical chapter status with HQ verified badge.', icon: <Building2 size={24} /> }
               ].map((item, i) => (
                 <div key={i} className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 relative group">
                    <div className="text-[40px] font-black text-slate-200 absolute top-8 right-8 group-hover:text-blue-100 transition-colors">{item.step}</div>
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-blue-500/20">
                       {item.icon}
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );

  const renderJoin = () => {
    const chapterId = searchParams.get('chapterId');
    const [done, setDone] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleJoin = async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      const fd = new FormData(e.target as HTMLFormElement);
      const interests = fd.getAll('interests') as string[];
      await api.chapters.join(chapterId || 'general', { 
        interests, 
        participationRole: fd.get('participationRole') 
      });
      setSubmitting(false);
      setDone(true);
    };

    if (done) return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-12 rounded-[3.5rem] shadow-2xl text-center">
           <CheckCircle2 size={64} className="mx-auto text-emerald-500 mb-8" />
           <h2 className="text-3xl font-black mb-4">Request Sent!</h2>
           <p className="text-slate-500 mb-10 font-medium">Your join request is now in the chapter's admin queue. You will be notified via email of the outcome.</p>
           <div className="space-y-3">
              <button onClick={() => navigate('/dashboard-login')} className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest text-[10px]">Go to Dashboard</button>
              <button onClick={() => navigate('/local-chapters')} className="w-full py-4 bg-slate-100 text-slate-900 font-black rounded-2xl uppercase tracking-widest text-[10px]">Back to Hub</button>
           </div>
        </div>
      </div>
    );

    return (
      <div className="py-24 bg-slate-50 px-4">
        <div className="max-w-2xl mx-auto bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border border-slate-100">
           <h2 className="text-4xl font-black mb-4 font-display">Join a SCEF Chapter</h2>
           <p className="text-slate-500 mb-12 font-medium">Connect with impact leaders in your specific city.</p>
           <form onSubmit={handleJoin} className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                 <input placeholder="First Name" required className="p-5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm w-full" />
                 <input placeholder="Last Name" required className="p-5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm w-full" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <input placeholder="Country" required className="p-5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm w-full" />
                 <input placeholder="City" required className="p-5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm w-full" />
              </div>
              
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Participation Interest</label>
                <select name="participationRole" required className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm">
                   <option value="Member">General Member</option>
                   <option value="Volunteer">Volunteer</option>
                   <option value="Ambassador">Ambassador</option>
                   <option value="Chapter Team">Chapter Core Team</option>
                </select>
              </div>

              <div>
                 <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Focus Interests</label>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Women & Girls Education', 'Special Needs Education', 'EduAid-Africa', 'NESA-Africa', 'RMSA', 'eLibrary'].map(i => (
                      <label key={i} className="flex items-center p-4 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:border-blue-600 group transition-all">
                         <input type="checkbox" name="interests" value={i} className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-600 mr-3" />
                         <span className="text-xs font-bold text-slate-700 group-hover:text-blue-600">{i}</span>
                      </label>
                    ))}
                 </div>
              </div>

              <button disabled={submitting} className="w-full py-6 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all disabled:opacity-50">
                 {submitting ? 'Submitting Request...' : 'Send Join Request'}
              </button>
           </form>
        </div>
      </div>
    );
  };

  const renderStartOnline = () => {
    const [done, setDone] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleStart = async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      const fd = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(fd.entries());
      await api.chapters.startOnline(data);
      setSubmitting(false);
      setDone(true);
    };

    if (done) return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-12 rounded-[3.5rem] shadow-2xl text-center">
           <Zap size={64} className="mx-auto text-blue-600 mb-8 animate-pulse" />
           <h2 className="text-3xl font-black mb-4">Chapter Provisioned!</h2>
           <p className="text-slate-500 mb-10 font-medium">Your SCEF Online Starter Chapter microsite shell is being deployed. Login to the Chapter Admin console to start onboarding.</p>
           <button onClick={() => navigate('/dashboard/chapter_lead')} className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest text-[10px]">Access Admin Console</button>
        </div>
      </div>
    );

    return (
      <div className="py-24 bg-slate-50 px-4">
        <div className="max-w-4xl mx-auto">
           <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border border-slate-100">
              <div className="flex items-center space-x-6 mb-12">
                 <div className="w-20 h-20 bg-blue-600 text-white rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/20">
                    <Plus size={40} />
                 </div>
                 <div>
                    <h2 className="text-4xl font-black font-display uppercase tracking-tight">Launch Starter Chapter</h2>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">SCEF Online Starter Tier</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                 <div className="space-y-8">
                    <p className="text-slate-500 font-medium leading-relaxed italic">"Start online first to build structure, then upgrade to verified status."</p>
                    <div className="p-8 bg-blue-50 rounded-2xl border border-blue-100">
                       <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-6 flex items-center">
                          <CheckCircle2 size={14} className="mr-3" /> Starter Eligibility
                       </h4>
                       <ul className="space-y-4">
                          {[
                            'Interim Chapter Lead Identified',
                            'Secretary/Admin Role Filled',
                            'One Program Focus Chosen',
                            '30-Day Activity Plan Ready'
                          ].map(role => (
                            <li key={role} className="flex items-center text-xs font-bold text-slate-700">
                               <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                               {role}
                            </li>
                          ))}
                       </ul>
                    </div>
                    <div className="p-6 border border-slate-100 rounded-2xl bg-slate-50 text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-widest">
                       Agreement: By launching this chapter, you agree to the SCEF Charter and Code of Conduct.
                    </div>
                 </div>

                 <form onSubmit={handleStart} className="space-y-6">
                    <input name="chapterName" required placeholder="Proposed Chapter Name" className="p-5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm w-full" />
                    <div className="grid grid-cols-2 gap-4">
                       <input name="country" required placeholder="Country" className="p-5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm w-full" />
                       <input name="city" required placeholder="City" className="p-5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm w-full" />
                    </div>
                    <select name="focus" required className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm">
                       <option value="">Choose Initial Program Focus</option>
                       <option value="Women & Girls">Women & Girls Education</option>
                       <option value="Special Needs">Special Needs Support</option>
                       <option value="EduAid">EduAid Relief</option>
                       <option value="RMSA">School Rebuilding</option>
                    </select>
                    <textarea name="kickoff" required rows={4} placeholder="Briefly describe your first 30-day activity plan..." className="p-5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm w-full" />
                    <button disabled={submitting} className="w-full py-6 bg-slate-900 text-white font-black rounded-2xl uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all shadow-xl">
                       {submitting ? 'Provisioning Micro-Ecosystem...' : 'Confirm & Deploy Chapter'}
                    </button>
                 </form>
              </div>
           </div>
        </div>
      </div>
    );
  };

  const renderUpgrade = () => {
    const [done, setDone] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [step, setStep] = useState(1);

    const handleUpgrade = async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      await api.chapters.requestUpgrade('ch_2', { 
        targetType: 'hybrid', 
        address: '123 Impact Blvd, Hub 4' 
      });
      setSubmitting(false);
      setDone(true);
    };

    if (done) return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-12 rounded-[3.5rem] shadow-2xl text-center">
           <ShieldCheck size={64} className="mx-auto text-blue-600 mb-8" />
           <h2 className="text-3xl font-black mb-4">Request Submitted</h2>
           <p className="text-slate-500 mb-10 font-medium">LCS and HQ admins will review your evidence of impact. You will be notified of the decision within 7 business days.</p>
           <button onClick={() => navigate('/dashboard/chapter_lead')} className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl uppercase tracking-widest text-[10px]">Return to Console</button>
        </div>
      </div>
    );

    return (
      <div className="py-24 bg-slate-50 px-4">
        <div className="max-w-3xl mx-auto bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border border-slate-100">
           <div className="mb-10 text-center">
              <h2 className="text-4xl font-black mb-4 font-display uppercase tracking-tight">Upgrade to Real-Time</h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Convert Starter to Verified Chapter</p>
           </div>
           
           <div className="flex items-center space-x-4 mb-12">
              {[1, 2, 3].map(s => (
                <div key={s} className={`h-1.5 flex-grow rounded-full transition-all ${step >= s ? 'bg-blue-600' : 'bg-slate-100'}`}></div>
              ))}
           </div>

           {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                 <h3 className="text-2xl font-black flex items-center gap-3">
                    <FileText className="text-blue-600" />
                    Eligibility Check
                 </h3>
                 <div className="space-y-4">
                    {[
                      { l: 'Min 5 Leadership Roles Filled', v: true },
                      { l: 'Min 2 Activities Documented', v: true },
                      { l: 'Membership Threshold Met', v: true },
                      { l: 'Wallet Sync Active', v: true },
                      { l: 'Reporting Interface Enabled', v: false }
                    ].map((c, i) => (
                      <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                         <span className="text-sm font-bold text-slate-700">{c.l}</span>
                         {c.v ? <CheckCircle className="text-emerald-500" size={20} /> : <XCircle className="text-rose-500" size={20} />}
                      </div>
                    ))}
                 </div>
                 <button onClick={() => setStep(2)} className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest text-[10px] shadow-xl">Proceed to Application</button>
              </div>
           )}

           {step === 2 && (
              <form onSubmit={handleUpgrade} className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                 <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Choose Target Tier</label>
                    <div className="grid grid-cols-2 gap-4">
                       <button type="button" className="p-6 bg-slate-50 border-2 border-blue-600 rounded-3xl text-center flex flex-col items-center">
                          <Globe size={24} className="mb-3 text-blue-600" />
                          <p className="text-[10px] font-black uppercase tracking-widest">Hybrid (Real-Time)</p>
                       </button>
                       <button type="button" className="p-6 bg-slate-50 border-2 border-transparent rounded-3xl text-center flex flex-col items-center hover:border-slate-200">
                          <Building2 size={24} className="mb-3 text-slate-400" />
                          <p className="text-[10px] font-black uppercase tracking-widest">Physical (Fully Real-Time)</p>
                       </button>
                    </div>
                 </div>
                 <input placeholder="Physical Meeting Hub / Venue Address" required className="p-5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm w-full" />
                 <div className="p-10 border-2 border-dashed border-slate-200 rounded-[2.5rem] text-center hover:bg-slate-50 cursor-pointer group transition-all">
                    <Upload size={32} className="mx-auto text-slate-300 mb-4 group-hover:scale-110 transition-transform" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upload Proofs (Activities, Member List, Charter)</p>
                 </div>
                 <div className="flex gap-4">
                    <button type="button" onClick={() => setStep(1)} className="px-8 py-5 bg-slate-100 text-slate-900 font-black rounded-2xl uppercase tracking-widest text-[10px]">Back</button>
                    <button type="submit" disabled={submitting} className="flex-grow py-5 bg-slate-900 text-white font-black rounded-2xl uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all shadow-2xl">
                       {submitting ? 'Submitting Application...' : 'Send Upgrade Request'}
                    </button>
                 </div>
              </form>
           )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {!subpage && renderHub()}
      {subpage === 'join' && renderJoin()}
      {subpage === 'start-online' && renderStartOnline()}
      {subpage === 'upgrade' && renderUpgrade()}
    </div>
  );
};

export default LocalChapters;
