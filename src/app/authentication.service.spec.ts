import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, RequestMethod, ResponseOptions, Response } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';
// import { City } from './city';

let mockBackend: MockBackend;
let authenticationService: AuthenticationService;

let MockUser: any = <any>{username: 'john', password: 'john'};
let MockUser2: any = <any>{username: 'borris', password: 'borris'};

let MockUsersArray: Array<any> = [ MockUser, MockUser2 ];

let setup = (httpMock) => {
  TestBed.configureTestingModule({
    providers: [
      AuthenticationService,
      MockBackend,
      BaseRequestOptions,
      {
        provide: Http,
        useFactory: (backend: MockBackend, options: BaseRequestOptions) => new httpMock(backend, options),
        deps: [ MockBackend, BaseRequestOptions ]
      }
    ]
  });
  inject([ MockBackend, Http ],
    (mb: MockBackend, http: Http) => {
      mockBackend = mb;
      authenticationService = new AuthenticationService(http);
    })();
};


describe('AuthenticationService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
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
      authenticationService = new AuthenticationService(http);
    })
  );

  it('should exist', () => {
    expect(authenticationService).toBeTruthy();
  });

  it('should return the valid users', (done) => {

    let validUsername = 'john';
    let validPassword = 'john';

    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(connection.request.url).toEqual('api/auth');
      connection.mockRespond(new Response(new ResponseOptions({
        body: {data : MockUser}
      })));
    });

    authenticationService.login(validUsername, validPassword).subscribe(resp => {
      expect(resp).toEqual({data: MockUser});
      done();
    });

  });

});

class MockFailedGetCitiesHttp extends Http {
  constructor(backend, options) {
    super(backend, options);
  }

  get() {
    return Observable.throw('error');
  }
}

class MockSuccessGetCitiesHttp extends Http {
  constructor(backend, options) {
    super(backend, options);
  }

  get() {
    return Observable.from([ new Response(new ResponseOptions({body: {data: MockUsersArray}})) ]);
  }
}
