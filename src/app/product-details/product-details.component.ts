import { Component, inject, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PricePipePipe } from '../price-pipe.pipe';
import type { Product, SingleProduct } from '../type/product';

import { faStar } from '@fortawesome/free-solid-svg-icons';
import { CartCounterService } from '../services/cart/cart-counter.service';
import { CartProductsService } from '../services/cart/cartProducts/cart-products.service';

@Component({
  selector: 'app-product-details',
  imports: [PricePipePipe, FontAwesomeModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  cartCounter = inject(CartCounterService);
  addToCart = inject(CartProductsService);
  products!: Product['products'];
  currentCartCount!: number;
  jsonFile: string = 'products.json';
  currentProduct!: SingleProduct;
  rating!: string[];
  faStar = faStar;
  @Input() id!: number;
  ngOnInit() {
    this.cartCounter.getCounter().subscribe((c) => (this.currentCartCount = c));
    fetch(this.jsonFile)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        {
          this.products = json.products;
          this.currentProduct = this.products.find((prod) => {
            return prod.id === Number(this.id);
          }) as SingleProduct;
          this.rating = Array(Math.round(this.currentProduct.rating)).fill('');
          console.log(this.currentProduct);
        }
      });
  }
  handleAddToCart(id: number) {
    this.cartCounter.setCounter(this.currentCartCount + 1);
    this.addToCart.addNewProduct(id);
  }
}
