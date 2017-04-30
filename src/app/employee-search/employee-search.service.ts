import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import {Employee} from "../employee";
import {log} from "util";

@Injectable()
export class EmployeeSearchService {

  private getEmployeeURL:string = 'api/employee';

  constructor(private http:Http) { }

  search(term:string): Observable<Employee[]> {
    return this.http.get(`api/employee/search?name=${term}`)
      .map(response =>  response.json() as Employee[])
      .catch(this.handleError);
  }

  searchEmployees(term: Observable<string>): Observable<Employee[]> {
    console.log('enter searchEmployee',term);
    if(term) {
      return term.debounceTime(200).distinctUntilChanged().switchMap(term => this.search(term));
    } else {
        return this.http.get(`api/employee/fetch`)
          .map(response =>  {
            console.log('response search', response.json());
            return response.json() as Employee[];})
          .catch(this.handleError);
    }

  }

  private handleError(error: any): Promise<any> {
    console.error('Error on EmployeeSearchService', error);
    return Promise.reject(error.message || error);
  }

}
