
import React from 'react';
import { Newspaper, ChevronRight, User, Clock } from 'lucide-react';

const Blog: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-slate-50 py-32 text-center border-b border-slate-200">
         <div className="max-w-4xl mx-auto px-4">
            <Newspaper className="mx-auto mb-8 text-slate-900" size={48} />
            <h1 className="text-5xl md:text-7xl font-black mb-8 font-display">News & Stories.</h1>
            <p className="text-xl text-slate-500 font-medium">Updates from the HQ, chapters, and the heart of our mission.</p>
         </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-24">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3, 4, 5, 6].map(i => (
               <article key={i} className="group cursor-pointer">
                  <div className="aspect-video bg-slate-100 rounded-[2.5rem] mb-8 overflow-hidden">
                     <img src={`https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200&sig=${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="News" />
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                     <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-lg">Impact Stories</span>
                     <div className="flex items-center text-xs text-slate-400 font-bold"><Clock size={12} className="mr-1" /> Dec 2024</div>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">How local chapters are rebuilding schools in Northern Ghana</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 line-clamp-2">The EduAid-Africa program recently completed its 15th school renovation project in the Savanna region, impacting over 4,000 students...</p>
                  <button className="flex items-center text-[10px] font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform">Read Story <ChevronRight size={14} className="ml-1" /></button>
               </article>
            ))}
         </div>
      </div>
    </div>
  );
};

export default Blog;
