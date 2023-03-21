import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { WebsiteRoutingModule } from './website-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { WebsiteComponent } from './website.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderSuccessComponent } from './order-success/order-success.component';

const COMPONENTS = [
  HomeComponent,
  WebsiteComponent,
  ProductsComponent,
  ProductDetailsComponent,
  UserProfileComponent
];

@NgModule({
  imports: [SharedModule, WebsiteRoutingModule],
  declarations: [...COMPONENTS, CartComponent, CheckoutComponent, OrderSuccessComponent,], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebsiteModule {

}