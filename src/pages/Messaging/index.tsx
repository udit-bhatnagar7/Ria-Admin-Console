import React, { useState } from 'react';
import { 
  Search, 
  BrainCircuit, 
  ShieldCheck, 
  Settings 
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { MOCK_CONVERSATIONS, MOCK_LISTINGS } from '../../mockData';

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

export default MessagingView;
