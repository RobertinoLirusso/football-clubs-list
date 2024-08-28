import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const button = document.querySelector('.back-to-top') as HTMLElement;
    if (window.scrollY > 800) { 
      button.style.display = 'block';
    } else {
      button.style.display = 'none';
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  

}
