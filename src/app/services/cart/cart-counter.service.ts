import { Injectable } from '@angular/core';
import { BehaviorSubject, type Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartCounterService {
  private counter = new BehaviorSubject<number>(0);
  constructor() {}
  getCounter(): Observable<number> {
    return this.counter.asObservable();
  }
  setCounter(num: number) {
    this.counter.next(num);
  }
  reset() {
    this.counter.next(0);
  }
}
