
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Registrationuser } from '../modul/registrationuser';

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
      localStorage.setItem('roles', JSON.stringify(roles));
    }
  }

  public setName(name:any){
    if (this.isBrowser()) {
      localStorage.setItem('name', name);
    }
  }

  public setEmail(email:any){
    if (this.isBrowser()) {
      localStorage.setItem('email', email
      );
    }
  }
  public setUser (user: any) {
    // Convert the user object to a JSON string before storing it
    localStorage.setItem("user", JSON.stringify(user));
  }
  
  public getUser () {
    // Retrieve the user string from localStorage
    const data = localStorage.getItem("user");
    
    // If data is not null, parse it back to an object, otherwise return null
    return data ? JSON.parse(data) : null;
  }


  
  public getemail() {
    if (this.isBrowser()) {
      const roles = localStorage.getItem('email');
      // return roles ? JSON.parse(roles) : [];
      return roles;
    }
    return null;
  }
  public getRoles(): any[] {
    if (this.isBrowser()) {
      const roles = localStorage.getItem('roles');
      return roles ? JSON.parse(roles) : [];
    }
    return [];
  }

  public setToken(jwtToken: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('jwtToken', jwtToken);
    }
  }

  public getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('jwtToken');
    }
    return null;
  }

  public clear(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('roles');
    }
  }

  public isLoggedIn(): boolean {
    return !!this.getRoles().length && !!this.getToken();
  }

  public isAdmin(): boolean {
    const roles: any[] = this.getRoles();
    return roles.length > 0 && roles[0].roleName === 'Admin';
  }
}
