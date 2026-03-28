import React from 'react';
import { 
  BrainCircuit, 
  AlertTriangle, 
  Users, 
  Zap, 
  MessageSquare 
} from 'lucide-react';
import { cn } from '../../lib/utils';

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

export default AIInsightsView;
