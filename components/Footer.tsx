
import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { DIVISIONS, PROGRAMS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Mission */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-8">
              <GraduationCap className="h-8 w-8 text-blue-500" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-white leading-none">SCEF</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-0.5">Santos Creations</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-8 text-slate-400">
              Transforming education through integrated digital ecosystems and media advocacy. A membership-run education impact ecosystem.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"><Twitter size={18} /></a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"><Linkedin size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/membership" className="hover:text-blue-400 transition-colors">Join Membership</Link></li>
              <li><Link to="/local-chapters" className="hover:text-blue-400 transition-colors">Local Chapters</Link></li>
              <li><Link to="/media" className="hover:text-blue-400 transition-colors">Media Hub</Link></li>
              <li><Link to="/csr" className="hover:text-blue-400 transition-colors">Partnerships (CSR)</Link></li>
              <li><Link to="/eduaid" className="hover:text-blue-400 transition-colors font-bold text-blue-400">Donate Now</Link></li>
            </ul>
          </div>

          {/* Resources & Support */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Resources</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/resources/reports" className="hover:text-blue-400 transition-colors">Reports & Research</Link></li>
              <li><Link to="/resources/policies" className="hover:text-blue-400 transition-colors">Policies & Governance</Link></li>
              <li><Link to="/resources/toolkits" className="hover:text-blue-400 transition-colors">Toolkits & Downloads</Link></li>
              <li><Link to="/verify" className="hover:text-blue-400 transition-colors">Certificate Verification</Link></li>
              <li><Link to="/faqs" className="hover:text-blue-400 transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Dashboards */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Dashboards</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/dashboard-login" className="flex items-center hover:text-blue-400 transition-colors"><ArrowRight size={12} className="mr-2" /> Member Portal</Link></li>
              <li><Link to="/dashboard-login?role=ambassador" className="flex items-center hover:text-blue-400 transition-colors"><ArrowRight size={12} className="mr-2" /> Ambassador Hub</Link></li>
              <li><Link to="/dashboard-login?role=volunteer" className="flex items-center hover:text-blue-400 transition-colors"><ArrowRight size={12} className="mr-2" /> Volunteer Hub</Link></li>
              <li><Link to="/dashboard-login?role=chapter-admin" className="flex items-center hover:text-blue-400 transition-colors"><ArrowRight size={12} className="mr-2" /> Chapter Admin</Link></li>
              <li><Link to="/dashboard-login?role=partner" className="flex items-center hover:text-blue-400 transition-colors"><ArrowRight size={12} className="mr-2" /> Partner Portal</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-10 mt-10 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-500 space-y-4 md:space-y-0">
          <p>&copy; {new Date().getFullYear()} Santos Creations Educational Foundation. All rights reserved.</p>
          <div className="flex space-x-8">
            <Link to="/resources/policies" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/resources/policies" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/about/accountability" className="hover:text-white transition-colors">Accountability</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
