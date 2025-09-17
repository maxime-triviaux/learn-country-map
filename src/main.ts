import './styles/duolingo.css';
import { GameManager } from './game/GameManager';
import { createWorldMap, WorldMap } from './components/WorldMap';
import type { GameState } from './types';
import { GAME_PHASES } from './types';

class GeographyGameApp {
  private gameManager: GameManager;
  private worldMap: WorldMap | null = null;
  private appContainer: HTMLElement;

  constructor() {
    this.appContainer = document.getElementById('app')!;
    this.gameManager = new GameManager(10); // 10 questions par défaut
    this.init();
  }

  private init() {
    // S'abonner aux changements d'état du jeu
    this.gameManager.subscribe((state) => {
      this.render(state);
    });

    // Démarrer le jeu automatiquement
    this.gameManager.dispatch({ type: 'START_GAME', payload: { totalQuestions: 10, difficulty: 'medium' } });
  }

  private render(state: GameState) {
    this.appContainer.innerHTML = this.getHTML(state);
    this.attachEventListeners(state);
    this.initializeMap(state);
  }

  private getHTML(state: GameState): string {
    return `
      <div class="app">
        ${this.getHeaderHTML()}
        <main class="container">
          ${this.getGameHTML(state)}
        </main>
      </div>
    `;
  }

  private getHeaderHTML(): string {
    return `
      <header class="app-header">
        <div class="container">
          <h1 class="app-title">🌍 Géographie Interactive</h1>
        </div>
      </header>
    `;
  }

  private getGameHTML(state: GameState): string {
    switch (state.gamePhase) {
      case GAME_PHASES.SELECT_COUNTRY:
        return this.getSelectCountryHTML(state);
      case GAME_PHASES.GUESS_CAPITAL:
        return this.getGuessCapitalHTML(state);
      case GAME_PHASES.FEEDBACK:
        return this.getFeedbackHTML(state);
      case GAME_PHASES.GAME_OVER:
        return this.getGameOverHTML(state);
      default:
        return this.getWelcomeHTML();
    }
  }

  private getWelcomeHTML(): string {
    return `
      <div class="game-container">
        <div class="card text-center">
          <h2>Bienvenue dans le jeu de géographie !</h2>
          <p>Testez vos connaissances sur les pays et leurs capitales.</p>
          <button class="btn btn-primary" id="start-game">
            🚀 Commencer le jeu
          </button>
        </div>
      </div>
    `;
  }

  private getSelectCountryHTML(state: GameState): string {
    const progress = (state.currentQuestion / state.totalQuestions) * 100;
    
    return `
      <div class="game-container">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
        
        <div class="score-display">
          <div class="score-number">${state.score}</div>
          <div class="score-label">Points</div>
        </div>

        <div class="question-card">
          <h2 class="question-text">
            Question ${state.currentQuestion + 1}/${state.totalQuestions}
          </h2>
          <p class="question-text">
            Trouvez le pays : <strong>${state.currentCountry?.name.common || 'Chargement...'}</strong>
          </p>
          <p style="color: var(--duolingo-gray-dark); margin-top: var(--spacing-md);">
            Cliquez sur le pays sur la carte ci-dessous
          </p>
        </div>

        <div class="map-container" id="world-map"></div>
      </div>
    `;
  }

  private getGuessCapitalHTML(state: GameState): string {
    const progress = (state.currentQuestion / state.totalQuestions) * 100;
    
    return `
      <div class="game-container">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
        
        <div class="score-display">
          <div class="score-number">${state.score}</div>
          <div class="score-label">Points</div>
        </div>

        <div class="question-card">
          <h2 class="question-text">
            Parfait ! Vous avez sélectionné : <strong>${state.currentCountry?.name.common}</strong>
          </h2>
          <p class="question-text">
            Quelle est la capitale de ce pays ?
          </p>
          
          <div style="margin-top: var(--spacing-lg);">
            <input 
              type="text" 
              class="input-field" 
              id="capital-input"
              placeholder="Tapez la capitale..."
              value="${state.userAnswer}"
              autocomplete="off"
            />
            <div class="flex" style="gap: var(--spacing-md); margin-top: var(--spacing-md);">
              <button class="btn btn-secondary" id="hint-btn">
                💡 Indice
              </button>
              <button class="btn btn-primary" id="submit-answer" ${state.userAnswer.trim() === '' ? 'disabled' : ''}>
                ✓ Valider
              </button>
            </div>
          </div>
        </div>

        <div class="map-container" id="world-map"></div>
      </div>
    `;
  }

  private getFeedbackHTML(state: GameState): string {
    const isCorrect = state.isCorrect;
    const correctAnswer = state.currentCountry?.capital[0] || '';
    
    return `
      <div class="game-container">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${(state.currentQuestion / state.totalQuestions) * 100}%"></div>
        </div>
        
        <div class="score-display">
          <div class="score-number">${state.score}</div>
          <div class="score-label">Points</div>
        </div>

        <div class="question-card">
          <h2 class="question-text">
            ${state.currentCountry?.name.common}
          </h2>
          
          <div class="feedback ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}">
            ${isCorrect 
              ? `🎉 Excellent ! La capitale est bien <strong>${correctAnswer}</strong>` 
              : `❌ Pas tout à fait... La capitale de ${state.currentCountry?.name.common} est <strong>${correctAnswer}</strong>, pas "${state.userAnswer}"`
            }
          </div>
          
          <p style="color: var(--duolingo-gray-dark); margin-top: var(--spacing-md);">
            Passage automatique à la question suivante...
          </p>
        </div>

        <div class="map-container" id="world-map"></div>
      </div>
    `;
  }

  private getGameOverHTML(state: GameState): string {
    const percentage = Math.round((state.score / (state.totalQuestions * 10)) * 100);
    const bestScore = this.gameManager.getBestScore();
    const isNewRecord = state.score > bestScore;
    
    return `
      <div class="game-container">
        <div class="question-card text-center">
          <h2 class="question-text">
            ${isNewRecord ? '🏆 Nouveau record !' : '🎯 Partie terminée !'}
          </h2>
          
          <div class="score-display mt-lg">
            <div class="score-number">${state.score}</div>
            <div class="score-label">Points sur ${state.totalQuestions * 10} possibles</div>
          </div>
          
          <div style="margin: var(--spacing-lg) 0;">
            <p style="font-size: 18px; color: var(--duolingo-gray-darker);">
              Précision : <strong>${percentage}%</strong>
            </p>
            ${bestScore > 0 ? `<p style="color: var(--duolingo-gray-dark);">Meilleur score : ${bestScore}</p>` : ''}
          </div>

          <div class="flex flex-center" style="gap: var(--spacing-md); margin-top: var(--spacing-xl);">
            <button class="btn btn-primary" id="play-again">
              🔄 Rejouer
            </button>
            <button class="btn btn-outline" id="change-difficulty">
              ⚙️ Difficulté
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private attachEventListeners(_state: GameState) {
    // Bouton démarrer le jeu
    const startBtn = document.getElementById('start-game');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        console.log('Démarrage du jeu...');
        this.gameManager.dispatch({ type: 'START_GAME', payload: { totalQuestions: 10, difficulty: 'medium' } });
      });
    }

    // Input de la capitale
    const capitalInput = document.getElementById('capital-input') as HTMLInputElement;
    if (capitalInput) {
      capitalInput.addEventListener('input', (e) => {
        const value = (e.target as HTMLInputElement).value;
        const submitBtn = document.getElementById('submit-answer') as HTMLButtonElement;
        if (submitBtn) {
          submitBtn.disabled = value.trim() === '';
        }
      });

      capitalInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && capitalInput.value.trim() !== '') {
          this.gameManager.dispatch({ type: 'SUBMIT_ANSWER', payload: capitalInput.value });
        }
      });

      // Focus automatique sur l'input
      capitalInput.focus();
    }

    // Bouton valider réponse
    const submitBtn = document.getElementById('submit-answer');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        const input = document.getElementById('capital-input') as HTMLInputElement;
        if (input && input.value.trim() !== '') {
          this.gameManager.dispatch({ type: 'SUBMIT_ANSWER', payload: input.value });
        }
      });
    }

    // Bouton indice
    const hintBtn = document.getElementById('hint-btn');
    if (hintBtn) {
      hintBtn.addEventListener('click', () => {
        const hint = this.gameManager.getHint();
        if (hint) {
          const input = document.getElementById('capital-input') as HTMLInputElement;
          if (input) {
            input.placeholder = `Indice: ${hint}`;
          }
        }
      });
    }

    // Bouton rejouer
    const playAgainBtn = document.getElementById('play-again');
    if (playAgainBtn) {
      playAgainBtn.addEventListener('click', () => {
        this.gameManager.dispatch({ type: 'RESET_GAME' });
      });
    }

    // Bouton changer difficulté
    const changeDifficultyBtn = document.getElementById('change-difficulty');
    if (changeDifficultyBtn) {
      changeDifficultyBtn.addEventListener('click', () => {
        // Pour l'instant, juste changer le nombre de questions
        const questions = prompt('Nombre de questions (5-20):', '10');
        if (questions) {
          const num = parseInt(questions);
          if (num >= 5 && num <= 20) {
            this.gameManager.dispatch({ type: 'START_GAME', payload: { totalQuestions: num, difficulty: 'medium' } });
          }
        }
      });
    }
  }

  private initializeMap(state: GameState) {
    const mapContainer = document.getElementById('world-map');
    if (mapContainer) {
      // Détruire l'ancienne carte si elle existe
      if (this.worldMap) {
        this.worldMap.destroy();
      }

      // Créer une nouvelle carte
      this.worldMap = createWorldMap(mapContainer, {
        onCountryClick: (countryCode: string) => {
          if (state.gamePhase === GAME_PHASES.SELECT_COUNTRY) {
            this.gameManager.dispatch({ type: 'SELECT_COUNTRY', payload: countryCode });
          }
        },
        selectedCountry: state.selectedCountryCode,
        highlightedCountry: state.selectedCountryCode,
        feedbackState: state.gamePhase === GAME_PHASES.FEEDBACK ? 
          (state.isCorrect ? 'correct' : 'incorrect') : null,
      });

      // Gérer le redimensionnement
      window.addEventListener('resize', () => {
        if (this.worldMap) {
          this.worldMap.resize();
        }
      });
    }
  }
}

// Initialiser l'application quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
  new GeographyGameApp();
});

// Styles pour l'écran de chargement
const loadingStyles = `
  .loading-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: var(--duolingo-gray-light);
  }

  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid var(--duolingo-gray-medium);
    border-top: 4px solid var(--duolingo-green);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: var(--spacing-md);
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .loading-screen p {
    color: var(--duolingo-gray-dark);
    font-weight: var(--font-weight-medium);
  }
`;

// Ajouter les styles de chargement
const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);