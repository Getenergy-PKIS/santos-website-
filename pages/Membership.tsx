
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Users, GraduationCap, Heart, CheckCircle2, ArrowRight } from 'lucide-react';
import { firebase } from '../services/firebaseMock';

const Membership: React.FC = () => {
  const { subpage } = useParams<{ subpage: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate data collection
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    await firebase.addDocument(subpage === 'join' ? 'memberships' : 'applications', {
      ...data,
      type: subpage
    });
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-10 rounded-[3rem] shadow-2xl text-center">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4 font-display">Success!</h2>
          <p className="text-slate-500 mb-10 font-medium">Your application has been submitted to the SOBCD for compliance review. You will receive an email shortly.</p>
          <Link to="/dashboard-login" className="block w-full py-4 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest text-xs hover:bg-blue-700 transition-all shadow-xl">
            Login to Status Hub
          </Link>
        </div>
      </div>
    );
  }

  const renderJoinForm = () => (
    <div className="max-w-2xl mx-auto py-24 px-4">
      <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-slate-100">
        <h1 className="text-4xl font-black text-slate-900 mb-4 font-display">Become a Member</h1>
        <p className="text-slate-500 mb-10 font-medium">Join Africa's most transparent education impact ecosystem.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <input name="firstName" placeholder="First Name" required className="p-4 bg-slate-50 border border-slate-200 rounded-xl" />
            <input name="lastName" placeholder="Last Name" required className="p-4 bg-slate-50 border border-slate-200 rounded-xl" />
          </div>
          <input name="email" type="email" placeholder="Email Address" required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl" />
          <input name="whatsapp" placeholder="WhatsApp Number" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl" />
          <div className="grid grid-cols-2 gap-4">
            <input name="country" placeholder="Country" required className="p-4 bg-slate-50 border border-slate-200 rounded-xl" />
            <input name="city" placeholder="City" required className="p-4 bg-slate-50 border border-slate-200 rounded-xl" />
          </div>
          <button disabled={isSubmitting} className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest text-xs hover:bg-blue-700 transition-all shadow-xl disabled:opacity-50">
            {isSubmitting ? 'Registering...' : 'Register as Member'}
          </button>
        </form>
      </div>
    </div>
  );

  const renderLanding = () => (
    <div>
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-8 font-display">Join the Ecosystem</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium mb-12">Choose your level of participation and help us transform African education.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-md">
              <Users className="text-blue-400 mb-6 mx-auto" size={48} />
              <h3 className="text-2xl font-black mb-4">Member</h3>
              <p className="text-sm text-slate-400 mb-10 font-medium">Access community, vote on projects, and participate in chapters.</p>
              <Link to="/membership/join" className="block py-4 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest text-[10px]">Sign Up Now</Link>
            </div>
            <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-md">
              <GraduationCap className="text-indigo-400 mb-6 mx-auto" size={48} />
              <h3 className="text-2xl font-black mb-4">Ambassador</h3>
              <p className="text-sm text-slate-400 mb-10 font-medium">Lead advocacy, mobilize resources, and represent SCEF.</p>
              <Link to="/membership/ambassador/apply" className="block py-4 bg-indigo-600 text-white font-black rounded-2xl uppercase tracking-widest text-[10px]">Apply to Lead</Link>
            </div>
            <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-md">
              <Heart className="text-rose-400 mb-6 mx-auto" size={48} />
              <h3 className="text-2xl font-black mb-4">Volunteer</h3>
              <p className="text-sm text-slate-400 mb-10 font-medium">Give your time and skills to media, tech, or chapters.</p>
              <Link to="/volunteer/apply" className="block py-4 bg-rose-600 text-white font-black rounded-2xl uppercase tracking-widest text-[10px]">Join Squad</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="bg-slate-50">
      {!subpage && renderLanding()}
      {subpage === 'join' && renderJoinForm()}
      {subpage?.includes('apply') && (
        <div className="max-w-2xl mx-auto py-24 px-4">
          <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-slate-100">
            <h1 className="text-4xl font-black text-slate-900 mb-4 font-display capitalize">{subpage.replace('/', ' ').replace('-', ' ')}</h1>
            <p className="text-slate-500 mb-10 font-medium">Help us scale our impact across the continent.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input name="fullName" placeholder="Full Name" required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl" />
              <input name="email" type="email" placeholder="Email Address" required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl" />
              <textarea name="motivation" placeholder="Why do you want to join this role?" required rows={4} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl" />
              <button disabled={isSubmitting} className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-xl disabled:opacity-50">
                {isSubmitting ? 'Sending...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Membership;
