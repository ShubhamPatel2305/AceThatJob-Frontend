import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  url=environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  addNewArticle(data:any){
    return this.httpClient.post(this.url+"/article/addnewarticle",data,{
      headers:new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  updateArticle(data:any){
    return this.httpClient.post(this.url+"/article/updatearticle",data,{
      headers:new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  getAllArticle(){
    return this.httpClient.get(this.url+"/article/getallarticles");
  }

  getAllPublishedArticle(){
    return this.httpClient.get(this.url+"/article/getallpublishedarticles");
  }

  deleteArticle(id:any){
    return this.httpClient.get(this.url+"/article/deletearticle/"+id);
  }

  
}
