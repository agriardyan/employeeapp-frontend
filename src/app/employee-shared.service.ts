import {Injectable, OnInit} from '@angular/core';
import {Employee} from "./employee";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {EmployeeSearchService} from "./employee-search/employee-search.service";
import {EmployeeService} from './employee.service';

@Injectable()
export class EmployeeSharedService implements  OnInit{

  selectedEmployee:Employee;
  subjectSelectedEmployee: Subject<Employee> = new Subject<Employee>();
  subjectChange: Subject<boolean> = new Subject<boolean>();

  query: string;

  constructor(private employeeService:EmployeeService, private employeSearchService:EmployeeSearchService) { }

  ngOnInit(): void {
  }

  broadcastChange(a:boolean) {
    if(a == true) {
      this.subjectChange.next(a);
    }
  }
  //
  listenChange(): Observable<boolean> {
    return this.subjectChange.asObservable();
  }

  setSelectedEmployee(e:Employee) {
    console.log("set selected emp",e);
    if(e) {
      this.employeeService.getOneEmployees(e.empId).then(result => {
        this.selectedEmployee = result;
        this.subjectSelectedEmployee.next(result);
      });    
    } else {
        this.selectedEmployee = e;
        this.subjectSelectedEmployee.next(e);
    }
    
    
  }

  getSelectedEmployee(): Observable<Employee> {
    return this.subjectSelectedEmployee.asObservable();
  }

}
