
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, GraduationCap, Heart, Landmark, Shield, MapPin, ArrowRight } from 'lucide-react';

const StartWizard: React.FC = () => {
  const paths = [
    { 
      role: 'Member', 
      icon: <Users size={32} />, 
      color: 'bg-blue-600', 
      desc: 'Join the community and drive impact.', 
      link: '/membership/join' 
    },
    { 
      role: 'Ambassador', 
      icon: <GraduationCap size={32} />, 
      color: 'bg-indigo-600', 
      desc: 'Lead advocacy and mobilize support.', 
      link: '/membership/ambassador/apply' 
    },
    { 
      role: 'Volunteer', 
      icon: <Heart size={32} />, 
      color: 'bg-rose-600', 
      desc: 'Support media, programs, and chapters.', 
      link: '/volunteer/apply' 
    },
    { 
      role: 'Donor', 
      icon: <Landmark size={32} />, 
      color: 'bg-emerald-600', 
      desc: 'Fund scholarships and rebuild schools.', 
      link: '/donate' 
    },
    { 
      role: 'Partner', 
      icon: <Shield size={32} />, 
      color: 'bg-slate-900', 
      desc: 'Institutional CSR and sponsorships.', 
      link: '/csr/apply' 
    },
    { 
      role: 'Chapter Leader', 
      icon: <MapPin size={32} />, 
      color: 'bg-amber-600', 
      desc: 'Launch and lead a local SCEF chapter.', 
      link: '/local-chapters/start/apply' 
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 font-display tracking-tight">Choose Your Path</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Select how you would like to engage with the Santos Creations Educational Foundation ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {paths.map((p) => (
            <Link 
              key={p.role} 
              to={p.link}
              className="group bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className={`${p.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/10`}>
                {p.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">{p.role}</h3>
              <p className="text-sm text-slate-500 mb-10 font-medium leading-relaxed">{p.desc}</p>
              <div className="flex items-center text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] group-hover:text-blue-600 transition-colors">
                Continue <ArrowRight size={14} className="ml-2 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 text-center">
          <p className="text-slate-500 font-bold mb-6">Already have an account?</p>
          <Link to="/dashboard-login" className="inline-flex items-center px-8 py-4 bg-slate-900 text-white font-black rounded-xl text-xs uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-xl">
            Login to Your Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StartWizard;
