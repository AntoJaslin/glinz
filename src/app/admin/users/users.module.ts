import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UsersComponent } from './users.component';
import { UsersService } from '../../core/services/users.service';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const COMPONENTS = [
    UsersComponent, 
    CreateComponent, 
    EditComponent
];

@NgModule({
  imports: [SharedModule, UsersRoutingModule],
  declarations: [...COMPONENTS],
  //providers: [UsersService],
})
export class UsersModule {}