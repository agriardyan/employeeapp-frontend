import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {

  subject:Subject<any> = new Subject<any>();
  keepAfterNavigationChange:boolean = false;

  constructor(private router:Router) { 
    // clear alert message on route change
    router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        if(this.keepAfterNavigationChange) {
          this.keepAfterNavigationChange = false;
        } else {
          // broadcast to clear alert
          this.subject.next();
        }
      }
    })
  }

  success(message:string, keepAfterNavigationChange:boolean = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type:'success', text: message });
  }

  error(message:string, keepAfterNavigationChange:boolean = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type:'error', text: message });
  }

  getMessage():Observable<any> {
    return this.subject.asObservable();
  }

}
