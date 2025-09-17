import type { Country } from '../types';

// Données statiques des pays les plus connus avec noms français
export const STATIC_COUNTRIES: Country[] = [
  {
    name: { common: "France", official: "République française" },
    capital: ["Paris"],
    cca2: "FR",
    cca3: "FRA"
  },
  {
    name: { common: "Allemagne", official: "République fédérale d'Allemagne" },
    capital: ["Berlin"],
    cca2: "DE",
    cca3: "DEU"
  },
  {
    name: { common: "Italie", official: "République italienne" },
    capital: ["Rome"],
    cca2: "IT",
    cca3: "ITA"
  },
  {
    name: { common: "Espagne", official: "Royaume d'Espagne" },
    capital: ["Madrid"],
    cca2: "ES",
    cca3: "ESP"
  },
  {
    name: { common: "Royaume-Uni", official: "Royaume-Uni de Grande-Bretagne et d'Irlande du Nord" },
    capital: ["Londres"],
    cca2: "GB",
    cca3: "GBR"
  },
  {
    name: { common: "États-Unis", official: "États-Unis d'Amérique" },
    capital: ["Washington"],
    cca2: "US",
    cca3: "USA"
  },
  {
    name: { common: "Canada", official: "Canada" },
    capital: ["Ottawa"],
    cca2: "CA",
    cca3: "CAN"
  },
  {
    name: { common: "Brésil", official: "République fédérative du Brésil" },
    capital: ["Brasília"],
    cca2: "BR",
    cca3: "BRA"
  },
  {
    name: { common: "Argentine", official: "République argentine" },
    capital: ["Buenos Aires"],
    cca2: "AR",
    cca3: "ARG"
  },
  {
    name: { common: "Australie", official: "Commonwealth d'Australie" },
    capital: ["Canberra"],
    cca2: "AU",
    cca3: "AUS"
  },
  {
    name: { common: "Chine", official: "République populaire de Chine" },
    capital: ["Pékin"],
    cca2: "CN",
    cca3: "CHN"
  },
  {
    name: { common: "Inde", official: "République de l'Inde" },
    capital: ["New Delhi"],
    cca2: "IN",
    cca3: "IND"
  },
  {
    name: { common: "Russie", official: "Fédération de Russie" },
    capital: ["Moscou"],
    cca2: "RU",
    cca3: "RUS"
  },
  {
    name: { common: "Japon", official: "Japon" },
    capital: ["Tokyo"],
    cca2: "JP",
    cca3: "JPN"
  },
  {
    name: { common: "Égypte", official: "République arabe d'Égypte" },
    capital: ["Le Caire"],
    cca2: "EG",
    cca3: "EGY"
  },
  {
    name: { common: "Afrique du Sud", official: "République d'Afrique du Sud" },
    capital: ["Pretoria"],
    cca2: "ZA",
    cca3: "ZAF"
  },
  {
    name: { common: "Nigeria", official: "République fédérale du Nigeria" },
    capital: ["Abuja"],
    cca2: "NG",
    cca3: "NGA"
  },
  {
    name: { common: "Kenya", official: "République du Kenya" },
    capital: ["Nairobi"],
    cca2: "KE",
    cca3: "KEN"
  },
  {
    name: { common: "Mexique", official: "États-Unis mexicains" },
    capital: ["Mexico"],
    cca2: "MX",
    cca3: "MEX"
  },
  {
    name: { common: "Pérou", official: "République du Pérou" },
    capital: ["Lima"],
    cca2: "PE",
    cca3: "PER"
  },
  {
    name: { common: "Chili", official: "République du Chili" },
    capital: ["Santiago"],
    cca2: "CL",
    cca3: "CHL"
  },
  {
    name: { common: "Colombie", official: "République de Colombie" },
    capital: ["Bogotá"],
    cca2: "CO",
    cca3: "COL"
  },
  {
    name: { common: "Venezuela", official: "République bolivarienne du Venezuela" },
    capital: ["Caracas"],
    cca2: "VE",
    cca3: "VEN"
  },
  {
    name: { common: "Turquie", official: "République de Turquie" },
    capital: ["Ankara"],
    cca2: "TR",
    cca3: "TUR"
  },
  {
    name: { common: "Iran", official: "République islamique d'Iran" },
    capital: ["Téhéran"],
    cca2: "IR",
    cca3: "IRN"
  },
  {
    name: { common: "Irak", official: "République d'Irak" },
    capital: ["Bagdad"],
    cca2: "IQ",
    cca3: "IRQ"
  },
  {
    name: { common: "Arabie saoudite", official: "Royaume d'Arabie saoudite" },
    capital: ["Riyad"],
    cca2: "SA",
    cca3: "SAU"
  },
  {
    name: { common: "Israël", official: "État d'Israël" },
    capital: ["Jérusalem"],
    cca2: "IL",
    cca3: "ISR"
  },
  {
    name: { common: "Thaïlande", official: "Royaume de Thaïlande" },
    capital: ["Bangkok"],
    cca2: "TH",
    cca3: "THA"
  },
  {
    name: { common: "Vietnam", official: "République socialiste du Vietnam" },
    capital: ["Hanoï"],
    cca2: "VN",
    cca3: "VNM"
  },
  {
    name: { common: "Corée du Sud", official: "République de Corée" },
    capital: ["Séoul"],
    cca2: "KR",
    cca3: "KOR"
  },
  {
    name: { common: "Corée du Nord", official: "République populaire démocratique de Corée" },
    capital: ["Pyongyang"],
    cca2: "KP",
    cca3: "PRK"
  },
  {
    name: { common: "Indonésie", official: "République d'Indonésie" },
    capital: ["Jakarta"],
    cca2: "ID",
    cca3: "IDN"
  },
  {
    name: { common: "Malaisie", official: "Malaisie" },
    capital: ["Kuala Lumpur"],
    cca2: "MY",
    cca3: "MYS"
  },
  {
    name: { common: "Philippines", official: "République des Philippines" },
    capital: ["Manille"],
    cca2: "PH",
    cca3: "PHL"
  },
  {
    name: { common: "Singapour", official: "République de Singapour" },
    capital: ["Singapour"],
    cca2: "SG",
    cca3: "SGP"
  },
  {
    name: { common: "Nouvelle-Zélande", official: "Nouvelle-Zélande" },
    capital: ["Wellington"],
    cca2: "NZ",
    cca3: "NZL"
  },
  {
    name: { common: "Norvège", official: "Royaume de Norvège" },
    capital: ["Oslo"],
    cca2: "NO",
    cca3: "NOR"
  },
  {
    name: { common: "Suède", official: "Royaume de Suède" },
    capital: ["Stockholm"],
    cca2: "SE",
    cca3: "SWE"
  },
  {
    name: { common: "Danemark", official: "Royaume du Danemark" },
    capital: ["Copenhague"],
    cca2: "DK",
    cca3: "DNK"
  },
  {
    name: { common: "Finlande", official: "République de Finlande" },
    capital: ["Helsinki"],
    cca2: "FI",
    cca3: "FIN"
  },
  {
    name: { common: "Pays-Bas", official: "Royaume des Pays-Bas" },
    capital: ["Amsterdam"],
    cca2: "NL",
    cca3: "NLD"
  },
  {
    name: { common: "Belgique", official: "Royaume de Belgique" },
    capital: ["Bruxelles"],
    cca2: "BE",
    cca3: "BEL"
  },
  {
    name: { common: "Suisse", official: "Confédération suisse" },
    capital: ["Berne"],
    cca2: "CH",
    cca3: "CHE"
  },
  {
    name: { common: "Autriche", official: "République d'Autriche" },
    capital: ["Vienne"],
    cca2: "AT",
    cca3: "AUT"
  },
  {
    name: { common: "Portugal", official: "République portugaise" },
    capital: ["Lisbonne"],
    cca2: "PT",
    cca3: "PRT"
  },
  {
    name: { common: "Grèce", official: "République hellénique" },
    capital: ["Athènes"],
    cca2: "GR",
    cca3: "GRC"
  },
  {
    name: { common: "Pologne", official: "République de Pologne" },
    capital: ["Varsovie"],
    cca2: "PL",
    cca3: "POL"
  },
  {
    name: { common: "République tchèque", official: "République tchèque" },
    capital: ["Prague"],
    cca2: "CZ",
    cca3: "CZE"
  },
  {
    name: { common: "Hongrie", official: "Hongrie" },
    capital: ["Budapest"],
    cca2: "HU",
    cca3: "HUN"
  },
  {
    name: { common: "Roumanie", official: "Roumanie" },
    capital: ["Bucarest"],
    cca2: "RO",
    cca3: "ROU"
  },
  {
    name: { common: "Ukraine", official: "Ukraine" },
    capital: ["Kiev"],
    cca2: "UA",
    cca3: "UKR"
  }
];
