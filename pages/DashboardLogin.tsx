
import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { LogIn, Shield, Users, MapPin, Heart, Landmark, GraduationCap } from 'lucide-react';
import { api } from '../services/api';
import { UserRole } from '../types';

const DashboardLogin: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('member');
  const requestedRole = searchParams.get('role') as UserRole | null;

  const roles: { id: UserRole; label: string; icon: React.ReactNode }[] = [
    { id: 'member', label: 'Member', icon: <Users size={16} /> },
    { id: 'ambassador', label: 'Ambassador', icon: <GraduationCap size={16} /> },
    { id: 'volunteer', label: 'Volunteer', icon: <Heart size={16} /> },
    // Fix: Updated 'chapter_admin' to 'chapter_lead' to match exported UserRole type
    { id: 'chapter_lead', label: 'Chapter Admin', icon: <MapPin size={16} /> },
    { id: 'donor', label: 'Donor', icon: <Landmark size={16} /> },
    { id: 'admin', label: 'Admin', icon: <Shield size={16} /> },
    { id: 'super_admin', label: 'Super Admin', icon: <Shield size={16} /> },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = await api.auth.login(email, requestedRole || selectedRole);
      navigate(`/dashboard/${user.role}`);
    } catch (err) {
      alert("System connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 py-20 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20">
              <LogIn size={24} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 mb-2 font-display uppercase tracking-tight">SCEF Centra</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Unified Operational Access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Institutional Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@scefafrica.org" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl font-medium" />
            </div>
            
            {!requestedRole && (
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Login Bundle</label>
                <div className="grid grid-cols-2 gap-2">
                  {roles.map(r => (
                    <button key={r.id} type="button" onClick={() => setSelectedRole(r.id)} className={`flex items-center space-x-2 px-4 py-2 border rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${selectedRole === r.id ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-slate-50 border-slate-100 text-slate-500'}`}>
                      {r.icon}<span className="truncate">{r.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button type="submit" disabled={isLoading || !email} className="w-full bg-slate-900 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-blue-600 transition-all disabled:opacity-50">
              {isLoading ? 'Connecting to API Gateway...' : 'Secure Access Login'}
            </button>
          </form>
          <p className="mt-8 text-center text-xs font-bold text-slate-400">Environment: <span className="text-blue-600">v1.0 Production Sandbox</span></p>
        </div>
      </div>
    </div>
  );
};

export default DashboardLogin;
