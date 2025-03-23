import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { FetchProductsService } from '../services/fetchData/fetch-products.service';
import { PaginationService } from '../services/pagination/pagination.service';
import type { Product } from '../type/product';

@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent {
  prods = inject(FetchProductsService);
  pageNumber = inject(PaginationService);
  currentPage!: number;
  disabled: boolean[] = [];
  pages: number[] = [];
  constructor() {
    this.pageNumber.getPage().subscribe((c) => (this.currentPage = c));
  }

  products!: Product['products'];
  prodsInfo!: { total: number; skip: number; limit: number };

  ngOnInit() {
    this.prods.getProductsPagination().subscribe((res) => {
      this.products = res.products;
      this.prodsInfo = {
        total: res.total,
        skip: res.skip,
        limit: res.limit,
      };
      this.pages = Array(
        Math.floor(this.prodsInfo.total / this.prodsInfo.limit)
      );
      this.disabled = Array(this.pages.length).fill(false);
      this.disabled[0] = true;
    });
  }
  handlePagination(index: number) {
    this.disabled = Array(this.pages.length).fill(false);
    this.disabled[index] = true;
    this.pageNumber.setPage(index + 1);
    this.prods.getProductsPagination().subscribe((res) => {
      this.products = res.products;
      this.prodsInfo = {
        total: res.total,
        skip: res.skip,
        limit: res.limit,
      };
    });
  }
}
