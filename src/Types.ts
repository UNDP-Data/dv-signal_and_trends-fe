/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SignalDataType {
  attachments?: any;
  created_at: string;
  created_by: string;
  description: string;
  headline: string;
  keywords: string[];
  location: string | null;
  modifications: any;
  status?: 'New' | 'Approved' | 'Draft' | 'Archived';
  relevance: string;
  sdgs: string[];
  signature_primary: string;
  signature_secondary: string;
  steep: string;
  url: string;
  _id: string;
  connected_trends: string[];
}

export interface TrendDataType {
  created_at: string;
  created_by: string;
  description: string;
  headline: string;
  impact_description: string;
  impact_rating: 1 | 2 | 3 | 4 | 5;
  status?: 'New' | 'Approved' | 'Draft' | 'Archived';
  modifications: any;
  time_horizon: 'Horizon 1 (0-3Y)' | 'Horizon 2 (4-6Y)' | 'Horizon 3 (7+Y)';
  signals: string[];
  _id: string;
  connected_signals: string[];
}

export interface CtxDataType {
  userName?: string;
  name?: string;
  unit?: string;
  role?: 'Admin' | 'Curator' | 'Visitor';
  updateUserName: (_d: string) => void;
  updateName: (_d?: string) => void;
  updateUnit: (_d?: string) => void;
  updateRole: (_d?: 'Admin' | 'Curator' | 'Visitor') => void;
}

export interface UserDataType {
  created_at: string;
  email: string;
  name: string;
  role: 'Admin' | 'Curator' | 'Visitor';
  unit: string;
}
