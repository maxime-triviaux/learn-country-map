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
  },
  {
    name: { common: "Maroc", official: "Royaume du Maroc" },
    capital: ["Rabat"],
    cca2: "MA",
    cca3: "MAR"
  },
  {
    name: { common: "Algérie", official: "République algérienne démocratique et populaire" },
    capital: ["Alger"],
    cca2: "DZ",
    cca3: "DZA"
  },
  {
    name: { common: "Tunisie", official: "République tunisienne" },
    capital: ["Tunis"],
    cca2: "TN",
    cca3: "TUN"
  },
  {
    name: { common: "Libye", official: "État de Libye" },
    capital: ["Tripoli"],
    cca2: "LY",
    cca3: "LBY"
  },
  {
    name: { common: "Soudan", official: "République du Soudan" },
    capital: ["Khartoum"],
    cca2: "SD",
    cca3: "SDN"
  },
  {
    name: { common: "Éthiopie", official: "République fédérale démocratique d'Éthiopie" },
    capital: ["Addis-Abeba"],
    cca2: "ET",
    cca3: "ETH"
  },
  {
    name: { common: "Ghana", official: "République du Ghana" },
    capital: ["Accra"],
    cca2: "GH",
    cca3: "GHA"
  },
  {
    name: { common: "Côte d'Ivoire", official: "République de Côte d'Ivoire" },
    capital: ["Yamoussoukro"],
    cca2: "CI",
    cca3: "CIV"
  },
  {
    name: { common: "Sénégal", official: "République du Sénégal" },
    capital: ["Dakar"],
    cca2: "SN",
    cca3: "SEN"
  },
  {
    name: { common: "Cameroun", official: "République du Cameroun" },
    capital: ["Yaoundé"],
    cca2: "CM",
    cca3: "CMR"
  },
  {
    name: { common: "Tanzanie", official: "République-Unie de Tanzanie" },
    capital: ["Dodoma"],
    cca2: "TZ",
    cca3: "TZA"
  },
  {
    name: { common: "Ouganda", official: "République d'Ouganda" },
    capital: ["Kampala"],
    cca2: "UG",
    cca3: "UGA"
  },
  {
    name: { common: "Zambie", official: "République de Zambie" },
    capital: ["Lusaka"],
    cca2: "ZM",
    cca3: "ZMB"
  },
  {
    name: { common: "Zimbabwe", official: "République du Zimbabwe" },
    capital: ["Harare"],
    cca2: "ZW",
    cca3: "ZWE"
  },
  {
    name: { common: "Botswana", official: "République du Botswana" },
    capital: ["Gaborone"],
    cca2: "BW",
    cca3: "BWA"
  },
  {
    name: { common: "Namibie", official: "République de Namibie" },
    capital: ["Windhoek"],
    cca2: "NA",
    cca3: "NAM"
  },
  {
    name: { common: "Afghanistan", official: "Émirat islamique d'Afghanistan" },
    capital: ["Kaboul"],
    cca2: "AF",
    cca3: "AFG"
  },
  {
    name: { common: "Pakistan", official: "République islamique du Pakistan" },
    capital: ["Islamabad"],
    cca2: "PK",
    cca3: "PAK"
  },
  {
    name: { common: "Bangladesh", official: "République populaire du Bangladesh" },
    capital: ["Dacca"],
    cca2: "BD",
    cca3: "BGD"
  },
  {
    name: { common: "Sri Lanka", official: "République socialiste démocratique de Sri Lanka" },
    capital: ["Colombo"],
    cca2: "LK",
    cca3: "LKA"
  },
  {
    name: { common: "Myanmar", official: "République de l'Union du Myanmar" },
    capital: ["Naypyidaw"],
    cca2: "MM",
    cca3: "MMR"
  },
  {
    name: { common: "Cambodge", official: "Royaume du Cambodge" },
    capital: ["Phnom Penh"],
    cca2: "KH",
    cca3: "KHM"
  },
  {
    name: { common: "Laos", official: "République démocratique populaire lao" },
    capital: ["Vientiane"],
    cca2: "LA",
    cca3: "LAO"
  },
  {
    name: { common: "Mongolie", official: "Mongolie" },
    capital: ["Oulan-Bator"],
    cca2: "MN",
    cca3: "MNG"
  },
  {
    name: { common: "Kazakhstan", official: "République du Kazakhstan" },
    capital: ["Astana"],
    cca2: "KZ",
    cca3: "KAZ"
  },
  {
    name: { common: "Ouzbékistan", official: "République d'Ouzbékistan" },
    capital: ["Tachkent"],
    cca2: "UZ",
    cca3: "UZB"
  },
  {
    name: { common: "Jordanie", official: "Royaume hachémite de Jordanie" },
    capital: ["Amman"],
    cca2: "JO",
    cca3: "JOR"
  },
  {
    name: { common: "Liban", official: "République libanaise" },
    capital: ["Beyrouth"],
    cca2: "LB",
    cca3: "LBN"
  },
  {
    name: { common: "Syrie", official: "République arabe syrienne" },
    capital: ["Damas"],
    cca2: "SY",
    cca3: "SYR"
  },
  {
    name: { common: "Koweït", official: "État du Koweït" },
    capital: ["Koweït"],
    cca2: "KW",
    cca3: "KWT"
  },
  {
    name: { common: "Émirats arabes unis", official: "Émirats arabes unis" },
    capital: ["Abou Dabi"],
    cca2: "AE",
    cca3: "ARE"
  },
  {
    name: { common: "Qatar", official: "État du Qatar" },
    capital: ["Doha"],
    cca2: "QA",
    cca3: "QAT"
  },
  {
    name: { common: "Oman", official: "Sultanat d'Oman" },
    capital: ["Mascate"],
    cca2: "OM",
    cca3: "OMN"
  },
  {
    name: { common: "Yémen", official: "République du Yémen" },
    capital: ["Sanaa"],
    cca2: "YE",
    cca3: "YEM"
  },
  {
    name: { common: "Équateur", official: "République de l'Équateur" },
    capital: ["Quito"],
    cca2: "EC",
    cca3: "ECU"
  },
  {
    name: { common: "Uruguay", official: "République orientale de l'Uruguay" },
    capital: ["Montevideo"],
    cca2: "UY",
    cca3: "URY"
  },
  {
    name: { common: "Paraguay", official: "République du Paraguay" },
    capital: ["Asunción"],
    cca2: "PY",
    cca3: "PRY"
  },
  {
    name: { common: "Bolivie", official: "État plurinational de Bolivie" },
    capital: ["Sucre"],
    cca2: "BO",
    cca3: "BOL"
  },
  {
    name: { common: "Guyana", official: "République coopérative du Guyana" },
    capital: ["Georgetown"],
    cca2: "GY",
    cca3: "GUY"
  },
  {
    name: { common: "Suriname", official: "République du Suriname" },
    capital: ["Paramaribo"],
    cca2: "SR",
    cca3: "SUR"
  },
  {
    name: { common: "Costa Rica", official: "République du Costa Rica" },
    capital: ["San José"],
    cca2: "CR",
    cca3: "CRI"
  },
  {
    name: { common: "Panama", official: "République du Panama" },
    capital: ["Panama"],
    cca2: "PA",
    cca3: "PAN"
  },
  {
    name: { common: "Nicaragua", official: "République du Nicaragua" },
    capital: ["Managua"],
    cca2: "NI",
    cca3: "NIC"
  },
  {
    name: { common: "Honduras", official: "République du Honduras" },
    capital: ["Tegucigalpa"],
    cca2: "HN",
    cca3: "HND"
  },
  {
    name: { common: "Guatemala", official: "République du Guatemala" },
    capital: ["Guatemala"],
    cca2: "GT",
    cca3: "GTM"
  },
  {
    name: { common: "Belize", official: "Belize" },
    capital: ["Belmopan"],
    cca2: "BZ",
    cca3: "BLZ"
  },
  {
    name: { common: "Salvador", official: "République du Salvador" },
    capital: ["San Salvador"],
    cca2: "SV",
    cca3: "SLV"
  },
  {
    name: { common: "Cuba", official: "République de Cuba" },
    capital: ["La Havane"],
    cca2: "CU",
    cca3: "CUB"
  },
  {
    name: { common: "Jamaïque", official: "Jamaïque" },
    capital: ["Kingston"],
    cca2: "JM",
    cca3: "JAM"
  },
  {
    name: { common: "République dominicaine", official: "République dominicaine" },
    capital: ["Saint-domingue"],
    cca2: "DO",
    cca3: "DOM"
  },
  {
    name: { common: "Haïti", official: "République d'Haïti" },
    capital: ["Port-au-Prince"],
    cca2: "HT",
    cca3: "HTI"
  },
  {
    name: { common: "Irlande", official: "République d'Irlande" },
    capital: ["Dublin"],
    cca2: "IE",
    cca3: "IRL"
  },
  {
    name: { common: "Islande", official: "République d'Islande" },
    capital: ["Reykjavik"],
    cca2: "IS",
    cca3: "ISL"
  },
  {
    name: { common: "Luxembourg", official: "Grand-Duché de Luxembourg" },
    capital: ["Luxembourg"],
    cca2: "LU",
    cca3: "LUX"
  },
  {
    name: { common: "Croatie", official: "République de Croatie" },
    capital: ["Zagreb"],
    cca2: "HR",
    cca3: "HRV"
  },
  {
    name: { common: "Serbie", official: "République de Serbie" },
    capital: ["Belgrade"],
    cca2: "RS",
    cca3: "SRB"
  },
  {
    name: { common: "Bosnie-Herzégovine", official: "Bosnie-Herzégovine" },
    capital: ["Sarajevo"],
    cca2: "BA",
    cca3: "BIH"
  },
  {
    name: { common: "Slovénie", official: "République de Slovénie" },
    capital: ["Ljubljana"],
    cca2: "SI",
    cca3: "SVN"
  },
  {
    name: { common: "Slovaquie", official: "République slovaque" },
    capital: ["Bratislava"],
    cca2: "SK",
    cca3: "SVK"
  },
  {
    name: { common: "Bulgarie", official: "République de Bulgarie" },
    capital: ["Sofia"],
    cca2: "BG",
    cca3: "BGR"
  },
  {
    name: { common: "Lituanie", official: "République de Lituanie" },
    capital: ["Vilnius"],
    cca2: "LT",
    cca3: "LTU"
  },
  {
    name: { common: "Lettonie", official: "République de Lettonie" },
    capital: ["Riga"],
    cca2: "LV",
    cca3: "LVA"
  },
  {
    name: { common: "Estonie", official: "République d'Estonie" },
    capital: ["Tallinn"],
    cca2: "EE",
    cca3: "EST"
  },
  {
    name: { common: "Angola", official: "République d'Angola" },
    capital: ["Luanda"],
    cca2: "AO",
    cca3: "AGO"
  },
  {
    name: { common: "Mozambique", official: "République du Mozambique" },
    capital: ["Maputo"],
    cca2: "MZ",
    cca3: "MOZ"
  },
  {
    name: { common: "Madagascar", official: "République de Madagascar" },
    capital: ["Antananarivo"],
    cca2: "MG",
    cca3: "MDG"
  },
  {
    name: { common: "République démocratique du Congo", official: "République démocratique du Congo" },
    capital: ["Kinshasa"],
    cca2: "CD",
    cca3: "COD"
  },
  {
    name: { common: "République du Congo", official: "République du Congo" },
    capital: ["Brazzaville"],
    cca2: "CG",
    cca3: "COG"
  },
  {
    name: { common: "Gabon", official: "République gabonaise" },
    capital: ["Libreville"],
    cca2: "GA",
    cca3: "GAB"
  },
  {
    name: { common: "Guinée équatoriale", official: "République de Guinée équatoriale" },
    capital: ["Malabo"],
    cca2: "GQ",
    cca3: "GNQ"
  },
  {
    name: { common: "Tchad", official: "République du Tchad" },
    capital: ["N'Djamena"],
    cca2: "TD",
    cca3: "TCD"
  },
  {
    name: { common: "République centrafricaine", official: "République centrafricaine" },
    capital: ["Bangui"],
    cca2: "CF",
    cca3: "CAF"
  },
  {
    name: { common: "Mali", official: "République du Mali" },
    capital: ["Bamako"],
    cca2: "ML",
    cca3: "MLI"
  },
  {
    name: { common: "Burkina Faso", official: "Burkina Faso" },
    capital: ["Ouagadougou"],
    cca2: "BF",
    cca3: "BFA"
  },
  {
    name: { common: "Niger", official: "République du Niger" },
    capital: ["Niamey"],
    cca2: "NE",
    cca3: "NER"
  },
  {
    name: { common: "Mauritanie", official: "République islamique de Mauritanie" },
    capital: ["Nouakchott"],
    cca2: "MR",
    cca3: "MRT"
  },
  {
    name: { common: "Guinée", official: "République de Guinée" },
    capital: ["Conakry"],
    cca2: "GN",
    cca3: "GIN"
  },
  {
    name: { common: "Sierra Leone", official: "République de Sierra Leone" },
    capital: ["Freetown"],
    cca2: "SL",
    cca3: "SLE"
  },
  {
    name: { common: "Liberia", official: "République du Liberia" },
    capital: ["Monrovia"],
    cca2: "LR",
    cca3: "LBR"
  },
  {
    name: { common: "Togo", official: "République togolaise" },
    capital: ["Lomé"],
    cca2: "TG",
    cca3: "TGO"
  },
  {
    name: { common: "Bénin", official: "République du Bénin" },
    capital: ["Porto-Novo"],
    cca2: "BJ",
    cca3: "BEN"
  },
  {
    name: { common: "Rwanda", official: "République du Rwanda" },
    capital: ["Kigali"],
    cca2: "RW",
    cca3: "RWA"
  },
  {
    name: { common: "Burundi", official: "République du Burundi" },
    capital: ["Gitega"],
    cca2: "BI",
    cca3: "BDI"
  },
  {
    name: { common: "Malawi", official: "République du Malawi" },
    capital: ["Lilongwe"],
    cca2: "MW",
    cca3: "MWI"
  },
  {
    name: { common: "Somalie", official: "République fédérale de Somalie" },
    capital: ["Mogadiscio"],
    cca2: "SO",
    cca3: "SOM"
  },
  {
    name: { common: "Érythrée", official: "État d'Érythrée" },
    capital: ["Asmara"],
    cca2: "ER",
    cca3: "ERI"
  },
  {
    name: { common: "Djibouti", official: "République de Djibouti" },
    capital: ["Djibouti"],
    cca2: "DJ",
    cca3: "DJI"
  },
  {
    name: { common: "Lesotho", official: "Royaume du Lesotho" },
    capital: ["Maseru"],
    cca2: "LS",
    cca3: "LSO"
  },
  {
    name: { common: "Eswatini", official: "Royaume d'Eswatini" },
    capital: ["Mbabane"],
    cca2: "SZ",
    cca3: "SWZ"
  },
  {
    name: { common: "Groenland", official: "Groenland" },
    capital: ["Nuuk"],
    cca2: "GL",
    cca3: "GRL"
  }
];
