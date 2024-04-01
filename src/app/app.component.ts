import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PrimeNGConfig } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { ApiService } from './layout/service/api-service.service';
import { CAPService } from './components/Service/cap-service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    userRoles: any;
    userInitial: any;
    userName: string = '';
    showAdmin: boolean = false;
    businessTitle: any;
    sessionService: any;
    toastr: any;
    errorHandlingService: any;
    usageTrackerLoaded:boolean = false;

    constructor(private primengConfig: PrimeNGConfig,
        private spinner: NgxSpinnerService,
        public service: ApiService
    ) { 
        this.getUserDetails('@userId');
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }

    getUserDetails(userId: string) {
        this.spinner.show();
        this.service.getUserDetails(userId).subscribe((res: any) => {
            console.log(res.UserApplicationList, res.UserApplicationList.indexOf(environment.applicationName));
            if ((res.Status === 403 || res.Status === 401) && res.data === 'unauthorized access') {
                //this.toastr.error('You are not authorised to access this application', 'Error',{toastComponent:ToastermessageComponent});
                setTimeout(() => {
                    window.location.href = res.URL;
                }, 3000);
            } else {
                localStorage.setItem("EID", res.employee.eid);
                if (res.UserApplicationList.indexOf(environment.applicationName) > -1) {
                    console.log(res);
                    this.userRoles = res.listOfRoleName;
                    // this.userRoles.push('SPA-User');
                    console.log(this.userRoles);
                    // localStorage.setItem("userRoles", this.userRoles);                    
                    this.userInitial = (res.employee.nameFirst)+' '+ (res.employee.nameLast);
                    this.service.userName = res.employee.nameFirst + ' ' + res.employee.nameLast;
                    this.service.businessTitle = res.employee.businessTitle;
                    this.service.userId = res.employee.eid;
                    this.getConfigurationData();
                    this.service.userDetails = res;
                    //session timeout started
                    //this.sessionService.getSessionTimeoutValue();
                } else {
                    // this.toastr.error('You are not authorised to access this application', 'Error',{toastComponent:ToastermessageComponent});
                    setTimeout(() => {
                        // window.location.href = res.redirectUrl;
                    }, 3000);
                }
            }
        }, err => {
            this.spinner.hide();
            //this.errorHandlingService.handleErrorMessages(err);
        });
    }
    
    getConfigurationData() {
        this.service.getConfigurationData().subscribe((data: any) => {
            this.spinner.hide();
            this.usageTrackerLoaded = true;
            this.service.setConfigurationData(data);
            this.service.version = JSON.parse(data.fileData.version)[0].version;
            this.service.feedbackLink = JSON.parse(data.fileData['feedback-link'])[0].link;
            this.service.defectLink = JSON.parse(data.fileData['feedback-link'])[1].link;
            this.service.helpFileName = data.downloadableFileNames.help;
            this.service.financialCalenderTemplate = data.downloadableFileNames.FinancialYearCalender;
            this.service.Template = data.downloadableFileNames.Template;

            //this.projectInfoService.statusMessages = JSON.parse(data.fileData['projectScopeErrorMessages'])[0];
            //this.projectMasterService.statusMessages = JSON.parse(data.fileData['projectScopeErrorMessages'])[0];
            //this.projectInfoService.systemInfoPopupData = JSON.parse(data.fileData['projectScopeErrorMessages'])[1];
        }, (err: any) => {
            this.spinner.hide();
            //   this.errorHandlingService.handleErrorMessages(err);
        });
    }


}
