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
      sessionStorage.setItem('roles', JSON.stringify(roles)); // Changed to sessionStorage
    }
  }

  public setUser (user: any) {
    // Convert the user object to a JSON string before storing it
    sessionStorage.setItem("user", JSON.stringify(user)); // Changed to sessionStorage
  }
  
  public getUser () {
    // Retrieve the user string from sessionStorage
    const data = sessionStorage.getItem("user"); // Changed to sessionStorage
    
    // If data is not null, parse it back to an object, otherwise return null
    return data ? JSON.parse(data) : null;
  }

  public getRoles(): any[] {
    if (this.isBrowser()) {
      const roles = sessionStorage.getItem('roles'); // Changed to sessionStorage
      return roles ? JSON.parse(roles) : [];
    }
    return [];
  }

  public setToken(jwtToken: string): void {
    if (this.isBrowser()) {
      sessionStorage.setItem('jwtToken', jwtToken); // Changed to sessionStorage
    }
  }

  public getToken(): string | null {
    if (this.isBrowser()) {
      return sessionStorage.getItem('jwtToken'); // Changed to sessionStorage
    }
    return null;
  }

  public clear(): void {
    if (this.isBrowser()) {
      sessionStorage.removeItem('jwtToken'); // Changed to sessionStorage
      sessionStorage.removeItem('roles'); // Changed to sessionStorage
      sessionStorage.removeItem('email'); // Changed to sessionStorage
      sessionStorage.removeItem('name'); // Changed to sessionStorage
      sessionStorage.removeItem('user'); // Changed to sessionStorage
    }
  }

  public isLoggedIn(): boolean {
    return !!this.getToken() && this.getRoles().length > 0;
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