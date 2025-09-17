// Types pour l'application de géographie

export interface Country {
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  cca2: string; // Code pays ISO 2 lettres
  cca3: string; // Code pays ISO 3 lettres
}

export interface GameState {
  currentCountry: Country | null;
  score: number;
  totalQuestions: number;
  currentQuestion: number;
  gamePhase: 'select-continent' | 'select-country' | 'guess-capital' | 'feedback' | 'game-over';
  selectedCountryCode: string | null;
  userAnswer: string;
  isCorrect: boolean | null;
  countries: Country[];
  usedCountries: string[]; // Codes des pays déjà utilisés
  selectedContinent: string | null; // Continent sélectionné
}

export interface MapProps {
  onCountryClick: (countryCode: string) => void;
  selectedCountry: string | null;
  highlightedCountry: string | null;
  correctCountry?: string | null;
  feedbackState: 'correct' | 'incorrect' | null;
  continent?: string | null;
}

export interface QuestionProps {
  country: Country;
  phase: 'select-country' | 'guess-capital';
  onAnswerSubmit: (answer: string) => void;
  userAnswer: string;
  onAnswerChange: (answer: string) => void;
}

export interface ScoreProps {
  score: number;
  totalQuestions: number;
  currentQuestion: number;
}

export interface FeedbackProps {
  isCorrect: boolean;
  correctAnswer: string;
  userAnswer: string;
  onContinue: () => void;
}

// Types pour la carte du monde
export interface WorldMapFeature {
  type: 'Feature';
  properties: {
    ISO_A2: string;
    ISO_A3: string;
    NAME: string;
    NAME_LONG: string;
  };
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: number[][][] | number[][][][];
  };
}

export interface WorldMapData {
  type: 'FeatureCollection';
  features: WorldMapFeature[];
}

// Configuration du jeu
export interface GameConfig {
  totalQuestions: number;
  timeLimit?: number;
  difficulty: 'easy' | 'medium' | 'hard';
  regions?: string[]; // Filtrer par régions géographiques
}

// Statistiques du joueur
export interface PlayerStats {
  gamesPlayed: number;
  totalScore: number;
  averageScore: number;
  bestScore: number;
  correctAnswers: number;
  totalAnswers: number;
  accuracy: number;
}

// Types pour les événements
export type GameEvent = 
  | { type: 'START_GAME'; payload: GameConfig }
  | { type: 'SELECT_CONTINENT'; payload: string }
  | { type: 'SELECT_COUNTRY'; payload: string }
  | { type: 'SUBMIT_ANSWER'; payload: string }
  | { type: 'NEXT_QUESTION' }
  | { type: 'END_GAME' }
  | { type: 'RESET_GAME' };

// Utilitaires de validation
export const isValidCountryCode = (code: string): boolean => {
  return /^[A-Z]{2,3}$/.test(code);
};

export const normalizeCountryName = (name: string): string => {
  return name.toLowerCase().trim()
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[ñ]/g, 'n')
    .replace(/[ç]/g, 'c')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ');
};

export const calculateScore = (
  correctAnswers: number,
  totalAnswers: number,
  timeBonus: number = 0
): number => {
  const baseScore = (correctAnswers / totalAnswers) * 100;
  return Math.round(baseScore + timeBonus);
};

// Constantes
export const GAME_PHASES = {
  SELECT_CONTINENT: 'select-continent' as const,
  SELECT_COUNTRY: 'select-country' as const,
  GUESS_CAPITAL: 'guess-capital' as const,
  FEEDBACK: 'feedback' as const,
  GAME_OVER: 'game-over' as const,
};

export const DIFFICULTY_SETTINGS = {
  easy: { totalQuestions: 10, timeLimit: 30 },
  medium: { totalQuestions: 15, timeLimit: 20 },
  hard: { totalQuestions: 20, timeLimit: 15 },
} as const;
