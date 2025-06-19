import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-quem-somos',
  standalone: true,
  imports: [],
  templateUrl: './quem-somos.component.html',
  styleUrl: './quem-somos.component.css'
})
export class QuemSomosComponent implements OnInit, OnDestroy {
  private mouseMoveListener: any;
  private scrollListener: any;
  private isBrowser: boolean;

  constructor() {
    this.isBrowser = typeof window !== 'undefined';
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      // Adiciona o efeito parallax ao mover o mouse
      this.mouseMoveListener = this.handleMouseMove.bind(this);
      document.addEventListener('mousemove', this.mouseMoveListener);
      
      // Adiciona o efeito parallax ao rolar a página
      this.scrollListener = this.handleScroll.bind(this);
      window.addEventListener('scroll', this.scrollListener);
      
      // Inicializa o efeito
      this.handleScroll();
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      document.removeEventListener('mousemove', this.mouseMoveListener);
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  private handleMouseMove(event: MouseEvent): void {
    if (!document.querySelector('.parallax-tesseract')) return;
    
    const container = document.querySelector('.quem-somos-container') as HTMLElement;
    const rect = container.getBoundingClientRect();
    
    // Verifica se o mouse está sobre o container
    if (
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom
    ) {
      const xRelative = (event.clientX - rect.left) / rect.width - 0.5;
      const yRelative = (event.clientY - rect.top) / rect.height - 0.5;
      
      // Aplica o efeito parallax nas camadas
      const layers = document.querySelectorAll('.parallax-layer');
      layers.forEach((layer, index) => {
        const depth = (index + 1) * 10;
        const moveX = xRelative * depth;
        const moveY = yRelative * depth;
        (layer as HTMLElement).style.transform = 
          `translateX(${moveX}px) translateY(${moveY}px) translateZ(${-100 * (index + 1)}px) scale(${1 + (index * 0.1)})`;
      });
      
      // Não aplicamos mais efeito nos textos
      
      // Efeito na imagem
      const image = document.querySelector('.parallax-image');
      if (image) {
        const moveX = xRelative * -15;
        const moveY = yRelative * -15;
        (image as HTMLElement).style.transform = 
          `translateX(${moveX}px) translateY(${moveY}px) scale(1.05)`;
      }
    }
  }

  private handleScroll(): void {
    const scrollTop = window.scrollY;
    const container = document.querySelector('.quem-somos-container') as HTMLElement;
    
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
      const layers = document.querySelectorAll('.parallax-layer');
      layers.forEach((layer, index) => {
        const speed = (index + 1) * 0.2;
        const yPos = -(scrollTop * speed);
        const currentTransform = (layer as HTMLElement).style.transform;
        
        // Mantém a transformação X e Y do mouse, apenas atualiza o scroll
        if (currentTransform.includes('translateX')) {
          const match = currentTransform.match(/translateX\(([^)]+)\) translateY\(([^)]+)\)/);
          if (match) {
            const [, translateX, translateY] = match;
            (layer as HTMLElement).style.transform = 
              `translateX(${translateX}) translateY(${translateY}) translateZ(${-100 * (index + 1)}px) scale(${1 + (index * 0.1)})`;
          }
        } else {
          (layer as HTMLElement).style.transform = 
            `translateY(${yPos}px) translateZ(${-100 * (index + 1)}px) scale(${1 + (index * 0.1)})`;
        }
      });
    }
  }
}
