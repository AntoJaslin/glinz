import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
import { AuthGuard, NoAuthGuard } from './core/guards';
import { AdminLayoutComponent } from './theme/admin-layout/admin-layout.component';
import { AppLayoutComponent } from './theme/app-layout/app-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', 
        loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule)
      },
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: '', 
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      },
    ]
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent,
    canActivate: [ NoAuthGuard ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
