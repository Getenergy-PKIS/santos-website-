
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Settings, LogOut, Bell, Search, 
  Zap, Landmark, MapPin, Heart, CheckCircle, XCircle, Clock,
  FileText, ShieldCheck, Activity, ChevronRight, BarChart3,
  Globe, TrendingUp, Filter, Plus, UserPlus, Image as ImageIcon,
  Loader2, Mail, Clapperboard, Share2, Wallet, CheckCircle2
} from 'lucide-react';
import { api } from '../services/api';
import { User, AuditLog, Chapter, ChapterJoinRequest, ChapterUpgradeRequest, ChapterActivity } from '../types';

const Dashboards: React.FC = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [queue, setQueue] = useState<any[]>([]);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [chapterData, setChapterData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('Overview');

  useEffect(() => {
    const currentUser = api.auth.me();
    setUser(currentUser);
    refreshData();
  }, [role]);

  const refreshData = async () => {
    setLoading(true);
    if (role === 'super_admin' || role === 'admin') {
      const queueData = await api.admin.getQueue(activeTab.toLowerCase());
      const logData = await api.admin.getLogs();
      setQueue(queueData);
      setLogs(logData);
    } else if (role === 'chapter_lead') {
      // Mock loading chapter data for current user (usually lead for specific chapter)
      const data = await api.chapters.getDashboard('ch_2');
      setChapterData(data);
    }
    setLoading(false);
  };

  const handleAction = async (item: any, type: string, action: 'approve' | 'reject') => {
    await api.admin.processAction(type, item.id, action);
    refreshData();
  };

  const renderChapterAdmin = () => {
    if (!chapterData) return null;
    const { chapter, requests, activities, upgrade } = chapterData;

    const tabs = ['Overview', 'Membership', 'Leadership', 'Activities', 'Fundraising', 'Media', 'Upgrade'];

    return (
      <div className="p-8 lg:p-12 overflow-y-auto">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
               <div className="flex items-center gap-3 mb-2">
                 <h1 className="text-4xl font-black text-slate-900 font-display uppercase tracking-tight">{chapter.name} Console</h1>
               </div>
               <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                    chapter.type === 'online' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                  }`}>
                    Tier: {chapter.type === 'online' ? 'Starter' : 'Verified Real-Time'}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{chapter.city}, {chapter.country}</span>
               </div>
            </div>
            <div className="flex space-x-3">
               <button onClick={() => navigate(`/chapters/${chapter.country.toLowerCase()}/${chapter.state.toLowerCase()}/${chapter.city.toLowerCase()}/${chapter.slug}`)} className="px-6 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-sm hover:shadow-md transition-all flex items-center gap-2">
                 <Globe size={14} className="text-blue-600" /> View Microsite
               </button>
               <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-blue-600 transition-all">Quick Report</button>
            </div>
         </div>

         {/* Navigation Tabs */}
         <div className="flex flex-wrap border-b border-slate-100 mb-12">
            {tabs.map(t => (
              <button 
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-8 py-5 text-[10px] font-black uppercase tracking-widest transition-all relative ${
                  activeTab === t ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {t}
                {activeTab === t && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-full"></div>}
              </button>
            ))}
         </div>

         {activeTab === 'Overview' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { l: 'Verified Members', v: chapter.memberCount, i: <Users />, c: 'text-blue-600' },
                    { l: 'GFA Wallet Balance', v: '84.2 AGC', i: <Wallet />, c: 'text-emerald-600' },
                    { l: 'Pending Join Requests', v: requests.length, i: <UserPlus />, c: 'text-amber-600' },
                    { l: 'Impact Activities', v: activities.length, i: <Activity />, c: 'text-rose-600' }
                  ].map(s => (
                    <div key={s.l} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:border-blue-100 transition-all">
                       <div className={`w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${s.c}`}>
                          {s.i}
                       </div>
                       <p className="text-3xl font-black text-slate-900 mb-1">{s.v}</p>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{s.l}</p>
                    </div>
                  ))}
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                     <h3 className="text-xl font-black mb-8 uppercase tracking-tight">Recent Compliance Checklist</h3>
                     <div className="space-y-5">
                        {[
                          { l: 'Interim Leadership Roles', v: true },
                          { l: 'Activity Evidence Submitted', v: true },
                          { l: 'Quarterly Audit Report', v: false },
                          { l: 'Chapter Wallet Verification', v: true }
                        ].map((c, i) => (
                           <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl">
                              <span className="text-xs font-bold text-slate-600">{c.l}</span>
                              {c.v ? <CheckCircle size={18} className="text-emerald-500" /> : <Clock size={18} className="text-slate-300" />}
                           </div>
                        ))}
                     </div>
                  </div>
                  <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl"></div>
                     <h3 className="text-xl font-black mb-6 uppercase tracking-tight">Upgrade Review Status</h3>
                     {upgrade ? (
                       <div className="space-y-8">
                          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl text-center">
                             <Clock size={40} className="mx-auto text-amber-400 mb-4 animate-pulse" />
                             <p className="text-lg font-black mb-1">Upgrade Review Pending</p>
                             <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Submitted on {new Date(upgrade.createdAt).toLocaleDateString()}</p>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed italic uppercase tracking-widest text-center">"Your evidence of real-time activity is currently being audited by LCS and HQ divisions."</p>
                       </div>
                     ) : (
                       <div className="space-y-8">
                          <p className="text-slate-400 font-medium leading-relaxed">Your chapter is currently at the <b>Starter</b> level. Complete the compliance checklist to unlock verified status.</p>
                          <button onClick={() => setActiveTab('Upgrade')} className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 uppercase tracking-widest text-xs hover:bg-blue-700 transition-all">Unlock Upgrade Wizard</button>
                       </div>
                     )}
                  </div>
               </div>
            </div>
         )}

         {activeTab === 'Membership' && (
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden animate-in fade-in">
               <div className="p-10 border-b border-slate-50 flex justify-between items-center">
                  <h3 className="text-2xl font-black uppercase tracking-tight">Join Requests</h3>
                  <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Bulk Actions</button>
               </div>
               <div className="p-10">
                  {requests.length === 0 ? (
                    <div className="py-20 text-center"><p className="text-slate-400 font-black uppercase text-[10px]">No pending join requests.</p></div>
                  ) : (
                    <div className="space-y-4">
                       {requests.map((r: any) => (
                          <div key={r.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:border-blue-100 transition-all group">
                             <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors shadow-sm">
                                   <Users size={24} />
                                </div>
                                <div>
                                   <p className="text-sm font-black text-slate-900">User ID: {r.userId}</p>
                                   <div className="flex gap-2 mt-2">
                                      {r.interests.map((i: string) => <span key={i} className="px-2 py-0.5 bg-white border border-slate-100 rounded-md text-[8px] font-bold text-slate-400 uppercase tracking-widest">{i}</span>)}
                                   </div>
                                </div>
                             </div>
                             <div className="flex gap-2">
                                <button className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-black text-[9px] uppercase hover:bg-emerald-600 transition-all">Approve</button>
                                <button className="px-6 py-3 bg-rose-50 text-rose-500 rounded-xl font-black text-[9px] uppercase hover:bg-rose-500 hover:text-white transition-all">Decline</button>
                             </div>
                          </div>
                       ))}
                    </div>
                  )}
               </div>
            </div>
         )}

         {activeTab === 'Activities' && (
            <div className="space-y-8 animate-in fade-in">
               <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-black uppercase tracking-tight">Documented Activities</h3>
                  <button className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center gap-2">
                     <Plus size={16} /> New Activity Report
                  </button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {activities.map((a: any) => (
                     <div key={a.id} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col group hover:shadow-xl transition-all">
                        <div className="flex items-center justify-between mb-8">
                           <div className="w-12 h-12 bg-slate-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                              <ImageIcon size={24} />
                           </div>
                           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{new Date(a.date).toLocaleDateString()}</span>
                        </div>
                        <h4 className="text-xl font-black text-slate-900 mb-2">{a.title}</h4>
                        <p className="text-sm text-slate-500 font-medium mb-8 flex-grow">{a.description}</p>
                        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                           <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[8px] font-black uppercase tracking-widest">{a.category}</span>
                           <button className="text-[10px] font-black text-slate-400 uppercase hover:text-blue-600 transition-colors">Edit Evidence &rarr;</button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         )}

         {activeTab === 'Upgrade' && (
            <div className="max-w-4xl mx-auto py-12 animate-in fade-in slide-in-from-bottom-8">
               <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border border-slate-100 text-center">
                  <ShieldCheck size={80} className="mx-auto text-blue-600 mb-10" />
                  <h2 className="text-4xl font-black mb-6 font-display uppercase tracking-tight">Launch Upgrade Review</h2>
                  <p className="text-lg text-slate-500 font-medium mb-12 leading-relaxed">
                     Ready to convert into a verified Real-Time Chapter? The upgrade wizard will guide you through evidence collection for your target tier (Hybrid or Physical).
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 text-left">
                     <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-4">Hybrid Tier Requirement</p>
                        <ul className="space-y-4 text-xs font-bold text-slate-600">
                           <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-emerald-500" /> Digital Hub Verified</li>
                           <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-emerald-500" /> Min 50 Members</li>
                           <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-emerald-500" /> Quarterly Meetings</li>
                        </ul>
                     </div>
                     <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                        <p className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] mb-4">Physical Tier Requirement</p>
                        <ul className="space-y-4 text-xs font-bold text-slate-600">
                           <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-emerald-500" /> Physical Hub Office</li>
                           <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-emerald-500" /> Min 100 Members</li>
                           <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-emerald-500" /> Monthly Workshops</li>
                        </ul>
                     </div>
                  </div>
                  <button onClick={() => navigate('/local-chapters/upgrade')} className="px-12 py-6 bg-slate-900 text-white font-black rounded-3xl uppercase tracking-widest text-xs shadow-2xl hover:bg-blue-600 transition-all">Start Upgrade Application</button>
               </div>
            </div>
         )}
      </div>
    );
  };

  const renderHQAdmin = () => (
    <div className="p-8 lg:p-12 overflow-y-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
         <div>
            <h1 className="text-4xl font-black text-slate-900 mb-2 font-display uppercase tracking-tight">HQ Review Console</h1>
            <p className="text-slate-500 font-medium italic">Verify and audit ecosystem growth via chapters and upgrades.</p>
         </div>
         <div className="flex space-x-2 bg-white p-1 rounded-xl border border-slate-100 shadow-sm">
            {['Chapters', 'Upgrades', 'Media'].map(t => (
              <button 
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === t ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {t} Queue
              </button>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-6">
           {loading ? (
             <div className="py-24 text-center"><Loader2 className="animate-spin text-blue-600 mx-auto" size={48} /></div>
           ) : queue.length === 0 ? (
             <div className="py-32 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                <CheckCircle size={64} className="mx-auto text-emerald-300 mb-6" />
                <p className="text-slate-400 font-black text-xs uppercase tracking-[0.2em]">Queue Fully Cleared</p>
             </div>
           ) : (
             queue.map(item => (
               <div key={item.id} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-blue-100 transition-all">
                  <div className="flex items-center space-x-8">
                     <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                        {activeTab === 'Chapters' ? <Globe size={28} /> : activeTab === 'Upgrades' ? <TrendingUp size={28} /> : <Clapperboard size={28} />}
                     </div>
                     <div>
                        <h4 className="text-xl font-black text-slate-900">{activeTab === 'Chapters' ? item.name : `Upgrade ID: ${item.id.slice(0, 8)}`}</h4>
                        <div className="flex items-center space-x-4 text-[10px] font-bold text-slate-400 uppercase mt-2 tracking-widest">
                           <span className="flex items-center gap-1"><MapPin size={10} /> {item.city}, {item.country}</span>
                           <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                           <span className="flex items-center gap-1"><Clock size={10} /> {new Date(item.createdAt).toLocaleDateString()}</span>
                        </div>
                     </div>
                  </div>
                  <div className="flex gap-3">
                     <button onClick={() => handleAction(item, activeTab === 'Chapters' ? 'chapter' : 'upgrade', 'approve')} className="px-8 py-3 bg-emerald-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20">Approve</button>
                     <button onClick={() => handleAction(item, activeTab === 'Chapters' ? 'chapter' : 'upgrade', 'reject')} className="px-8 py-3 bg-rose-50 text-rose-500 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all">Reject</button>
                  </div>
               </div>
             ))
           )}
        </div>
        <div className="lg:col-span-4">
           <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl"></div>
              <h3 className="text-xl font-black mb-10 font-display uppercase tracking-tight flex items-center gap-3">
                 <ShieldCheck className="text-blue-400" /> Admin Audit
              </h3>
              <div className="space-y-8">
                 {logs.slice(0, 8).map(log => (
                    <div key={log.id} className="pb-6 border-b border-white/5 last:border-0 relative">
                       <p className="text-xs font-black capitalize text-slate-400 tracking-wide">{log.action}d {log.entityType}</p>
                       <p className="text-[10px] font-bold text-blue-400 mt-2 tracking-widest">{new Date(log.timestamp).toLocaleTimeString()}</p>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Common */}
      <aside className="w-80 bg-slate-950 text-white flex flex-col hidden lg:flex shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="p-10 border-b border-white/5">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-xl shadow-blue-500/20"><Zap size={20} /></div>
            <span className="text-2xl font-black tracking-tight uppercase">SCEF <span className="text-blue-500">HQ</span></span>
          </div>
        </div>
        
        <nav className="flex-grow p-8 space-y-2">
          <button className="w-full flex items-center space-x-4 p-4 rounded-2xl bg-blue-600 text-white font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-blue-500/20 transition-all">
            <LayoutDashboard size={18} /><span>Console Home</span>
          </button>
          
          <button className="w-full flex items-center space-x-4 p-4 rounded-2xl hover:bg-white/5 text-slate-400 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">
            <Activity size={18} /><span>Impact Ledger</span>
          </button>

          <button className="w-full flex items-center space-x-4 p-4 rounded-2xl hover:bg-white/5 text-slate-400 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">
            <Bell size={18} /><span>Global Alerts</span>
          </button>

          <button className="w-full flex items-center space-x-4 p-4 rounded-2xl hover:bg-white/5 text-slate-400 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">
            <Settings size={18} /><span>System Config</span>
          </button>

          <Link to="/dashboard-login" onClick={() => api.auth.logout()} className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-rose-600/10 text-rose-500 font-black uppercase tracking-widest text-[10px] transition-all mt-auto pt-24">
            <LogOut size={18} /><span>Secure Logout</span>
          </Link>
        </nav>
      </aside>

      <main className="flex-grow flex flex-col min-w-0 h-screen overflow-y-auto bg-slate-50">
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-20">
          <div className="flex items-center flex-grow max-w-xl">
             <div className="relative w-full group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-blue-500 transition-colors" size={18} />
                <input type="text" placeholder="Search ecosystem data..." className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all shadow-inner" />
             </div>
          </div>
          <div className="flex items-center space-x-6">
            <button className="p-3.5 bg-slate-50 rounded-2xl text-slate-400 hover:text-blue-600 relative transition-all border border-slate-100">
               <Bell size={22} />
               <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black capitalize border-4 border-white shadow-xl shadow-slate-200">{role?.[0]}</div>
          </div>
        </header>

        {(role === 'super_admin' || role === 'admin') && renderHQAdmin()}
        {role === 'chapter_lead' && renderChapterAdmin()}
      </main>
    </div>
  );
};

export default Dashboards;
