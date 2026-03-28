import React from 'react';
import { 
  Plus, 
  AlertTriangle, 
  ChevronRight 
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { MOCK_LISTINGS } from '../../mockData';

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

export default ListingsView;
