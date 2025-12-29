
import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Download, Clock, PlayCircle, FileText, CheckCircle, Brain, Filter, ChevronRight } from 'lucide-react';
import { api } from '../services/api';
import { LibraryResource, Exam } from '../types';

const Library: React.FC = () => {
  const [resources, setResources] = useState<LibraryResource[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [activeTab, setActiveTab] = useState<'books' | 'exams'>('books');
  const [currentExam, setCurrentExam] = useState<Exam | null>(null);

  useEffect(() => {
    api.library.list().then(setResources);
    // Mock exams
    setExams([{ id: 'ex_1', title: 'SCEF Governance Quiz', subject: 'Civics', duration: 15, questions: [] }]);
  }, []);

  const handleDownload = async (id: string) => {
    const user = api.auth.me();
    if (!user) return alert("Login to download.");
    const ok = await api.library.download(id, user.uid);
    if (ok) alert("Resource unlocked! 0.5 AGC debited.");
    else alert("Insufficient AGC.");
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <header className="bg-white border-b border-slate-200 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <h1 className="text-4xl md:text-6xl font-black mb-6 font-display">eLibrary & <span className="text-indigo-600">Educational Tools.</span></h1>
           <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">Digital books, curated research, and automated exam portals for the African student.</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-16">
         <div className="flex justify-center mb-16">
            <div className="inline-flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
               <button onClick={() => setActiveTab('books')} className={`px-10 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'books' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400'}`}>Library Grid</button>
               <button onClick={() => setActiveTab('exams')} className={`px-10 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'exams' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400'}`}>Exam Portal</button>
            </div>
         </div>

         {activeTab === 'books' && (
           <div className="space-y-12">
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200/50 flex flex-wrap gap-4 items-center">
                 <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input placeholder="Search 1M+ digital titles..." className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm focus:ring-2 focus:ring-indigo-600" />
                 </div>
                 <button className="px-6 py-4 bg-slate-50 text-slate-600 font-black text-[10px] uppercase rounded-xl border border-slate-200 flex items-center">
                    <Filter size={14} className="mr-2" /> Categories
                 </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                 {resources.map(r => (
                    <div key={r.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:shadow-2xl transition-all duration-500 group">
                       <div className="aspect-[3/4] bg-slate-900 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center">
                          <BookOpen className="text-white/20" size={48} />
                          <div className="absolute top-4 right-4 px-2 py-1 bg-indigo-600 text-white text-[8px] font-black uppercase rounded-md">{r.type}</div>
                       </div>
                       <h3 className="text-lg font-black text-slate-900 mb-1">{r.title}</h3>
                       <p className="text-xs font-bold text-slate-400 mb-6">{r.author}</p>
                       <button 
                         onClick={() => handleDownload(r.id)}
                         className="w-full py-4 bg-slate-50 text-slate-900 font-black rounded-xl text-[9px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center"
                       >
                          <Download size={14} className="mr-2" /> Unlock (0.5 AGC)
                       </button>
                    </div>
                 ))}
              </div>
           </div>
         )}

         {activeTab === 'exams' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {exams.map(ex => (
                  <div key={ex.id} className="bg-indigo-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                     <div className="relative z-10">
                        <Brain className="text-indigo-400 mb-8" size={40} />
                        <h3 className="text-2xl font-black mb-2">{ex.title}</h3>
                        <p className="text-indigo-200 text-sm font-bold uppercase tracking-widest mb-10">{ex.subject} • {ex.duration}m</p>
                        
                        <div className="space-y-4 mb-12">
                           <div className="flex items-center text-xs font-bold"><CheckCircle size={16} className="mr-3 text-emerald-400" /> Instant Scoring</div>
                           <div className="flex items-center text-xs font-bold"><CheckCircle size={16} className="mr-3 text-emerald-400" /> Verified Certificate</div>
                        </div>

                        <button 
                          onClick={() => setCurrentExam(ex)}
                          className="w-full py-5 bg-white text-indigo-900 font-black rounded-2xl uppercase tracking-widest text-[10px] hover:bg-indigo-400 hover:text-white transition-all"
                        >
                           Start Assessment
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </div>

      {currentExam && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col">
           <header className="h-20 border-b border-slate-100 flex items-center justify-between px-8">
              <div className="font-black text-xl">{currentExam.title}</div>
              <div className="flex items-center space-x-6">
                 <div className="flex items-center text-rose-500 font-black"><Clock size={18} className="mr-2" /> 29:59</div>
                 <button onClick={() => setCurrentExam(null)} className="px-6 py-2 bg-slate-900 text-white text-[10px] font-black rounded-lg uppercase tracking-widest">End Session</button>
              </div>
           </header>
           <main className="flex-grow flex items-center justify-center p-8 bg-slate-50">
              <div className="max-w-3xl w-full bg-white p-16 rounded-[4rem] shadow-2xl border border-slate-100">
                 <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-6">Question 1 of 20</p>
                 <h2 className="text-3xl font-black text-slate-900 mb-12 font-display">Who acts as the official governance auditor for SCEF local chapters?</h2>
                 <div className="grid grid-cols-1 gap-4">
                    {["SOBCD Division", "Chapter Lead", "Members Board", "LCS Desk"].map((opt, i) => (
                       <button key={i} className="w-full p-6 text-left bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 hover:border-indigo-600 hover:bg-indigo-50 transition-all flex items-center justify-between group">
                          {opt}
                          <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-indigo-600"></div>
                       </button>
                    ))}
                 </div>
                 <div className="mt-12 flex justify-between">
                    <button className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Skip Question</button>
                    <button className="px-10 py-4 bg-indigo-600 text-white font-black rounded-xl text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-500/20">Next Question <ChevronRight size={14} className="inline ml-2" /></button>
                 </div>
              </div>
           </main>
        </div>
      )}
    </div>
  );
};

export default Library;
