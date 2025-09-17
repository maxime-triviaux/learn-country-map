import { geoPath, geoNaturalEarth1 } from 'd3-geo';
import type { MapProps } from '../types';

// Interface pour les features GeoJSON
interface GeoFeature {
  type: 'Feature';
  properties: {
    NAME: string;
    ISO_A2: string;
    ISO_A3: string;
    [key: string]: any;
  };
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: number[][][] | number[][][][];
  };
}

interface GeoData {
  type: 'FeatureCollection';
  features: GeoFeature[];
}

export class WorldMap {
  private svg!: SVGSVGElement;
  private container: HTMLElement;
  private props: MapProps;
  private width: number = 900;
  private height: number = 500;
  private projection: any;
  private pathGenerator: any;
  private worldData: GeoData | null = null;
  private currentScale: number = 1;
  private currentTranslateX: number = 0;
  private currentTranslateY: number = 0;
  private minScale: number = 0.5;
  private maxScale: number = 4;
  private isDragging: boolean = false;
  private lastMouseX: number = 0;
  private lastMouseY: number = 0;

  constructor(container: HTMLElement, props: MapProps) {
    this.container = container;
    this.props = props;
    this.setupProjection();
    this.createSVG();
    this.loadWorldData();
  }

  private setupProjection() {
    // Augmenter le zoom par défaut de 140 à 180
    this.projection = geoNaturalEarth1()
      .scale(180)
      .translate([this.width / 2, this.height / 2]);
    
    this.pathGenerator = geoPath().projection(this.projection);
  }

  private createSVG() {
    // Nettoyer le conteneur
    this.container.innerHTML = '';
    
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('width', this.width.toString());
    this.svg.setAttribute('height', this.height.toString());
    this.svg.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`);
    this.svg.style.width = '100%';
    this.svg.style.height = 'auto';
    this.svg.style.maxHeight = '500px';
    this.svg.style.background = '#E8F4FD'; // Couleur océan
    
    // Ajouter un groupe pour les pays avec transformation
    const countriesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    countriesGroup.setAttribute('id', 'countries');
    countriesGroup.setAttribute('transform', 'translate(0,0) scale(1)');
    this.svg.appendChild(countriesGroup);
    
    // Ajouter les événements de zoom et pan
    this.addZoomAndPanEvents();
    
    this.container.appendChild(this.svg);
    
    // Ajouter les contrôles de zoom
    this.addZoomControls();
  }

  private async loadWorldData() {
    try {
      const response = await fetch('/world-110m.json');
      if (!response.ok) {
        throw new Error('Impossible de charger les données de la carte');
      }
      
      this.worldData = await response.json();
      this.render();
    } catch (error) {
      console.error('Erreur lors du chargement de la carte:', error);
      this.renderFallback();
    }
  }

  private render() {
    if (!this.worldData) return;

    const countriesGroup = this.svg.querySelector('#countries')!;
    countriesGroup.innerHTML = '';

    // Créer un mapping des codes pays pour nos données statiques (noms du GeoJSON vers codes)
    const countryCodeMap: { [key: string]: string } = {
      // Noms anglais du GeoJSON vers codes ISO
      'France': 'FR',
      'Germany': 'DE', 
      'Italy': 'IT',
      'Spain': 'ES',
      'United Kingdom': 'GB',
      'United States of America': 'US',
      'Canada': 'CA',
      'Brazil': 'BR',
      'Argentina': 'AR',
      'Australia': 'AU',
      'China': 'CN',
      'India': 'IN',
      'Russia': 'RU',
      'Japan': 'JP',
      'Egypt': 'EG',
      'South Africa': 'ZA',
      'Nigeria': 'NG',
      'Kenya': 'KE',
      'Mexico': 'MX',
      'Peru': 'PE',
      'Chile': 'CL',
      'Colombia': 'CO',
      'Venezuela': 'VE',
      'Turkey': 'TR',
      'Iran': 'IR',
      'Iraq': 'IQ',
      'Saudi Arabia': 'SA',
      'Israel': 'IL',
      'Thailand': 'TH',
      'Vietnam': 'VN',
      'South Korea': 'KR',
      'North Korea': 'KP',
      'Indonesia': 'ID',
      'Malaysia': 'MY',
      'Philippines': 'PH',
      'Singapore': 'SG',
      'New Zealand': 'NZ',
      'Norway': 'NO',
      'Sweden': 'SE',
      'Denmark': 'DK',
      'Finland': 'FI',
      'Netherlands': 'NL',
      'Belgium': 'BE',
      'Switzerland': 'CH',
      'Austria': 'AT',
      'Portugal': 'PT',
      'Greece': 'GR',
      'Poland': 'PL',
      'Czech Republic': 'CZ',
      'Czechia': 'CZ',
      'Hungary': 'HU',
      'Romania': 'RO',
      'Ukraine': 'UA'
    };

    // Mapping pour afficher les noms français dans les tooltips
    const frenchNames: { [key: string]: string } = {
      'FR': 'France',
      'DE': 'Allemagne',
      'IT': 'Italie', 
      'ES': 'Espagne',
      'GB': 'Royaume-Uni',
      'US': 'États-Unis',
      'CA': 'Canada',
      'BR': 'Brésil',
      'AR': 'Argentine',
      'AU': 'Australie',
      'CN': 'Chine',
      'IN': 'Inde',
      'RU': 'Russie',
      'JP': 'Japon',
      'EG': 'Égypte',
      'ZA': 'Afrique du Sud',
      'NG': 'Nigeria',
      'KE': 'Kenya',
      'MX': 'Mexique',
      'PE': 'Pérou',
      'CL': 'Chili',
      'CO': 'Colombie',
      'VE': 'Venezuela',
      'TR': 'Turquie',
      'IR': 'Iran',
      'IQ': 'Irak',
      'SA': 'Arabie saoudite',
      'IL': 'Israël',
      'TH': 'Thaïlande',
      'VN': 'Vietnam',
      'KR': 'Corée du Sud',
      'KP': 'Corée du Nord',
      'ID': 'Indonésie',
      'MY': 'Malaisie',
      'PH': 'Philippines',
      'SG': 'Singapour',
      'NZ': 'Nouvelle-Zélande',
      'NO': 'Norvège',
      'SE': 'Suède',
      'DK': 'Danemark',
      'FI': 'Finlande',
      'NL': 'Pays-Bas',
      'BE': 'Belgique',
      'CH': 'Suisse',
      'AT': 'Autriche',
      'PT': 'Portugal',
      'GR': 'Grèce',
      'PL': 'Pologne',
      'CZ': 'République tchèque',
      'HU': 'Hongrie',
      'RO': 'Roumanie',
      'UA': 'Ukraine'
    };

    this.worldData.features.forEach((feature) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const pathData = this.pathGenerator(feature);
      
      if (pathData) {
        path.setAttribute('d', pathData);
        
        // Déterminer le code pays
        let countryCode = feature.properties.ISO_A2;
        if (!countryCode || countryCode === '-99') {
          countryCode = countryCodeMap[feature.properties.name || feature.properties.NAME];
        }
        
        // Debug pour voir les pays disponibles
        if (countryCode && ['FR', 'DE', 'IT', 'ES', 'GB', 'US'].includes(countryCode)) {
          console.log('Pays trouvé:', feature.properties.name || feature.properties.NAME, 'Code:', countryCode);
        }
        
        if (countryCode) {
          path.setAttribute('data-country-code', countryCode);
          path.setAttribute('data-country-name', feature.properties.NAME);
          path.classList.add('country-path');
          
          // Appliquer les styles en fonction de l'état
          this.updateCountryStyle(path, countryCode);
          
          // Ajouter les événements
          path.addEventListener('click', () => {
            console.log('Clic sur pays:', feature.properties.NAME, 'Code:', countryCode);
            this.props.onCountryClick(countryCode);
          });
          
          path.addEventListener('mouseenter', () => {
            if (!path.classList.contains('selected')) {
              path.style.fill = 'var(--duolingo-blue)';
            }
            // Afficher le nom du pays en français si disponible
            const frenchName = frenchNames[countryCode] || feature.properties.NAME;
            this.showTooltip(frenchName);
          });
          
          path.addEventListener('mouseleave', () => {
            if (!path.classList.contains('selected')) {
              path.style.fill = 'var(--duolingo-gray-medium)';
            }
            this.hideTooltip();
          });
          
          // Ajouter un titre pour l'accessibilité avec nom français
          const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
          title.textContent = frenchNames[countryCode] || feature.properties.NAME;
          path.appendChild(title);
        } else {
          // Pays non interactif (pas dans notre jeu)
          path.style.fill = '#f0f0f0';
          path.style.stroke = '#ddd';
          path.style.strokeWidth = '0.5';
          path.style.cursor = 'default';
        }
        
        countriesGroup.appendChild(path);
      }
    });

    // Ajouter la légende
    // this.addTooltip();
  }

  private renderFallback() {
    // Version de secours avec les rectangles si les données ne se chargent pas
    console.log('Chargement des données de secours...');
    
    const countriesGroup = this.svg.querySelector('#countries')!;
    countriesGroup.innerHTML = '';
    
    // Message d'erreur
    const errorText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    errorText.setAttribute('x', (this.width / 2).toString());
    errorText.setAttribute('y', (this.height / 2).toString());
    errorText.setAttribute('text-anchor', 'middle');
    errorText.setAttribute('fill', 'var(--duolingo-gray-dark)');
    errorText.style.fontSize = '18px';
    errorText.style.fontFamily = 'var(--font-primary)';
    errorText.textContent = 'Impossible de charger la carte. Veuillez recharger la page.';
    
    countriesGroup.appendChild(errorText);
  }

  private updateCountryStyle(element: SVGElement, countryCode: string) {
    // Réinitialiser les classes
    element.classList.remove('selected', 'correct', 'incorrect');
    
    // Style de base
    element.style.fill = 'var(--duolingo-gray-medium)';
    element.style.stroke = 'var(--duolingo-white)';
    element.style.strokeWidth = '0.5';
    element.style.cursor = 'pointer';
    element.style.transition = 'all 0.2s ease';
    
    if (this.props.selectedCountry === countryCode) {
      element.classList.add('selected');
      element.style.fill = 'var(--duolingo-green)';
    }
    
    if (this.props.highlightedCountry === countryCode && this.props.feedbackState) {
      element.classList.add(this.props.feedbackState);
      if (this.props.feedbackState === 'correct') {
        element.style.fill = 'var(--duolingo-green)';
      } else {
        element.style.fill = 'var(--duolingo-red)';
      }
    }
  }

  private addTooltip() {
    const tooltip = document.createElement('div');
    tooltip.id = 'map-tooltip';
    tooltip.style.position = 'absolute';
    tooltip.style.background = 'var(--duolingo-black)';
    tooltip.style.color = 'var(--duolingo-white)';
    tooltip.style.padding = '8px 12px';
    tooltip.style.borderRadius = '6px';
    tooltip.style.fontSize = '14px';
    tooltip.style.fontFamily = 'var(--font-primary)';
    tooltip.style.fontWeight = '600';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.opacity = '0';
    tooltip.style.transition = 'opacity 0.2s ease';
    tooltip.style.zIndex = '1000';
    tooltip.style.whiteSpace = 'nowrap';
    
    document.body.appendChild(tooltip);
  }

  private showTooltip(countryName: string) {
    const tooltip = document.getElementById('map-tooltip');
    if (tooltip) {
      tooltip.textContent = countryName;
      tooltip.style.opacity = '1';
      
      // Positionner le tooltip près de la souris
      document.addEventListener('mousemove', this.updateTooltipPosition);
    }
  }

  private hideTooltip() {
    const tooltip = document.getElementById('map-tooltip');
    if (tooltip) {
      tooltip.style.opacity = '0';
      document.removeEventListener('mousemove', this.updateTooltipPosition);
    }
  }

  private updateTooltipPosition = (e: MouseEvent) => {
    const tooltip = document.getElementById('map-tooltip');
    if (tooltip) {
      tooltip.style.left = (e.pageX + 10) + 'px';
      tooltip.style.top = (e.pageY - 30) + 'px';
    }
  };

  private addZoomAndPanEvents() {
    // Zoom avec la molette de souris
    this.svg.addEventListener('wheel', (e) => {
      e.preventDefault();
      const rect = this.svg.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
      this.zoomAt(mouseX, mouseY, zoomFactor);
    });

    // Pan avec la souris
    this.svg.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
      this.svg.style.cursor = 'grabbing';
    });

    this.svg.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        const deltaX = e.clientX - this.lastMouseX;
        const deltaY = e.clientY - this.lastMouseY;
        
        this.currentTranslateX += deltaX;
        this.currentTranslateY += deltaY;
        
        this.updateTransform();
        
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
      }
    });

    this.svg.addEventListener('mouseup', () => {
      this.isDragging = false;
      this.svg.style.cursor = 'grab';
    });

    this.svg.addEventListener('mouseleave', () => {
      this.isDragging = false;
      this.svg.style.cursor = 'default';
    });

    // Style initial
    this.svg.style.cursor = 'grab';
  }

  private addZoomControls() {
    // Créer le conteneur des contrôles
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'map-zoom-controls';
    controlsContainer.style.position = 'absolute';
    controlsContainer.style.top = '20px';
    controlsContainer.style.right = '20px';
    controlsContainer.style.display = 'flex';
    controlsContainer.style.flexDirection = 'column';
    controlsContainer.style.gap = '8px';
    controlsContainer.style.zIndex = '10';

    // Bouton zoom +
    const zoomInBtn = document.createElement('button');
    zoomInBtn.innerHTML = '➕';
    zoomInBtn.className = 'zoom-btn zoom-in';
    zoomInBtn.title = 'Zoomer';
    zoomInBtn.addEventListener('click', () => {
      this.zoomAt(this.width / 2, this.height / 2, 1.5);
    });

    // Bouton zoom -
    const zoomOutBtn = document.createElement('button');
    zoomOutBtn.innerHTML = '➖';
    zoomOutBtn.className = 'zoom-btn zoom-out';
    zoomOutBtn.title = 'Dézoomer';
    zoomOutBtn.addEventListener('click', () => {
      this.zoomAt(this.width / 2, this.height / 2, 0.75);
    });

    // Bouton reset
    const resetBtn = document.createElement('button');
    resetBtn.innerHTML = '🏠';
    resetBtn.className = 'zoom-btn zoom-reset';
    resetBtn.title = 'Vue d\'ensemble';
    resetBtn.addEventListener('click', () => {
      this.resetZoom();
    });

    controlsContainer.appendChild(zoomInBtn);
    controlsContainer.appendChild(zoomOutBtn);
    controlsContainer.appendChild(resetBtn);

    // Ajouter au conteneur parent (position relative nécessaire)
    this.container.style.position = 'relative';
    this.container.appendChild(controlsContainer);

    // Ajouter les instructions de zoom
    this.addZoomInstructions();
  }

  private zoomAt(mouseX: number, mouseY: number, zoomFactor: number) {
    const newScale = Math.max(this.minScale, Math.min(this.maxScale, this.currentScale * zoomFactor));
    
    if (newScale !== this.currentScale) {
      // Calculer le nouveau point de translation pour zoomer vers la souris
      const scaleChange = newScale / this.currentScale;
      
      this.currentTranslateX = mouseX - scaleChange * (mouseX - this.currentTranslateX);
      this.currentTranslateY = mouseY - scaleChange * (mouseY - this.currentTranslateY);
      this.currentScale = newScale;
      
      this.updateTransform();
    }
  }

  private resetZoom() {
    this.currentScale = 1;
    this.currentTranslateX = 0;
    this.currentTranslateY = 0;
    this.updateTransform();
  }

  private updateTransform() {
    const countriesGroup = this.svg.querySelector('#countries');
    if (countriesGroup) {
      countriesGroup.setAttribute('transform', 
        `translate(${this.currentTranslateX},${this.currentTranslateY}) scale(${this.currentScale})`
      );
    }
  }

  private addZoomInstructions() {
    const instructionsContainer = document.createElement('div');
    instructionsContainer.className = 'zoom-instructions';
    instructionsContainer.innerHTML = `
      <div style="margin-bottom: 4px;"><strong>🔍 Navigation :</strong></div>
      <div>• Molette : Zoom</div>
      <div>• Glisser : Déplacer</div>
      <div>• Boutons : Contrôles</div>
    `;
    
    this.container.appendChild(instructionsContainer);
    
    // Masquer les instructions après 5 secondes
    setTimeout(() => {
      if (instructionsContainer.parentNode) {
        instructionsContainer.style.opacity = '0';
        instructionsContainer.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
          if (instructionsContainer.parentNode) {
            instructionsContainer.remove();
          }
        }, 500);
      }
    }, 5000);
  }

  public updateProps(newProps: MapProps) {
    this.props = newProps;
    
    // Mettre à jour tous les pays
    const countryElements = this.svg.querySelectorAll('.country-path');
    countryElements.forEach(element => {
      const countryCode = element.getAttribute('data-country-code');
      if (countryCode) {
        this.updateCountryStyle(element as SVGElement, countryCode);
      }
    });
  }

  public resize() {
    const containerRect = this.container.getBoundingClientRect();
    const aspectRatio = this.height / this.width;
    const newWidth = Math.min(containerRect.width, this.width);
    const newHeight = newWidth * aspectRatio;
    
    this.svg.style.width = '100%';
    this.svg.style.height = `${newHeight}px`;
  }

  public destroy() {
    // Nettoyer le tooltip
    const tooltip = document.getElementById('map-tooltip');
    if (tooltip) {
      tooltip.remove();
    }
    
    // Nettoyer les event listeners
    document.removeEventListener('mousemove', this.updateTooltipPosition);
    
    // Nettoyer les contrôles de zoom
    const zoomControls = this.container.querySelector('.map-zoom-controls');
    if (zoomControls) {
      zoomControls.remove();
    }
    
    // Nettoyer les instructions
    const instructions = this.container.querySelector('.zoom-instructions');
    if (instructions) {
      instructions.remove();
    }
    
    // Nettoyer le conteneur
    this.container.innerHTML = '';
  }
}

// Fonction utilitaire pour créer et gérer une instance de carte
export const createWorldMap = (container: HTMLElement, props: MapProps): WorldMap => {
  return new WorldMap(container, props);
};