import { Shipment, User, RouteStop } from '@/types';

export const mockShipments: Shipment[] = [
  {
    id: '1',
    trackingNumber: 'LGX-2024-001',
    origin: 'Mumbai, Maharashtra',
    destination: 'Delhi, NCR',
    status: 'in_transit',
    carrier: 'Kingpin Ground',
    weight: 450,
    estimatedDelivery: '2024-04-18',
    createdAt: '2024-04-12',
    customer: 'Priya Sharma',
    description: 'Electronics & Consumer Goods',
    currentLocation: 'Ahmedabad, Gujarat',
    progress: 75,
    priority: 'Express',
  },
  {
    id: '2',
    trackingNumber: 'LGX-2024-002',
    origin: 'Chennai, Tamil Nadu',
    destination: 'Kolkata, West Bengal',
    status: 'delivered',
    carrier: 'SeaLink Coastal',
    weight: 1200,
    estimatedDelivery: '2024-04-10',
    createdAt: '2024-04-01',
    customer: 'Ravi Menon',
    description: 'Textile & Apparel',
    currentLocation: 'Kolkata, West Bengal',
    progress: 100,
    priority: 'Standard',
  },
  {
    id: '3',
    trackingNumber: 'LGX-2024-003',
    origin: 'Bangalore, Karnataka',
    destination: 'Pune, Maharashtra',
    status: 'delayed',
    carrier: 'SkyRoute Cargo',
    weight: 320,
    estimatedDelivery: '2024-04-20',
    createdAt: '2024-04-08',
    customer: 'Aisha Khan',
    description: 'Pharmaceuticals',
    currentLocation: 'Hubballi, Karnataka',
    progress: 55,
    priority: 'Urgent',
  },
  {
    id: '4',
    trackingNumber: 'LGX-2024-004',
    origin: 'Delhi, NCR',
    destination: 'Jaipur, Rajasthan',
    status: 'pending',
    carrier: 'Kingpin Ground',
    weight: 780,
    estimatedDelivery: '2024-04-25',
    createdAt: '2024-04-13',
    customer: 'Suresh Patel',
    description: 'IT Hardware',
    currentLocation: 'Gurugram, Haryana',
    progress: 15,
    priority: 'Standard',
  },
  {
    id: '5',
    trackingNumber: 'LGX-2024-005',
    origin: 'Kolkata, West Bengal',
    destination: 'Guwahati, Assam',
    status: 'in_transit',
    carrier: 'Ganges Express',
    weight: 210,
    estimatedDelivery: '2024-04-17',
    createdAt: '2024-04-10',
    customer: 'Maya Ghosh',
    description: 'Handicrafts & Artworks',
    currentLocation: 'Siliguri, West Bengal',
    progress: 62,
    priority: 'Express',
  },
  {
    id: '6',
    trackingNumber: 'LGX-2024-006',
    origin: 'Hyderabad, Telangana',
    destination: 'Kochi, Kerala',
    status: 'cancelled',
    carrier: 'Southern Freight',
    weight: 90,
    estimatedDelivery: '2024-04-15',
    createdAt: '2024-04-05',
    customer: 'Vikram Joshi',
    description: 'Auto Spare Parts',
    currentLocation: 'Cancelled',
    progress: 0,
    priority: 'Standard',
  },
];

export const mockUsers: User[] = [
  { id: '1', name: 'Arjun Nair', email: 'arjun@kingpinlogistics.in', role: 'admin', avatar: 'AN', joinedAt: '2023-01-15', shipmentCount: 142, status: 'active' },
  { id: '2', name: 'Priya Sharma', email: 'priya@globalship.com', role: 'manager', avatar: 'PS', joinedAt: '2023-03-22', shipmentCount: 89, status: 'active' },
  { id: '3', name: 'Ravi Menon', email: 'ravi@seaways.in', role: 'customer', avatar: 'RM', joinedAt: '2023-06-10', shipmentCount: 34, status: 'active' },
  { id: '4', name: 'Aisha Khan', email: 'aisha@pharmaex.com', role: 'customer', avatar: 'AK', joinedAt: '2023-08-05', shipmentCount: 21, status: 'inactive' },
  { id: '5', name: 'Suresh Patel', email: 'suresh@techimport.io', role: 'driver', avatar: 'SP', joinedAt: '2024-01-02', shipmentCount: 67, status: 'active' },
];

export const routeStops: RouteStop[] = [
  { city: 'Mumbai', country: 'India', timestamp: 'Apr 12, 09:00', status: 'completed', lat: 19.08, lng: 72.88 },
  { city: 'Ahmedabad', country: 'India', timestamp: 'Apr 14, 14:30', status: 'current', lat: 23.02, lng: 72.57 },
  { city: 'Delhi', country: 'India', timestamp: 'Apr 18, 10:00', status: 'upcoming', lat: 28.61, lng: 77.20 },
];

export const dashboardStats = [
  { label: 'Total Shipments', value: '1,284', change: 12.5, icon: '📦' },
  { label: 'In Transit', value: '342', change: 8.2, icon: '🚚' },
  { label: 'Delivered Today', value: '87', change: 4.1, icon: '✅' },
  { label: 'Delayed', value: '23', change: -15.3, icon: '⚠️' },
  { label: 'Revenue (₹)', value: '₹48.2L', change: 18.7, icon: '💰' },
  { label: 'Active Routes', value: '64', change: 6.9, icon: '🗺️' },
];

export const weeklyData = [
  { day: 'Mon', shipments: 120, delivered: 98 },
  { day: 'Tue', shipments: 145, delivered: 130 },
  { day: 'Wed', shipments: 98, delivered: 85 },
  { day: 'Thu', shipments: 167, delivered: 150 },
  { day: 'Fri', shipments: 189, delivered: 170 },
  { day: 'Sat', shipments: 75, delivered: 68 },
  { day: 'Sun', shipments: 42, delivered: 38 },
];

export interface AiInsight {
  type: 'warning' | 'success' | 'info' | 'alert';
  emoji: string;
  label: string;
  sub: string;
  confidence: number;
}

export const aiInsights: AiInsight[] = [
  { type: 'alert', emoji: '🔴', label: 'Delay Risk — LGX-2024-003', sub: 'Heavy rain approaching Hubballi. 87% probability of 2-day delay. Re-route via Solapur recommended.', confidence: 87 },
  { type: 'success', emoji: '✨', label: 'Route Optimization Saved ₹45,000', sub: 'AI re-optimized 12 routes this week using real-time traffic & toll data.', confidence: 98 },
  { type: 'warning', emoji: '⚠️', label: 'Highway Congestion — NH-48 (Apr 16–18)', sub: 'NH-48 near Surat is 34% above-average volume. Expect 6–14h delays for ground freight.', confidence: 79 },
  { type: 'info', emoji: '📊', label: 'Demand Surge Forecast — Next 7 Days', sub: 'AI predicts 23% increase in inbound orders to Delhi NCR. Pre-allocate 18 truck fleets.', confidence: 72 },
];

export interface ChatMessage {
  role: 'bot' | 'user';
  text: string;
  time: string;
}

export const initialMessages: ChatMessage[] = [
  { role: 'bot', text: "Hi! I'm Kingpin AI, your intelligent logistics copilot. I can help you track shipments, analyze delays, optimize routes, and answer questions about your operations. What would you like to know?", time: 'Just now' },
];

const aiResponses: Record<string, string> = {
  delayed: "I found 1 delayed shipment: LGX-2024-003 (Bangalore → Pune) is currently held at Hubballi due to weather. I recommend re-routing via Solapur — it saves ~6 hours. Shall I apply the change?",
  transit: "You have 2 shipments in transit right now:\n• LGX-2024-001 (Mumbai → Delhi) — 75% complete, ETA Apr 18\n• LGX-2024-005 (Kolkata → Guwahati) — 62% complete, ETA Apr 17",
  eta: "Based on current speed and route conditions, LGX-2024-001 is estimated to arrive in Delhi on April 18 at 10:00 AM — right on schedule.",
  optimize: "I've analyzed all active routes. Mumbai → Delhi via Ahmedabad is optimal (94% efficiency). Bangalore → Pune shows congestion — switching to Solapur route improves efficiency by 22%.",
  revenue: "This week's revenue stands at ₹48.2L — up 18.7% vs last week. Top earner is Ground Freight (62% of revenue). I forecast ₹52L next week based on pending orders.",
  summary: "Operations Summary:\n• 1,284 total shipments\n• 342 in transit, 87 delivered today\n• 23 delayed (1 critical)\n• ₹48.2L revenue this week\n• AI identified ₹45K in route savings",
  carriers: "Carrier performance this week:\n• Kingpin Ground — 96% on-time ✅\n• SeaLink Coastal — 88% on-time ✅\n• SkyRoute Cargo — 74% on-time ⚠️\n• Ganges Express — 91% on-time ✅",
  default: "I can help with delayed shipments, ETAs, route optimization, revenue insights, or carrier performance. Could you be more specific about what you'd like to know?",
};

export function getAiResponse(input: string): string {
  const q = input.toLowerCase();
  if (q.includes('delay') || q.includes('late')) return aiResponses.delayed;
  if (q.includes('transit') || q.includes('moving')) return aiResponses.transit;
  if (q.includes('eta') || q.includes('arrive') || q.includes('when') || q.includes('001')) return aiResponses.eta;
  if (q.includes('optim') || q.includes('route')) return aiResponses.optimize;
  if (q.includes('revenue') || q.includes('money') || q.includes('earn')) return aiResponses.revenue;
  if (q.includes('summar') || q.includes('overview') || q.includes('status')) return aiResponses.summary;
  if (q.includes('carrier') || q.includes('performance')) return aiResponses.carriers;
  return aiResponses.default;
}

export const aiMetrics = [
  { val: '94.2%', lbl: 'Prediction Accuracy' },
  { val: '₹2.1L', lbl: 'Monthly Savings' },
  { val: '340ms', lbl: 'Avg Response Time' },
  { val: '12,840', lbl: 'Decisions Made' },
];

