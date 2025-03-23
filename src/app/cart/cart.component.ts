import { Component, inject } from '@angular/core';
import { PricePipePipe } from '../price-pipe.pipe';
import { CartCounterService } from '../services/cart/cart-counter.service';
import { CartProductsService } from '../services/cart/cartProducts/cart-products.service';
import { ProductCounterService } from '../services/cart/productCounter/product-counter.service';
import type { SingleProduct } from '../type/product';

@Component({
  selector: 'app-cart',
  imports: [PricePipePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  counter = inject(CartCounterService);
  cartProductsService = inject(CartProductsService);
  cartProducts!: SingleProduct[];
  counterValue!: number;
  // product!: Product;
  totalPrice: number = 0;
  ProductCounterService = inject(ProductCounterService);
  productCounter: number[] = [];
  ngOnInit() {
    this.counter.getCounter().subscribe((c) => (this.counterValue = c));
    this.cartProductsService.getCartProducts().subscribe((products) => {
      this.cartProducts = products;
      products.forEach((val, index) => {
        this.ProductCounterService.setCounter(val.id);
        this.ProductCounterService.getCounter().subscribe(
          (c) => (this.productCounter = c)
        );
      });
      this.totalPrice = this.cartProductsService.getTotalPrice();
    });
  }
  resetCounter() {
    this.counter.reset();
  }
  handleDelete(id: number) {
    const conf = confirm('are you sure you want to remove this product?');
    let product = this.cartProducts.find(
      (pro) => pro.id == id
    ) as SingleProduct;
    console.log(product);

    if (conf) {
      let noOfProd = 0;
      this.ProductCounterService.getCounter().subscribe(
        (c) => (noOfProd = c[id])
      );
      this.cartProductsService.removeCartProduct(id);
      this.counter.setCounter(this.counterValue - noOfProd);
      // this.totalPrice
      // console.log(this.totalPrice);
    }
  }
  raiseCount(id: number) {
    let product = this.cartProducts.find(
      (pro) => pro.id == id
    ) as SingleProduct;
    if (this.productCounter[id] >= product.stock) {
      alert('max stock');
      return;
    }
    this.ProductCounterService.changeCount(id, true);
    this.counter.setCounter(this.counterValue + 1);
    this.totalPrice += product.price;
  }
  lowerCount(id: number) {
    let product = this.cartProducts.find(
      (pro) => pro.id == id
    ) as SingleProduct;
    if (this.productCounter[id] > 0) {
      this.totalPrice -= product.price;
    }
    this.ProductCounterService.changeCount(id, false);
    this.counter.setCounter(this.counterValue - 1);
  }
}
