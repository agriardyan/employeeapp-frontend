import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { City } from './city';

@Injectable()
export class CityService {

  private getCityURL:string = 'api/city';

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http:Http) {}

  getAllCities(): Promise<City[]> {
    return this.http.get(this.getCityURL + `/fetch`).toPromise()
      .then(response =>  {
        console.log('data', response.json());
        return response.json() as City[];
      })
      .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error('Error Bro!!!', error);
    return Promise.reject(error.message || error);
  }


}
