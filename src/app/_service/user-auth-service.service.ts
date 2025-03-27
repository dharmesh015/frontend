import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthServiceService {
  
  constructor() { }


  

  public setRoles(roles: any[]): void {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): any[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : []; 
  }

  public setToken(jwtToken: string): void {
    localStorage.setItem('jwtToken', jwtToken); 
  }

  public getToken() {
    return localStorage.getItem('jwtToken') ; 
  }

  public clear(): void {
    localStorage.removeItem('jwtToken'); 
    localStorage.removeItem('roles'); 
  }

  public isLoggedIn(): boolean {
    return !!this.getRoles() && !!this.getToken(); 
}

public isAdmin(){
  const roles:any[]=this.getRoles();
  // console.log(roles);
  return roles[0].roleName==='Admin';
}

}