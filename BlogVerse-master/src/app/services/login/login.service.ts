import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  private url = "http://localhost:5000/blogverse/user/";

  login(username:string, password:string):Observable<any>{
    return this.http.post(this.url+"login", {username: username, password: password});
  }

  register(user:any):Observable<any>{
    return this.http.post(this.url+"register", user);
  }
}
