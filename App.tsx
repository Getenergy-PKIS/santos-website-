
import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Membership = lazy(() => import('./pages/Membership'));
const LocalChapters = lazy(() => import('./pages/LocalChapters'));
const ChapterMicrosite = lazy(() => import('./pages/ChapterMicrosite'));
const Awards = lazy(() => import('./pages/Awards'));
const EduAid = lazy(() => import('./pages/EduAid'));
const GFAWallet = lazy(() => import('./pages/GFAWallet'));
const Donate = lazy(() => import('./pages/Donate'));
const MediaHub = lazy(() => import('./pages/MediaHub'));
const Library = lazy(() => import('./pages/Library'));
const CSR = lazy(() => import('./pages/CSR'));
const Volunteer = lazy(() => import('./pages/Volunteer'));
const Events = lazy(() => import('./pages/Events'));
const Board = lazy(() => import('./pages/Board'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));

// System Pages
const Dashboards = lazy(() => import('./pages/Dashboards'));
const DashboardLogin = lazy(() => import('./pages/DashboardLogin'));
const ImpactIntelligence = lazy(() => import('./pages/ImpactIntelligence'));
const StartWizard = lazy(() => import('./pages/StartWizard'));
const Support = lazy(() => import('./pages/Support'));
const Verify = lazy(() => import('./pages/Verify'));
const FAQs = lazy(() => import('./pages/FAQs'));

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Syncing Ecosystem...</p>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<Loading />}>
            <Routes>
              {/* 1. Landing Page */}
              <Route path="/" element={<Home />} />
              
              {/* 2. About */}
              <Route path="/about/*" element={<About />} />
              
              {/* 3. Membership */}
              <Route path="/membership/*" element={<Membership />} />
              
              {/* 4. Local Chapters */}
              <Route path="/local-chapters" element={<LocalChapters />} />
              <Route path="/local-chapters/:subpage" element={<LocalChapters />} />
              
              {/* Dynamic Chapter Microsite */}
              <Route path="/chapters/:country/:state/:city/:slug" element={<ChapterMicrosite />} />
              
              {/* 5. NESA-Africa Awards */}
              <Route path="/awards" element={<Awards />} />
              
              {/* 6. EduAid-Africa */}
              <Route path="/eduaid" element={<EduAid />} />
              
              {/* 7. Wallet (GFA & AGC) */}
              <Route path="/wallet/*" element={<GFAWallet />} />
              
              {/* 8. Fundraising & Donations */}
              <Route path="/donate/*" element={<Donate />} />
              <Route path="/donate/fund-a-chapter" element={<Donate />} />
              
              {/* 9. Media (NESA TV + Podcasts) */}
              <Route path="/media/*" element={<MediaHub />} />
              
              {/* 10. eLibrary & Tools */}
              <Route path="/library/*" element={<Library />} />
              
              {/* 11. CSR for Education */}
              <Route path="/csr/*" element={<CSR />} />
              
              {/* 12. Volunteer & Judge Portal */}
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/volunteer/apply" element={<Volunteer />} />
              
              {/* 13. Events & Webinars */}
              <Route path="/events" element={<Events />} />
              
              {/* 14. Board of Governance */}
              <Route path="/board" element={<Board />} />
              
              {/* 15. News & Blog */}
              <Route path="/blog/*" element={<Blog />} />
              
              {/* 16. Contact & FAQ */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/faqs" element={<FAQs />} />

              {/* Advanced Intelligence & System */}
              <Route path="/impact-intelligence" element={<ImpactIntelligence />} />
              <Route path="/start" element={<StartWizard />} />
              <Route path="/dashboard-login" element={<DashboardLogin />} />
              <Route path="/dashboard/:role" element={<Dashboards />} />
              <Route path="/support" element={<Support />} />
              <Route path="/verify" element={<Verify />} />

              {/* Redirects */}
              <Route path="/chapters" element={<Navigate to="/local-chapters" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
