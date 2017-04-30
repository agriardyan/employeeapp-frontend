import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';

import {Subject} from "rxjs/Subject";

import { EmployeeService } from '../employee.service';

import { Employee } from '../employee'
import {EmployeeSharedService} from "../employee-shared.service";
import {EmployeeSearchService} from "../employee-search/employee-search.service";

@Component({
  selector: 'employee-list',
  providers: [ EmployeeService ],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnChanges {

  employees: Employee[];
  selectedEmployee: Employee;
  sortAsc: boolean;

  searchQuery = new Subject<string>();

  cities:any = [
    {cityId: 1, city: 'Yogyakarta'},
    {cityId: 2, city: 'Bali'},
    {cityId: 3, city: 'Bandung'},
    {cityId: 4, city: 'Jakarta'}
  ];

  genders: any = [
    { genderId: 1, gender: 'Male' },
    { genderId: 2, gender: 'Female' },
    { genderId: 3, gender: 'Not Stated' }
  ];

  constructor(private employeeService:EmployeeService, private employeeSearchService:EmployeeSearchService, private employeeSharedService:EmployeeSharedService) {
    this.sortAsc = true;
    this.getAllEmployees();
  }

  ngOnInit() {

    console.log('pre subscribing');
    this.employeeSearchService.searchEmployees(this.searchQuery.asObservable()).subscribe(result => {
      console.log('subscribing');
      this.employees = result;
      if(!result) {
        this.getAllEmployees();
      } else {
        this.employees = result;
      }
    });

    this.subscribeChange();

    // this.employeeSharedService.listenSearch().subscribe(e => this.employees = e);
  }

  subscribeChange() {
    this.employeeSharedService.listenChange()
      .subscribe(e => {
        if(e == true) {
          this.getAllEmployees();
        }
      });
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add 'implements OnChanges' to the class.
    this.employees = changes.employees.currentValue;
  }

  filterLocation(value:any) {
    console.log('filter',value);

    if(value == '0') {
      this.getAllEmployees();
    } else {
      this.employeeService.filterEmployeesByLocation(value).then(employees => this.employees = employees).then(employees => {
        this.selectedEmployee = employees[0];
        this.employeeSharedService.setSelectedEmployee(employees[0]);
      });
    }
    
    console.log('selectedEmployee filter', this.selectedEmployee);
  }

  filterGender(value:any) {
    console.log('filter',value);

    if(value == '0') {
      this.getAllEmployees();
    } else {
      this.employeeService.filterEmployeesByGender(value).then(employees => this.employees = employees).then(employees => {
        this.selectedEmployee = employees[0];
        this.employeeSharedService.setSelectedEmployee(employees[0]);
      });
    }
    
    console.log('selectedEmployee filter', this.selectedEmployee);
  }

  getAllEmployees(): void {
    this.employeeService.getAllEmployees().then(employees => this.employees = employees).then(employees => {
      this.selectedEmployee = employees[0];
      this.employeeSharedService.setSelectedEmployee(employees[0]);
    });
    console.log('selectedEmployee', this.selectedEmployee);
  }

  search(query:string): void {
    this.searchQuery.next(query);
  }

  prepareNewEmployee() {
    this.selectEmployee(null);
  }

  selectEmployee(employee:Employee) {
    this.selectedEmployee = employee;
    this.employeeSharedService.setSelectedEmployee(employee);
    console.log('selectedEmployee', this.selectedEmployee);
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.selectedEmployee).then(() => this.getAllEmployees());
  }

  toggleSort(): void {
    console.log('sort');
    let x = -1;
    let y = 1;

    if(!this.sortAsc) {
      x = 1;
      y = -1;
    }

    this.employees.sort((a, b) => {
      if(a.lastName < b.lastName) return x;
      if(a.lastName > b.lastName) return y;
      return 0;
    });

    this.selectedEmployee = this.employees[0];
    this.sortAsc = !this.sortAsc;
  }

}
