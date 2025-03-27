import { Component, ChangeDetectorRef } from '@angular/core';
import { UserAuthServiceService } from '../_service/user-auth-service.service';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent {
  constructor(
    private userathservice: UserAuthServiceService,
    private userservice: UserService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    
  ) {}

  // isLoggedInv: boolean = false;


  public logout() {
    // localStorage.removeItem('token');
    // localStorage.removeItem('role');
    this.userathservice.clear();
    this.router.navigate(['/home']);
    // this.cdRef.detectChanges();
  }
  public isLoggedIn():boolean {
    // console.log(this.userathservice.isLoggedIn())
    return this.userathservice.isLoggedIn();
  }


  public roleMatchs(rol: any): boolean {
    return this.userservice.roleMatch(rol);
  }

  public isAdmin(){
     this.userathservice.isAdmin();
  }
}
