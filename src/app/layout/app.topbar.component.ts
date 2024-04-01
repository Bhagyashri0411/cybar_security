import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { OverlayPanel } from 'primeng/overlaypanel';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UsageTrackerService } from '../components/Service/usage-tracker.service';
import { ApiService } from './service/api-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
  @ViewChild('panel') overlayPanel: OverlayPanel | any;

  items!: MenuItem[];
  businessTitle: any;
  userName: string | any;
  activeLink : any;
  // reportOptions: any[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;


  showDropdown = false;
  activeItem: MenuItem | undefined;



  constructor(public layoutService: LayoutService, public apiService: ApiService, private router: Router, private route: ActivatedRoute, private usageTrackerService: UsageTrackerService) {

    // this.reportOptions = [
    //   { label: 'Actual Travel Report', command: environment.actualTravelReport },
    //   { label: 'Travel forecast Report', command: environment.travelForcastReport },
    //   { label: 'Summary Report', command: environment.summaryReport }
    // ];

  

    // this.setActiveLink(this.router.url);

    // this.router.events.subscribe((val) => {
    //   if (val instanceof NavigationEnd) {
    //     this.setActiveLink(val.url);
    //   }
    // });

  }

  ngOnInit() {
    console.log(this.activeLink);
    console.log(this.apiService.userDetails?.employee?.nameFirst)
    // this.items = [
    //   { label: 'MY REQUEST', routerLink: '/myRequest' },
    //   { label: 'NEW TRAVEL REQUEST', routerLink: '/NewTravelRequest' },
    //   { label: 'TRAVEL FORECAST', routerLink: '/travelForecast' },
    //   {
    //     label: 'REPORTS',
    //     routerLink: '/reports',
    //     items: [
    //       { label: 'Actual Travel Report', icon: 'pi pi-fw pi-calendar', command: () => this.navigateOrOpenExternalLink(environment.actualTravelReport) },
    //       { label: 'Travel forecast Report', icon: 'pi pi-fw pi-chart-line', command: () => this.navigateOrOpenExternalLink(environment.travelForcastReport) },
    //       { label: 'Summary Report', icon: 'pi pi-fw pi-chart-bar', command: () => this.navigateOrOpenExternalLink(environment.summaryReport) },
    //     ],

    //   },
    //   { label: 'CONFIGURATION', routerLink: '/configuration' },
    // ];
    // this.activeItem = this.items[2];
  }

  // setActiveLink(url: string) {
  //   switch (url) {
  //     case '/myRequest':
  //       this.activeLink = 'myRequest';
  //       break;
  //     case '/NewTravelRequest':
  //       this.activeLink = 'NewTravelRequest';
  //       break;
  //     case '/travelForecast':
  //       this.activeLink = 'travelForecast';
  //       break;
  //     case '/reports':
  //       this.activeLink = 'reports';
  //       break;
  //     case '/configuration':
  //       this.activeLink = 'configuration';
  //       break;
  //     default:
  //       this.activeLink = 'travelForecast'; 
  //   }
  // }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  // navigateTravelForecast() {
  //   this.router.navigate(['travelForecast']);
  // }

  
  isComponentActive(componentRoute: string): boolean {
    return this.router.url.includes(componentRoute);
  }

  activePage: string = '';

  setActivePage(page: string) {
    this.activePage = page;
  }
  navigateOrOpenExternalLink(link: string): void {
    // Check if it's an internal link
    if (link.startsWith('/')) {
      this.router.navigateByUrl(link);
    } else {
      // External link - open in a new tab
      window.open(link, '_blank');
    }
  }
  openFeedbackForm() {
    window.open(this.apiService.feedbackLink, "_blank");
  }

  openDefectLink() {
    window.open(this.apiService.defectLink, "_blank");
  }

  redirectToGoogle() {
    window.location.href = 'https://www.google.com';
  }

  downloadHelpFile() {
    if (this.apiService.helpFileName != null && this.apiService.helpFileName != "" && this.apiService.helpFileName != undefined) {
      this.usageTrackerService.downloadFileFromUsageTracker(this.apiService.helpFileName).subscribe((data: any) => {
        var blob = new Blob([data], { type: 'application/pdf' });
        const urlCreator = window.URL;
        const url = urlCreator.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = this.apiService.helpFileName;
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

      }, (err: any) => {
        // this.spinner.hide();

      });

    }

  }

  logOut() {
    // this.spinner.show();
    this.apiService.logout().subscribe((res: any) => {
      // this.spinner.hide();
      if (res.status === 200) {
        window.location.href = res.URL;
      } else {

      }
    }, (err: any) => {
      // this.spinner.hide();          
    });
  }



}
