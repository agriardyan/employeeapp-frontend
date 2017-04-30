import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, RequestMethod, ResponseOptions, Response } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs';

import { EmployeeSearchService } from './employee-search.service';
import { Employee } from '../employee';

let mockBackend: MockBackend;
let employeeSearchService: EmployeeSearchService;

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

describe('EmployeeSearchService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EmployeeSearchService,
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

  beforeEach(inject([ MockBackend, Http ],
    (mb: MockBackend, http: Http) => {
      mockBackend = mb;
      employeeSearchService = new EmployeeSearchService(http);
    })
  );

  it('should exist', () => {
    expect(employeeSearchService).toBeTruthy();
  });

  // it('should return the employees array that match search query', (done) => {

  //   let term = 'john';

  //   mockBackend.connections.subscribe((connection: MockConnection) => {
  //     expect(connection.request.method).toEqual(RequestMethod.Get);
  //     expect(connection.request.url).toEqual(`api/employee/search?name=${term}`);
  //     connection.mockRespond(new Response(new ResponseOptions({
  //       body: {data : mockEmployee}
  //     })));
  //   });

  //   employeeSearchService.search(term).map(response => {
  //     expect(response).toEqual({data:mockEmployee});
  //     done();
  //   });

  // });

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
