/**
 * Created by root on 4/17/2017.
 */
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Employee } from './employee';

import { EmployeeSharedService } from './employee-shared.service';

import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

@Injectable()
export class EmployeeService {

  private getEmployeeURL:string = 'api/employee';

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http:Http) {}

  getAllEmployees(): Promise<Employee[]> {
    return this.http.get(`api/employee/fetch`).toPromise()
      .then(response =>  {
        console.log('data', response.json());
        return response.json() as Employee[];
      })
      .catch(this.handleError);
  }

// UNUSED YET
  getOneEmployees(id:number): Promise<Employee> {
    return this.http.get(`api/employee/fetch/${id}`).toPromise()
      .then(response =>  {
        console.log('data', response.json());
        return response.json() as Employee;
      })
      .catch(this.handleError);
  }

  filterEmployeesByLocation(query:string): Promise<Employee[]> {
    return this.http.get(`api/employee/filtercity?city=${query}`).toPromise()
      .then(response =>  {
        console.log('data', response.json());
        return response.json() as Employee[];
      })
      .catch(this.handleError);
  }

  filterEmployeesByGender(query:string): Promise<Employee[]> {
    return this.http.get(`api/employee/filtergender?gender=${query}`).toPromise()
      .then(response =>  {
        console.log('data', response.json());
        return response.json() as Employee[];
      })
      .catch(this.handleError);
  }

  searchEmployees(query:string): Observable<Employee[]> {
    return this.http.get(`api/employee/search?name=${query}`).map(response => response.json() as Employee[]).retry(3).catch(this.handleError);
  }

  addEmployee(employee:Employee): Promise<Employee> {
    console.log('add emp json', JSON.stringify(employee));
    return this.http.post(this.getEmployeeURL + `/add`,
      JSON.stringify(employee), {headers: this.headers})
      .toPromise()
      .then(response => { 
        console.log('add emp resp', response);
        if(response.text()) {
          return response.json() as Employee; 
        } else {
          return null;
        }        
      })
      .catch(this.handleError);
  }

  updateEmployee(employee:Employee): Promise<Employee> {
    return this.http.post(this.getEmployeeURL + `/update`,
      JSON.stringify(employee), {headers: this.headers})
      .toPromise()
      .then(() => employee)
      .catch(this.handleError);
  }

  deleteEmployee(employee:Employee): Promise<Employee> {
    return this.http.post(this.getEmployeeURL + `/delete`,
      JSON.stringify(employee), {headers: this.headers})
      .toPromise()
      .then(() => employee)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error Bro!!!', error);
    return Promise.reject(error.message || error);
  }


}
