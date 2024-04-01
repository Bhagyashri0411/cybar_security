import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  options: any;
  cookieValue: any;
  userDetails: any;
  TLParams: any;
  configurationData: any;
  feedbackLinkData: any;
  helpFileLinkData: any;
  version: any;
  feedbackLink: any;
  defectLink: any;
  helpFileName: any;
  financialCalenderTemplate: any;
  FinancialCalenderLinkData: any;
  userName: string = '';
  businessTitle: any;
  userId: string = '';
  Template: any;
  constructor(
    private http: HttpClient,
  ) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    this.options = { headers };
  }

  getUserDetails(userId: string): Observable<any> {
    const requstProcessorData = {
      app: environment.securityName,
      action: '/api/Employee/' + userId,
      requestType: 'GET'
    };
    return this.http.post(environment.baseUrl + environment.reqProcessorUrl, requstProcessorData,
      this.options).pipe(map(response => response));
  }

  getSessionTimeoutValue() {
    return this.http.get(environment.baseUrl + environment.sessionTimeoutURL, this.options)
      .pipe(map(res => res));
  }


  logout(): Observable<any> {
    const requstProcessorData = {
      app: environment.securityName,
      action: '/api/UserSession/logout',
      requestType: 'GET'
    };
    return this.http.post(environment.baseUrl + environment.reqProcessorUrl, requstProcessorData, this.options)
      .pipe(map(res => res));
  }

  getFeedbackLink(feedbackLinkJSON: string) {
    this.feedbackLinkData.next(feedbackLinkJSON);
  }

  getHelpFilelink(helpFileLinkJSON: string) {
    this.helpFileLinkData.next(helpFileLinkJSON);
  }

  getFinancialYearCalenderlink(FinancialYearCalenderLinkJSON: string) {
    this.FinancialCalenderLinkData.next(FinancialYearCalenderLinkJSON);
  }



  getConfigurationData() {
    const requstProcessorData = {
      app: environment.usageApplicationName,
      action: environment.applicationFilesUrl + '/' + environment.applicationName,
      requestType: 'GET'
    };
    return this.http.post<any>(environment.baseUrl + environment.reqProcessorUrl, requstProcessorData)
      .pipe(map(res => res));
  }

  setConfigurationData(configData: any) {
    this.configurationData = configData;
  }

  downloadFileFromUsageTracker(filename: string): Observable<Blob> {
    const requstProcessorData = {
      app: environment.usageApplicationName,
      action: environment.downloadApplicationFiles + '/' + environment.applicationName + '/' + filename,
      requestType: 'GET',
    };
    const httpOptions = {
      responseType: 'blob' as 'json',
    };
    return this.http.post<any>(environment.baseUrl + environment.fileProcessorURL, requstProcessorData, httpOptions)
      .pipe(map(res => res));
  }


}
