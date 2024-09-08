import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {
  url=environment.apiUrl;

  constructor(private httpClient:HttpClient) {

   }

   login(data:any){
    return this.httpClient.post(this.url+"/appuser/login",data,{
      headers:new HttpHeaders().set('Content-Type', "application/json")
    })
   } 

   addNewAppUser(data:any){
    return this.httpClient.post(this.url+"/appuser/addnewuser",data,{
      headers:new HttpHeaders().set('Content-Type', "application/json")
    })
   }

   getAllAppUsers(){
    return this.httpClient.get(this.url+"/appuser/getallusers")
   }

   updateUser(data:any){
    return this.httpClient.post(this.url+"/appuser/updateuser",data,{
      headers:new HttpHeaders().set('Content-Type', "application/json")
    })
   }
   updateUserStatus(data:any){
    return this.httpClient.post(this.url+"/appuser/updateuserstatus",data,{
      headers:new HttpHeaders().set('Content-Type', "application/json")
    })
   }
}
