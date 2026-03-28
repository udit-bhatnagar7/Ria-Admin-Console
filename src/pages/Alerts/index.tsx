import React, { useState } from 'react';
import { 
  Filter, 
  ShieldCheck, 
  Users, 
  Home, 
  Activity, 
  Clock, 
  User as UserIcon, 
  FileText 
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { MOCK_ALERTS } from '../../mockData';

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

export default AlertsView;
