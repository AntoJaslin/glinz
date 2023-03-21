import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const COMPONENTS = [
    ProductsComponent
];

@NgModule({
  imports: [SharedModule, ProductsRoutingModule],
  declarations: [...COMPONENTS, CreateComponent, EditComponent],
})
export class ProductsModule {}