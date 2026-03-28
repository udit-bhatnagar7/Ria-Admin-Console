import React, { useState } from 'react';
import { 
  Plus, 
  Image as ImageIcon, 
  Clock, 
  AlertTriangle, 
  Activity, 
  FileText, 
  Settings 
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { MOCK_ASSETS } from '../../mockData';

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

export default MediaView;
