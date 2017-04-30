import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Form, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeSearchComponent } from './employee-search/employee-search.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import {EmployeeSearchService} from "./employee-search/employee-search.service";
import {EmployeeService} from './employee.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AlertComponent } from './alert/alert.component';

import { routing } from './app.routing';

import { AuthGuard } from './auth.guard';
import { AlertService } from './alert.service';
import { AuthenticationService } from './authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeSearchComponent,
    EmployeeDetailComponent,
    LoginComponent,
    HomeComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    EmployeeService,
    EmployeeSearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
