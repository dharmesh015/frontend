import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { UserAuthServiceService } from '../_service/user-auth-service.service';
import { Router } from '@angular/router';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  isLoggedInflag=true;

  constructor(
    private userathservice: UserAuthServiceService,
    private userservice: UserService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    
  ) {}
  ngOnInit(): void {
    this.isLoggedInflag=this.userathservice.isLoggedIn();
    this.isLoggedIn();
  }
  // isMenuOpen = false;
  isAccountDropdownOpen = false;
 

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) {
      this.isAccountDropdownOpen = false;
    }
  }
  
  // Toggle account dropdown
  toggleAccountDropdown(): void {

    this.isAccountDropdownOpen = !this.isAccountDropdownOpen;
    setTimeout(() => {
      this.isAccountDropdownOpen = false; 
  }, 2000);
  }
  public logout() {
    this.userathservice.clear();
    this.router.navigate(['/home']);
  }
  public isLoggedIn():boolean {
    return this.userathservice.isLoggedIn();
  }


  public roleMatchs(rol: any): boolean {
    return this.userservice.roleMatch(rol);
  }

  public isAdmin(){
     this.userathservice.isAdmin();
  }

  public isUser(){
    this.userathservice.isUser();
 }



  public isSeller(){
    this.userathservice.isSeller();
 }


  public Profilepage(){
    this.router.navigate(['/Profilepage'])
  }
}
