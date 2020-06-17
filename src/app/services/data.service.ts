import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept': 'application/json',
    'cookie-token':'dafb7fb38ufbui9wess',
    'Access-Control-Max-Age':'600',
    // "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
    // 'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private  BASEURL : string = 'http://www.urteam.in/dev/'
  constructor(private http:HttpClient) { }

  findResult(data:any ,uri:string):Observable<any>{
    return this.http.post<any>(this.BASEURL + uri, data, httpOptions)
      .pipe(
        map((res: any) =>{          
            return res;
          })
      );
  }
}
