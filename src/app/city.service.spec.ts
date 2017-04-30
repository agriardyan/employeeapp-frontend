import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, RequestMethod, ResponseOptions, Response } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs';

import { CityService } from './city.service';
import { City } from './city';

let mockBackend: MockBackend;
let cityService: CityService;

let MockCity: City = <City>{cityId: 1, city: 'Lorem'};
let MockCity2: City = <City>{cityId: 2, city: 'Ipsum'};
let MockCity3: City = <City>{cityId: 3, city: 'Dolor'};
let MockCity4: City = <City>{cityId: 4, city: 'SitAmet'};

let MockCitiesArray: Array<City> = [ MockCity, MockCity2, MockCity3, MockCity4 ];

let setup = (httpMock) => {
  TestBed.configureTestingModule({
    providers: [
      CityService,
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
      cityService = new CityService(http);
    })();
};


describe('CityService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CityService,
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
      cityService = new CityService(http);
    })
  );

  it('should exist', () => {
    expect(cityService).toBeTruthy();
  });

  it('should return the cities array from the promise when getAllCities succeeds', (done) => {

    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Get);
      expect(connection.request.url).toEqual('api/city/fetch');
      connection.mockRespond(new Response(new ResponseOptions({
        body: {data : MockCitiesArray}
      })));
    });

    cityService.getAllCities().then(cities => {
      expect(cities).toEqual({data:MockCitiesArray});
      done();
    });
  });

});

class MockFailedGetHeroesHttp extends Http {
  constructor(backend, options) {
    super(backend, options);
  }

  get() {
    return Observable.throw('error');
  }
}

class MockSuccessGetHeroesHttp extends Http {
  constructor(backend, options) {
    super(backend, options);
  }

  get() {
    return Observable.from([ new Response(new ResponseOptions({body: {data: MockCitiesArray}})) ]);
  }
}
