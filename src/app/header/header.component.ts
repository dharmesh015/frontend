import { Component } from '@angular/core';
import { UserAuthServiceService } from '../_service/user-auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


   constructor(private userathservice:UserAuthServiceService,private router:Router){}

   public isloggedin(){
    return this.userathservice.isLoggedIn();
   } 

   public logout(){
    this.userathservice.clear();
    this.router.navigate(['/home']);
   }
}
