import React from 'react';
import { 
  Clock, 
  FileText, 
  Target, 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  GitBranch, 
  ArrowUpRight 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  LineChart, 
  Line 
} from 'recharts';
import { cn } from '../../lib/utils';

const AnalyticsView = () => (
  <div className="p-6">
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Deep Analytics</h2>
        <p className="text-sm text-gray-500">Long-term trend analysis and system performance metrics.</p>
      </div>
      <div className="flex gap-2">
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-bold hover:bg-gray-50 transition-all">
          <Clock size={16} />
          LAST 30 DAYS
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md text-sm font-bold hover:bg-black/90 transition-all">
          <FileText size={16} />
          EXPORT REPORT
        </button>
      </div>
    </div>

    {/* Key Performance Indicators */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {[
        { label: 'Conversion Rate', value: '12.4%', change: '+2.1%', icon: Target, color: 'text-blue-600' },
        { label: 'Avg Deal Cycle', value: '18 Days', change: '-3 Days', icon: Clock, color: 'text-purple-600' },
        { label: 'User Growth', value: '+450', change: '+12%', icon: TrendingUp, color: 'text-green-600' },
        { label: 'Revenue Trend', value: '$1.2M', change: '+8.4%', icon: BarChart3, color: 'text-amber-600' },
      ].map((stat, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className={cn("p-2 rounded-lg bg-gray-50", stat.color)}>
              <stat.icon size={18} />
            </div>
            <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded", 
              stat.change.startsWith('+') ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
            )}>
              {stat.change}
            </span>
          </div>
          <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
        </div>
      ))}
    </div>

    {/* Charts Section */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-gray-900">Conversion Funnel</h3>
          <PieChart size={16} className="text-gray-400" />
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={[
              { name: 'Intake', value: 100 },
              { name: 'Disclosure', value: 75 },
              { name: 'Media', value: 60 },
              { name: 'Review', value: 45 },
              { name: 'Live', value: 30 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
              />
              <Area type="monotone" dataKey="value" stroke="#000" fillOpacity={0.1} fill="#000" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-gray-900">Revenue Growth</h3>
          <TrendingUp size={16} className="text-gray-400" />
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[
              { name: 'Jan', value: 400 },
              { name: 'Feb', value: 600 },
              { name: 'Mar', value: 800 },
              { name: 'Apr', value: 700 },
              { name: 'May', value: 1100 },
              { name: 'Jun', value: 1200 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
              />
              <Line type="monotone" dataKey="value" stroke="#000" strokeWidth={3} dot={{ r: 4, fill: '#000' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    {/* Top Performing Flows */}
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Top Performing Flows</h3>
      </div>
      <div className="divide-y divide-gray-50">
        {[
          { name: 'Standard Seller Onboarding', users: 1240, completion: '92%', avgTime: '14m', trend: 'up' },
          { name: 'Agent Referral Program', users: 450, completion: '78%', avgTime: '8m', trend: 'down' },
          { name: 'Compliance Review Flow', users: 890, completion: '85%', avgTime: '45m', trend: 'up' },
          { name: 'Media Asset Upload', users: 2100, completion: '95%', avgTime: '5m', trend: 'up' },
        ].map((flow, i) => (
          <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                <GitBranch size={20} />
              </div>
              <div>
                <p className="text-sm font-bold">{flow.name}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">{flow.users} Active Users</p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <p className="text-xs font-bold">{flow.completion}</p>
                <p className="text-[9px] text-gray-400 uppercase">Completion</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold">{flow.avgTime}</p>
                <p className="text-[9px] text-gray-400 uppercase">Avg Time</p>
              </div>
              <div className={cn(
                "p-1.5 rounded-full",
                flow.trend === 'up' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
              )}>
                {flow.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowUpRight size={14} className="rotate-90" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AnalyticsView;
