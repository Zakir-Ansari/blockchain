import { Injectable } from '@angular/core';
declare const bootstrap: any;
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastContainerId = 'toastContainer';
  private defaultPosition = 'top-0 end-0'; // Default position (top-right)

  constructor() {
    this.initializeToastContainer();
  }

  // Initializes the toast container in the DOM
  private initializeToastContainer() {
    if (!document.getElementById(this.toastContainerId)) {
      const container = document.createElement('div');
      container.id = this.toastContainerId;
      container.className = `toast-container position-fixed ${this.defaultPosition} p-3`;
      document.body.appendChild(container);
    }
  }

  // Updates the position of the toast container
  private setPosition(position: string) {
    const container = document.getElementById(this.toastContainerId);
    if (container) {
      container.className = `toast-container position-fixed ${position} p-3`;
    }
  }

  /**
   * Displays a Bootstrap toast notification with the specified title, message, and optional delay and position.
   *
   * @param title - The title to display in the toast header.
   * @param message - The body message to display in the toast.
   * @param type - The type of message - 'error' for failure | 'check' for success
   * @param delay - (Optional) Duration in milliseconds before the toast automatically hides. Default is 5000ms.
   * @param position - (Optional) Position of the toast container.
   *                   Use Bootstrap utility classes like 'top-0 end-0' for top-right or 'top-0 start-0' for top-left.
   *                   If omitted, the last set position is used.
   * @param action - (Optional) Action to be performed.
   *
   * @example
   * // Show a toast at the top-center
   * showToast('Success', 'Your data has been saved!', 'check', 3000);
   *
   * @example
   * // Show a toast at the top-center
   * showToast('Success', 'Your data has been saved!', 'check', 3000, 'top-0 start-50 translate-middle-x');
   *
   * @example
   * // Show a toast at the top-right with action
   * showToast('Failure', 'Error occurred!', 'error' 3000, 'top-0 end-0', {
   *   bxIconName: 'bx-link',
   *   callback: () => console.log('Icon clicked'),
   * });
   *
   */
  showToast(
    title: string,
    message: string,
    type: 'error' | 'check',
    delay: number = 5000,
    position?: string,
    action?: { bxIconName: string; callback: () => void }
  ) {
    // Update position if provided
    if (position) {
      this.setPosition(position);
    }

    const textColor = type === 'error' ? 'danger' : 'success';
    const container = document.getElementById(this.toastContainerId);
    if (!container) return;

    // Create a toast element
    const toastElement = document.createElement('div');
    toastElement.className = 'toast fade';
    toastElement.setAttribute('role', 'alert');
    toastElement.setAttribute('aria-live', 'assertive');
    toastElement.setAttribute('aria-atomic', 'true');

    // Add action button or icon if provided
    const actionButtonHtml = action
      ? `<i class='bx ${action.bxIconName} action-btn fs-6 align-self-center cursor-p' ></i>`
      : '';

    toastElement.innerHTML = `
      <div class="toast-header text-${textColor}">
        <i class='bx bxs-${type}-circle fs-5' ></i>
        <strong class="me-auto">${title}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        <span class="align-self-center">${message}</span>
        ${actionButtonHtml}
      </div>
    `;
    container.appendChild(toastElement);

    // Use the declared `bootstrap` object
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastElement, {
      delay,
    });
    toastBootstrap.show();

    // Attach the action callback if provided
    if (action) {
      const actionButton = toastElement.querySelector(
        '.action-btn'
      ) as HTMLElement;
      if (actionButton) {
        actionButton.addEventListener('click', () => {
          action.callback();
          toastBootstrap.hide(); // Optionally hide the toast after action
        });
      }
    }

    // Remove the toast after it hides
    toastElement.addEventListener('hidden.bs.toast', () => {
      toastElement.remove();
    });
  }
}
