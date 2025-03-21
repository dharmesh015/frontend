import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthServiceService {

  constructor() { }

  public setRoles(roles:[]){
           localStorage.setItem('roles',JSON.stringify(roles));
  }

  public getRoles(): any[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : []; // Return an empty array if roles is null
}

public setToken(jwtToken:string){
  localStorage.setItem('jwtToken',JSON.stringify(jwtToken));
}

public getToken(): String {
  const token = localStorage.getItem('jwtToken');
  return token ? JSON.parse(token) : ""; // Return an empty array if token is null
}

public clear(){
  localStorage.clear();

}

public isLoggedIn(){
  return this.getRoles() && this.getToken();
}

}
