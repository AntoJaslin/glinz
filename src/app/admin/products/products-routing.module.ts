import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
    {
        path: '',
        component: ProductsComponent,
    },
    {
        path: 'create',
        component: CreateComponent,
    },
    {
        path: 'edit/:id',
        component: EditComponent,
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule],
})
export class ProductsRoutingModule { }