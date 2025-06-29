import { CanActivateFn, Router } from '@angular/router';
import { SellerService } from './services/seller.service';
import { inject } from '@angular/core'; // ✅ Import inject()

export const authGuard: CanActivateFn = (route, state) => {
  const sellerService = inject(SellerService); // ✅ Inject service correctly
  const router = inject(Router);
  if (localStorage.getItem('seller')) {
    return true;
  }
  // Example: If user is logged in, return true; otherwise, redirect
  // return sellerService.isSellerLoggedIn ;
  return router.parseUrl('/seller-auth');
};
