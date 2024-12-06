import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(
    value: string,
    frontLength: number = 4,
    backLength: number = 5
  ): string {
    if (!value) return value; // Handle cases where value is null or undefined
    if (value.length <= frontLength + backLength) return value; // Return the original string if it's short
    return `${value.substring(0, frontLength)}...${value.substring(
      value.length - backLength
    )}`;
  }
}
