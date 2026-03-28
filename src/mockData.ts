import { User, Listing, SystemAlert, ActivityEvent, Conversation, Asset, PipelineStage, PipelineItem, Notification } from './types';

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'New High-Value User',
    message: 'Sarah Jenkins has reached 65% progress. High conversion probability.',
    timestamp: '2 mins ago',
    type: 'success',
    isRead: false,
  },
  {
    id: 'n2',
    title: 'System Alert: Stuck Flow',
    message: '5 users are currently stuck in the Disclosure step for over 24 hours.',
    timestamp: '10 mins ago',
    type: 'error',
    isRead: false,
  },
  {
    id: 'n3',
    title: 'Media Quality Flag',
    message: 'AI flagged 2 new images in L-1002 for low resolution.',
    timestamp: '25 mins ago',
    type: 'warning',
    isRead: true,
  },
  {
    id: 'n4',
    title: 'New Message',
    message: 'Sarah Jenkins: "I\'ve uploaded the lead paint disclosure. Can you check it?"',
    timestamp: '2 mins ago',
    type: 'info',
    isRead: false,
  },
];

export const MOCK_PIPELINE_STAGES: PipelineStage[] = [
  { id: 's1', name: 'Intake', count: 12, color: 'bg-blue-500' },
  { id: 's2', name: 'Disclosures', count: 8, color: 'bg-purple-500' },
  { id: 's3', name: 'Media/Photos', count: 5, color: 'bg-amber-500' },
  { id: 's4', name: 'Review', count: 3, color: 'bg-indigo-500' },
  { id: 's5', name: 'Live/MLS', count: 15, color: 'bg-green-500' },
];

export const MOCK_PIPELINE_ITEMS: PipelineItem[] = [
  {
    id: 'p1',
    title: '123 Maple Ave',
    subtitle: 'Sarah Jenkins',
    stageId: 's2',
    priority: 'high',
    assignedTo: 'Alex Rivera',
    lastUpdated: '2h ago',
    health: 85,
  },
  {
    id: 'p2',
    title: '456 Oak Lane',
    subtitle: 'Michael Chen',
    stageId: 's3',
    priority: 'medium',
    assignedTo: 'Unassigned',
    lastUpdated: '5h ago',
    health: 42,
  },
  {
    id: 'p3',
    title: '789 Pine Rd',
    subtitle: 'David Wilson',
    stageId: 's1',
    priority: 'low',
    assignedTo: 'Alex Rivera',
    lastUpdated: '10m ago',
    health: 95,
  },
  {
    id: 'p4',
    title: '101 Cedar St',
    subtitle: 'Emma Thompson',
    stageId: 's5',
    priority: 'medium',
    assignedTo: 'Alex Rivera',
    lastUpdated: '1d ago',
    health: 100,
  },
];

export const MOCK_ASSETS: Asset[] = [
  {
    id: 'as1',
    listingId: 'L-1001',
    name: 'Living Room Main.jpg',
    type: 'image',
    status: 'approved',
    url: 'https://picsum.photos/seed/living/800/600',
    uploadedBy: 'Alex Rivera',
    timestamp: '2 hours ago',
    size: '2.4 MB',
    aiAnalysis: {
      quality: 92,
      tags: ['Interior', 'Natural Light', 'Spacious'],
      issues: []
    }
  },
  {
    id: 'as2',
    listingId: 'L-1002',
    name: 'Kitchen_Blurry.jpg',
    type: 'image',
    status: 'flagged',
    url: 'https://picsum.photos/seed/kitchen/800/600?blur=5',
    uploadedBy: 'Michael Chen',
    timestamp: '5 hours ago',
    size: '1.8 MB',
    aiAnalysis: {
      quality: 45,
      tags: ['Kitchen', 'Low Light'],
      issues: ['Low Resolution', 'Motion Blur Detected']
    }
  },
  {
    id: 'as3',
    listingId: 'L-1001',
    name: 'Lead Paint Disclosure.pdf',
    type: 'document',
    status: 'pending',
    url: '#',
    uploadedBy: 'Sarah Jenkins',
    timestamp: '10 mins ago',
    size: '450 KB'
  }
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    participants: [
      { id: 'u1', name: 'Sarah Jenkins', role: 'seller' },
      { id: 'u3', name: 'Alex Rivera', role: 'agent' }
    ],
    lastMessage: "I've uploaded the lead paint disclosure. Can you check it?",
    lastMessageTime: '2 mins ago',
    unreadCount: 1,
    status: 'active',
    aiConfusionTrend: 'Questions about lead paint liability',
    messages: [
      { id: 'm1', senderId: 'u1', senderName: 'Sarah Jenkins', senderRole: 'seller', content: "Hi Alex, I'm stuck on Section 3 of the disclosure.", timestamp: '1 hour ago' },
      { id: 'm2', senderId: 'ai', senderName: 'AI Assistant', senderRole: 'support', content: "Section 3 usually refers to lead-based paint hazards. Are you looking for the specific year of construction?", timestamp: '55 mins ago', isAI: true },
      { id: 'm3', senderId: 'u1', senderName: 'Sarah Jenkins', senderRole: 'seller', content: "Yes, exactly. I've uploaded it now. Can you check it?", timestamp: '2 mins ago' },
    ]
  },
  {
    id: 'c2',
    participants: [
      { id: 'u2', name: 'Michael Chen', role: 'seller' },
      { id: 'u3', name: 'Alex Rivera', role: 'agent' }
    ],
    lastMessage: "When will my listing go live on MLS?",
    lastMessageTime: '5 hours ago',
    unreadCount: 0,
    status: 'delayed',
    aiConfusionTrend: 'MLS timeline expectations',
    messages: [
      { id: 'm4', senderId: 'u2', senderName: 'Michael Chen', senderRole: 'seller', content: "When will my listing go live on MLS?", timestamp: '5 hours ago' },
    ]
  }
];

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    role: 'seller',
    progress: 65,
    lastActivity: '2 mins ago',
    currentStep: 'Disclosure Form - Section 2',
    timeSpentAtStep: '4h 12m',
    isStuck: false,
    isHighValue: true,
  },
  {
    id: 'u2',
    name: 'Michael Chen',
    email: 'm.chen@example.com',
    role: 'seller',
    progress: 12,
    lastActivity: '26 hours ago',
    currentStep: 'Intake - Identity Verification',
    timeSpentAtStep: '25h 45m',
    isStuck: true,
    isHighValue: false,
  },
  {
    id: 'u3',
    name: 'Alex Rivera',
    email: 'arivera@agents.com',
    role: 'agent',
    progress: 100,
    lastActivity: 'Just now',
    currentStep: 'Reviewing Offers',
    timeSpentAtStep: '15m',
    isStuck: false,
    isHighValue: false,
  },
];

export const MOCK_LISTINGS: Listing[] = [
  {
    id: 'L-1001',
    address: '123 Maple Ave, Springfield',
    status: 'active',
    completionRate: 95,
    missingItems: [],
    assignedAgent: 'Alex Rivera',
    healthScore: 98,
    daysActive: 12,
  },
  {
    id: 'L-1002',
    address: '456 Oak Lane, Riverside',
    status: 'pre-listing',
    completionRate: 45,
    missingItems: ['Professional Photos', 'Signed Disclosure'],
    assignedAgent: 'Unassigned',
    healthScore: 62,
    daysActive: 4,
  },
];

export const MOCK_ALERTS: SystemAlert[] = [
  {
    id: 'a1',
    type: 'Stuck Flow',
    category: 'user',
    message: '5 users stuck in Disclosure Step > 24h',
    severity: 'critical',
    status: 'unresolved',
    timestamp: '10 mins ago',
    assignedTo: 'Alex Rivera',
  },
  {
    id: 'a2',
    type: 'Media Error',
    category: 'listing',
    message: 'Failed upload: L-1002 (403 Forbidden)',
    severity: 'warning',
    status: 'investigating',
    timestamp: '25 mins ago',
    affectedId: 'L-1002',
  },
  {
    id: 'a3',
    type: 'Security Breach',
    category: 'security',
    message: 'Multiple failed login attempts from IP: 192.168.1.1',
    severity: 'critical',
    status: 'unresolved',
    timestamp: '2 mins ago',
  },
  {
    id: 'a4',
    type: 'System Latency',
    category: 'system',
    message: 'API response times increased by 200ms in us-east-1',
    severity: 'info',
    status: 'resolved',
    timestamp: '1 hour ago',
  },
  {
    id: 'a5',
    type: 'Incomplete Profile',
    category: 'user',
    message: 'User Sarah Jenkins missing required ID verification',
    severity: 'warning',
    status: 'unresolved',
    timestamp: '3 hours ago',
    affectedId: 'u1',
    assignedTo: 'Admin',
  },
];

export const MOCK_ACTIVITY: ActivityEvent[] = [
  { id: 'e1', user: 'Sarah Jenkins', action: 'Uploaded Disclosure Part 1', timestamp: '2 mins ago' },
  { id: 'e2', user: 'System', action: 'Auto-flagged User Michael Chen (Stuck)', timestamp: '1 hour ago' },
  { id: 'e3', user: 'Alex Rivera', action: 'Updated Listing L-1001 status to Active', timestamp: '3 hours ago' },
];
