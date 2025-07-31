export interface User {
  id: string;
  email: string;
  name: string;
  role: 'individual' | 'org_admin' | 'org_member';
  organizationId?: string;
  avatar?: string;
  createdAt: string;
}

export interface Organization {
  id: string;
  name: string;
  adminId: string;
  members: User[];
  settings: {
    carbonTargets: {
      monthly: number;
      yearly: number;
    };
    benchmarks: {
      industry: string;
      size: string;
    };
  };
  createdAt: string;
}

export interface FootprintData {
  id: string;
  userId: string;
  date: string;
  travel: number;
  homeEnergy: number;
  foodPurchases: number;
  total: number;
  source: 'manual' | 'api' | 'integration';
  metadata?: {
    location?: string;
    weather?: string;
    notes?: string;
  };
}

export interface Integration {
  id: string;
  name: string;
  type: 'energy' | 'transport' | 'finance' | 'smart_home';
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string;
  config: Record<string, any>;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'achievement' | 'alert' | 'reminder' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  data?: Record<string, any>;
}

export interface APIKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  lastUsed?: string;
  createdAt: string;
}

export type TabType = 'dashboard' | 'calculator' | 'reports' | 'admin' | 'api' | 'profile' | 'notifications';