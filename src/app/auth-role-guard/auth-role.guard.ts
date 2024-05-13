import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ServiceService } from '../service/service.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  let role = localStorage.getItem('userRole');
  if (role === 'admin') {
    return true;
  }
  router.navigate(['/login']);
  return false;
};

export const userGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  let role = localStorage.getItem('userRole');
  if (role === 'user') {
    return true;
  }
  router.navigate(['/login']);
  return false;
};

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let token = localStorage.getItem('apiKey');
  if (token) {
    return true;
  } else {
    console.log('User is not authenticated, redirecting to login page');
    router.navigate(['/login']);
    return false;
  }
};