import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { TableModule } from 'primeng/table';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { TabViewModule } from 'primeng/tabview';
import { DemoComponent } from './components/demo/demo.component'; 

@NgModule({
    declarations: [
        AppComponent,
        DemoComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        TableModule,
        FormsModule,
        MessagesModule,
        DropdownModule,
        CalendarModule,
        DialogModule,
        ConfirmDialogModule,
        NgxSpinnerModule,
        CommonModule,
        CardModule,
        CheckboxModule,
        TabViewModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        DialogService,
        MessageService,
        ConfirmationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
