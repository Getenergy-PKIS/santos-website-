
import { 
  User, UserRole, Chapter, Wallet, Transaction, Award, 
  Scholarship, LibraryResource, Exam, Application, BoardMember, AuditLog,
  ChapterJoinRequest, ChapterUpgradeRequest, ChapterActivity, Status
} from '../types';

class SCEFApi {
  private dbKey = 'scef_ecosystem_v2_state';

  constructor() {
    if (!localStorage.getItem(this.dbKey)) this.seed();
  }

  private seed() {
    const initialState = {
      users: {},
      chapters: [
        { id: 'ch_1', slug: 'lagos-central', name: 'Lagos Central', country: 'Nigeria', state: 'Lagos', city: 'Ikeja', type: 'physical', status: 'active', memberCount: 1200, walletId: 'w_ch_1', programFocus: ['EduAid', 'RMSA'], createdAt: '2023-01-01', verified: true, address: '123 HQ Street, Ikeja' },
        { id: 'ch_2', slug: 'accra-north', name: 'Accra North', country: 'Ghana', state: 'Greater Accra', city: 'Accra', type: 'online', status: 'active', memberCount: 45, walletId: 'w_ch_2', programFocus: ['Women & Girls'], createdAt: '2024-05-15', verified: false }
      ],
      joinRequests: [],
      upgradeRequests: [],
      activities: [
        { id: 'act_1', chapterId: 'ch_2', title: 'Virtual Mentorship Day', description: 'Monthly online mentorship for student ambassadors.', date: '2024-06-01', category: 'Advocacy' }
      ],
      awards: [
        { id: 'aw_1', category: 'Innovation in STEM', nomineeName: 'Dr. Sarah Kone', nominatorId: 'sys', votes: 450, status: 'voting', year: 2025 }
      ],
      scholarships: [
        { id: 'sc_1', title: 'EduAid Tech Grant', program: 'STEM', deadline: '2025-06-30', amount: '$2,000', criteria: ['High school graduate', 'African resident'], status: 'open' }
      ],
      library: [
        { id: 'lib_1', title: 'Principles of Digital Advocacy', author: 'SCEF Media', type: 'book', category: 'Communication', fileUrl: '#' }
      ],
      exams: [
        { id: 'ex_1', title: 'Basic Literacy Assessment', subject: 'English', duration: 30, questions: [{ id: 'q1', text: 'Who founded SCEF?', options: ['Team', 'Founder', 'Bot'], answer: 0 }] }
      ],
      board: [
        { id: 'bm_1', name: 'Santos C. Okonkwo', role: 'Management', title: 'Chief Ecosystem Architect', photoUrl: '', bio: 'Visionary behind SCEF.' }
      ],
      wallets: {},
      transactions: [],
      applications: [],
      auditLogs: [],
      currentUser: null
    };
    localStorage.setItem(this.dbKey, JSON.stringify(initialState));
  }

  private getState() { return JSON.parse(localStorage.getItem(this.dbKey) || '{}'); }
  private saveState(s: any) { localStorage.setItem(this.dbKey, JSON.stringify(s)); }

  auth = {
    login: async (email: string, role: UserRole = 'member') => {
      const s = this.getState();
      const user: User = { 
        uid: `u_${Date.now()}`, firstName: email.split('@')[0], lastName: 'User', email, 
        role, status: 'active', country: 'Nigeria', state: 'Lagos', city: 'Ikeja', createdAt: new Date().toISOString() 
      };
      s.currentUser = user;
      if (!s.wallets[user.uid]) {
        s.wallets[user.uid] = { id: `w_${user.uid}`, userId: user.uid, balanceNGN: 5000, balanceUSD: 10, balanceAGC: 100, kycStatus: 'verified' };
      }
      this.saveState(s);
      return user;
    },
    me: () => this.getState().currentUser as User | null,
    logout: () => {
      const s = this.getState();
      s.currentUser = null;
      this.saveState(s);
    }
  };

  chapters = {
    list: async () => this.getState().chapters as Chapter[],
    get: async (idOrSlug: string) => {
      const s = this.getState();
      return (s.chapters as Chapter[]).find(c => c.id === idOrSlug || c.slug === idOrSlug);
    },
    join: async (chapterId: string, data: any) => {
      const s = this.getState();
      const request: ChapterJoinRequest = {
        id: `jr_${Date.now()}`,
        chapterId,
        userId: s.currentUser?.uid || 'anon',
        status: 'pending',
        interests: data.interests || [],
        participationRole: data.participationRole || 'Member',
        createdAt: new Date().toISOString()
      };
      s.joinRequests.push(request);
      this.saveState(s);
      return true;
    },
    startOnline: async (data: any) => {
      const s = this.getState();
      const newChapter: Chapter = {
        id: `ch_${Date.now()}`,
        slug: (data.chapterName as string).toLowerCase().replace(/\s+/g, '-'),
        name: data.chapterName,
        country: data.country,
        state: data.state,
        city: data.city,
        type: 'online',
        status: 'pending',
        memberCount: 1,
        walletId: `w_ch_${Date.now()}`,
        programFocus: data.focus || [],
        createdAt: new Date().toISOString(),
        verified: false
      };
      s.chapters.push(newChapter);
      this.saveState(s);
      return newChapter;
    },
    requestUpgrade: async (chapterId: string, data: any) => {
      const s = this.getState();
      const request: ChapterUpgradeRequest = {
        id: `up_${Date.now()}`,
        chapterId,
        targetType: data.targetType,
        status: 'pending',
        address: data.address,
        evidenceUrls: data.evidenceUrls || [],
        membershipThresholdMet: data.membershipThresholdMet || false,
        leadershipRolesFilled: data.leadershipRolesFilled || 0,
        documentedActivities: data.documentedActivities || 0,
        reportingEnabled: data.reportingEnabled || false,
        walletEnabled: data.walletEnabled || false,
        createdAt: new Date().toISOString()
      };
      s.upgradeRequests.push(request);
      this.saveState(s);
      return true;
    },
    getActivities: async (chapterId: string) => {
      const s = this.getState();
      return (s.activities as ChapterActivity[]).filter(a => a.chapterId === chapterId);
    },
    getDashboard: async (chapterId: string) => {
      const s = this.getState();
      const chapter = (s.chapters as Chapter[]).find(c => c.id === chapterId);
      const requests = (s.joinRequests as ChapterJoinRequest[]).filter(r => r.chapterId === chapterId);
      const acts = (s.activities as ChapterActivity[]).filter(a => a.chapterId === chapterId);
      const upgrade = (s.upgradeRequests as ChapterUpgradeRequest[]).find(u => u.chapterId === chapterId && u.status === 'pending');
      return { chapter, requests, activities: acts, upgrade };
    }
  };

  admin = {
    getQueue: async (type: string) => {
      const s = this.getState();
      if (type === 'chapters') return s.chapters.filter((c: any) => c.status === 'pending');
      if (type === 'upgrades') return s.upgradeRequests.filter((u: any) => u.status === 'pending');
      return [];
    },
    processAction: async (type: string, id: string, action: 'approve' | 'reject') => {
      const s = this.getState();
      if (type === 'chapter') {
        const item = s.chapters.find((c: any) => c.id === id);
        if (item) item.status = action === 'approve' ? 'active' : 'rejected';
      } else if (type === 'upgrade') {
        const item = s.upgradeRequests.find((u: any) => u.id === id);
        if (item && action === 'approve') {
          item.status = 'approved';
          const ch = s.chapters.find((c: any) => c.id === item.chapterId);
          if (ch) {
            ch.type = item.targetType;
            ch.verified = true;
            ch.address = item.address;
          }
        } else if (item) {
          item.status = 'rejected';
        }
      }
      s.auditLogs.unshift({ id: `log_${Date.now()}`, action, entityType: type, timestamp: new Date().toISOString() });
      this.saveState(s);
      return true;
    },
    getLogs: async () => this.getState().auditLogs as AuditLog[]
  };

  awards = {
    list: async () => this.getState().awards as Award[],
    vote: async (awardId: string, userId: string) => {
      const s = this.getState();
      const award = s.awards.find((a: any) => a.id === awardId);
      const wallet = s.wallets[userId];
      if (wallet && wallet.balanceAGC >= 1) {
        wallet.balanceAGC -= 1;
        if (award) award.votes += 1;
        s.transactions.unshift({
          id: `tx_${Date.now()}`, userId, walletId: wallet.id, type: 'vote', amount: 1, currency: 'AGC', status: 'completed', createdAt: new Date().toISOString()
        });
        this.saveState(s);
        return true;
      }
      return false;
    }
  };

  library = {
    list: async () => this.getState().library as LibraryResource[],
    download: async (resId: string, userId: string) => {
      const s = this.getState();
      const wallet = s.wallets[userId];
      if (wallet && wallet.balanceAGC >= 0.5) {
        wallet.balanceAGC -= 0.5;
        s.transactions.unshift({
          id: `tx_${Date.now()}`, userId, walletId: wallet.id, type: 'download', amount: 0.5, currency: 'AGC', status: 'completed', createdAt: new Date().toISOString()
        });
        this.saveState(s);
        return true;
      }
      return false;
    }
  };

  scholarships = {
    list: async () => this.getState().scholarships as Scholarship[],
    apply: async (data: any) => {
      const s = this.getState();
      s.applications.push({ id: `app_${Date.now()}`, userId: s.currentUser?.uid, type: 'scholarship', status: 'pending', data, createdAt: new Date().toISOString() });
      this.saveState(s);
    }
  };

  board = {
    get: async () => this.getState().board as BoardMember[]
  };

  wallet = {
    get: async (uid: string) => this.getState().wallets[uid] as Wallet,
    transactions: async (uid: string) => (this.getState().transactions as Transaction[]).filter(t => t.userId === uid)
  };
}

export const api = new SCEFApi();
