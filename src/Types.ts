export type STEEPVList =
  | 'All STEEP+V'
  | 'Social – issues related to human culture, demography, communication, movement and migration, work and education'
  | 'Technological – Made culture, tools, devices, systems, infrastructure and networks'
  | 'Economic – issues of value, money, financial tools and systems, business and business models, exchanges and transactions'
  | 'Environmental – The natural world, living environment, sustainability, resources, climate and health'
  | 'Political – legal issues, policy, governance, rules and regulations and organizational systems'
  | 'Values – ethics, spirituality, ideology or other forms of values';

export type SDGList =
  | 'GOAL 1: No Poverty'
  | 'GOAL 2: Zero Hunger'
  | 'GOAL 3: Good Health and Well-being'
  | 'GOAL 4: Quality Education'
  | 'GOAL 5: Gender Equality'
  | 'GOAL 6: Clean Water and Sanitation'
  | 'GOAL 7: Affordable and Clean Energy'
  | 'GOAL 8: Decent Work and Economic Growth'
  | 'GOAL 9: Industry, Innovation and Infrastructure'
  | 'GOAL 10: Reduced Inequality'
  | 'GOAL 11: Sustainable Cities and Communities'
  | 'GOAL 12: Responsible Consumption and Production'
  | 'GOAL 13: Climate Action'
  | 'GOAL 14: Life Below Water'
  | 'GOAL 15: Life on Land'
  | 'GOAL 16: Peace and Justice Strong Institutions'
  | 'GOAL 17: Partnerships to achieve the Goal';

export type SSList =
  | 'Poverty and Inequality'
  | 'Governance'
  | 'Resilience'
  | 'Environment'
  | 'Energy'
  | 'Gender Equality'
  | 'Digitalisation'
  | 'Strategic Innovation'
  | 'Development Financing';

export type HorizonList =
  | 'Horizon 1 (0-3Y)'
  | 'Horizon 2 (4-6Y)'
  | 'Horizon 3 (7+Y)';

export type RatingList = '1' | '2' | '3' | '4' | '5';

export type StatusList = 'New' | 'Approved' | 'Archived' | 'Draft';

export type LocationList =
  | 'Global'
  | 'Region: Asia Pacific'
  | 'Region: Arab States'
  | 'Region: Africa'
  | 'Region: Latin America and Caribbean'
  | 'Region: Europe and Central Asia'
  | 'Region: North America';

export interface SignalDataType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attachment?: any;
  created_at: string;
  created_by: string;
  description: string;
  headline: string;
  keywords: string[];
  location: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modifications: any;
  status?: StatusList;
  relevance: string;
  sdgs: SDGList[];
  signature_primary: SSList | '';
  signature_secondary: SSList | '';
  steep: STEEPVList;
  url: string;
  id: number;
  connected_trends: number[];
}

export interface TrendDataType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attachment?: any;
  created_at: string;
  created_by: string;
  description: string;
  headline: string;
  impact_description: string;
  impact_rating: 1 | 2 | 3 | 4 | 5;
  status?: StatusList;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modifications: any;
  time_horizon: 'Horizon 1 (0-3Y)' | 'Horizon 2 (4-6Y)' | 'Horizon 3 (7+Y)';
  signals: number[];
  id: number;
  connected_signals: number[];
}
export interface VisTrendDataType extends TrendDataType {
  x: number;
  y: number;
  vx: number;
  vy: number;
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
  steep: 'All STEEP+V' | STEEPVList;
  sdg: 'All SDGs' | SDGList;
  ss: 'All Signature Solutions/Enabler' | SSList;
  status: 'All Status' | StatusList;
  location: string;
  search?: string;
}

export interface TrendFiltersDataType {
  horizon: 'All Horizons' | HorizonList;
  impact: 'All Ratings' | RatingList;
  status: 'All Status' | StatusList;
  search?: string;
}

export interface ChoicesDataType {
  horizons: string[];
  locations: string[];
  ratings: string[];
  roles: string[];
  sdgs: string[];
  signatures: string[];
  steepv: string[];
  units: string[];
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
  updateUserName: (_d: string) => void;
  updateName: (_d?: string) => void;
  updateAccessToken: (_d?: string) => void;
  updateUnit: (_d?: string) => void;
  updateUserID: (_d?: number) => void;
  updateRole: (_d?: 'Admin' | 'Curator' | 'User') => void;
  updateExpiresOn: (_d: Date) => void;
  updateNotificationText: (_d?: string) => void;
  updateChoices: (_d?: ChoicesDataType) => void;
}
