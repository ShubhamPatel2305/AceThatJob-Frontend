import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url=environment.apiUrl;

  constructor(private httpClient:HttpClient) {}

  addNewCategory(data:any){
    return this.httpClient.post(this.url+"/category/addnewcategory",data,{
      headers:new HttpHeaders().set('Content-Type','application/json')
    })
  }

  updateCategory(data:any){
    return this.httpClient.post(this.url+"/category/updatecategory",data,{
      headers:new HttpHeaders().set('Content-Type','application/json')
    })
  }

  getAllCategory(){
    return this.httpClient.get(this.url+"/category/getallcategories");
  }
}
