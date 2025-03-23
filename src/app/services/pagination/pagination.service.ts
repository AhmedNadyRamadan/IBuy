import { Injectable } from '@angular/core';
import { BehaviorSubject, type Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private paginateValue = new BehaviorSubject<number>(1);
  private currentPage!: number;
  urls = window.location.search;
  params = new URLSearchParams(this.urls);
  constructor() {
    this.paginateValue.subscribe((c) => (this.currentPage = c));
    // console.log('params', this.params.get('page6'));
    // this.params.set('test', '20');
    // const url = new URL(window.location.href);
    // url.searchParams.set('text', '11');
    // console.log(url);
  }

  getPage(): Observable<number> {
    return this.paginateValue.asObservable();
  }
  nextPage(maxVal: number): void {
    if (maxVal - this.currentPage * 30 > 30) {
      this.paginateValue.next(this.currentPage + 1);
    }
  }
  prevPage(): void {
    if (this.currentPage > 0) {
      this.paginateValue.next(this.currentPage - 1);
    }
  }
  setPage(pageNumber: number): void {
    this.paginateValue.next(pageNumber);
  }
}
