import React from 'react';
import { 
  Plus, 
  ShieldCheck, 
  Settings, 
  ChevronRight 
} from 'lucide-react';
import { cn } from '../../lib/utils';

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

export default RolesView;
