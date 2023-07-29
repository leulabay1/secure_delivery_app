import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient,
              private router:Router) { }

  loggedIn:boolean=false;


  // login function 
  onLogin(loginForm:Object):Observable<any>{
    return this.http.post(`https://secure-delivery-app-8xqw-6kxvvlydv-leulabay1.vercel.app/login`,loginForm);
  }


  // register function 
  onRegister(user:Object):Observable<any>{
     return this.http.post('https://secure-delivery-app-8xqw-6kxvvlydv-leulabay1.vercel.app/register',user)
  }

  // user profile function 
  getProfile():Observable<any>{
    let headers={
      'Authorization':"Bearer " + localStorage.getItem('token')
    }
    return this.http.get('https://secure-delivery-app-8xqw-6kxvvlydv-leulabay1.vercel.app/profile',{headers:headers});
  }

  // check user is loggedin 
  isAuth(){
    if(localStorage.getItem('token')){
      return true;
    }
    else{
      return false;
    }
  }

   
}
