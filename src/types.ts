export type UserRole = 'seller' | 'agent' | 'admin' | 'support';
export type ListingStatus = 'pre-listing' | 'active' | 'under-contract' | 'closed';
export type AlertSeverity = 'critical' | 'warning' | 'info';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  progress: number;
  lastActivity: string;
  currentStep: string;
  timeSpentAtStep: string;
  isStuck: boolean;
  isHighValue: boolean;
}

export interface Listing {
  id: string;
  address: string;
  status: ListingStatus;
  completionRate: number;
  missingItems: string[];
  assignedAgent: string;
  healthScore: number;
  daysActive: number;
}

export interface SystemAlert {
  id: string;
  type: string;
  category: 'user' | 'listing' | 'system' | 'security';
  message: string;
  severity: AlertSeverity;
  status: 'unresolved' | 'investigating' | 'resolved';
  timestamp: string;
  affectedId?: string;
  assignedTo?: string;
}

export interface PipelineStage {
  id: string;
  name: string;
  count: number;
  color: string;
}

export interface PipelineItem {
  id: string;
  title: string;
  subtitle: string;
  stageId: string;
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
  lastUpdated: string;
  health: number;
}

export interface Asset {
  id: string;
  listingId: string;
  name: string;
  type: 'image' | 'document' | 'video';
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  url: string;
  uploadedBy: string;
  timestamp: string;
  size: string;
  aiAnalysis?: {
    quality: number;
    tags: string[];
    issues: string[];
  };
}

export interface ActivityEvent {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  metadata?: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  content: string;
  timestamp: string;
  isAI?: boolean;
}

export interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    role: UserRole;
  }[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: 'active' | 'archived' | 'delayed';
  messages: Message[];
  aiConfusionTrend?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'warning' | 'error' | 'success';
  isRead: boolean;
}
