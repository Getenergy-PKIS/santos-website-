
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  RefreshCcw, 
  History, 
  ShieldCheck, 
  CreditCard, 
  Plus, 
  Heart,
  ChevronRight,
  Landmark,
  CheckCircle2,
  AlertCircle,
  Users
} from 'lucide-react';
import { Wallet as WalletType, Transaction, DonationTarget } from '../types';
import { EXCHANGE_RATES, DONATION_TARGETS } from '../constants';

const GFAWallet: React.FC<{ subpage?: string }> = ({ subpage: propSubpage }) => {
  const { subpage: urlSubpage } = useParams<{ subpage: string }>();
  const subpage = propSubpage || urlSubpage || 'dashboard';
  const navigate = useNavigate();

  // Mock State
  const [wallet, setWallet] = useState<WalletType>({
    id: 'w_12345',
    userId: 'u_67890',
    balanceNGN: 250000.0,
    balanceUSD: 150.0,
    balanceAGC: 540.0,
    kycStatus: 'verified'
  });

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 't_1', userId: 'u_67890', walletId: 'w_12345', type: 'deposit', amount: 50000, currency: 'NGN', status: 'completed', createdAt: '2023-11-01 10:00' },
    { id: 't_2', userId: 'u_67890', walletId: 'w_12345', type: 'convert', amount: 200, currency: 'AGC', status: 'completed', createdAt: '2023-11-02 14:30' },
    { id: 't_3', userId: 'u_67890', walletId: 'w_12345', type: 'donate', amount: 50, currency: 'AGC', target: 'Chapter: Accra', status: 'completed', createdAt: '2023-11-05 09:15' },
  ]);

  const [amount, setAmount] = useState('');
  const [selectedTarget, setSelectedTarget] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      const depAmt = parseFloat(amount);
      setWallet(prev => ({ ...prev, balanceNGN: prev.balanceNGN + depAmt }));
      setTransactions(prev => [{
        id: `t_${Date.now()}`,
        userId: wallet.userId,
        walletId: wallet.id,
        type: 'deposit',
        amount: depAmt,
        currency: 'NGN',
        status: 'completed',
        createdAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
      } as Transaction, ...prev]);
      setIsProcessing(false);
      setSuccessMsg(`Successfully deposited ₦${depAmt.toLocaleString()}`);
      setAmount('');
    }, 1500);
  };

  const handleConvert = (e: React.FormEvent) => {
    e.preventDefault();
    const agcAmt = parseFloat(amount);
    const costUSD = agcAmt * EXCHANGE_RATES.AGC_TO_USD;
    const costNGN = costUSD * EXCHANGE_RATES.USD_TO_NGN;

    if (wallet.balanceNGN < costNGN) {
      alert("Insufficient NGN balance");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setWallet(prev => ({ 
        ...prev, 
        balanceNGN: prev.balanceNGN - costNGN, 
        balanceAGC: prev.balanceAGC + agcAmt 
      }));
      setTransactions(prev => [{
        id: `t_${Date.now()}`,
        userId: wallet.userId,
        walletId: wallet.id,
        type: 'convert',
        amount: agcAmt,
        currency: 'AGC',
        status: 'completed',
        createdAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
      } as Transaction, ...prev]);
      setIsProcessing(false);
      setSuccessMsg(`Converted ₦${costNGN.toLocaleString()} to ${agcAmt} AGC`);
      setAmount('');
    }, 1500);
  };

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    const donAmt = parseFloat(amount);
    if (wallet.balanceAGC < donAmt) {
      alert("Insufficient AGC balance");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setWallet(prev => ({ ...prev, balanceAGC: prev.balanceAGC - donAmt }));
      const target = DONATION_TARGETS.find(t => t.id === selectedTarget);
      setTransactions(prev => [{
        id: `t_${Date.now()}`,
        userId: wallet.userId,
        walletId: wallet.id,
        type: 'donate',
        amount: donAmt,
        currency: 'AGC',
        target: target?.name || 'SCEF Ecosystem',
        status: 'completed',
        createdAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
      } as Transaction, ...prev]);
      setIsProcessing(false);
      setSuccessMsg(`Donated ${donAmt} AGC to ${target?.name}`);
      setAmount('');
    }, 1500);
  };

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Wallet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
             <Landmark size={120} />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-4">NGN Balance</p>
            <h2 className="text-4xl font-black mb-1">₦{wallet.balanceNGN.toLocaleString()}</h2>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2">Nigerian Naira</p>
          </div>
        </div>
        <div className="p-8 bg-blue-600 text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
             <Wallet size={120} />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-100 mb-4">AGC Balance</p>
            <h2 className="text-4xl font-black mb-1">{wallet.balanceAGC.toLocaleString()} <span className="text-xl opacity-60">AGC</span></h2>
            <p className="text-xs font-bold text-blue-200 uppercase tracking-widest mt-2">Afri Gold Coin</p>
          </div>
        </div>
        <div className="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <ShieldCheck className="text-emerald-500" size={24} />
              <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">VERIFIED</span>
            </div>
            <p className="text-sm font-bold text-slate-900">KYC Level 2</p>
            <p className="text-xs text-slate-400 mt-1">Full access to GFA features enabled.</p>
          </div>
          <Link to="/wallet/kyc" className="mt-4 text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center hover:underline">
            Manage KYC <ChevronRight size={14} className="ml-1" />
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button onClick={() => navigate('/wallet/deposit')} className="p-6 bg-white border border-slate-100 rounded-2xl flex flex-col items-center hover:bg-slate-50 transition-colors group">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-all">
            <ArrowDownLeft size={20} />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-slate-900">Deposit</span>
        </button>
        <button onClick={() => navigate('/wallet/convert')} className="p-6 bg-white border border-slate-100 rounded-2xl flex flex-col items-center hover:bg-slate-50 transition-colors group">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-all">
            <RefreshCcw size={20} />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-slate-900">Buy AGC</span>
        </button>
        <button onClick={() => navigate('/eduaid')} className="p-6 bg-white border border-slate-100 rounded-2xl flex flex-col items-center hover:bg-slate-50 transition-colors group">
          <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mb-3 group-hover:bg-rose-600 group-hover:text-white transition-all">
            <Heart size={20} />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-slate-900">Donate</span>
        </button>
        <button onClick={() => navigate('/wallet/transactions')} className="p-6 bg-white border border-slate-100 rounded-2xl flex flex-col items-center hover:bg-slate-50 transition-colors group">
          <div className="w-10 h-10 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center mb-3 group-hover:bg-slate-900 group-hover:text-white transition-all">
            <History size={20} />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-slate-900">Ledger</span>
        </button>
      </div>

      {/* Recent History */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10">
        <div className="flex items-center justify-between mb-8">
           <h3 className="text-xl font-black text-slate-900">Transaction History</h3>
           <Link to="/wallet/transactions" className="text-[10px] font-black text-blue-600 uppercase tracking-widest">View Full Ledger</Link>
        </div>
        <div className="space-y-4">
          {transactions.slice(0, 5).map(tx => (
            <div key={tx.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
               <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    tx.type === 'deposit' ? 'bg-emerald-100 text-emerald-600' : 
                    tx.type === 'convert' ? 'bg-blue-100 text-blue-600' : 
                    'bg-rose-100 text-rose-600'
                  }`}>
                    {tx.type === 'deposit' ? <Plus size={18} /> : 
                     tx.type === 'convert' ? <RefreshCcw size={18} /> : 
                     <Heart size={18} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 capitalize">{tx.type} {tx.target ? `to ${tx.target}` : ''}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tx.createdAt}</p>
                  </div>
               </div>
               <div className="text-right">
                  <p className={`text-sm font-black ${tx.type === 'deposit' ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {tx.type === 'deposit' ? '+' : '-'}{tx.amount} {tx.currency}
                  </p>
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{tx.status}</span>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderForm = (title: string, btnLabel: string, type: 'deposit' | 'convert' | 'donate') => (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100">
        <h2 className="text-3xl font-black text-slate-900 mb-8 font-display">{title}</h2>
        
        {successMsg && (
          <div className="mb-8 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center text-emerald-700 text-sm font-bold">
            <CheckCircle2 size={18} className="mr-3" />
            {successMsg}
          </div>
        )}

        <form onSubmit={type === 'deposit' ? handleDeposit : type === 'convert' ? handleConvert : handleDonate} className="space-y-8">
          {type === 'donate' && (
             <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Select Target</label>
                <select 
                  required
                  value={selectedTarget}
                  onChange={(e) => setSelectedTarget(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm font-bold"
                >
                  <option value="">Choose HQ, Program, or Chapter</option>
                  {DONATION_TARGETS.map(t => (
                    <option key={t.id} value={t.id}>{t.name} ({t.type})</option>
                  ))}
                </select>
             </div>
          )}

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Amount to {type}</label>
            <div className="relative">
              <input 
                type="number" 
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-16 pr-5 py-6 bg-slate-50 border border-slate-200 rounded-2xl text-2xl font-black focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              />
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-black">
                 {type === 'deposit' ? '₦' : 'AGC'}
              </div>
            </div>
          </div>

          {type === 'convert' && amount && (
             <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="flex justify-between text-xs font-bold text-blue-900 mb-2">
                   <span>Exchange Rate:</span>
                   <span>1 AGC = ₦{(EXCHANGE_RATES.AGC_TO_USD * EXCHANGE_RATES.USD_TO_NGN).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-black text-blue-600">
                   <span>Total Cost:</span>
                   <span>₦{(parseFloat(amount) * EXCHANGE_RATES.AGC_TO_USD * EXCHANGE_RATES.USD_TO_NGN).toLocaleString()}</span>
                </div>
             </div>
          )}

          <button 
            type="submit" 
            disabled={isProcessing || !amount}
            className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-blue-600 active:scale-95 transition-all disabled:opacity-50"
          >
            {isProcessing ? 'Processing Transaction...' : btnLabel}
          </button>
        </form>

        <Link to="/wallet" className="block text-center mt-8 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">
          &larr; Back to Dashboard
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Wallet Navbar */}
      <header className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
           <Link to="/wallet" className="flex items-center space-x-2">
              <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                <Wallet size={20} />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">GFA <span className="text-blue-600">Wallet</span></span>
           </Link>
           <div className="flex items-center space-x-6">
              <div className="hidden md:block text-right">
                 <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Total Asset Value</p>
                 <p className="text-xs font-black text-slate-900">₦{(wallet.balanceNGN + (wallet.balanceAGC * EXCHANGE_RATES.USD_TO_NGN)).toLocaleString()}</p>
              </div>
              <Link to="/dashboard/donor" className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center hover:bg-blue-100 transition-colors">
                 <Users size={18} className="text-slate-600" />
              </Link>
           </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {subpage === 'dashboard' && renderDashboard()}
        {subpage === 'deposit' && renderForm('Deposit Funds', 'Initiate Payment', 'deposit')}
        {subpage === 'convert' && renderForm('Buy Afri Gold Coin', 'Confirm Purchase', 'convert')}
        {(subpage === 'donate' || subpage === 'fund-chapter') && renderForm('Make a Donation', 'Confirm Donation', 'donate')}
        {subpage === 'transactions' && (
           <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center justify-between mb-12">
                 <h2 className="text-3xl font-black text-slate-900 font-display">Wallet Ledger</h2>
                 <button className="flex items-center text-[10px] font-black bg-slate-50 px-4 py-2 rounded-lg uppercase tracking-widest">
                    <ArrowUpRight size={14} className="mr-2" />
                    Download CSV
                 </button>
              </div>
              <div className="space-y-2">
                 {transactions.map(tx => (
                    <div key={tx.id} className="grid grid-cols-1 md:grid-cols-4 items-center p-6 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors rounded-xl">
                       <div className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                             tx.type === 'deposit' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-600 bg-slate-50'
                          }`}>
                             {tx.type === 'deposit' ? <Plus size={14} /> : <ArrowUpRight size={14} />}
                          </div>
                          <span className="text-sm font-bold capitalize">{tx.type}</span>
                       </div>
                       <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{tx.createdAt}</div>
                       <div className="text-sm font-medium text-slate-500">{tx.target || 'Account Funding'}</div>
                       <div className={`text-right font-black ${tx.type === 'deposit' ? 'text-emerald-600' : 'text-slate-900'}`}>
                          {tx.type === 'deposit' ? '+' : '-'}{tx.amount.toLocaleString()} {tx.currency}
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        )}
      </main>
    </div>
  );
};

export default GFAWallet;
