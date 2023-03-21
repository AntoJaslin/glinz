import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { FooterComponent } from './app-layout/footer/footer.component';
import { NavBarComponent } from './app-layout/nav-bar/nav-bar.component';
import { ToolbarComponent } from './admin-layout/toolbar/toolbar.component';
import { SidenavComponent } from './admin-layout/sidenav/sidenav.component';
import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [];
// export const ThemeRouting = RouterModule.forChild(routes);

@NgModule({
  declarations: [
    AppLayoutComponent,
    AdminLayoutComponent,
    FooterComponent,
    NavBarComponent,
    ToolbarComponent,
    SidenavComponent
  ],
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [
    AppLayoutComponent,
  ]
})
export class ThemeModule {}
