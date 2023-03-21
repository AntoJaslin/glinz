import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { WebsiteComponent } from './website.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
    {
        path: '',
        component: WebsiteComponent, 
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'products/:category_id',
                component: ProductsComponent
            },
            {
                path: 'product-details/:product_id',
                component: ProductDetailsComponent
            },
            {
                path: 'user-profile',
                canActivate: [ AuthGuard ],
                component: UserProfileComponent
            },
            {
                path: 'user-cart',
                canActivate: [ AuthGuard ],
                component: CartComponent
            },
            {
                path: 'checkout',
                canActivate: [ AuthGuard ],
                component: CheckoutComponent
            }
        ]
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WebsiteRoutingModule { }