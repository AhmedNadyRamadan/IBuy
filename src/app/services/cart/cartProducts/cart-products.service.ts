import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, type Observable } from 'rxjs';
import { type SingleProduct } from '../../../type/product';
import { FetchProductsService } from '../../fetchData/fetch-products.service';
import { CartCounterService } from '../cart-counter.service';

@Injectable({
  providedIn: 'root',
})
export class CartProductsService {
  private products = new BehaviorSubject<SingleProduct[]>([]);
  private allProds: SingleProduct[] = [];
  private data = inject(FetchProductsService);
  private counter = inject(CartCounterService);

  ngOnInit() {}
  addNewProduct(id: number) {
    if (this.allProds.find((prod) => prod.id == id)) {
      let currentCount!: number;
      this.counter.getCounter().subscribe((c) => {
        currentCount = c;
      });
      this.counter.setCounter(currentCount - 1);
      return;
    }
    this.data.getProductById(id).subscribe((prod) => {
      this.allProds.push(prod);
    });
    this.products.next(this.allProds);
  }
  getCartProducts(): Observable<SingleProduct[]> {
    return this.products.asObservable();
  }
  removeCartProduct(id: number) {
    this.allProds = this.allProds.filter((prod) => prod.id != id);
    this.products.next(this.allProds);
  }
  getTotalPrice(): number {
    let totalPrice: number = 0;
    this.allProds.forEach((val) => {
      totalPrice += val.price;
    });
    return totalPrice;
  }
}
