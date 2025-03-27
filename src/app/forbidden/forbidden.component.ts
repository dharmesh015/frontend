import { AfterViewInit, Component } from '@angular/core';
declare var lottie: any;
@Component({
  selector: 'app-forbidden',
  standalone: false,
  templateUrl: './forbidden.component.html',
  styleUrl: './forbidden.component.css'
})
export class ForbiddenComponent implements AfterViewInit {
  ngAfterViewInit() {
    const container = document.querySelector('.lottie-animation') as HTMLElement;
    if (container) {
      lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://lottie.host/d987597c-7676-4424-8817-7fca6dc1a33e/BVrFXsaeui.json'
      });
    } else {
      console.error("Lottie container not found!");
    }
  }
}
