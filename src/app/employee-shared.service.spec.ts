import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, RequestMethod, ResponseOptions, Response } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs';

import { EmployeeService } from './employee.service';
import { EmployeeSharedService } from './employee-shared.service';
import { Employee } from './employee';

let mockBackend: MockBackend;
let employeeService: EmployeeService;
let employeeSharedService: EmployeeSharedService;

let mockEmployee: Employee = <Employee>{
  empId: 1,
  firstName: 'John',
  lastName: 'Jim',
  gender: 'Male',
  dateOfBirth: new Date(),
  nationality: 'Indonesia',
  maritalStatus: 'Single',
  city: {cityId:1, city:'Yogyakarta'},
  subDivision: 'Java Bootcamp',
  status: 'Permanent',
  suspendDate: null,
  hiredDate: new Date(),
  grade: 'JP',
  division: 'CDC',
  email: 'mail@mail.com',
  profilePicture: ''
};

let mockEmployee2: Employee = <Employee>{
  empId: 2,
  firstName: 'Jack',
  lastName: 'Sparrow',
  gender: 'Male',
  dateOfBirth: new Date(),
  nationality: 'Indonesia',
  maritalStatus: 'Single',
  city: {cityId:1, city:'Bandung'},
  subDivision: 'Java Bootcamp',
  status: 'Permanent',
  suspendDate: null,
  hiredDate: new Date(),
  grade: 'JP',
  division: 'CDC',
  email: 'mail@mail.com',
  profilePicture: ''
};

let mockEmployee3: Employee = <Employee>{
  empId: 3,
  firstName: 'Irene',
  lastName: 'Adler',
  gender: 'Female',
  dateOfBirth: new Date(),
  nationality: 'Indonesia',
  maritalStatus: 'Single',
  city: {cityId:1, city:'Yogyakarta'},
  subDivision: 'Java Bootcamp',
  status: 'Permanent',
  suspendDate: null,
  hiredDate: new Date(),
  grade: 'JP',
  division: 'CDC',
  email: 'mail@mail.com',
  profilePicture: ''
};

let mockEmployeesArray: Array<Employee> = [ mockEmployee, mockEmployee2, mockEmployee3 ];

describe('EmployeeSharedService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EmployeeService,
        EmployeeSharedService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, options: BaseRequestOptions) => new Http(backend, options),
          deps: [ MockBackend, BaseRequestOptions ]
        }
      ]
    });
  });

  beforeEach(inject([ MockBackend, EmployeeService, Http ],
    (mb: MockBackend, empService: EmployeeService, http: Http) => {
      mockBackend = mb;
      employeeSharedService = new EmployeeSharedService(empService);
    })
  );

  it('should exist', () => {
    expect(employeeSharedService).toBeTruthy();
  });

});

class MockFailedGetHttp extends Http {
  constructor(backend, options) {
    super(backend, options);
  }

  get() {
    return Observable.throw('error');
  }
}

class MockSuccessGetHttp extends Http {
  constructor(backend, options) {
    super(backend, options);
  }

  get() {
    return Observable.from([ new Response(new ResponseOptions({body: {data: mockEmployeesArray}})) ]);
  }
}
