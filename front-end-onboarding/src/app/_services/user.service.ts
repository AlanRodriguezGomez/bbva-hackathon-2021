import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private subject = new BehaviorSubject<any>({});

  constructor () { }

  sendData(message: any) {
      this.subject.next(message);
  }
  
  clearData() {
      this.subject.next({});
  }
  
  getData(): Observable<any> {
      return this.subject.asObservable();
  }
  
}
