export type ShipmentStatus = 'pending' | 'in_transit' | 'delivered' | 'delayed' | 'cancelled';

export interface Shipment {
  id: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  carrier: string;
  weight: number;
  estimatedDelivery: string;
  createdAt: string;
  customer: string;
  description: string;
  currentLocation: string;
  progress: number; // 0-100
  priority?: 'Standard' | 'Express' | 'Urgent';
}


export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'driver' | 'customer';
  avatar: string;
  joinedAt: string;
  shipmentCount: number;
  status: 'active' | 'inactive';
}

export interface Stat {
  label: string;
  value: string;
  change: number;
  icon: string;
}

export interface RouteStop {
  city: string;
  country: string;
  timestamp: string;
  status: 'completed' | 'current' | 'upcoming';
  lat: number;
  lng: number;
}
