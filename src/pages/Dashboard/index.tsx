import React from 'react';
import { 
  DollarSign, 
  Cpu, 
  Server, 
  Activity, 
  Loader2, 
  MapPin, 
  GitBranch 
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { cn } from '../../lib/utils';
import { MOCK_ACTIVITY } from '../../mockData';

const DashboardView = () => {
  const chartData = [
    { time: '00:00', users: 12, latency: 45 },
    { time: '04:00', users: 8, latency: 32 },
    { time: '08:00', users: 24, latency: 58 },
    { time: '12:00', users: 42, latency: 82 },
    { time: '16:00', users: 38, latency: 65 },
    { time: '20:00', users: 31, latency: 52 },
    { time: '23:59', users: 15, latency: 41 },
  ];

  const aiTasks = [
    { id: 1, task: "Sentiment Analysis", status: "processing", progress: 65 },
    { id: 2, task: "Fraud Detection", status: "completed", progress: 100 },
    { id: 3, task: "Market Prediction", status: "queued", progress: 0 },
    { id: 4, task: "Image Verification", status: "processing", progress: 28 },
  ];

  const hotspots = [
    { city: "New York", active: 124, trend: "+12%" },
    { city: "London", active: 86, trend: "+5%" },
    { city: "Tokyo", active: 62, trend: "-2%" },
    { city: "Berlin", active: 45, trend: "+18%" },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50/30 min-h-screen">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Today's Revenue", value: "$12,482", trend: "+14.2%", icon: DollarSign, color: "text-green-600" },
          { label: "System Load", value: "24.8%", trend: "-2.1%", icon: Cpu, color: "text-blue-600" },
          { label: "Active Nodes", value: "18/20", trend: "Stable", icon: Server, color: "text-purple-600" },
          { label: "Avg Latency", value: "42ms", trend: "-5ms", icon: Activity, color: "text-amber-600" },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={cn("p-2 rounded-lg bg-gray-50", stat.color)}>
                <stat.icon size={18} />
              </div>
              <span className={cn(
                "text-[10px] font-bold px-1.5 py-0.5 rounded",
                stat.trend.startsWith('+') ? "bg-green-50 text-green-600" : 
                stat.trend.startsWith('-') ? "bg-red-50 text-red-600" : "bg-gray-50 text-gray-600"
              )}>
                {stat.trend}
              </span>
            </div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live System Heartbeat */}
        <div className="lg:col-span-2 bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold tracking-tight">System Heartbeat</h3>
              <p className="text-sm text-gray-500">Live active users & system latency</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-black"></div>
                <span className="text-[10px] font-bold text-gray-500 uppercase">Users</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-green-600 bg-green-50 px-2 py-1 rounded">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                LIVE
              </div>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#000" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#999'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#999'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  cursor={{ stroke: '#000', strokeWidth: 1 }}
                />
                <Area type="monotone" dataKey="users" stroke="#000" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Task Queue */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">AI Task Queue</h3>
            <div className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              <Loader2 size={10} className="animate-spin" />
              ACTIVE
            </div>
          </div>
          <div className="space-y-5 flex-1">
            {aiTasks.map(task => (
              <div key={task.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-gray-700">{task.task}</p>
                  <span className={cn(
                    "text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter",
                    task.status === 'completed' ? "bg-green-100 text-green-700" :
                    task.status === 'processing' ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"
                  )}>
                    {task.status}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${task.progress}%` }}
                    className={cn(
                      "h-full transition-all duration-1000",
                      task.status === 'completed' ? "bg-green-500" : "bg-blue-500"
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full py-2 text-[10px] font-bold text-gray-500 hover:text-black border border-gray-100 rounded-lg hover:bg-gray-50 transition-all">
            MANAGE AI WORKLOAD
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Geographical Hotspots */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Regional Activity</h3>
            <MapPin size={16} className="text-gray-300" />
          </div>
          <div className="space-y-4">
            {hotspots.map((spot, i) => (
              <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 group-hover:bg-black group-hover:text-white transition-colors">
                    {spot.city.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">{spot.city}</p>
                    <p className="text-[10px] text-gray-500">{spot.active} active listings</p>
                  </div>
                </div>
                <span className={cn(
                  "text-[10px] font-bold",
                  spot.trend.startsWith('+') ? "text-green-600" : "text-red-600"
                )}>
                  {spot.trend}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Activity Feed (Compact) */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Live Activity</h3>
            <Activity size={16} className="text-gray-300" />
          </div>
          <div className="space-y-4">
            {MOCK_ACTIVITY.slice(0, 4).map(event => (
              <div key={event.id} className="flex gap-3 relative pb-4 last:pb-0">
                <div className="absolute left-2 top-6 bottom-0 w-[1px] bg-gray-100 last:hidden"></div>
                <div className="w-4 h-4 rounded-full bg-black shrink-0 mt-1 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                <div>
                  <p className="text-xs text-gray-900 leading-tight">
                    <span className="font-bold">{event.user}</span> {event.action}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1 font-mono">{event.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline Health */}
        <div className="bg-black text-white p-6 rounded-xl shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest opacity-60">Pipeline Health</h3>
              <GitBranch size={16} className="opacity-40" />
            </div>
            <div className="space-y-6">
              <div className="flex items-end justify-between gap-2 h-24">
                {[45, 78, 52, 91, 63, 84, 72].map((h, i) => (
                  <div key={i} className="flex-1 bg-white/10 rounded-t-sm relative group h-full">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      className="absolute bottom-0 left-0 right-0 bg-white/30 group-hover:bg-white/50 transition-all"
                    />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold opacity-40 uppercase tracking-wider">Success Rate</p>
                  <p className="text-xl font-bold">98.4%</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold opacity-40 uppercase tracking-wider">Active Flows</p>
                  <p className="text-xl font-bold">1,242</p>
                </div>
              </div>
            </div>
          </div>
          <button className="mt-6 w-full py-2 bg-white text-black text-[10px] font-bold rounded-lg hover:bg-gray-100 transition-all">
            VIEW FULL PIPELINE
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
