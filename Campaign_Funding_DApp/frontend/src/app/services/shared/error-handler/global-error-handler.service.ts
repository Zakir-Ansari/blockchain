import { ErrorHandler, Injectable } from '@angular/core';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private toastService: ToastService) {}

  handleError(error: any): void {
    console.error(error);

    const message =
      error?.message || error?.error?.message || 'Unknown error occurred.';
    this.toastService.showToast(
      'Error',
      message || 'An unknown error occurred.',
      'error',
      5000,
      'top-0 start-50 translate-middle-x'
    );
  }
}
