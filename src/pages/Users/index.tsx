import React from 'react';
import { 
  Filter, 
  Plus, 
  Clock, 
  ChevronRight 
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { MOCK_USERS } from '../../mockData';

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

export default UsersView;
