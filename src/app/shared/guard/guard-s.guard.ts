import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authService/auth.service';

export const guardSGuard: CanActivateFn = async (route, state) => {
  const authSrv = inject(AuthService);
  const router = inject(Router);
  const isAuth = await authSrv.isAuth();
  if(!isAuth){
    router.navigateByUrl("");
    return false;
  }
  return true;
};
