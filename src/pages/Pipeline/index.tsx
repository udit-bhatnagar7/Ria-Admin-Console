import React from 'react';
import { 
  Filter, 
  Plus, 
  Clock 
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { MOCK_PIPELINE_STAGES, MOCK_PIPELINE_ITEMS } from '../../mockData';

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

export default PipelineView;
