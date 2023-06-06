import UNDPColorModule from 'undp-viz-colors';

export const API_ACCESS_TOKEN = import.meta.env.VITE_ACCESS_CODE;

export const HORIZONVALUES = [
  {
    value: 'Horizon 1 (0-3Y)',
    textColor: UNDPColorModule.categoricalColors.colors[8],
  },
  {
    value: 'Horizon 2 (4-6Y)',
    textColor: UNDPColorModule.categoricalColors.colors[7],
  },
  {
    value: 'Horizon 3 (7+Y)',
    textColor: UNDPColorModule.categoricalColors.colors[6],
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
    textColor: UNDPColorModule.sdgColors.sdg16,
  },
  {
    value: 'Environment',
    textColor: UNDPColorModule.sdgColors.sdg14,
  },
  {
    value: 'Energy',
    textColor: UNDPColorModule.sdgColors.sdg7,
  },
  {
    value: 'Gender Equality',
    textColor: UNDPColorModule.sdgColors.sdg5,
  },
  {
    value: 'Strategic Innovation',
    textColor: UNDPColorModule.categoricalColors.colors[0],
  },
  {
    value: 'Digitalisation',
    textColor: UNDPColorModule.categoricalColors.colors[1],
  },
  {
    value: 'Development Financing',
    textColor: UNDPColorModule.categoricalColors.colors[2],
  },
  {
    value: 'Others',
    textColor: '#000000',
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

export const NO_OF_ITEMS_IN_PAGE = 25;

export const CHOICES = {
  roles: ['Admin', 'Curator', 'User', 'Visitor'],
  steepv: [
    'Social – issues related to human culture, demography, communication, movement and migration, work and education',
    'Technological – Made culture, tools, devices, systems, infrastructure and networks',
    'Economic – issues of value, money, financial tools and systems, business and business models, exchanges and transactions',
    'Environmental – The natural world, living environment, sustainability, resources, climate and health',
    'Political – legal issues, policy, governance, rules and regulations and organizational systems',
    'Values – ethics, spirituality, ideology or other forms of values',
  ],
  signatures: [
    'Poverty and Inequality',
    'Governance',
    'Resilience',
    'Environment',
    'Energy',
    'Gender Equality',
    'Strategic Innovation',
    'Digitalisation',
    'Development Financing',
    'Others',
  ],
  locations: [
    'Global',
    'Region: Asia Pacific',
    'Region: Arab States',
    'Region: Africa',
    'Region: Latin America and Caribbean',
    'Region: Europe and Central Asia',
    'Region: North America',
    'Afghanistan',
    'Åland Islands',
    'Albania',
    'Algeria',
    'American Samoa',
    'Andorra',
    'Angola',
    'Anguilla',
    'Antarctica',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Aruba',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bermuda',
    'Bhutan',
    'Bolivia (Plurinational State of)',
    'Bonaire, Sint Eustatius and Saba',
    'Bosnia and Herzegovina',
    'Botswana',
    'Bouvet Island',
    'Brazil',
    'British Indian Ocean Territory',
    'British Virgin Islands',
    'Brunei Darussalam',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cayman Islands',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'China, Hong Kong Special Administrative Region',
    'China, Macao Special Administrative Region',
    'Christmas Island',
    'Cocos (Keeling) Islands',
    'Colombia',
    'Comoros',
    'Congo',
    'Cook Islands',
    'Costa Rica',
    'Côte d’Ivoire',
    'Croatia',
    'Cuba',
    'Curaçao',
    'Cyprus',
    'Czechia',
    "Democratic People's Republic of Korea",
    'Democratic Republic of the Congo',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini',
    'Ethiopia',
    'Falkland Islands (Malvinas)',
    'Faroe Islands',
    'Fiji',
    'Finland',
    'France',
    'French Guiana',
    'French Polynesia',
    'French Southern Territories',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Gibraltar',
    'Greece',
    'Greenland',
    'Grenada',
    'Guadeloupe',
    'Guam',
    'Guatemala',
    'Guernsey',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Heard Island and McDonald Islands',
    'Holy See',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran (Islamic Republic of)',
    'Iraq',
    'Ireland',
    'Isle of Man',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jersey',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Kuwait',
    'Kyrgyzstan',
    "Lao People's Democratic Republic",
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Martinique',
    'Mauritania',
    'Mauritius',
    'Mayotte',
    'Mexico',
    'Micronesia (Federated States of)',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Montserrat',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands (Kingdom of the)',
    'New Caledonia',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'Niue',
    'Norfolk Island',
    'North Macedonia',
    'Northern Mariana Islands',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Pitcairn',
    'Poland',
    'Portugal',
    'Puerto Rico',
    'Qatar',
    'Republic of Korea',
    'Republic of Moldova',
    'Réunion',
    'Romania',
    'Russian Federation',
    'Rwanda',
    'Saint Barthélemy',
    'Saint Helena',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Martin (French Part)',
    'Saint Pierre and Miquelon',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Sark',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Sint Maarten (Dutch part)',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Georgia and the South Sandwich Islands',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'State of Palestine',
    'Sudan',
    'Suriname',
    'Svalbard and Jan Mayen Islands',
    'Sweden',
    'Switzerland',
    'Syrian Arab Republic',
    'Tajikistan',
    'Thailand',
    'Timor-Leste',
    'Togo',
    'Tokelau',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Türkiye',
    'Turkmenistan',
    'Turks and Caicos Islands',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom of Great Britain and Northern Ireland',
    'United Republic of Tanzania',
    'United States Minor Outlying Islands',
    'United States of America',
    'United States Virgin Islands',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Venezuela (Bolivarian Republic of)',
    'Viet Nam',
    'Wallis and Futuna Islands',
    'Western Sahara',
    'Yemen',
    'Zambia',
    'Zimbabwe',
  ],
  sdgs: [
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
  ],
  horizons: ['Horizon 1 (0-3Y)', 'Horizon 2 (4-6Y)', 'Horizon 3 (7+Y)'],
  ratings: ['1', '2', '3', '4', '5'],
  statuses: ['Draft', 'New', 'Approved', 'Archived'],
  units: [
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
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belize',
    'Benin',
    'BERA',
    'Bermuda',
    'Bhutan',
    'BMS',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'BPPS',
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
    'Côte d’Ivoire',
    'Crisis Bureau (CB)',
    'Cuba',
    'Curacao and Sint Maarten',
    'Cyprus (project office)',
    'Democratic Republic of Congo',
    'Development financing',
    'Djibouti',
    'Dom. Republic',
    'DPRK',
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
    'Honduras',
    'Human Development Report Office (HDRO)',
    'Independent Evaluation Office (IEO)',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Istanbul International Center for Private Sector in Development (Istanbul, Turkey)',
    'Jamaica',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Kosovo (as per UNSCR 1244)',
    'Kuwait',
    'Kyrgyzstan',
    'Lao PDR',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Madagascar',
    'Malawi',
    'Malaysia MCO',
    'Maldives',
    'Mali',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Moldova',
    'Mongolia',
    'Montserrat',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Nairobi Global Centre on Resilient Ecosystems and Desertification (Nairobi, Kenya)',
    'Namibia',
    'Nauru',
    'Nepal',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'Niue',
    'North Macedonia',
    'Office of Audit and Investigations (OAI)',
    'Oslo Governance Centre (Oslo, Norway)',
    'Pakistan',
    'Palau',
    'Panama',
    'Paraguay',
    'People',
    'Peru',
    'Philippines',
    'PNG',
    'Prog for Palestinian',
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
    'Republic of Belarus',
    'Republic of Cape Verde',
    'Republic of Montenegro',
    'Republic of South Sudan',
    'Republic of the',
    'Republic of the Sudan',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia and Saint Vincent',
    'Samoa MCO',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'Sri Lanka',
    'Suriname',
    'Syria',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'The Bahamas',
    'the British Virgin Islands',
    'the Commonwealth of Dominica',
    'the Grenadines',
    'Timor Leste',
    'Togo',
    'Tokelau',
    'Tonga',
    'Trinidad & Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Turks and Caicos Islands',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'UNDP Nordic Representation Office (Copenhagen, Denmark)',
    'UNDP Office in Geneva (Geneva, Switzerland)',
    'UNDP Representation Office in Brussels (Brussels, Belgium)',
    'UNDP Representation Office in Japan (Tokyo, Japan)',
    'UNDP Seoul Policy Centre for Knowledge Exchange through SDG Partnerships (Seoul, Republic of Korea)',
    'UNDP Washington Representation Office (Washington, USA)',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Venezuela',
    'Viet Nam',
    'Yemen',
    'Zambia',
    'Zimbabwe',
  ],
};
