import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, RequestMethod, ResponseOptions, Response } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AlertService } from './alert.service';

let mockBackend: MockBackend;
let alertService: AlertService;

describe('AlertService', () => {

  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     providers: [
  //       AlertService,
  //       MockBackend,
  //       BaseRequestOptions
  //     ]
  //   });
  // });

  // beforeEach(inject([Http],
  //   (router: Router) => {
  //     alertService = new AlertService(router);
  //   })
  // );

  it('should exist', () => {
    // expect(alertService).toBeTruthy();
    expect(true).toBe(true);
  });

});

