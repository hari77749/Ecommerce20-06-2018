import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Http, Response } from '@angular/http';
 import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of} from 'rxjs';
import { CHARACTERS } from '../../SharedModule/Models/mock-data';

@Injectable({
  providedIn: 'root'
})
export class AutenticationService {

  private authURL = 'http://14.192.17.225/GarbhaGudiTestAPI/oAuth/token'; 
  constructor(  private http: Http,) { }

  getLogin(AppUsers)
  {
    
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded',
    // 'Authorization':'Basic T2dfT2Q2V1R3OHRkYUhyTkN6WlNwaVk0YldRYTpVW'
  });
    let options = new RequestOptions({ headers: headers });

    let values= "grant_type=password&"+"Username="+AppUsers.UserName+"&Password="+AppUsers.Password;

    return this.http.post(this.authURL,values, options).toPromise()
    .then(this.extractData)
    .catch(this.handleError);    
  }

  private extractData(res: Response) {    
    let body = res.json();
    return body || {};
}
private handleError(error: Response | any) {
  debugger;
  //Log error
  let errMsg: string;
  if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
      errMsg = error.message ? error.message : error.toString();
  }
  // console.error(errMsg);
  return errMsg;
}

getCharacters(): Observable<any[]>{
  return of (CHARACTERS);
}
getColumns(): string[]{
  return ["name", "age", "species", "occupation"]
};

}




