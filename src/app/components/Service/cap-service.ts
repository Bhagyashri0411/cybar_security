import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
// import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CAPService {
  options: any;
  cookieValue: any;
  userDetails: any;
  TLParams: any;
  actionPlantext: any;
  version: any;
  feedbackLink: any;
  defectLink: any;
  helpFileName: any;
  
  constructor(
    private http: HttpClient,
  ) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    this.options = { headers };
  }

   
   
}
      
      
