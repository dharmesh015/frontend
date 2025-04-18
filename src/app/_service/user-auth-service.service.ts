import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Registrationuser } from '../modul/registrationuser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthServiceService {
  
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  public setRoles(roles: any[]): void {
    if (this.isBrowser()) {
      sessionStorage.setItem('roles', JSON.stringify(roles)); 
    }
  }

  public setUser (user: any) {
    sessionStorage.setItem("user", JSON.stringify(user)); 
  }
  
  public getUser () {

    const data = sessionStorage.getItem("user"); 

    return data ? JSON.parse(data) : null;
  }

  public getRoles(): any[] {
    if (this.isBrowser()) {
      const roles = sessionStorage.getItem('roles'); 
      return roles ? JSON.parse(roles) : [];
    }
    return [];
  }

  public setToken(jwtToken: string): void {
    if (this.isBrowser()) {
      sessionStorage.setItem('jwtToken', jwtToken); 
    }
  }

  public getToken(): string | null {
    if (this.isBrowser()) {
      return sessionStorage.getItem('jwtToken'); 
    }
    return null;
  }

  public clear(): void {
    if (this.isBrowser()) {
      sessionStorage.removeItem('jwtToken'); 
      sessionStorage.removeItem('roles'); 
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('name'); 
      sessionStorage.removeItem('user'); 
    }
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }

  public isAdmin(): boolean {
    const roles: any[] = this.getRoles();
    return roles.length > 0 && roles[0].roleName === 'Admin';
  }

  public isSeller(): boolean {
    const roles: any[] = this.getRoles();
    return roles.length > 0 && roles[0].roleName === 'Seller';
  }

  public isUser(): boolean {
    const roles: any[] = this.getRoles();
    return roles.length > 0 && roles[0].roleName === 'User ';
  }
}