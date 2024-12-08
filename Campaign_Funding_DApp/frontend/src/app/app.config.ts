import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { GlobalErrorHandlerService } from './services/shared/error-handler/global-error-handler.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
  ],
};
