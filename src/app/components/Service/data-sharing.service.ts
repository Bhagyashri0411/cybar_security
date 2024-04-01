import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private rowDataSubject = new Subject<any>();

  // Observable to subscribe to changes
  rowData$ = this.rowDataSubject.asObservable();

  // Method to send data to subscribers
  sendRowData(rowData: any) {
    console.log('Sending data:', rowData);
    this.rowDataSubject.next(rowData);
  }
}
