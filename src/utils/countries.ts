import type { Country } from '../types';
import { STATIC_COUNTRIES } from '../data/staticCountries';

// Interface pour les données brutes de l'API REST Countries
interface RawCountryData {
  name: {
    common: string;
    official: string;
    nativeName?: Record<string, { official: string; common: string }>;
  };
  capital?: string[];
  cca2: string;
  cca3: string;
}

/**
 * Charge les données des pays depuis le fichier JSON
 */
const loadCountriesData = async (): Promise<RawCountryData[]> => {
  try {
    const response = await fetch('/src/data/countries.json');
    if (!response.ok) {
      throw new Error('Impossible de charger les données des pays');
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error);
    return [];
  }
};

/**
 * Transforme les données brutes en format utilisable par l'application
 */
export const processCountriesData = async (): Promise<Country[]> => {
  const rawData = await loadCountriesData();
  
  return rawData
    .filter(country => {
      // Filtrer les pays sans capitale ou avec des données incomplètes
      return country.capital && 
             country.capital.length > 0 && 
             country.name?.common && 
             country.cca2 && 
             country.cca3 &&
             // Exclure certains territoires et régions spéciales
             !isExcludedTerritory(country);
    })
    .map(country => ({
      name: {
        common: country.name.common,
        official: country.name.official,
      },
      capital: country.capital || [],
      cca2: country.cca2,
      cca3: country.cca3,
    }))
    .sort((a, b) => a.name.common.localeCompare(b.name.common));
};

/**
 * Exclut certains territoires pour simplifier le jeu
 */
const isExcludedTerritory = (country: RawCountryData): boolean => {
  const excludedCodes = [
    'AQ', // Antarctique
    'BV', // Île Bouvet
    'HM', // Îles Heard-et-MacDonald
    'GS', // Géorgie du Sud-et-les Îles Sandwich du Sud
    'TF', // Terres australes et antarctiques françaises
    'UM', // Îles mineures éloignées des États-Unis
  ];
  
  const excludedNames = [
    'Antarctica',
    'Bouvet Island',
    'Heard Island and McDonald Islands',
    'South Georgia',
    'French Southern and Antarctic Lands',
    'United States Minor Outlying Islands',
  ];
  
  return excludedCodes.includes(country.cca2) || 
         excludedNames.some(name => country.name.common.includes(name));
};

/**
 * Obtient un pays aléatoire parmi ceux disponibles
 */
export const getRandomCountry = (
  countries: Country[], 
  excludedCodes: string[] = []
): Country | null => {
  const availableCountries = countries.filter(
    country => !excludedCodes.includes(country.cca2)
  );
  
  if (availableCountries.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * availableCountries.length);
  return availableCountries[randomIndex];
};

/**
 * Trouve un pays par son code ISO
 */
export const findCountryByCode = (
  countries: Country[], 
  code: string
): Country | null => {
  return countries.find(
    country => country.cca2 === code || country.cca3 === code
  ) || null;
};

/**
 * Recherche des pays par nom (pour l'autocomplétion)
 */
export const searchCountriesByName = (
  countries: Country[], 
  query: string, 
  limit: number = 5
): Country[] => {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (normalizedQuery.length < 2) {
    return [];
  }
  
  return countries
    .filter(country => 
      country.name.common.toLowerCase().includes(normalizedQuery) ||
      country.name.official.toLowerCase().includes(normalizedQuery)
    )
    .slice(0, limit);
};

/**
 * Valide si une réponse de capitale est correcte
 */
export const validateCapitalAnswer = (
  country: Country, 
  userAnswer: string
): boolean => {
  const normalizedAnswer = normalizeCapitalName(userAnswer);
  
  // Mapping des capitales avec leurs variantes françaises et anglaises
  const capitalVariants: { [key: string]: string[] } = {
    'paris': ['paris'],
    'berlin': ['berlin'],
    'rome': ['rome', 'roma'],
    'madrid': ['madrid'],
    'londres': ['londres', 'london'],
    'washington': ['washington', 'washington dc', 'washington d.c.'],
    'ottawa': ['ottawa'],
    'brasilia': ['brasilia', 'brasília'],
    'buenos aires': ['buenos aires'],
    'canberra': ['canberra'],
    'pekin': ['pekin', 'beijing', 'pékin'],
    'new delhi': ['new delhi', 'nouvelle delhi'],
    'moscou': ['moscou', 'moscow'],
    'tokyo': ['tokyo'],
    'le caire': ['le caire', 'cairo', 'caire'],
    'pretoria': ['pretoria'],
    'abuja': ['abuja'],
    'nairobi': ['nairobi'],
    'mexico': ['mexico', 'mexico city', 'ville de mexico'],
    'lima': ['lima'],
    'santiago': ['santiago'],
    'bogota': ['bogota', 'bogotá'],
    'caracas': ['caracas'],
    'ankara': ['ankara'],
    'teheran': ['teheran', 'tehran', 'téhéran'],
    'bagdad': ['bagdad', 'baghdad'],
    'riyad': ['riyad', 'riyadh'],
    'jerusalem': ['jerusalem', 'jérusalem'],
    'bangkok': ['bangkok'],
    'hanoi': ['hanoi', 'hanoï'],
    'seoul': ['seoul', 'séoul'],
    'pyongyang': ['pyongyang'],
    'jakarta': ['jakarta'],
    'kuala lumpur': ['kuala lumpur'],
    'manille': ['manille', 'manila'],
    'singapour': ['singapour', 'singapore'],
    'wellington': ['wellington'],
    'oslo': ['oslo'],
    'stockholm': ['stockholm'],
    'copenhague': ['copenhague', 'copenhagen'],
    'helsinki': ['helsinki'],
    'amsterdam': ['amsterdam'],
    'bruxelles': ['bruxelles', 'brussels'],
    'berne': ['berne', 'bern'],
    'vienne': ['vienne', 'vienna'],
    'lisbonne': ['lisbonne', 'lisbon'],
    'athenes': ['athenes', 'athens', 'athènes'],
    'varsovie': ['varsovie', 'warsaw'],
    'prague': ['prague'],
    'budapest': ['budapest'],
    'bucarest': ['bucarest', 'bucharest'],
    'kiev': ['kiev', 'kyiv'],
    // Nouvelles capitales ajoutées
    'rabat': ['rabat'],
    'alger': ['alger', 'algiers'],
    'tunis': ['tunis'],
    'tripoli': ['tripoli'],
    'khartoum': ['khartoum', 'khartoum'],
    'addis abeba': ['addis abeba', 'addis ababa'],
    'addis-abeba': ['addis abeba', 'addis ababa'],
    'accra': ['accra'],
    'yamoussoukro': ['yamoussoukro'],
    'dakar': ['dakar'],
    'yaounde': ['yaounde', 'yaoundé'],
    'dodoma': ['dodoma'],
    'kampala': ['kampala'],
    'lusaka': ['lusaka'],
    'harare': ['harare'],
    'gaborone': ['gaborone'],
    'windhoek': ['windhoek'],
    'kaboul': ['kaboul', 'kabul'],
    'islamabad': ['islamabad'],
    'dacca': ['dacca', 'dhaka'],
    'colombo': ['colombo'],
    'naypyidaw': ['naypyidaw'],
    'phnom penh': ['phnom penh'],
    'vientiane': ['vientiane'],
    'oulan bator': ['oulan bator', 'ulaanbaatar'],
    'oulan-bator': ['oulan bator', 'ulaanbaatar'],
    'astana': ['astana', 'nur-sultan'],
    'tachkent': ['tachkent', 'tashkent'],
    'amman': ['amman'],
    'beyrouth': ['beyrouth', 'beirut'],
    'damas': ['damas', 'damascus'],
    'koweit': ['koweit', 'kuwait', 'koweït'],
    'abou dabi': ['abou dabi', 'abu dhabi'],
    'doha': ['doha'],
    'mascate': ['mascate', 'muscat'],
    'sanaa': ['sanaa'],
    'quito': ['quito'],
    'montevideo': ['montevideo'],
    'asuncion': ['asuncion', 'asunción'],
    'sucre': ['sucre'],
    'georgetown': ['georgetown'],
    'paramaribo': ['paramaribo'],
    'san jose': ['san jose', 'san josé'],
    'panama': ['panama'],
    'managua': ['managua'],
    'tegucigalpa': ['tegucigalpa'],
    'guatemala': ['guatemala'],
    'belmopan': ['belmopan'],
    'san salvador': ['san salvador'],
    'la havane': ['la havane', 'havana'],
    'kingston': ['kingston'],
    'saint domingue': ['saint domingue', 'santo domingo'],
    'saint-domingue': ['saint domingue', 'santo domingo'],
    'port au prince': ['port au prince', 'port-au-prince'],
    'port-au-prince': ['port au prince', 'port-au-prince'],
    'dublin': ['dublin'],
    'reykjavik': ['reykjavik'],
    'luxembourg': ['luxembourg'],
    'zagreb': ['zagreb'],
    'belgrade': ['belgrade'],
    'sarajevo': ['sarajevo'],
    'ljubljana': ['ljubljana'],
    'bratislava': ['bratislava'],
    'sofia': ['sofia'],
    'vilnius': ['vilnius'],
    'riga': ['riga'],
    'tallinn': ['tallinn'],
    // Capitales africaines supplémentaires
    'luanda': ['luanda'],
    'maputo': ['maputo'],
    'antananarivo': ['antananarivo'],
    'kinshasa': ['kinshasa'],
    'brazzaville': ['brazzaville'],
    'libreville': ['libreville'],
    'malabo': ['malabo'],
    'ndjamena': ['ndjamena', 'n\'djamena'],
    'n\'djamena': ['ndjamena', 'n\'djamena'],
    'bangui': ['bangui'],
    'bamako': ['bamako'],
    'ouagadougou': ['ouagadougou'],
    'niamey': ['niamey'],
    'nouakchott': ['nouakchott'],
    'conakry': ['conakry'],
    'freetown': ['freetown'],
    'monrovia': ['monrovia'],
    'lome': ['lome', 'lomé'],
    'porto novo': ['porto novo', 'porto-novo'],
    'porto-novo': ['porto novo', 'porto-novo'],
    'kigali': ['kigali'],
    'gitega': ['gitega'],
    'lilongwe': ['lilongwe'],
    'mogadiscio': ['mogadiscio', 'mogadishu'],
    'asmara': ['asmara'],
    'djibouti': ['djibouti'],
    'maseru': ['maseru'],
    'mbabane': ['mbabane'],
    'nuuk': ['nuuk']
  };

  // Vérifier d'abord les capitales exactes
  const exactMatch = country.capital.some(capital => {
    const normalizedCapital = normalizeCapitalName(capital);
    return normalizedCapital === normalizedAnswer;
  });

  if (exactMatch) return true;

  // Vérifier les variantes
  for (const capital of country.capital) {
    const normalizedCapital = normalizeCapitalName(capital);
    const variants = capitalVariants[normalizedCapital];
    
    if (variants && variants.includes(normalizedAnswer)) {
      return true;
    }
  }

  return false;
};

/**
 * Normalise le nom d'une capitale pour la comparaison
 */
const normalizeCapitalName = (name: string): string => {
  return name.toLowerCase().trim()
    // Supprimer les accents
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Supprimer la ponctuation et caractères spéciaux
    .replace(/[^\w\s]/g, '')
    // Remplacer les espaces multiples par un seul
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Obtient des suggestions de réponse pour aider l'utilisateur
 */
export const getCapitalHint = (country: Country): string => {
  const capital = country.capital[0];
  const length = capital.length;
  
  if (length <= 3) {
    return capital.charAt(0) + '_'.repeat(length - 1);
  }
  
  // Afficher la première lettre et quelques lettres au milieu
  const firstLetter = capital.charAt(0);
  const middleIndex = Math.floor(length / 2);
  const middleLetter = capital.charAt(middleIndex);
  
  return firstLetter + 
         '_'.repeat(middleIndex - 1) + 
         middleLetter + 
         '_'.repeat(length - middleIndex - 1);
};


/**
 * Filtre les pays par région (nécessiterait des données supplémentaires)
 */
export const filterCountriesByRegion = (
  countries: Country[], 
  _region: string
): Country[] => {
  // Pour l'instant, retourne tous les pays
  // Dans une version complète, on filtrerait par région géographique
  return countries;
};

/**
 * Mélange un tableau de pays
 */
export const shuffleCountries = (countries: Country[]): Country[] => {
  const shuffled = [...countries];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Variable pour stocker les pays chargés
let COUNTRIES_CACHE: Country[] | null = null;

/**
 * Obtient les pays (avec cache)
 */
export const getCountries = async (): Promise<Country[]> => {
  if (COUNTRIES_CACHE === null) {
    COUNTRIES_CACHE = await processCountriesData();
  }
  return COUNTRIES_CACHE;
};

// Utiliser les données statiques pour une meilleure performance
export const COUNTRIES: Country[] = STATIC_COUNTRIES;

// Exporter quelques statistiques utiles
export const getCountriesStats = async () => {
  const countries = await getCountries();
  return getCountriesStatsSync(countries);
};

const getCountriesStatsSync = (countries: Country[]) => {
  const totalCountries = countries.length;
  const capitalLengths: number[] = [];
  
  countries.forEach(country => {
    if (country.capital.length > 0) {
      capitalLengths.push(country.capital[0].length);
    }
  });
  
  return {
    totalCountries,
    averageCapitalLength: capitalLengths.reduce((a, b) => a + b, 0) / capitalLengths.length,
    shortestCapital: Math.min(...capitalLengths),
    longestCapital: Math.max(...capitalLengths),
  };
};
