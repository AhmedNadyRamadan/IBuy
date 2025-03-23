import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { Product, SingleProduct } from '../../type/product';
import { PaginationService } from '../pagination/pagination.service';

@Injectable({
  providedIn: 'root',
})
export class FetchProductsService {
  private http = inject(HttpClient);
  products!: object;
  pagination = inject(PaginationService);
  currentPage!: number;
  constructor() {
    this.pagination.getPage().subscribe((c) => (this.currentPage = c));
  }
  getProducts(): Observable<Product> {
    return this.http.get<Product>(`${environment.url}/products`);
  }
  getProductById(id: number): Observable<SingleProduct> {
    return this.http.get<SingleProduct>(`${environment.url}/products/${id}`);
  }
  getProductsPagination(): Observable<Product> {
    return this.http.get<Product>(`${environment.url}/products`, {
      params: { skip: (this.currentPage - 1) * 30 },
    });
  }
}
