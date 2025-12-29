
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, Users, Heart, BookOpen, Calendar, ArrowRight, ShieldCheck, 
  Landmark, Globe, Mail, Zap, Activity, Clapperboard, Award,
  Loader2, CheckCircle2, ChevronRight, Share2, Wallet, Clock
} from 'lucide-react';
import { api } from '../services/api';
import { Chapter, ChapterActivity } from '../types';

const ChapterMicrosite: React.FC = () => {
  const { country, state, city, slug } = useParams<{ country: string, state: string, city: string, slug: string }>();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [activities, setActivities] = useState<ChapterActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.chapters.get(slug || '').then(data => {
      if (data) {
        setChapter(data);
        api.chapters.getActivities(data.id).then(setActivities);
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Loader2 className="animate-spin text-blue-600" size={48} />
    </div>
  );

  if (!chapter) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center p-12 bg-white rounded-[3rem] shadow-2xl max-w-md border border-slate-100">
         <Globe size={64} className="mx-auto text-slate-200 mb-8" />
         <h2 className="text-3xl font-black mb-4 font-display">Chapter Route Not Found</h2>
         <p className="text-slate-500 mb-10 font-medium leading-relaxed">This localized microsite has not been provisioned or is currently under maintenance.</p>
         <button onClick={() => navigate('/local-chapters')} className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest text-[10px]">Return to Hub</button>
      </div>
    </div>
  );

  const tierLabels = {
    online: { label: 'Starter Chapter (Online)', color: 'bg-indigo-50/10 text-indigo-400 border-indigo-500/30' },
    hybrid: { label: 'Real-Time Chapter (Hybrid)', color: 'bg-amber-50/10 text-amber-400 border-amber-500/30' },
    physical: { label: 'Fully Real-Time (Physical)', color: 'bg-emerald-50/10 text-emerald-400 border-emerald-500/30' }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Dynamic Header */}
      <section className="relative py-32 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2400" alt="Chapter" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
           <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border mb-10 ${tierLabels[chapter.type].color}`}>
                {tierLabels[chapter.type].label}
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-8 font-display uppercase tracking-tight">{chapter.name}</h1>
              <p className="text-xl text-slate-400 mb-12 font-medium flex items-center justify-center">
                 <MapPin size={24} className="text-blue-500 mr-2" />
                 {chapter.city}, {chapter.state}, {chapter.country}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                 <button onClick={() => navigate(`/local-chapters/join?chapterId=${chapter.id}`)} className="px-10 py-5 bg-blue-600 text-white font-black rounded-2xl shadow-2xl uppercase tracking-widest text-xs hover:-translate-y-1 transition-all">Join this Chapter</button>
                 <button onClick={() => navigate(`/eduaid?chapterId=${chapter.id}`)} className="px-10 py-5 bg-white text-slate-900 font-black rounded-2xl uppercase tracking-widest text-xs hover:-translate-y-1 transition-all">Donate to local Impact</button>
                 <button className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all"><Share2 size={20} /></button>
              </div>
           </div>
        </div>
      </section>

      {/* Chapter Overview & Focus */}
      <div className="max-w-7xl mx-auto px-4 py-24">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 space-y-24">
               {/* Impact Mandate */}
               <section>
                  <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-4">Localized Mission</h2>
                  <p className="text-3xl font-black text-slate-900 mb-8 font-display leading-tight italic">
                     "Empowering the {chapter.city} student community through data-driven advocacy and targeted interventions in {chapter.programFocus.join(' & ')}."
                  </p>
               </section>

               {/* Focus Modules */}
               <section>
                  <h2 className="text-3xl font-black mb-10 font-display uppercase tracking-tight">Active Impact Portfolios</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {chapter.programFocus.map(p => (
                        <div key={p} className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
                           <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                              {p.includes('Women') ? <Heart /> : p.includes('Special') ? <Zap /> : <BookOpen />}
                           </div>
                           <h4 className="text-2xl font-black mb-4">{p}</h4>
                           <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8">Dedicated chapter initiatives driving specific educational outcomes for local {p} beneficiaries.</p>
                           <button className="flex items-center text-[10px] font-black uppercase tracking-widest text-blue-600 group-hover:translate-x-1 transition-transform">Focus Analytics &rarr;</button>
                        </div>
                     ))}
                  </div>
               </section>

               {/* Activity Feed */}
               <section>
                  <div className="flex justify-between items-center mb-12">
                     <h2 className="text-3xl font-black font-display uppercase tracking-tight">Impact Reporting</h2>
                     <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">Archive View</button>
                  </div>
                  <div className="space-y-8">
                     {activities.length > 0 ? activities.map(act => (
                        <div key={act.id} className="flex flex-col md:flex-row gap-10 p-10 bg-white border border-slate-100 rounded-[3.5rem] shadow-sm hover:shadow-xl transition-all">
                           <div className="w-full md:w-56 aspect-square bg-slate-100 rounded-[2.5rem] overflow-hidden shrink-0">
                              <img src={`https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400&sig=${act.id}`} className="w-full h-full object-cover" alt="Activity" />
                           </div>
                           <div className="flex-grow py-4">
                              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4 flex items-center">
                                 <Calendar size={12} className="mr-2" /> {new Date(act.date).toLocaleDateString()}
                              </p>
                              <h4 className="text-2xl font-black text-slate-900 mb-6">{act.title}</h4>
                              <p className="text-slate-500 font-medium leading-relaxed mb-10">{act.description}</p>
                              <div className="flex items-center gap-6">
                                 <span className="px-4 py-1 bg-slate-50 rounded-lg text-[9px] font-black text-slate-400 border border-slate-100 uppercase tracking-widest">{act.category}</span>
                                 <button className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:underline">View Media proof</button>
                              </div>
                           </div>
                        </div>
                     )) : (
                       <div className="p-12 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                          <Activity size={48} className="mx-auto text-slate-300 mb-4" />
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No activities documented yet.</p>
                       </div>
                     )}
                  </div>
               </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-12">
               {/* Chapter Tier Badge Card */}
               <div className="p-10 bg-slate-50 border border-slate-100 rounded-[3rem] text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Verification Level</p>
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100">
                     {chapter.verified ? <ShieldCheck size={32} className="text-emerald-500" /> : <Clock size={32} className="text-indigo-400" />}
                  </div>
                  <h4 className="text-xl font-black mb-2">{chapter.verified ? 'Verified Chapter' : 'Starter Chapter'}</h4>
                  <p className="text-xs text-slate-500 font-medium mb-8">This chapter is currently in the {chapter.type} stage of the SCEF upgrade roadmap.</p>
                  {chapter.type === 'online' && (
                     <button onClick={() => navigate('/local-chapters/upgrade')} className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl uppercase tracking-widest text-[9px] hover:bg-blue-600 transition-all">Start Upgrade review</button>
                  )}
               </div>

               {/* Local Leadership */}
               <div className="bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl"></div>
                  <h3 className="text-2xl font-black mb-10 font-display uppercase tracking-tight">Local Leadership</h3>
                  <div className="space-y-8">
                     {[
                       { r: 'Chapter Lead (Interim)', n: 'Verified Lead' },
                       { r: 'Secretary / Admin', n: 'Verified Team' },
                       { r: 'Programs Director', n: 'Impact Volunteer' }
                     ].map((l, i) => (
                       <div key={i} className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                             <Users size={20} className="text-blue-400" />
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-0.5">{l.r}</p>
                             <p className="text-sm font-bold">{l.n}</p>
                          </div>
                       </div>
                     ))}
                  </div>
                  <button className="w-full mt-12 py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center">
                     Contact chapter Team <Mail size={14} className="ml-2" />
                  </button>
               </div>

               {/* Chapter Wallet */}
               <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm">
                  <h3 className="text-2xl font-black mb-8 font-display uppercase tracking-tight">Direct Funding</h3>
                  <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 mb-8 text-center">
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Chapter AGC Ledger</p>
                     <p className="text-4xl font-black text-slate-900">84.2 <span className="text-lg opacity-40 font-display uppercase">AGC</span></p>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mb-10 leading-relaxed text-center italic">"100% of local AGC donations are allocated to verified chapter focus areas."</p>
                  <button onClick={() => navigate(`/eduaid?chapterId=${chapter.id}`)} className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all">Support Local Impact</button>
               </div>

               {/* Media Contribution */}
               <div className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100">
                  <div className="flex items-center space-x-4 mb-8">
                     <Clapperboard className="text-indigo-600" size={28} />
                     <h4 className="text-lg font-black uppercase tracking-tight">Media Hub Sync</h4>
                  </div>
                  <p className="text-xs text-indigo-600/70 font-bold mb-8 leading-relaxed uppercase tracking-widest">Contribute impact stories, photos, and videos to this chapter's public gallery.</p>
                  <button onClick={() => navigate(`/media/submit?chapterId=${chapter.id}`)} className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl uppercase tracking-widest text-[9px] hover:bg-indigo-700 transition-all">Submit Media Asset</button>
               </div>
            </aside>
         </div>
      </div>
    </div>
  );
};

export default ChapterMicrosite;
