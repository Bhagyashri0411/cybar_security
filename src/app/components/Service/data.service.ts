// data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userInitial = new BehaviorSubject('');
  currentUserInitial = this.userInitial.asObservable();
  private userName = new BehaviorSubject('');
  currentUserName = this.userName.asObservable();
  private buisnessTitle = new BehaviorSubject('');
  business = this.buisnessTitle.asObservable();
  private FileData = new BehaviorSubject('');
  configFileData = this.FileData.asObservable();
  
  private showDialogSource = new Subject<any>();
  showDialog$ = this.showDialogSource.asObservable();

  openDialog(data: any): void {
    this.showDialogSource.next(data);
  }
  changeUserInitial(message: string) {
    this.userInitial.next(message)
}

changeUserName(message: string) {
    this.userName.next(message)
}

getbuisnessTitle(message: string) {
    this.buisnessTitle.next(message)
}

getConfigFileData(data:string)
{
    this.FileData.next(data);
}


}
