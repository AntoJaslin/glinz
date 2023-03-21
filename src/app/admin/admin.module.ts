import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';

const COMPONENTS = [
    DashboardComponent
];

@NgModule({
  imports: [SharedModule, AdminRoutingModule],
  declarations: [...COMPONENTS, OrdersComponent],
  //providers: [UsersService],
})
export class AdminModule {}