import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Requestuser } from '../modul/requestuser';
import { UserAuthServiceService } from './user-auth-service.service';
import { Registrationuser } from '../modul/registrationuser';
// import { Requestuser } from '../modul/requestuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:9090';

  
  requestHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private httpclient: HttpClient,
    private userAuthService: UserAuthServiceService
  ) { }

 
  userdata: Requestuser = new Requestuser("","");

  public login(data:Requestuser) {
    console.log("Sending Data: " + JSON.stringify(data));
  
    return this.httpclient.post(this. apiUrl+ '/authenticate', data, {
      headers: this.requestHeader,
    });
  }

///this function only give role based acces 
public roleMatch(allowedRoles: string[]): boolean {
  const userRoles = this.userAuthService.getRoles(); // Get stored roles

  if (userRoles && userRoles.length > 0) {
    for (const userRole of userRoles) {
      if (allowedRoles.includes(userRole.roleName)) {
        return true; // ✅ Match found, return true
      }
    }
  }
  return false; // ✅ Ensure function always returns a boolean
}

public register(data:Registrationuser){
  console.log("from service--Password: " + data.userPassword)
  // console.log("password in service --"+data.userPassword);
  console.log("Sending Data: " + JSON.stringify(data));
  // console.log(data)
  
  return this.httpclient.post(this. apiUrl+ '/registerNewUser', data, {
    headers: this.requestHeader,
  });
}

}