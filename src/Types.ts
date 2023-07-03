export type StatusList = 'New' | 'Approved' | 'Archived' | 'Draft';

export interface SignalDataType {
  id: number;
  status: string;
  created_at: string;
  created_by: string;
  modified_at?: string;
  modified_by?: string;
  headline: string;
  description: string;
  attachment?: string;
  steep_primary: string;
  steep_secondary?: string[];
  signature_primary: string;
  signature_secondary?: string[];
  sdgs: string[];
  created_unit: string;
  url: string;
  relevance: string;
  keywords: string[];
  location: string;
  score?: string;
  connected_trends: number[];
  created_for?: string;
}

export interface NewSignalDataType {
  id?: number;
  status: string;
  created_at?: string;
  created_by?: string;
  modified_at?: string;
  modified_by?: string;
  headline?: string;
  description?: string;
  attachment?: string;
  steep_primary?: string;
  steep_secondary?: string[];
  signature_primary?: string;
  signature_secondary?: string[];
  sdgs?: string[];
  created_unit?: string;
  url?: string;
  relevance?: string;
  keywords: string[];
  location?: string;
  score?: string;
  connected_trends?: number[];
  created_for?: string;
}

export interface TrendDataType {
  id: number;
  status: string;
  created_at: string;
  created_by: string;
  created_for?: null;
  modified_at?: string;
  modified_by?: string;
  headline: string;
  description: string;
  attachment?: string;
  steep_primary?: string;
  steep_secondary?: string[];
  signature_primary?: string;
  signature_secondary?: string[];
  sdgs?: string[];
  assigned_to?: string;
  time_horizon: string;
  impact_rating: string;
  impact_description: string;
  connected_signals: number[];
}
export interface NewTrendDataType {
  id?: number;
  status: string;
  created_at?: string;
  created_by?: string;
  created_for?: null;
  modified_at?: string;
  modified_by?: string;
  headline?: string;
  description?: string;
  attachment?: string;
  steep_primary?: string;
  steep_secondary?: string[];
  signature_primary?: string;
  signature_secondary?: string[];
  sdgs?: string[];
  assigned_to?: string;
  time_horizon?: string;
  impact_rating?: string;
  impact_description?: string;
  connected_signals: number[];
}

export interface UserDataType {
  created_at: string;
  email: string;
  name: string;
  role: 'Admin' | 'Curator' | 'User';
  unit: string;
  id: number;
}

export interface SignalFiltersDataType {
  steep: 'All STEEP+V' | string;
  sdg: 'All SDGs' | string;
  ss: 'All Signature Solutions/Enabler' | string;
  status: 'All Status' | string;
  score: 'All Scores' | string;
  location: string;
  search?: string;
}

export interface TrendFiltersDataType {
  horizon: 'All Horizons' | string;
  impact: 'All Ratings' | string;
  status: 'All Status' | string;
  search?: string;
}

export interface ChoicesDataType {
  horizons: string[];
  created_for: string[];
  locations: string[];
  ratings: string[];
  roles: string[];
  sdgs: string[];
  signatures: string[];
  steepv: string[];
  unit_names: string[];
  unit_regions: string[];
  scores: string[];
}

export interface CardsToPrintDataType {
  type: 'trend' | 'signal';
  id: string;
}

export interface CtxDataType {
  userName?: string;
  name?: string;
  unit?: string;
  role?: 'Admin' | 'Curator' | 'User';
  accessToken?: string;
  userID?: number;
  expiresOn?: Date;
  notificationText?: string;
  choices?: ChoicesDataType;
  cardsToPrint: CardsToPrintDataType[];
  updateUserName: (_d: string) => void;
  updateName: (_d?: string) => void;
  updateAccessToken: (_d?: string) => void;
  updateUnit: (_d?: string) => void;
  updateUserID: (_d?: number) => void;
  updateRole: (_d?: 'Admin' | 'Curator' | 'User') => void;
  updateExpiresOn: (_d: Date) => void;
  updateNotificationText: (_d?: string) => void;
  updateChoices: (_d?: ChoicesDataType) => void;
  updateCardsToPrint: (_d: CardsToPrintDataType[]) => void;
}

export interface ObjForPrintingDataType {
  type: 'trend' | 'signal';
  data: SignalDataType | TrendDataType;
}
