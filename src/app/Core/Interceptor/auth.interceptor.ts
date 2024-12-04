import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const adminData = localStorage.getItem('adminData');
  const token = adminData ? JSON.parse(adminData).token : null;
  const clonedReq = token
    ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      })
    : req;

  return next(clonedReq);
};
