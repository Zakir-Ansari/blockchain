import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  /**
   * Calculates the number of full days left from the current time to the given timestamp.
   * @param targetTimestamp - The target timestamp in milliseconds.
   * @returns The number of days left. Returns 0 if the target timestamp is in the past.
   */
  calculateDaysLeft(targetTimestamp: number): number {
    const currentTime = Date.now(); // Get the current timestamp in milliseconds
    const timeDifference = targetTimestamp - currentTime; // Calculate the difference in milliseconds

    if (timeDifference <= 0) {
      return 0; // If the target timestamp is in the past, return 0
    }

    const millisecondsInADay = 1000 * 60 * 60 * 24; // Number of milliseconds in one day
    return Math.ceil(timeDifference / millisecondsInADay); // Calculate and round up to the nearest day
  }
}
