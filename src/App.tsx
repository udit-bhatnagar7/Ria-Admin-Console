import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Home, 
  FileText, 
  MessageSquare, 
  Image as ImageIcon, 
  GitBranch, 
  AlertTriangle, 
  BarChart3, 
  BrainCircuit, 
  Settings, 
  ShieldCheck,
  Search,
  Bell,
  Plus,
  Filter,
  ChevronRight,
  ChevronDown,
  User as UserIcon,
  Activity,
  ArrowUpRight,
  Clock,
  Zap,
  Lock,
  Check,
  X,
  Globe,
  Database,
  Key,
  TrendingUp,
  PieChart,
  Target,
  LogOut,
  History,
  Server,
  Cpu,
  MapPin,
  DollarSign,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { cn } from './lib/utils';
import { MOCK_USERS, MOCK_LISTINGS, MOCK_ALERTS, MOCK_ACTIVITY, MOCK_CONVERSATIONS, MOCK_ASSETS, MOCK_PIPELINE_STAGES, MOCK_PIPELINE_ITEMS, MOCK_NOTIFICATIONS } from './mockData';
import { User, Listing, SystemAlert, ActivityEvent } from './types';

// --- Page Components ---
import DashboardView from './pages/Dashboard';
import UsersView from './pages/Users';
import ListingsView from './pages/Listings';
import AnalyticsView from './pages/Analytics';
import SettingsView from './pages/Settings';
import RolesView from './pages/Roles';
import AIInsightsView from './pages/AIInsights';
import FormsView from './pages/Forms';
import AlertsView from './pages/Alerts';
import PipelineView from './pages/Pipeline';
import MediaView from './pages/Media';
import MessagingView from './pages/Messaging';

// --- Components ---

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick, 
  badge 
}: { 
  icon: any, 
  label: string, 
  active?: boolean, 
  onClick: () => void,
  badge?: string | number
}) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-all duration-200 group",
      active 
        ? "bg-black text-white" 
        : "text-gray-500 hover:bg-gray-100 hover:text-black"
    )}
  >
    <div className="flex items-center gap-3">
      <Icon size={18} className={cn(active ? "text-white" : "text-gray-400 group-hover:text-black")} />
      <span>{label}</span>
    </div>
    {badge && (
      <span className={cn(
        "px-1.5 py-0.5 text-[10px] font-bold rounded-sm",
        active ? "bg-white text-black" : "bg-black text-white"
      )}>
        {badge}
      </span>
    )}
  </button>
);

const StatChip = ({ label, value, color = "bg-gray-100" }: { label: string, value: string | number, color?: string }) => (
  <div className={cn("flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold", color)}>
    <span className="opacity-60 uppercase tracking-wider text-[10px]">{label}:</span>
    <span>{value}</span>
  </div>
);

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-6 flex-1">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search users, properties, listings..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white border border-gray-200 rounded text-gray-400">⌘</kbd>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white border border-gray-200 rounded text-gray-400">K</kbd>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-3">
          <StatChip label="Active" value="42" color="bg-green-50 text-green-700" />
          <StatChip label="Listings" value="18" color="bg-blue-50 text-blue-700" />
          <StatChip label="Issues" value="3" color="bg-red-50 text-red-700" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={cn(
              "p-2 text-gray-500 hover:bg-gray-100 rounded-full relative transition-all",
              showNotifications && "bg-gray-100 text-black"
            )}
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <AnimatePresence>
            {showNotifications && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowNotifications(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                  className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Notifications</h3>
                    <button className="text-[10px] font-bold text-black hover:underline">MARK ALL AS READ</button>
                  </div>
                  <div className="max-h-96 overflow-y-auto divide-y divide-gray-50">
                    {MOCK_NOTIFICATIONS.map(notif => (
                      <div key={notif.id} className={cn(
                        "p-4 hover:bg-gray-50 transition-colors cursor-pointer group",
                        !notif.isRead && "bg-blue-50/30"
                      )}>
                        <div className="flex gap-3">
                          <div className={cn(
                            "w-2 h-2 rounded-full mt-1.5 shrink-0",
                            notif.type === 'success' ? "bg-green-500" :
                            notif.type === 'error' ? "bg-red-500" :
                            notif.type === 'warning' ? "bg-amber-500" :
                            "bg-blue-500"
                          )} />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-xs font-bold text-gray-900">{notif.title}</p>
                              <span className="text-[9px] text-gray-400 font-mono">{notif.timestamp}</span>
                            </div>
                            <p className="text-[11px] text-gray-500 leading-relaxed">{notif.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-100 text-center bg-gray-50/50">
                    <button className="text-[10px] font-bold text-gray-500 hover:text-black transition-colors">VIEW ALL NOTIFICATIONS</button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
        
        <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>
        
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className={cn(
              "flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-full hover:bg-gray-100 transition-all border border-transparent",
              showProfileMenu && "bg-gray-100 border-gray-200"
            )}
          >
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold leading-none">Udit Bhatnagar</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-tighter mt-1 font-semibold">Super Admin</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white text-xs font-bold relative">
              UB
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <ChevronDown size={14} className={cn("text-gray-400 transition-transform", showProfileMenu && "rotate-180")} />
          </button>

          <AnimatePresence>
            {showProfileMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowProfileMenu(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                  className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                    <p className="text-xs font-bold text-gray-900">Udit Bhatnagar</p>
                    <p className="text-[10px] text-gray-500 truncate">uditbhatnagar6@gmail.com</p>
                  </div>
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                      <UserIcon size={16} className="text-gray-400" />
                      My Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                      <Settings size={16} className="text-gray-400" />
                      Account Settings
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                      <History size={16} className="text-gray-400" />
                      Activity Log
                    </button>
                  </div>
                  <div className="p-2 border-t border-gray-100">
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

// --- Views ---

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

const UsersView = () => (
  <div className="p-6">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">User Lifecycle Tracking</h2>
        <p className="text-sm text-gray-500">Monitor progress, drop-offs, and stuck flows in real-time.</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium hover:bg-gray-50">
          <Filter size={16} /> Filter
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-black/90">
          <Plus size={16} /> Add User
        </button>
      </div>
    </div>

    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">User</th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Status / Progress</th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Current Step</th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Last Activity</th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {MOCK_USERS.map(user => (
            <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-gray-900">{user.name}</p>
                      {user.isHighValue && <span className="text-[8px] font-bold bg-amber-100 text-amber-700 px-1 py-0.5 rounded">VIP</span>}
                    </div>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span className={cn(user.isStuck ? "text-red-500" : "text-gray-400")}>
                      {user.isStuck ? "STUCK" : "PROGRESSING"}
                    </span>
                    <span>{user.progress}%</span>
                  </div>
                  <div className="h-1.5 w-32 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full rounded-full", user.isStuck ? "bg-red-500" : "bg-black")} 
                      style={{ width: `${user.progress}%` }}
                    />
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium text-gray-700">{user.currentStep}</p>
                  <span className="text-[10px] text-gray-400 font-mono">({user.timeSpentAtStep})</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock size={12} />
                  {user.lastActivity}
                </div>
              </td>
              <td className="px-6 py-4">
                <button className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-md transition-all">
                  <ChevronRight size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ListingsView = () => (
  <div className="p-6">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Properties & Listings</h2>
        <p className="text-sm text-gray-500">Track health scores, missing assets, and timeline delays.</p>
      </div>
      <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-black/90">
        <Plus size={16} /> Create Listing
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {MOCK_LISTINGS.map(listing => (
        <div key={listing.id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-gray-50">
            <div className="flex items-center justify-between mb-2">
              <span className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider",
                listing.status === 'active' ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
              )}>
                {listing.status}
              </span>
              <span className="text-[10px] font-mono text-gray-400">{listing.id}</span>
            </div>
            <h3 className="font-bold text-gray-900 truncate">{listing.address}</h3>
            <p className="text-xs text-gray-500 mt-1">Agent: {listing.assignedAgent}</p>
          </div>
          
          <div className="p-5 flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Health Score</p>
                <p className={cn(
                  "text-xl font-extrabold",
                  listing.healthScore > 80 ? "text-green-600" : "text-amber-600"
                )}>{listing.healthScore}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Days Active</p>
                <p className="text-xl font-extrabold text-gray-900">{listing.daysActive}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Completion</p>
                <p className="text-xl font-extrabold text-gray-900">{listing.completionRate}%</p>
              </div>
            </div>

            {listing.missingItems.length > 0 && (
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                <p className="text-[10px] font-bold text-amber-800 uppercase mb-2 flex items-center gap-1">
                  <AlertTriangle size={10} /> Missing Assets
                </p>
                <ul className="space-y-1">
                  {listing.missingItems.map((item, i) => (
                    <li key={i} className="text-[11px] text-amber-700 flex items-center gap-2">
                      <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <button className="text-xs font-bold text-gray-600 hover:text-black transition-colors">VIEW DETAILS</button>
            <button className="p-2 text-gray-400 hover:text-black hover:bg-white rounded-md transition-all">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

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

const SettingsView = () => (
  <div className="p-6 max-w-4xl mx-auto">
    <div className="mb-8">
      <h2 className="text-2xl font-bold tracking-tight">System Settings</h2>
      <p className="text-sm text-gray-500">Configure global parameters and automation rules.</p>
    </div>

    <div className="space-y-6">
      {[
        { 
          title: 'General Configuration', 
          icon: Globe, 
          settings: [
            { label: 'System Name', value: 'Control Tower Admin', type: 'text' },
            { label: 'Primary Domain', value: 'admin.controltower.io', type: 'text' },
            { label: 'Maintenance Mode', value: false, type: 'toggle' },
          ]
        },
        { 
          title: 'Automation Rules', 
          icon: Zap, 
          settings: [
            { label: 'Auto-flag Stuck Users (>24h)', value: true, type: 'toggle' },
            { label: 'AI Quality Check on Upload', value: true, type: 'toggle' },
            { label: 'Daily Summary Emails', value: true, type: 'toggle' },
          ]
        },
        { 
          title: 'Security & API', 
          icon: ShieldCheck, 
          settings: [
            { label: 'API Key Rotation', value: 'Every 90 Days', type: 'select' },
            { label: 'Two-Factor Authentication', value: 'Required for Admins', type: 'select' },
            { label: 'IP Whitelisting', value: 'Enabled', type: 'status' },
          ]
        },
      ].map((group, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center gap-3">
            <group.icon size={18} className="text-gray-400" />
            <h3 className="font-bold text-sm uppercase tracking-widest">{group.title}</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {group.settings.map((setting, j) => (
              <div key={j} className="p-4 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{setting.label}</span>
                <div className="flex items-center gap-4">
                  {setting.type === 'text' && (
                    <input type="text" defaultValue={setting.value as string} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs focus:outline-none focus:border-black" />
                  )}
                  {setting.type === 'toggle' && (
                    <button className={cn(
                      "w-10 h-5 rounded-full relative transition-colors",
                      setting.value ? "bg-black" : "bg-gray-200"
                    )}>
                      <div className={cn(
                        "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
                        setting.value ? "right-1" : "left-1"
                      )} />
                    </button>
                  )}
                  {setting.type === 'select' && (
                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">{setting.value}</span>
                  )}
                  {setting.type === 'status' && (
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-600 uppercase">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      {setting.value}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    
    <div className="mt-8 flex justify-end gap-3">
      <button className="px-6 py-2 bg-white border border-gray-200 rounded-md text-sm font-bold hover:bg-gray-50 transition-all">DISCARD</button>
      <button className="px-6 py-2 bg-black text-white rounded-md text-sm font-bold hover:bg-black/90 transition-all shadow-lg">SAVE CHANGES</button>
    </div>
  </div>
);

const RolesView = () => (
  <div className="p-6">
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Roles & Permissions</h2>
        <p className="text-sm text-gray-500">Manage access control for different user types.</p>
      </div>
      <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md text-sm font-bold hover:bg-black/90 transition-all">
        <Plus size={16} />
        CREATE ROLE
      </button>
    </div>

    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-8">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Role Name</th>
            <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Users</th>
            <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Permissions</th>
            <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
            <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {[
            { name: 'Super Admin', users: 2, permissions: 'Full Access', status: 'System' },
            { name: 'Operations Manager', users: 5, permissions: 'Users, Listings, Messaging', status: 'Active' },
            { name: 'Support Agent', users: 12, permissions: 'Messaging, User View', status: 'Active' },
            { name: 'Compliance Officer', users: 3, permissions: 'Forms, Media Review', status: 'Active' },
          ].map((role, i) => (
            <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                    <ShieldCheck size={16} />
                  </div>
                  <span className="text-sm font-bold">{role.name}</span>
                </div>
              </td>
              <td className="p-4 text-sm text-gray-500 font-mono">{role.users}</td>
              <td className="p-4">
                <div className="flex flex-wrap gap-1">
                  {role.permissions.split(', ').map((p, j) => (
                    <span key={j} className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[9px] font-bold rounded uppercase tracking-tighter">
                      {p}
                    </span>
                  ))}
                </div>
              </td>
              <td className="p-4">
                <span className={cn(
                  "px-2 py-1 rounded text-[10px] font-bold uppercase",
                  role.status === 'System' ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"
                )}>
                  {role.status}
                </span>
              </td>
              <td className="p-4 text-right">
                <button className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-md transition-all">
                  <Settings size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Security Audit Log */}
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Security Audit Log</h3>
        <button className="text-[10px] font-bold text-gray-500 hover:text-black flex items-center gap-1">
          DOWNLOAD LOGS <ChevronRight size={12} />
        </button>
      </div>
      <div className="divide-y divide-gray-50">
        {[
          { user: 'Udit Bhatnagar', action: 'Updated Permissions for "Support Agent"', time: '2h ago', ip: '192.168.1.1' },
          { user: 'System', action: 'Automatic API Key Rotation', time: '5h ago', ip: 'Internal' },
          { user: 'Michael Chen', action: 'Failed Login Attempt', time: '8h ago', ip: '45.12.89.102' },
          { user: 'Udit Bhatnagar', action: 'Created New Role: "Compliance Officer"', time: '1d ago', ip: '192.168.1.1' },
        ].map((log, i) => (
          <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                log.action.includes('Failed') ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"
              )}>
                {log.user[0]}
              </div>
              <div>
                <p className="text-xs font-bold">{log.action}</p>
                <p className="text-[10px] text-gray-400">{log.user} • {log.ip}</p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-gray-400">{log.time}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AIInsightsView = () => (
  <div className="p-6">
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">AI Insights & Intelligence</h2>
        <p className="text-sm text-gray-500">Predictive analysis and automated UX recommendations.</p>
      </div>
      <div className="flex gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-[10px] font-bold uppercase tracking-widest border border-purple-100">
          <BrainCircuit size={14} />
          AI ENGINE ACTIVE
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Confusion Hotspots */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <AlertTriangle className="text-amber-500" size={18} />
            Confusion Hotspots
          </h3>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Top 3 Detected</span>
        </div>
        <div className="space-y-4">
          {[
            { step: 'Disclosure Form - Section 3', users: 12, reason: 'Ambiguous wording on lead-paint liability', impact: 'High' },
            { step: 'Intake - Identity Upload', users: 8, reason: 'Mobile camera focus issues reported', impact: 'Medium' },
            { step: 'MLS - Listing Details', users: 5, reason: 'Confusion over square footage calculation', impact: 'Low' },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-amber-200 transition-all group">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm font-bold group-hover:text-amber-600 transition-colors">{item.step}</h4>
                <span className={cn(
                  "px-2 py-0.5 rounded text-[8px] font-bold uppercase",
                  item.impact === 'High' ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"
                )}>
                  {item.impact} Impact
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-3">{item.reason}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                  <Users size={12} />
                  {item.users} Users Stuck
                </div>
                <button className="text-[10px] font-bold text-black underline underline-offset-4">FIX SUGGESTION</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Predictive Churn Alerts */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <Zap className="text-purple-500" size={18} />
            Predictive Churn Alerts
          </h3>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">High Probability</span>
        </div>
        <div className="space-y-4">
          {[
            { user: 'Michael Chen', risk: 'High', reason: 'Inactive for 26h after failed ID upload' },
            { user: 'David Wilson', risk: 'Medium', reason: 'Multiple attempts at Section 3 disclosure' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">
                  {item.user[0]}
                </div>
                <div>
                  <p className="text-sm font-bold">{item.user}</p>
                  <p className="text-[11px] text-gray-500">{item.reason}</p>
                </div>
              </div>
              <div className={cn(
                "px-2 py-1 rounded text-[10px] font-bold uppercase",
                item.risk === 'High' ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"
              )}>
                {item.risk} Risk
              </div>
            </div>
          ))}
        </div>
        
        {/* AI Recommendations */}
        <div className="mt-8 p-5 bg-purple-900 text-white rounded-2xl shadow-xl relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <BrainCircuit size={80} />
          </div>
          <h4 className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">AI Recommendation</h4>
          <p className="text-sm font-medium mb-4 leading-relaxed">
            "Based on current trends, simplifying the 'Lead Paint Disclosure' Section 3 could reduce user drop-off by 18%."
          </p>
          <button className="px-4 py-2 bg-white text-purple-900 text-[10px] font-bold rounded hover:bg-gray-100 transition-colors">
            APPLY UX FIX
          </button>
        </div>

        {/* Sentiment Analysis */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <MessageSquare className="text-blue-500" size={18} />
              Sentiment Analysis
            </h3>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Across 1.2k Chats</span>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs font-medium">Positive / Satisfied</span>
              </div>
              <span className="text-xs font-bold">68%</span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-[68%]" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                <span className="text-xs font-medium">Neutral / Informational</span>
              </div>
              <span className="text-xs font-bold">22%</span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 w-[22%]" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <span className="text-xs font-medium">Frustrated / Confused</span>
              </div>
              <span className="text-xs font-bold">10%</span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 w-[10%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const FormsView = () => (
  <div className="p-6">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Forms & Disclosures Tracking</h2>
        <p className="text-sm text-gray-500">Monitor completion rates and identify confusion hotspots.</p>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {[
        { name: 'Standard Disclosure', completion: 78, avgTime: '12m', dropOff: 'Section 3' },
        { name: 'Lead Paint Addendum', completion: 92, avgTime: '4m', dropOff: 'None' },
        { name: 'Intake Questionnaire', completion: 45, avgTime: '25m', dropOff: 'Identity Upload' },
      ].map((form, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">{form.name}</h3>
            <FileText size={16} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="text-gray-400 uppercase">Completion Rate</span>
                <span>{form.completion}%</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-black rounded-full" style={{ width: `${form.completion}%` }} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Avg Time</p>
                <p className="text-sm font-bold">{form.avgTime}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Top Drop-off</p>
                <p className="text-sm font-bold text-red-500">{form.dropOff}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AlertsView = () => {
  const [filter, setFilter] = useState<'all' | 'unresolved' | 'investigating'>('all');
  
  const filteredAlerts = MOCK_ALERTS.filter(alert => {
    if (filter === 'all') return true;
    return alert.status === filter;
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Alerts & Issues Hub</h2>
          <p className="text-sm text-gray-500">Monitor system risks, security events, and user bottlenecks.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-bold hover:bg-gray-50 transition-all">
            <Filter size={16} />
            FILTER CATEGORY
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md text-sm font-bold hover:bg-black/90 transition-all">
            <ShieldCheck size={16} />
            SECURITY LOGS
          </button>
        </div>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Critical Alerts', value: '3', color: 'bg-red-500', text: 'text-red-600' },
          { label: 'Investigating', value: '1', color: 'bg-amber-500', text: 'text-amber-600' },
          { label: 'Unresolved', value: '4', color: 'bg-orange-500', text: 'text-orange-600' },
          { label: 'Avg Resolution', value: '42m', color: 'bg-blue-500', text: 'text-blue-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className={cn("w-2 h-2 rounded-full", stat.color)} />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live</span>
            </div>
            <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-4 mb-6 border-b border-gray-200">
        <button 
          onClick={() => setFilter('all')}
          className={cn(
            "pb-3 text-xs font-bold uppercase tracking-widest transition-all px-2",
            filter === 'all' ? "text-black border-b-2 border-black" : "text-gray-400 hover:text-gray-600"
          )}
        >
          All Alerts
        </button>
        <button 
          onClick={() => setFilter('unresolved')}
          className={cn(
            "pb-3 text-xs font-bold uppercase tracking-widest transition-all px-2 flex items-center gap-2",
            filter === 'unresolved' ? "text-red-600 border-b-2 border-red-600" : "text-gray-400 hover:text-gray-600"
          )}
        >
          Unresolved
          <span className="bg-red-100 text-red-600 px-1.5 py-0.5 rounded text-[8px]">4</span>
        </button>
        <button 
          onClick={() => setFilter('investigating')}
          className={cn(
            "pb-3 text-xs font-bold uppercase tracking-widest transition-all px-2",
            filter === 'investigating' ? "text-amber-600 border-b-2 border-amber-600" : "text-gray-400 hover:text-gray-600"
          )}
        >
          Investigating
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map(alert => (
          <div key={alert.id} className={cn(
            "bg-white border-l-4 rounded-r-xl p-5 shadow-sm flex items-start justify-between group hover:shadow-md transition-all",
            alert.severity === 'critical' ? "border-red-500" : 
            alert.severity === 'warning' ? "border-amber-500" : "border-blue-500"
          )}>
            <div className="flex gap-4">
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                alert.severity === 'critical' ? "bg-red-50" : 
                alert.severity === 'warning' ? "bg-amber-50" : "bg-blue-50"
              )}>
                {alert.category === 'security' ? <ShieldCheck size={20} className="text-red-600" /> :
                 alert.category === 'user' ? <Users size={20} className="text-amber-600" /> :
                 alert.category === 'listing' ? <Home size={20} className="text-blue-600" /> :
                 <Activity size={20} className="text-gray-600" />}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900">{alert.type}</h3>
                  <span className={cn(
                    "text-[8px] font-bold uppercase px-1.5 py-0.5 rounded",
                    alert.status === 'unresolved' ? "bg-red-100 text-red-600" :
                    alert.status === 'investigating' ? "bg-amber-100 text-amber-600" :
                    "bg-green-100 text-green-600"
                  )}>
                    {alert.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{alert.message}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <Clock size={12} />
                    {alert.timestamp}
                  </div>
                  {alert.assignedTo && (
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <UserIcon size={12} />
                      Assigned: {alert.assignedTo}
                    </div>
                  )}
                  {alert.affectedId && (
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <FileText size={12} />
                      ID: {alert.affectedId}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="px-3 py-1.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded hover:bg-gray-200 transition-colors">
                ASSIGN
              </button>
              <button className="px-3 py-1.5 bg-black text-white text-[10px] font-bold rounded hover:bg-black/90 transition-colors">
                RESOLVE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PipelineView = () => (
  <div className="p-6 h-full flex flex-col">
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Workflow Pipeline</h2>
        <p className="text-sm text-gray-500">Track the progression of all active listings through the system.</p>
      </div>
      <div className="flex gap-2">
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-bold hover:bg-gray-50 transition-all">
          <Filter size={16} />
          FILTERS
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md text-sm font-bold hover:bg-black/90 transition-all">
          <Plus size={16} />
          NEW FLOW
        </button>
      </div>
    </div>

    <div className="flex-1 overflow-x-auto pb-4">
      <div className="flex gap-6 h-full min-w-max">
        {MOCK_PIPELINE_STAGES.map(stage => (
          <div key={stage.id} className="w-72 flex flex-col">
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full", stage.color)} />
                <h3 className="text-sm font-bold uppercase tracking-widest">{stage.name}</h3>
              </div>
              <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                {stage.count}
              </span>
            </div>

            <div className="flex-1 bg-gray-100/50 rounded-xl p-3 space-y-3 border border-dashed border-gray-200">
              {MOCK_PIPELINE_ITEMS.filter(item => item.stageId === stage.id).map(item => (
                <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-black transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <span className={cn(
                      "text-[8px] font-bold uppercase px-1.5 py-0.5 rounded",
                      item.priority === 'high' ? "bg-red-100 text-red-600" :
                      item.priority === 'medium' ? "bg-amber-100 text-amber-600" :
                      "bg-blue-100 text-blue-600"
                    )}>
                      {item.priority}
                    </span>
                    <span className="text-[9px] text-gray-400 font-mono">{item.lastUpdated}</span>
                  </div>
                  <h4 className="text-xs font-bold mb-1 group-hover:text-black transition-colors">{item.title}</h4>
                  <p className="text-[10px] text-gray-500 mb-4">{item.subtitle}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-[8px] font-bold text-gray-400 uppercase mb-1">
                        <span>Flow Health</span>
                        <span className={item.health < 50 ? "text-red-500" : "text-green-600"}>{item.health}%</span>
                      </div>
                      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            item.health < 50 ? "bg-red-500" : "bg-green-500"
                          )} 
                          style={{ width: `${item.health}%` }} 
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[7px] font-bold">
                          {item.assignedTo[0]}
                        </div>
                        <span className="text-[9px] text-gray-400">{item.assignedTo}</span>
                      </div>
                      <div className="flex -space-x-1">
                        <div className="w-4 h-4 rounded-full border border-white bg-gray-100 flex items-center justify-center">
                          <Clock size={8} className="text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-[10px] font-bold text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-all">
                + ADD ITEM
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const MediaView = () => {
  const [filter, setFilter] = useState<'all' | 'flagged' | 'pending'>('all');
  
  const filteredAssets = MOCK_ASSETS.filter(asset => {
    if (filter === 'all') return true;
    return asset.status === filter;
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Media & Assets Control</h2>
          <p className="text-sm text-gray-500">Monitor uploads, AI quality checks, and document compliance.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md text-sm font-bold hover:bg-black/90 transition-all">
            <Plus size={16} />
            UPLOAD ASSET
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Assets', value: '1,240', icon: ImageIcon, color: 'text-blue-600' },
          { label: 'Pending Review', value: '12', icon: Clock, color: 'text-amber-600' },
          { label: 'AI Flagged', value: '5', icon: AlertTriangle, color: 'text-red-600' },
          { label: 'Storage Used', value: '85%', icon: Activity, color: 'text-green-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <stat.icon size={16} className={stat.color} />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live</span>
            </div>
            <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-4 mb-6 border-b border-gray-200">
        <button 
          onClick={() => setFilter('all')}
          className={cn(
            "pb-3 text-xs font-bold uppercase tracking-widest transition-all px-2",
            filter === 'all' ? "text-black border-b-2 border-black" : "text-gray-400 hover:text-gray-600"
          )}
        >
          All Assets
        </button>
        <button 
          onClick={() => setFilter('flagged')}
          className={cn(
            "pb-3 text-xs font-bold uppercase tracking-widest transition-all px-2 flex items-center gap-2",
            filter === 'flagged' ? "text-red-600 border-b-2 border-red-600" : "text-gray-400 hover:text-gray-600"
          )}
        >
          AI Flagged
          <span className="bg-red-100 text-red-600 px-1.5 py-0.5 rounded text-[8px]">5</span>
        </button>
        <button 
          onClick={() => setFilter('pending')}
          className={cn(
            "pb-3 text-xs font-bold uppercase tracking-widest transition-all px-2",
            filter === 'pending' ? "text-amber-600 border-b-2 border-amber-600" : "text-gray-400 hover:text-gray-600"
          )}
        >
          Pending Review
        </button>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAssets.map(asset => (
          <div key={asset.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
            <div className="aspect-video bg-gray-100 relative overflow-hidden">
              {asset.type === 'image' ? (
                <img 
                  src={asset.url} 
                  alt={asset.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                  <FileText size={48} className="text-gray-200" />
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-1">
                <span className={cn(
                  "px-2 py-1 rounded text-[8px] font-bold uppercase tracking-widest shadow-sm",
                  asset.status === 'approved' ? "bg-green-500 text-white" :
                  asset.status === 'flagged' ? "bg-red-500 text-white" :
                  "bg-amber-500 text-white"
                )}>
                  {asset.status}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xs font-bold truncate w-40">{asset.name}</h3>
                  <p className="text-[10px] text-gray-400 font-mono uppercase">{asset.listingId} • {asset.size}</p>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Settings size={14} className="text-gray-400" />
                </button>
              </div>

              {asset.aiAnalysis && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">AI Quality Score</span>
                    <span className={cn(
                      "text-[10px] font-bold",
                      asset.aiAnalysis.quality > 80 ? "text-green-600" : "text-red-600"
                    )}>{asset.aiAnalysis.quality}%</span>
                  </div>
                  <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full",
                        asset.aiAnalysis.quality > 80 ? "bg-green-500" : "bg-red-500"
                      )} 
                      style={{ width: `${asset.aiAnalysis.quality}%` }} 
                    />
                  </div>
                  {asset.aiAnalysis.issues.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {asset.aiAnalysis.issues.map((issue, i) => (
                        <span key={i} className="px-1.5 py-0.5 bg-red-50 text-red-600 text-[8px] font-bold rounded border border-red-100 italic">
                          ! {issue}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[8px] font-bold">
                    {asset.uploadedBy[0]}
                  </div>
                  <span className="text-[9px] text-gray-500 font-medium">{asset.uploadedBy}</span>
                </div>
                <span className="text-[9px] text-gray-400 font-mono">{asset.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MessagingView = () => {
  const [selectedId, setSelectedId] = useState(MOCK_CONVERSATIONS[0].id);
  const selectedConversation = MOCK_CONVERSATIONS.find(c => c.id === selectedId) || MOCK_CONVERSATIONS[0];

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white">
      {/* Conversation List */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input 
              type="text" 
              placeholder="Filter messages..." 
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-xs focus:outline-none"
            />
          </div>
          <div className="flex gap-2 mt-3">
            <button className="px-2 py-1 bg-black text-white text-[10px] font-bold rounded">ALL</button>
            <button className="px-2 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold rounded hover:bg-gray-200">UNREAD</button>
            <button className="px-2 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold rounded hover:bg-gray-200">DELAYED</button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {MOCK_CONVERSATIONS.map(conv => (
            <button 
              key={conv.id}
              onClick={() => setSelectedId(conv.id)}
              className={cn(
                "w-full p-4 text-left hover:bg-gray-50 transition-colors relative",
                selectedId === conv.id ? "bg-gray-50" : ""
              )}
            >
              {selectedId === conv.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-black"></div>}
              <div className="flex justify-between items-start mb-1">
                <p className="text-xs font-bold truncate pr-4">
                  {conv.participants.find(p => p.role === 'seller')?.name} ↔ {conv.participants.find(p => p.role === 'agent')?.name}
                </p>
                <span className="text-[10px] text-gray-400 font-mono whitespace-nowrap">{conv.lastMessageTime}</span>
              </div>
              <p className="text-[11px] text-gray-500 line-clamp-2 mb-2">{conv.lastMessage}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {conv.status === 'delayed' && (
                    <span className="px-1.5 py-0.5 bg-red-100 text-red-600 text-[8px] font-bold rounded uppercase">Delayed</span>
                  )}
                  {conv.unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 bg-black text-white text-[8px] font-bold rounded uppercase">{conv.unreadCount} New</span>
                  )}
                </div>
                {conv.aiConfusionTrend && (
                  <div className="flex items-center gap-1 text-[9px] text-purple-600 font-bold">
                    <BrainCircuit size={10} />
                    AI TREND
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col bg-gray-50/30">
        <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {selectedConversation.participants.map(p => (
                <div key={p.id} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-bold">
                  {p.name[0]}
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-bold">
                {selectedConversation.participants.map(p => p.name).join(' & ')}
              </p>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                Listing: {MOCK_LISTINGS[0].id} • {selectedConversation.status}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-md transition-all">
              <ShieldCheck size={18} />
            </button>
            <button className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-md transition-all">
              <Settings size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {selectedConversation.messages.map(msg => (
            <div key={msg.id} className={cn(
              "flex flex-col max-w-[80%]",
              msg.senderRole === 'agent' ? "ml-auto items-end" : "items-start"
            )}>
              <div className="flex items-center gap-2 mb-1 px-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{msg.senderName}</span>
                {msg.isAI && <span className="text-[8px] font-bold bg-purple-100 text-purple-700 px-1 py-0.5 rounded">AI ASSISTANT</span>}
                <span className="text-[9px] text-gray-300 font-mono">{msg.timestamp}</span>
              </div>
              <div className={cn(
                "p-3 rounded-xl text-sm shadow-sm",
                msg.senderRole === 'agent' 
                  ? "bg-black text-white rounded-tr-none" 
                  : msg.isAI 
                    ? "bg-purple-50 border border-purple-100 text-purple-900 rounded-tl-none"
                    : "bg-white border border-gray-200 text-gray-900 rounded-tl-none"
              )}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* AI Confusion Trend Overlay */}
        {selectedConversation.aiConfusionTrend && (
          <div className="mx-6 mb-4 p-3 bg-purple-900 text-white rounded-lg flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded">
                <BrainCircuit size={16} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">AI Confusion Trend Detected</p>
                <p className="text-xs font-medium">{selectedConversation.aiConfusionTrend}</p>
              </div>
            </div>
            <button className="px-3 py-1.5 bg-white text-purple-900 text-[10px] font-bold rounded hover:bg-gray-100 transition-colors">
              VIEW ANALYSIS
            </button>
          </div>
        )}

        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-center gap-3">
            <input 
              type="text" 
              placeholder="Type a message or use /ai to generate a response..." 
              className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-black"
            />
            <button className="px-4 py-2 bg-black text-white rounded-md text-sm font-bold hover:bg-black/90 transition-all">
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 bg-white flex flex-col z-40">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <LayoutDashboard className="text-white" size={20} />
          </div>
          <h1 className="font-bold tracking-tighter text-xl">CONTROL TOWER</h1>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-4 mb-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-2">Main</p>
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
            <SidebarItem icon={Users} label="Users" active={activeTab === 'users'} onClick={() => setActiveTab('users')} badge={3} />
            <SidebarItem icon={Home} label="Listings" active={activeTab === 'listings'} onClick={() => setActiveTab('listings')} />
          </div>

          <div className="px-4 mb-2 mt-6">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-2">Operations</p>
            <SidebarItem icon={FileText} label="Forms & Disclosures" active={activeTab === 'forms'} onClick={() => setActiveTab('forms')} />
            <SidebarItem icon={MessageSquare} label="Messaging" active={activeTab === 'messaging'} onClick={() => setActiveTab('messaging')} badge="2" />
            <SidebarItem icon={ImageIcon} label="Media & Assets" active={activeTab === 'media'} onClick={() => setActiveTab('media')} />
            <SidebarItem icon={GitBranch} label="Workflow Pipeline" active={activeTab === 'pipeline'} onClick={() => setActiveTab('pipeline')} />
          </div>

          <div className="px-4 mb-2 mt-6">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-2">Intelligence</p>
            <SidebarItem icon={AlertTriangle} label="Alerts & Issues" active={activeTab === 'alerts'} onClick={() => setActiveTab('alerts')} badge="3" />
            <SidebarItem icon={BarChart3} label="Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
            <SidebarItem icon={BrainCircuit} label="AI Insights" active={activeTab === 'ai'} onClick={() => setActiveTab('ai')} />
          </div>

          <div className="px-4 mb-2 mt-6">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-2">System</p>
            <SidebarItem icon={Settings} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
            <SidebarItem icon={ShieldCheck} label="Roles & Permissions" active={activeTab === 'roles'} onClick={() => setActiveTab('roles')} />
          </div>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">System Status</p>
              <p className="text-xs font-bold text-green-600">All Systems Operational</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <div className="flex-1 overflow-y-auto bg-gray-50/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'dashboard' && <DashboardView />}
              {activeTab === 'users' && <UsersView />}
              {activeTab === 'listings' && <ListingsView />}
              {activeTab === 'forms' && <FormsView />}
              {activeTab === 'messaging' && <MessagingView />}
              {activeTab === 'media' && <MediaView />}
              {activeTab === 'pipeline' && <PipelineView />}
              {activeTab === 'alerts' && <AlertsView />}
              {activeTab === 'analytics' && <AnalyticsView />}
              {activeTab === 'ai' && <AIInsightsView />}
              {activeTab === 'settings' && <SettingsView />}
              {activeTab === 'roles' && <RolesView />}
              {activeTab !== 'dashboard' && activeTab !== 'users' && activeTab !== 'listings' && activeTab !== 'forms' && activeTab !== 'messaging' && activeTab !== 'media' && activeTab !== 'pipeline' && activeTab !== 'alerts' && activeTab !== 'analytics' && activeTab !== 'ai' && activeTab !== 'settings' && activeTab !== 'roles' && (
                <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                    <LayoutDashboard size={32} />
                  </div>
                  <h3 className="text-lg font-bold">Section Under Development</h3>
                  <p className="text-sm text-gray-500 max-w-xs mt-2">
                    We're building the {activeTab} module to give you full system control. Check back soon.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

