
import { User, UserRole, Wallet, Transaction, MediaSubmission, SupportTicket } from '../types';

class FirebaseMock {
  private storageKey = 'scef_centra_db';

  constructor() {
    if (!localStorage.getItem(this.storageKey)) {
      this.seedData();
    }
  }

  private seedData() {
    const initialData = {
      users: {},
      wallets: {},
      transactions: [],
      chapters: [
        { id: 'ch_accra', name: 'Accra Chapter', country: 'Ghana', state: 'Greater Accra', city: 'Accra', level: 'physical', status: 'active', memberCount: 125, walletId: 'w_ch_accra' },
        { id: 'ch_lagos', name: 'Lagos Chapter', country: 'Nigeria', state: 'Lagos', city: 'Ikeja', level: 'physical', status: 'active', memberCount: 450, walletId: 'w_ch_lagos' },
        { id: 'ch_london', name: 'London Diaspora', country: 'UK', state: 'London', city: 'London', level: 'hybrid', status: 'active', memberCount: 88, walletId: 'w_ch_london' },
      ],
      mediaSubmissions: [],
      supportTickets: [],
      currentUser: null as User | null
    };
    localStorage.setItem(this.storageKey, JSON.stringify(initialData));
  }

  private getData() {
    return JSON.parse(localStorage.getItem(this.storageKey) || '{}');
  }

  private saveData(data: any) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  // --- Auth API ---
  async login(email: string, roleRequested: UserRole = 'member'): Promise<User> {
    const data = this.getData();
    let user = Object.values(data.users as Record<string, User>).find(u => u.email === email);
    
    if (!user) {
      // Mock Auto-Registration
      user = {
        uid: `u_${Date.now()}`,
        firstName: email.split('@')[0],
        lastName: 'User',
        email,
        role: roleRequested,
        country: 'Nigeria',
        state: 'Lagos',
        city: 'Ikeja',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      data.users[user.uid] = user;
      
      // Initialize Wallet
      // Fixed: Removed non-existent 'balances' property
      const wallet: Wallet = {
        id: `w_${user.uid}`,
        userId: user.uid,
        balanceNGN: 50000,
        balanceUSD: 100,
        balanceAGC: 0,
        kycStatus: 'unverified'
      };
      data.wallets[wallet.id] = wallet;
    }
    
    data.currentUser = user;
    this.saveData(data);
    return user;
  }

  getCurrentUser(): User | null {
    return this.getData().currentUser;
  }

  logout() {
    const data = this.getData();
    data.currentUser = null;
    this.saveData(data);
  }

  // --- Firestore API ---
  async getCollection(collectionName: string) {
    return this.getData()[collectionName] || [];
  }

  async addDocument(collectionName: string, doc: any) {
    const data = this.getData();
    if (!data[collectionName]) data[collectionName] = [];
    const newDoc = { id: `${collectionName.slice(0,1)}_${Date.now()}`, ...doc, createdAt: new Date().toISOString() };
    if (Array.isArray(data[collectionName])) {
      data[collectionName].push(newDoc);
    } else {
      data[collectionName][newDoc.id] = newDoc;
    }
    this.saveData(data);
    return newDoc;
  }

  async getWallet(userId: string): Promise<Wallet | null> {
    const data = this.getData();
    return Object.values(data.wallets as Record<string, Wallet>).find(w => w.userId === userId) || null;
  }

  // --- Storage API ---
  async uploadFile(file: File): Promise<string> {
    // Mock upload: returns a data URL or just a placeholder
    return `https://storage.googleapis.com/scef-impact-media/${Date.now()}-${file.name}`;
  }
}

export const firebase = new FirebaseMock();
