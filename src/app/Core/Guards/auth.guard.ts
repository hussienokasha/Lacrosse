import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (localStorage.getItem('adminData')) {
    return true; // Allow access
  } else {
    router.navigate(['/en/login']);
    return false; // Deny access
  }
};
