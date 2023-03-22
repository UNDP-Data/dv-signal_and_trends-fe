import UNDPColorModule from 'undp-viz-colors';

export const API_ACCESS_TOKEN = import.meta.env.VITE_ACCESS_CODE;

export const SDG = [
  'GOAL 1: No Poverty',
  'GOAL 2: Zero Hunger',
  'GOAL 3: Good Health and Well-being',
  'GOAL 4: Quality Education',
  'GOAL 5: Gender Equality',
  'GOAL 6: Clean Water and Sanitation',
  'GOAL 7: Affordable and Clean Energy',
  'GOAL 8: Decent Work and Economic Growth',
  'GOAL 9: Industry, Innovation and Infrastructure',
  'GOAL 10: Reduced Inequality',
  'GOAL 11: Sustainable Cities and Communities',
  'GOAL 12: Responsible Consumption and Production',
  'GOAL 13: Climate Action',
  'GOAL 14: Life Below Water',
  'GOAL 15: Life on Land',
  'GOAL 16: Peace and Justice Strong Institutions',
  'GOAL 17: Partnerships to achieve the Goal',
];

export const SIGNATURE_SOLUTION = [
  'Poverty and Inequality',
  'Governance',
  'Resilience',
  'Environment',
  'Energy',
  'Gender Equality',
];

export const LOCATION = [
  'Global',
  'Region: Asia Pacific',
  'Region: Arab States',
  'Region: Africa',
  'Region: Latin America and Caribbean',
  'Region: Europe and Central Asia',
  'Region: North America',
];

export const HORIZON = [
  'Horizon 1 (0-3Y)',
  'Horizon 2 (4-6Y)',
  'Horizon 3 (7+Y)',
];

export const STEEP_V = [
  'Social – issues related to human culture, demography, communication, movement and migration, work and education',
  'Technological – Made culture, tools, devices, systems, infrastructure and networks',
  'Economic – issues of value, money, financial tools and systems, business and business models, exchanges and transactions',
  'Environmental – The natural world, living environment, sustainability, resources, climate and health',
  'Political – legal issues, policy, governance, rules and regulations and organizational systems',
  'Values – ethics, spirituality, ideology or other forms of values',
];

export const HORIZONVALUES = [
  {
    value: 'Horizon 1 (7+Y)',
    textColor: UNDPColorModule.categoricalColors.colors[6],
  },
  {
    value: 'Horizon 2 (4-6Y)',
    textColor: UNDPColorModule.categoricalColors.colors[7],
  },
  {
    value: 'Horizon 1 (0-3Y)',
    textColor: UNDPColorModule.categoricalColors.colors[8],
  },
];

export const STEEPVCOLOR = [
  {
    value: 'Social',
    textColor: UNDPColorModule.categoricalColors.colors[0],
  },
  {
    value: 'Technological',
    textColor: UNDPColorModule.categoricalColors.colors[1],
  },
  {
    value: 'Economic',
    textColor: UNDPColorModule.categoricalColors.colors[2],
  },
  {
    value: 'Environmental',
    textColor: UNDPColorModule.categoricalColors.colors[3],
  },
  {
    value: 'Political',
    textColor: UNDPColorModule.categoricalColors.colors[4],
  },
  {
    value: 'Values',
    textColor: UNDPColorModule.categoricalColors.colors[5],
  },
];

export const SSCOLOR = [
  {
    value: 'Poverty and Inequality',
    textColor: UNDPColorModule.sdgColors.sdg1,
  },
  {
    value: 'Governance',
    textColor: UNDPColorModule.sdgColors.sdg16,
  },
  {
    value: 'Resilience',
    textColor: UNDPColorModule.categoricalColors.colors[8],
  },
  {
    value: 'Environment',
    textColor: UNDPColorModule.categoricalColors.colors[9],
  },
  {
    value: 'Energy',
    textColor: UNDPColorModule.categoricalColors.colors[0],
  },
  {
    value: 'Gender Equality',
    textColor: UNDPColorModule.sdgColors.sdg5,
  },
];

export const SDGCOLOR = [
  {
    value: 'GOAL 1: No Poverty',
    textColor: UNDPColorModule.sdgColors.sdg1,
  },
  {
    value: 'GOAL 2: Zero Hunger',
    textColor: UNDPColorModule.sdgColors.sdg2,
  },
  {
    value: 'GOAL 3: Good Health and Well-being',
    textColor: UNDPColorModule.sdgColors.sdg3,
  },
  {
    value: 'GOAL 4: Quality Education',
    textColor: UNDPColorModule.sdgColors.sdg4,
  },
  {
    value: 'GOAL 5: Gender Equality',
    textColor: UNDPColorModule.sdgColors.sdg5,
  },
  {
    value: 'GOAL 6: Clean Water and Sanitation',
    textColor: UNDPColorModule.sdgColors.sdg6,
  },
  {
    value: 'GOAL 7: Affordable and Clean Energy',
    textColor: UNDPColorModule.sdgColors.sdg7,
  },
  {
    value: 'GOAL 8: Decent Work and Economic Growth',
    textColor: UNDPColorModule.sdgColors.sdg8,
  },
  {
    value: 'GOAL 9: Industry, Innovation and Infrastructure',
    textColor: UNDPColorModule.sdgColors.sdg9,
  },
  {
    value: 'GOAL 10: Reduced Inequality',
    textColor: UNDPColorModule.sdgColors.sdg10,
  },
  {
    value: 'GOAL 11: Sustainable Cities and Communities',
    textColor: UNDPColorModule.sdgColors.sdg11,
  },
  {
    value: 'GOAL 12: Responsible Consumption and Production',
    textColor: UNDPColorModule.sdgColors.sdg12,
  },
  {
    value: 'GOAL 13: Climate Action',
    textColor: UNDPColorModule.sdgColors.sdg13,
  },
  {
    value: 'GOAL 14: Life Below Water',
    textColor: UNDPColorModule.sdgColors.sdg14,
  },
  {
    value: 'GOAL 15: Life on Land',
    textColor: UNDPColorModule.sdgColors.sdg15,
  },
  {
    value: 'GOAL 16: Peace and Justice Strong Institutions',
    textColor: UNDPColorModule.sdgColors.sdg16,
  },
  {
    value: 'GOAL 17: Partnerships to achieve the Goal',
    textColor: UNDPColorModule.sdgColors.sdg17,
  },
];

export const HORIZONTYPE = {
  '2021-2022': 'Short Term',
  '2022-2023': 'Short Term',
  '2023-2025': 'Medium Term',
  '2024-2025': 'Medium Term',
  '2026-2030': 'Long Term',
};

export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const UNITS = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Angola',
  'Anguilla',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Azerbaijan',
  'BERA',
  'BMS',
  'BPPS',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei Darussalam',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Cayman Islands',
  'Central African Republic',
  'Chad',
  'Chief Digital Office',
  'Chief Digital Office (CDO)',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo',
  'Cook Islands',
  'Costa Rica',
  'Crisis Bureau (CB)',
  'Cuba',
  'Curacao and Sint Maarten',
  'Cyprus (project office)',
  'Côte d’Ivoire',
  'DPRK',
  'Democratic Republic of Congo',
  'Development financing',
  'Djibouti',
  'Dom. Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Eswatini',
  'Ethiopia',
  'Executive Office (ExO)',
  'External',
  'Federated States of Micronesia',
  'Fiji MCO',
  'Future Fellows',
  'Gabon',
  'Gambia',
  'Georgia',
  'Ghana',
  'Global Centre for Technology, Innovation and Sustainable Development (Singapore)',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Guyana-Suriname',
  'Haiti',
  'Human Development Report Office (HDRO)',
  'Independent Evaluation Office (IEO)',
  'Istanbul International Center for Private Sector in Development (Istanbul, Turkey)',
  'Nairobi Global Centre on Resilient Ecosystems and Desertification (Nairobi, Kenya)',
  'Office of Audit and Investigations (OAI)',
  'Oslo Governance Centre (Oslo, Norway)',
  'Regional Bureau for Africa, New York, USA',
  'Regional Bureau for Arab States, New York, USA',
  'Regional Bureau for Asia and the Pacific, New York',
  'Regional Bureau for Europe and the CIS, New York, USA',
  'Regional Bureau for Latin America and the Caribbean, New York, USA',
  'Regional Centre: Panama City, Panama',
  'Regional Hub: Amman, Jordan',
  'Regional Hub: Bangkok, Thailand',
  'Regional Hub: Dakar, Senegal',
  'Regional Hub: Istanbul, Turkey',
  'Regional Hub: Nairobi, Kenya',
  'Regional Hub: Pretoria, South Africa',
  'Regional Service Centre: Addis Ababa, Ethiopia',
  'UNDP Nordic Representation Office (Copenhagen, Denmark)',
  'UNDP Office in Geneva (Geneva, Switzerland)',
  'UNDP Representation Office in Brussels (Brussels, Belgium)',
  'UNDP Representation Office in Japan (Tokyo, Japan)',
  'UNDP Seoul Policy Centre for Knowledge Exchange through SDG Partnerships (Seoul, Republic of Korea)',
  'UNDP Washington Representation Office (Washington, USA)',
];
