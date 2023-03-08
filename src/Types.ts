/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SignalDataType {
  attachments?: any;
  created_at: string;
  created_by: {
    email: string;
    name: string;
    unit: string;
  };
  description: string;
  headline: string;
  keywords: string[];
  location: string | null;
  modifications: any;
  relevance: string;
  sdgs: string[];
  signature_primary: string;
  signature_secondary: string;
  steep: string;
  url: string;
  _id: string;
}

export interface TrendDataType {
  created_at: string;
  created_by: {
    email: string;
  };
  description: string;
  headline: string;
  impact_description: string;
  impact_rating: 1 | 2 | 3 | 4 | 5;
  modifications: any;
  time_horizon: 'Horizon 1 (0-3Y)' | 'Horizon 2 (4-6Y)' | 'Horizon 3 (7+Y)';
  signals: string[];
  _id: string;
}
