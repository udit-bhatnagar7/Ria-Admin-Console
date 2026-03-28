import React from 'react';
import { 
  FileText 
} from 'lucide-react';

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

export default FormsView;
