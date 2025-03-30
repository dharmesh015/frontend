
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

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
