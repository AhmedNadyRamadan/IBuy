import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { PricePipePipe } from '../price-pipe.pipe';
import { CartCounterService } from '../services/cart/cart-counter.service';
import { CartProductsService } from '../services/cart/cartProducts/cart-products.service';
import type { Product } from '../type/product';

@Component({
  selector: 'app-product-card',
  imports: [PricePipePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  products = input<Product['products']>();
  info = input<{ limit: number; skip: number; total: number }>();
  router = inject(Router);
  cartCounter = inject(CartCounterService);
  addToCart = inject(CartProductsService);

  currentCount!: number;
  constructor() {
    this.cartCounter.getCounter().subscribe((c) => (this.currentCount = c));
  }
  handleDetails(id: number) {
    this.router.navigate(['details', id.toString()]);
  }
  handleAddToCart(id: number) {
    this.cartCounter.setCounter(this.currentCount + 1);
    this.addToCart.addNewProduct(id);
  }
}
