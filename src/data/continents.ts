export interface ContinentInfo {
  name: string;
  displayName: string;
  icon: string; // Emoji ou icône pour le continent
  countries: string[]; // Codes ISO 2 lettres
  zoomConfig: {
    scale: number;
    centerLat: number;
    centerLon: number;
  };
}

export const CONTINENTS: { [key: string]: ContinentInfo } = {
  'world': {
    name: 'world',
    displayName: 'Monde entier',
    icon: '🌍',
    countries: [], // Vide = tous les pays
    zoomConfig: {
      scale: 180,
      centerLat: 0,
      centerLon: 0
    }
  },
  'europe': {
    name: 'europe',
    displayName: 'Europe',
    icon: '🏀',
    countries: [
      'FR', 'DE', 'IT', 'ES', 'GB', 'NO', 'SE', 'DK', 'FI', 'NL', 'BE', 'CH', 'AT', 
      'PT', 'GR', 'PL', 'CZ', 'HU', 'RO', 'UA', 'IE', 'IS', 'LU', 'HR', 'RS', 
      'BA', 'SI', 'SK', 'BG', 'LT', 'LV', 'EE'
    ],
    zoomConfig: {
      scale: 600,
      centerLat: 54,
      centerLon: 15
    }
  },
  'africa': {
    name: 'africa',
    displayName: 'Afrique',
    icon: '🦁',
    countries: [
      'MA', 'DZ', 'TN', 'LY', 'EG', 'SD', 'ET', 'NG', 'KE', 'ZA', 'GH', 'CI', 
      'SN', 'CM', 'TZ', 'UG', 'ZM', 'ZW', 'BW', 'NA', 'AO', 'MZ', 'MG', 'CD', 
      'CG', 'GA', 'GQ', 'TD', 'CF', 'ML', 'BF', 'NE', 'MR', 'GN', 'SL', 'LR', 
      'TG', 'BJ', 'RW', 'BI', 'MW', 'SO', 'ER', 'DJ', 'LS', 'SZ'
    ],
    zoomConfig: {
      scale: 400,
      centerLat: 0,
      centerLon: 20
    }
  },
  'asia': {
    name: 'asia',
    displayName: 'Asie',
    icon: '🏕️',
    countries: [
      'CN', 'IN', 'RU', 'JP', 'TR', 'IR', 'IQ', 'SA', 'IL', 'TH', 'VN', 'KR', 
      'KP', 'ID', 'MY', 'PH', 'SG', 'AF', 'PK', 'BD', 'LK', 'MM', 'KH', 'LA', 
      'MN', 'KZ', 'UZ', 'JO', 'LB', 'SY', 'KW', 'AE', 'QA', 'OM', 'YE'
    ],
    zoomConfig: {
      scale: 300,
      centerLat: 30,
      centerLon: 100
    }
  },
  'north-america': {
    name: 'north-america',
    displayName: 'Amérique du Nord',
    icon: '🇺🇸',
    countries: [
      'US', 'CA', 'MX', 'GT', 'BZ', 'SV', 'HN', 'NI', 'CR', 'PA', 'CU', 'JM', 
      'DO', 'HT', 'GL'
    ],
    zoomConfig: {
      scale: 300,
      centerLat: 45,
      centerLon: -100
    }
  },
  'south-america': {
    name: 'south-america',
    displayName: 'Amérique du Sud',
    icon: '🇬🇾',
    countries: [
      'BR', 'AR', 'PE', 'CL', 'CO', 'VE', 'EC', 'UY', 'PY', 'BO', 'GY', 'SR'
    ],
    zoomConfig: {
      scale: 400,
      centerLat: -15,
      centerLon: -60
    }
  },
  'oceania': {
    name: 'oceania',
    displayName: 'Océanie',
    icon: '🌴',
    countries: [
      'AU', 'NZ'
    ],
    zoomConfig: {
      scale: 300,
      centerLat: -25,
      centerLon: 140
    }
  }
};

export const getContinentByCountry = (countryCode: string): string => {
  for (const [continentKey, continent] of Object.entries(CONTINENTS)) {
    if (continent.countries.includes(countryCode)) {
      return continentKey;
    }
  }
  return 'world';
};

export const getCountriesByContinent = (continentKey: string): string[] => {
  const continent = CONTINENTS[continentKey];
  return continent ? continent.countries : [];
};
