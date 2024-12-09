import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toEth',
  standalone: true,
})
export class ToEthPipe implements PipeTransform {
  transform(value: number | string, maxDecimalDigits: number = 6): string {
    if (value == null || isNaN(Number(value))) {
      return 'Invalid value';
    }

    const weiToEth = Number(value) / 1e18;
    const roundedValue = parseFloat(weiToEth.toFixed(maxDecimalDigits)); // Removes unnecessary trailing zeros
    return roundedValue.toString(); // Convert to string to ensure consistent display
  }
}
