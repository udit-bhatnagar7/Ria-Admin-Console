import React from 'react';
import { 
  Globe, 
  Zap, 
  ShieldCheck 
} from 'lucide-react';
import { cn } from '../../lib/utils';

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

export default SettingsView;
