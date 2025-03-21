import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8090/api/users';

  requetheader=new HttpHeaders({
    "No-Auth":"True"
  });
  constructor(private http: HttpClient) { }

  // registeruser( user:Registrationdata){
  //   return this.http.post(this.apiUrl+"/register",user,{responseType:'text'});
  // }

  // getdata(){
  //   return this.http.get(this.apiUrl+"/getdata")
  // }

  // updatedata(id:any,student:Registrationdata){
  //   // const userId =id; 
  //   return this.http.put(this.apiUrl+"/update/"+id,student,{responseType:'text'});
  // }
  // deletedata(id:any){
  //  return this.http.delete(this.apiUrl+"/delete/"+id,{responseType:'text'});
  // }



  login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { email, password },{headers:this.requetheader});
  }

}