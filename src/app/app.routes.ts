import { Routes } from '@angular/router';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { LoginComponent } from './Pages/login/login.component';
import { authGuard } from './Core/Guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'en', pathMatch: 'full' },
  {
    path: ':lang',
    children: [
      {
        path: '',
        component: UserLayoutComponent,

        loadChildren: () =>
          import('./layout/user-layout/user.routes').then((r) => r.routes),
      },
      {
        path: 'dashboard',
        component: AdminLayoutComponent,
        canActivate: [authGuard],
        loadChildren: () =>
          import('./layout/admin-layout/admin.routes').then((r) => r.routes),
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },

  { path: '**', redirectTo: 'en' },
];
