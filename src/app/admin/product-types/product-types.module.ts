import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductTypesRoutingModule } from './product-types-routing.module';
import { ProductTypesComponent } from './product-types.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const COMPONENTS = [
    ProductTypesComponent
];

@NgModule({
  imports: [SharedModule, ProductTypesRoutingModule],
  declarations: [...COMPONENTS, CreateComponent, EditComponent],
})
export class ProductTypesModule {}