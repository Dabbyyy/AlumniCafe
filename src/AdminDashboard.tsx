import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  TrendingUp,
  FileText,
  DollarSign,
  Calendar,
  MoreVertical,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  ArrowLeft,
  Clock,
  Shield
} from 'lucide-react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// --- Mock Data ---
const SALES_DATA_WEEK = [
  { name: 'Mon', sales: 4000, orders: 24 },
  { name: 'Tue', sales: 3000, orders: 18 },
  { name: 'Wed', sales: 5500, orders: 35 },
  { name: 'Thu', sales: 4500, orders: 28 },
  { name: 'Fri', sales: 8000, orders: 50 },
  { name: 'Sat', sales: 9500, orders: 65 },
  { name: 'Sun', sales: 6000, orders: 40 },
];

const SALES_DATA_MONTH = [
  { name: 'Week 1', sales: 25000 },
  { name: 'Week 2', sales: 32000 },
  { name: 'Week 3', sales: 28000 },
  { name: 'Week 4', sales: 38000 },
];

const CATEGORY_SALES = [
  { name: 'Coffee', value: 45 },
  { name: 'Food', value: 25 },
  { name: 'Desserts', value: 15 },
  { name: 'Non-Coffee', value: 10 },
  { name: 'Pastries', value: 5 },
];

const RECENT_TRANSACTIONS = [
  { id: 'TXN-20240506-0012', time: '08:45 AM', cashier: 'Staff 01', amount: 350.00, status: 'Completed' },
  { id: 'TXN-20240506-0013', time: '09:12 AM', cashier: 'Staff 02', amount: 850.50, status: 'Completed' },
  { id: 'TXN-20240506-0014', time: '09:30 AM', cashier: 'Staff 01', amount: 120.00, status: 'Completed' },
  { id: 'TXN-20240506-0015', time: '10:05 AM', cashier: 'Staff 03', amount: 540.25, status: 'Completed' },
  { id: 'TXN-20240506-0016', time: '10:22 AM', cashier: 'Staff 01', amount: 210.00, status: 'Completed' },
];

const CASHIER_ACCOUNTS = [
  { id: 1, name: 'Juan Dela Cruz', username: 'staff01', role: 'Senior Cashier', status: 'Active', lastLogin: 'Today, 08:00 AM' },
  { id: 2, name: 'Maria Santos', username: 'staff02', role: 'Cashier', status: 'Active', lastLogin: 'Today, 09:00 AM' },
  { id: 3, name: 'Pedro Reyes', username: 'staff03', role: 'Cashier', status: 'Inactive', lastLogin: 'Yesterday, 05:00 PM' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'cashiers' | 'reports'>('analytics');
  const [trendPeriod, setTrendPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => date.toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' });
  const formatTime = (date: Date) => date.toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

  return (
    <div className="flex flex-col h-screen select-none">
      {/* Admin Header */}
      <header className="h-20 bg-gradient-to-r from-hcdc-blue to-hcdc-blue-dark flex items-center justify-between px-10 text-white shadow-xl shrink-0 z-20">
        <div className="flex items-center gap-5">
          <Link to="/" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all border border-white/10">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-wider">POS Terminal</span>
          </Link>
          <div className="w-px h-8 bg-white/20" />
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-xl shadow-lg">
              <Shield className="w-5 h-5 text-hcdc-blue" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-xl leading-tight tracking-tight">Admin Dashboard</h1>
              <p className="text-[11px] uppercase tracking-[0.2em] text-hcdc-gold font-semibold">AlumniCafe Management</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white/5 px-6 py-2 rounded-full border border-white/10 backdrop-blur-sm">
          <Clock className="w-4 h-4 text-hcdc-gold" />
          <span className="text-sm font-semibold tabular-nums tracking-wide">
            {formatDate(time)} <span className="mx-2 opacity-30">|</span> {formatTime(time)}
          </span>
        </div>
      </header>

      <div className="flex-1 bg-[#F9FAFB] p-10 flex flex-col overflow-hidden">
        {/* Admin Header */}
        <div className="flex justify-between items-end mb-8 shrink-0">
          <div>
            <h2 className="text-3xl font-black text-hcdc-blue tracking-tight">Admin Dashboard</h2>
            <p className="text-gray-500 font-medium mt-1">Overview, performance, and management.</p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'analytics' ? 'bg-hcdc-blue text-white shadow-md' : 'text-gray-500 hover:text-hcdc-blue hover:bg-hcdc-light-blue'
                }`}
            >
              <TrendingUp className="w-4 h-4" /> Analytics & Trends
            </button>
            <button
              onClick={() => setActiveTab('cashiers')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'cashiers' ? 'bg-hcdc-blue text-white shadow-md' : 'text-gray-500 hover:text-hcdc-blue hover:bg-hcdc-light-blue'
                }`}
            >
              <Users className="w-4 h-4" /> Cashier Accounts
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'reports' ? 'bg-hcdc-blue text-white shadow-md' : 'text-gray-500 hover:text-hcdc-blue hover:bg-hcdc-light-blue'
                }`}
            >
              <FileText className="w-4 h-4" /> Sales Report
            </button>
          </div>
        </div>

        {/* Main Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar -mr-4 pb-10">

          {/* --- ANALYTICS TAB --- */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-4 gap-6">
                {[
                  { label: 'Total Sales (Today)', value: '₱ 12,450.00', trend: '+15.2%', up: true, icon: <DollarSign className="w-6 h-6 text-hcdc-blue" /> },
                  { label: 'Total Orders', value: '142', trend: '+8.5%', up: true, icon: <FileText className="w-6 h-6 text-hcdc-gold" /> },
                  { label: 'Avg Order Value', value: '₱ 87.67', trend: '-2.1%', up: false, icon: <TrendingUp className="w-6 h-6 text-hcdc-red" /> },
                  { label: 'Active Cashiers', value: '2', trend: '0%', up: true, icon: <Users className="w-6 h-6 text-purple-600" /> },
                ].map((kpi, i) => (
                  <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col gap-4 hover:shadow-md transition-all group">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {kpi.icon}
                      </div>
                      <div className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${kpi.up ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>
                        {kpi.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {kpi.trend}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-gray-800 tracking-tight">{kpi.value}</h3>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mt-1">{kpi.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-3 gap-6">
                {/* Main Trend Chart */}
                <div className="col-span-2 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-lg font-black text-gray-800">Revenue Trends</h3>
                      <p className="text-xs text-gray-500 font-medium">Sales performance over time</p>
                    </div>
                    <div className="flex bg-gray-50 p-1 rounded-lg">
                      {(['daily', 'weekly', 'monthly'] as const).map(period => (
                        <button
                          key={period}
                          onClick={() => setTrendPeriod(period)}
                          className={`px-4 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider transition-colors ${trendPeriod === period ? 'bg-white shadow-sm text-hcdc-blue' : 'text-gray-400 hover:text-gray-700'
                            }`}
                        >
                          {period}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendPeriod === 'monthly' ? SALES_DATA_MONTH : SALES_DATA_WEEK} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1A3A6B" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#1A3A6B" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 600 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 600 }} />
                        <Tooltip
                          contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)' }}
                          labelStyle={{ fontWeight: 800, color: '#1f2937', marginBottom: '4px' }}
                        />
                        <Area type="monotone" dataKey="sales" stroke="#1A3A6B" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Category Breakdown */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col">
                  <div className="mb-8">
                    <h3 className="text-lg font-black text-gray-800">Sales by Category</h3>
                    <p className="text-xs text-gray-500 font-medium">Distribution of revenue</p>
                  </div>
                  <div className="flex-1 flex flex-col justify-center gap-4">
                    {CATEGORY_SALES.map((cat, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between text-sm font-bold">
                          <span className="text-gray-700">{cat.name}</span>
                          <span className="text-hcdc-blue">{cat.value}%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${cat.value}%`,
                              backgroundColor: i === 0 ? '#1A3A6B' : i === 1 ? '#E8A020' : i === 2 ? '#C0282A' : '#9ca3af'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- CASHIERS TAB --- */}
          {activeTab === 'cashiers' && (
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                <div>
                  <h3 className="text-xl font-black text-gray-800">Manage Accounts</h3>
                  <p className="text-xs text-gray-500 font-medium mt-1">Add, edit, or disable cashier access.</p>
                </div>
                <button className="bg-hcdc-blue text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-hcdc-blue-dark transition-colors shadow-md">
                  <Plus className="w-4 h-4" /> Add Cashier
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-white border-b border-gray-100 text-[10px] uppercase tracking-widest text-gray-400 font-black">
                      <th className="p-6 font-black">Name</th>
                      <th className="p-6 font-black">Username</th>
                      <th className="p-6 font-black">Role</th>
                      <th className="p-6 font-black">Status</th>
                      <th className="p-6 font-black">Last Login</th>
                      <th className="p-6 font-black text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {CASHIER_ACCOUNTS.map((acc) => (
                      <tr key={acc.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-hcdc-light-blue text-hcdc-blue flex items-center justify-center font-black">
                              {acc.name.charAt(0)}
                            </div>
                            <span className="font-bold text-gray-800">{acc.name}</span>
                          </div>
                        </td>
                        <td className="p-6 font-mono text-sm text-gray-500">{acc.username}</td>
                        <td className="p-6">
                          <span className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                            {acc.role}
                          </span>
                        </td>
                        <td className="p-6">
                          <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center w-max gap-1.5 ${acc.status === 'Active' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                            }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${acc.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`} />
                            {acc.status}
                          </span>
                        </td>
                        <td className="p-6 text-sm text-gray-500 font-medium">{acc.lastLogin}</td>
                        <td className="p-6 text-right">
                          <button className="p-2 text-gray-400 hover:text-hcdc-blue hover:bg-hcdc-light-blue rounded-xl transition-colors">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* --- SALES REPORT TAB --- */}
          {activeTab === 'reports' && (
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[700px]">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50 shrink-0">
                <div>
                  <h3 className="text-xl font-black text-gray-800">Transaction History</h3>
                  <p className="text-xs text-gray-500 font-medium mt-1">Detailed log of all sales.</p>
                </div>
                <div className="flex gap-3">
                  <button className="bg-white border-2 border-gray-100 text-gray-600 px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:border-gray-200 transition-colors shadow-sm">
                    <Calendar className="w-4 h-4 text-gray-400" /> Filter Date
                  </button>
                  <button className="bg-hcdc-blue text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-hcdc-blue-dark transition-colors shadow-md">
                    <Download className="w-4 h-4" /> Export CSV
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <table className="w-full text-left">
                  <thead className="sticky top-0 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] z-10">
                    <tr className="border-b border-gray-100 text-[10px] uppercase tracking-widest text-gray-400 font-black">
                      <th className="p-6 font-black">Transaction ID</th>
                      <th className="p-6 font-black">Time</th>
                      <th className="p-6 font-black">Cashier</th>
                      <th className="p-6 font-black text-right">Amount</th>
                      <th className="p-6 font-black text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {RECENT_TRANSACTIONS.map((txn, i) => (
                      <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-6 font-mono text-sm font-bold text-hcdc-blue">{txn.id}</td>
                        <td className="p-6 text-sm text-gray-500 font-medium">{txn.time}</td>
                        <td className="p-6 text-sm font-bold text-gray-700">{txn.cashier}</td>
                        <td className="p-6 text-right font-black text-gray-800">
                          ₱ {txn.amount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="p-6 text-center">
                          <span className="text-[10px] font-black uppercase tracking-widest text-green-700 bg-green-100 px-3 py-1.5 rounded-lg inline-block">
                            {txn.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
