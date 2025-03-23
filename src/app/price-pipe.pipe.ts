import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pricePipe',
})
export class PricePipePipe implements PipeTransform {
  transform(value: number): unknown {
    return (value * 50.6).toFixed(2);
  }
}
