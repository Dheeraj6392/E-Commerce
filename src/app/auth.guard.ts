import { CanActivateFn } from '@angular/router';
import { SellerService } from './services/seller.service';
import { inject } from '@angular/core'; // ✅ Import inject()

export const authGuard: CanActivateFn = (route, state) => {
  const sellerService = inject(SellerService); // ✅ Inject service correctly
  if (localStorage.getItem('seller')) {
    return true;
  }
  // Example: If user is logged in, return true; otherwise, redirect
  return sellerService.isSellerLoggedIn;
};
