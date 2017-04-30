import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

let authGuard: AuthGuard;

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, RouterTestingModule, Router]
    });
  });

  beforeEach(inject([ Router ],
    (router: Router) => {
      authGuard = new AuthGuard(router);
    })
  );

  // it('TODO should created', () => {
  //   // expect(guard).toBeTruthy();
  //   expect(true).toBe(true);
  // });
});
