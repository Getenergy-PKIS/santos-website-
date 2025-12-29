import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, ChevronDown, Sparkles } from 'lucide-react';

interface NavItem {
  name: string;
  path?: string;
  dropdown?: { name: string; path: string }[];
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const navLinks: NavItem[] = [
    { name: 'Home', path: '/' },
    { 
      name: 'About', 
      dropdown: [
        { name: 'Mission & Vision', path: '/about' },
        { name: 'Divisions', path: '/about/divisions' },
        { name: 'Governance', path: '/board' },
        { name: 'Accountability', path: '/about/compliance' }
      ]
    },
    { 
      name: 'Ecosystem', 
      dropdown: [
        { name: 'Local Chapters', path: '/local-chapters' },
        { name: 'Awards (NESA)', path: '/awards' },
        { name: 'EduAid Scholarships', path: '/eduaid' },
        { name: 'GFA Wallet', path: '/wallet' }
      ]
    },
    { 
      name: 'Resources', 
      dropdown: [
        { name: 'eLibrary', path: '/library' },
        { name: 'Exam Portal', path: '/library/exams' },
        { name: 'Media Hub', path: '/media' },
        { name: 'Blog & News', path: '/blog' }
      ]
    },
    { 
      name: 'Engage', 
      dropdown: [
        { name: 'Join Membership', path: '/membership' },
        { name: 'Apply as Volunteer', path: '/volunteer' },
        { name: 'CSR Partnership', path: '/csr' },
        { name: 'Support', path: '/support' }
      ]
    },
    { name: 'Intelligence', path: '/impact-intelligence' }
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50 shadow-sm transition-all duration-300">
      {/* Decorative top bar */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-600 w-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center shrink-0">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-slate-900 leading-none">SCEF</span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-blue-600 font-black mt-0.5">Ecosystem</span>
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative group h-full flex items-center px-4"
                onMouseEnter={() => setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.path ? (
                  <Link to={link.path} className={`text-[10px] font-black uppercase tracking-widest flex items-center transition-all py-2 px-3 rounded-lg ${location.pathname === link.path ? 'text-blue-600 bg-blue-50/50' : 'text-slate-500 hover:text-blue-600 hover:bg-slate-50'}`}>
                    {link.name === 'Intelligence' && (
                      <div className="relative flex items-center mr-2">
                        <Sparkles size={12} className="text-blue-500 animate-pulse" />
                        <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></span>
                      </div>
                    )}
                    {link.name}
                  </Link>
                ) : (
                  <button className="flex items-center space-x-1 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-all py-2 px-3 rounded-lg group-hover:bg-slate-50">
                    <span>{link.name}</span>
                    <ChevronDown size={10} className={`transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                  </button>
                )}

                {link.dropdown && (
                  <div className={`absolute top-[70px] left-0 w-64 bg-white border border-slate-100 shadow-2xl rounded-2xl py-4 transition-all duration-300 origin-top overflow-hidden ${activeDropdown === link.name ? 'opacity-100 scale-y-100 visible translate-y-0' : 'opacity-0 scale-y-95 invisible -translate-y-2'}`}>
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
                    {link.dropdown.map((sub) => (
                      <Link key={sub.path} to={sub.path} className="block px-8 py-3 text-xs font-bold text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-all">
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
             <Link to="/eduaid" className="text-[10px] font-black uppercase tracking-widest text-rose-600 px-4 hover:scale-105 transition-transform">Donate</Link>
             <Link to="/dashboard-login" className="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95">Dashboard</Link>
          </div>

          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 p-6 space-y-6 max-h-[80vh] overflow-y-auto">
           {navLinks.map(l => (
             <div key={l.name} className="space-y-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">{l.name}</p>
                <div className="pl-4 space-y-3">
                   {l.dropdown?.map(sub => <Link key={sub.path} to={sub.path} className="block text-sm font-bold text-slate-800 hover:text-blue-600">{sub.name}</Link>)}
                   {l.path && <Link to={l.path} className="block text-sm font-bold text-slate-800 hover:text-blue-600">{l.name}</Link>}
                </div>
             </div>
           ))}
           <div className="pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
              <Link to="/eduaid" className="text-center py-4 bg-rose-50 text-rose-600 rounded-xl text-[10px] font-black uppercase tracking-widest">Donate</Link>
              <Link to="/dashboard-login" className="text-center py-4 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Login</Link>
           </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;