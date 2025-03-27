import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
 
    showWelcomeMessage = true;
    
    ngOnInit() {
      setTimeout(() => {
        this.showWelcomeMessage = false;
        // this.startImageSlider();
      }, 3000); // Hide message after 3 seconds
    }
  
  }