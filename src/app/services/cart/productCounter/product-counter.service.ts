import { Injectable } from '@angular/core';
import { BehaviorSubject, type Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductCounterService {
  private counterArr!: number[];
  private counter = new BehaviorSubject<number[]>([]);

  getCounter(): Observable<number[]> {
    return this.counter.asObservable();
  }
  setCounter(index: number) {
    this.counterArr = this.counter.value;
    if (this.counterArr[index] == undefined) {
      this.counterArr[index] = 1;
      this.counter.next(this.counterArr);
    }
  }
  changeCount(index: number, isInc: boolean) {
    this.counterArr = this.counter.value;

    if (isInc) {
      this.counterArr[index] += 1;
    } else {
      if (this.counterArr[index] == 0) {
        return;
      }
      this.counterArr[index] -= 1;
    }
    this.counter.next(this.counterArr);
  }
}
