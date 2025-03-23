import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CartCounterService } from './services/cart/cart-counter.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'lab3_products';
  counter = inject(CartCounterService);
  counterValue!: number;

  ngOnInit() {
    this.counter.getCounter().subscribe((c) => (this.counterValue = c));
  }
}
