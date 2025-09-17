import type { GameState, GameEvent } from '../types';
import { GAME_PHASES } from '../types';
import { COUNTRIES, getRandomCountry, findCountryByCode, validateCapitalAnswer } from '../utils/countries';
import { getCountriesByContinent } from '../data/continents';

export class GameManager {
  private state: GameState;
  private listeners: ((state: GameState) => void)[] = [];

  constructor(totalQuestions: number = 10) {
    this.state = this.createInitialState(totalQuestions);
  }

  private createInitialState(totalQuestions: number): GameState {
    return {
      currentCountry: null,
      score: 0,
      totalQuestions,
      currentQuestion: 0,
      gamePhase: GAME_PHASES.SELECT_CONTINENT,
      selectedCountryCode: null,
      userAnswer: '',
      isCorrect: null,
      countries: COUNTRIES,
      usedCountries: [],
      selectedContinent: null,
    };
  }

  /**
   * Abonne un listener aux changements d'état
   */
  public subscribe(listener: (state: GameState) => void): () => void {
    this.listeners.push(listener);
    
    // Retourne une fonction de désabonnement
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Notifie tous les listeners des changements d'état
   */
  private notifyListeners() {
    this.listeners.forEach(listener => listener({ ...this.state }));
  }

  /**
   * Obtient l'état actuel du jeu
   */
  public getState(): GameState {
    return { ...this.state };
  }

  /**
   * Traite un événement de jeu
   */
  public dispatch(event: GameEvent) {
    switch (event.type) {
      case 'START_GAME':
        this.startGame(event.payload.totalQuestions);
        break;
      case 'SELECT_CONTINENT':
        this.selectContinent(event.payload);
        break;
      case 'SELECT_COUNTRY':
        this.selectCountry(event.payload);
        break;
      case 'SUBMIT_ANSWER':
        this.submitAnswer(event.payload);
        break;
      case 'NEXT_QUESTION':
        this.nextQuestion();
        break;
      case 'END_GAME':
        this.endGame();
        break;
      case 'RESET_GAME':
        this.resetGame();
        break;
    }
  }

  /**
   * Démarre une nouvelle partie
   */
  private startGame(totalQuestions: number) {
    this.state = this.createInitialState(totalQuestions);
    this.notifyListeners();
  }

  /**
   * Sélectionne un continent
   */
  private selectContinent(continentKey: string) {
    if (this.state.gamePhase !== GAME_PHASES.SELECT_CONTINENT) {
      return;
    }

    this.state.selectedContinent = continentKey;
    
    // Filtrer les pays selon le continent
    if (continentKey === 'world') {
      this.state.countries = COUNTRIES;
    } else {
      const continentCountries = getCountriesByContinent(continentKey);
      this.state.countries = COUNTRIES.filter(country => 
        continentCountries.includes(country.cca2)
      );
    }
    
    // Commencer la première question
    this.startNewQuestion();
    this.notifyListeners();
  }

  /**
   * Sélectionne un pays sur la carte
   */
  private selectCountry(countryCode: string) {
    if (this.state.gamePhase !== GAME_PHASES.SELECT_COUNTRY) {
      return;
    }

    const country = findCountryByCode(this.state.countries, countryCode);
    if (!country) {
      console.warn(`Pays non trouvé: ${countryCode}`);
      return;
    }

    this.state.selectedCountryCode = countryCode;
    
    // Vérifier si le pays sélectionné est le bon
    if (this.state.currentCountry && countryCode === this.state.currentCountry.cca2) {
      // Pays correct - passer à la phase de devinette de capitale
      this.state.gamePhase = GAME_PHASES.GUESS_CAPITAL;
      this.state.userAnswer = '';
      this.state.isCorrect = null;
    } else {
      // Pays incorrect - marquer comme échec et passer à la question suivante
      this.state.isCorrect = false;
      this.state.gamePhase = GAME_PHASES.FEEDBACK;
      
      console.log(`Mauvais pays sélectionné. Attendu: ${this.state.currentCountry?.name.common} (${this.state.currentCountry?.cca2}), Reçu: ${country.name.common} (${countryCode})`);
      
      // Passer automatiquement à la question suivante après un délai
      setTimeout(() => {
        if (this.state.gamePhase === GAME_PHASES.FEEDBACK) {
          this.dispatch({ type: 'NEXT_QUESTION' });
        }
      }, 2500); // Un peu plus long pour laisser le temps de voir l'erreur
    }
    
    this.notifyListeners();
  }

  /**
   * Soumet une réponse pour la capitale
   */
  private submitAnswer(answer: string) {
    if (this.state.gamePhase !== GAME_PHASES.GUESS_CAPITAL || !this.state.currentCountry) {
      return;
    }

    this.state.userAnswer = answer.trim();
    this.state.isCorrect = validateCapitalAnswer(this.state.currentCountry, answer);
    
    if (this.state.isCorrect) {
      this.state.score += this.calculateQuestionScore();
    }

    this.state.gamePhase = GAME_PHASES.FEEDBACK;
    this.notifyListeners();

    // Passer automatiquement à la question suivante après un délai
    setTimeout(() => {
      if (this.state.gamePhase === GAME_PHASES.FEEDBACK) {
        this.dispatch({ type: 'NEXT_QUESTION' });
      }
    }, 2000);
  }

  /**
   * Calcule le score pour une question
   */
  private calculateQuestionScore(): number {
    // Score de base : 10 points par bonne réponse
    const baseScore = 10;
    
    // Bonus pour les premières questions (encourager la progression)
    const progressBonus = Math.max(0, 5 - this.state.currentQuestion);
    
    return baseScore + progressBonus;
  }

  /**
   * Passe à la question suivante
   */
  private nextQuestion() {
    if (this.state.gamePhase !== GAME_PHASES.FEEDBACK) {
      return;
    }

    // Ajouter le pays actuel aux pays utilisés
    if (this.state.selectedCountryCode) {
      this.state.usedCountries.push(this.state.selectedCountryCode);
    }

    this.state.currentQuestion++;

    // Vérifier si c'est la fin du jeu
    if (this.state.currentQuestion >= this.state.totalQuestions) {
      this.endGame();
      return;
    }

    // Commencer une nouvelle question
    this.startNewQuestion();
    this.notifyListeners();
  }

  /**
   * Démarre une nouvelle question
   */
  private startNewQuestion() {
    // Obtenir un nouveau pays aléatoire
    const newCountry = getRandomCountry(this.state.countries, this.state.usedCountries);
    
    if (!newCountry) {
      // Plus de pays disponibles
      this.endGame();
      return;
    }

    // Réinitialiser l'état pour la nouvelle question
    this.state.currentCountry = newCountry;
    this.state.selectedCountryCode = null;
    this.state.userAnswer = '';
    this.state.isCorrect = null;
    this.state.gamePhase = GAME_PHASES.SELECT_COUNTRY;
    
    console.log('Nouvelle question:', newCountry.name.common, 'Code:', newCountry.cca2);
  }

  /**
   * Termine le jeu
   */
  private endGame() {
    this.state.gamePhase = GAME_PHASES.GAME_OVER;
    this.saveGameStats();
    this.notifyListeners();
  }

  /**
   * Remet le jeu à zéro
   */
  private resetGame() {
    this.state = this.createInitialState(this.state.totalQuestions);
    this.startNewQuestion();
    this.notifyListeners();
  }

  /**
   * Sauvegarde les statistiques du jeu
   */
  private saveGameStats() {
    const stats = {
      score: this.state.score,
      totalQuestions: this.state.totalQuestions,
      correctAnswers: this.state.usedCountries.length, // Approximation
      accuracy: (this.state.score / (this.state.totalQuestions * 10)) * 100,
      timestamp: new Date().toISOString(),
    };

    // Sauvegarder dans le localStorage
    try {
      const existingStats = JSON.parse(localStorage.getItem('geographyGameStats') || '[]');
      existingStats.push(stats);
      
      // Garder seulement les 10 derniers scores
      if (existingStats.length > 10) {
        existingStats.splice(0, existingStats.length - 10);
      }
      
      localStorage.setItem('geographyGameStats', JSON.stringify(existingStats));
    } catch (error) {
      console.warn('Impossible de sauvegarder les statistiques:', error);
    }
  }

  /**
   * Obtient les statistiques sauvegardées
   */
  public getGameStats() {
    try {
      const stats = JSON.parse(localStorage.getItem('geographyGameStats') || '[]');
      return stats;
    } catch (error) {
      console.warn('Impossible de charger les statistiques:', error);
      return [];
    }
  }

  /**
   * Obtient le meilleur score
   */
  public getBestScore(): number {
    const stats = this.getGameStats();
    return stats.length > 0 ? Math.max(...stats.map((s: any) => s.score)) : 0;
  }

  /**
   * Obtient la précision moyenne
   */
  public getAverageAccuracy(): number {
    const stats = this.getGameStats();
    if (stats.length === 0) return 0;
    
    const totalAccuracy = stats.reduce((sum: number, s: any) => sum + s.accuracy, 0);
    return totalAccuracy / stats.length;
  }

  /**
   * Donne un indice pour la capitale actuelle
   */
  public getHint(): string | null {
    if (!this.state.currentCountry || this.state.gamePhase !== GAME_PHASES.GUESS_CAPITAL) {
      return null;
    }

    const capital = this.state.currentCountry.capital[0];
    const length = capital.length;
    
    if (length <= 3) {
      return `${capital.charAt(0)}${'_'.repeat(length - 1)}`;
    }
    
    // Révéler la première lettre et une lettre au milieu
    const firstLetter = capital.charAt(0);
    const middleIndex = Math.floor(length / 2);
    const middleLetter = capital.charAt(middleIndex);
    
    return firstLetter + 
           '_'.repeat(middleIndex - 1) + 
           middleLetter + 
           '_'.repeat(length - middleIndex - 1);
  }

  /**
   * Obtient le pourcentage de progression
   */
  public getProgress(): number {
    return (this.state.currentQuestion / this.state.totalQuestions) * 100;
  }

  /**
   * Vérifie si le jeu est terminé
   */
  public isGameOver(): boolean {
    return this.state.gamePhase === GAME_PHASES.GAME_OVER;
  }

  /**
   * Obtient la bonne réponse pour la question actuelle
   */
  public getCorrectAnswer(): string {
    return this.state.currentCountry?.capital[0] || '';
  }
}
