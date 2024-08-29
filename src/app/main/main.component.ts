import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  isBrowser: boolean; 

  constructor(
    private el: ElementRef, 
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {  
      this.onWindowScroll(); 
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (this.isBrowser) {  // Verificar nuevamente para asegurarnos de que estamos en el navegador
      const button = this.el.nativeElement.querySelector('.back-to-top');
      if (window.scrollY > 800) {
        this.renderer.setStyle(button, 'display', 'block');  // Mostrar el botón cuando el scroll es mayor a 800px
      } else {
        this.renderer.setStyle(button, 'display', 'none');  // Ocultar el botón de lo contrario
      }
    }
  }

  scrollToTop(): void {
    if (this.isBrowser) {  // Solo ejecutar en el navegador
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}