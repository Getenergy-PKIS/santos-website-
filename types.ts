export type UserRole = 
  | 'public' | 'member' | 'ambassador' | 'volunteer' | 'judge' 
  | 'chapter_lead' | 'student' | 'donor' | 'partner' | 'bot_member' 
  | 'boa_member' | 'bod_member' | 'staff' | 'admin' | 'super_admin' | 'alumnus';

export type Status = 'pending' | 'approved' | 'rejected' | 'active' | 'inactive' | 'completed' | 'draft';
export type ChapterType = 'online' | 'hybrid' | 'physical';

export interface User {
  uid: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: Status;
  country: string;
  state: string;
  city: string;
  whatsapp?: string;
  photoUrl?: string;
  bio?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Chapter {
  id: string;
  slug: string;
  name: string;
  country: string;
  state: string;
  city: string;
  type: ChapterType; // online (Starter), hybrid (Real-Time), physical (Fully Real-Time)
  status: Status;
  memberCount: number;
  walletId: string;
  leadId?: string;
  programFocus: string[];
  description?: string;
  createdAt: string;
  verified: boolean;
  address?: string;
  externalUrl?: string;
}

export interface ChapterActivity {
  id: string;
  chapterId: string;
  title: string;
  description: string;
  date: string;
  proofUrl?: string;
  category: string;
}

export interface ChapterUpgradeRequest {
  id: string;
  chapterId: string;
  targetType: 'hybrid' | 'physical';
  status: Status;
  address: string;
  evidenceUrls: string[];
  membershipThresholdMet: boolean;
  leadershipRolesFilled: number;
  documentedActivities: number;
  reportingEnabled: boolean;
  walletEnabled: boolean;
  createdAt: string;
  reviewNotes?: string;
}

export interface ChapterJoinRequest {
  id: string;
  chapterId: string;
  userId: string;
  status: Status;
  interests: string[];
  participationRole: 'Member' | 'Volunteer' | 'Ambassador' | 'Chapter Team';
  createdAt: string;
}

export interface Wallet {
  id: string;
  userId: string;
  balanceNGN: number;
  balanceUSD: number;
  balanceAGC: number;
  kycStatus: 'unverified' | 'pending' | 'verified';
}

export interface Transaction {
  id: string;
  userId: string;
  walletId: string;
  type: 'deposit' | 'convert' | 'donate' | 'withdraw' | 'vote' | 'download';
  amount: number;
  currency: 'NGN' | 'USD' | 'AGC';
  target?: string;
  status: 'completed' | 'pending' | 'failed';
  reference?: string;
  createdAt: string;
}

export interface Application {
  id: string;
  userId: string;
  type: 'membership' | 'ambassador' | 'volunteer' | 'judge' | 'chapter' | 'scholarship' | 'leadership_upgrade';
  status: Status;
  data: any;
  createdAt: string;
}

export interface BoardMember {
  id: string;
  name: string;
  role: 'BOT' | 'BOA' | 'BOD' | 'Management';
  title: string;
  photoUrl: string;
  bio: string;
}

export interface Division {
  id: string;
  slug: string;
  shortName: string;
  name: string;
  mandate: string;
  icon: string;
  color: string;
  responsibilities: string[];
  howItShowsUp?: string[];
  ctas?: { label: string; path: string }[];
  platforms?: string[];
}

export interface Program {
  id: string;
  slug: string;
  name: string;
  description: string;
  impactGoal: string;
  status: 'active' | 'inactive';
  externalUrl?: string;
}

export interface DonationTarget {
  id: string;
  name: string;
  type: 'HQ' | 'PROGRAM' | 'CHAPTER';
  location?: string;
}

export interface AuditLog {
  id: string;
  action: string;
  entityType: string;
  timestamp: string;
  userId?: string;
}

export interface Award {
  id: string;
  category: string;
  nomineeName: string;
  nominatorId: string;
  votes: number;
  status: 'pending' | 'active' | 'voting' | 'completed';
  year: number;
}

export interface Scholarship {
  id: string;
  title: string;
  program: string;
  deadline: string;
  amount: string;
  criteria: string[];
  status: 'open' | 'closed';
}

export interface LibraryResource {
  id: string;
  title: string;
  author: string;
  type: 'book' | 'video' | 'paper';
  category: string;
  fileUrl: string;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  duration: number;
  questions: {
    id: string;
    text: string;
    options: string[];
    answer: number;
  }[];
}

export interface MediaSubmission {
  id: string;
  userId: string;
  chapterId?: string;
  title: string;
  description: string;
  fileUrl: string;
  type: 'image' | 'video';
  status: Status;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  description: string;
  type: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'closed' | 'in_progress';
  createdAt: string;
}