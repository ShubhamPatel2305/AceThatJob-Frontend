import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { HelpDetailsComponent } from './help-details/help-details.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../shared/material-module';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { UsersComponent } from './dialog/users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    DashboardComponent,
    LayoutComponent,
    HelpDetailsComponent,
    ConfirmationComponent,
    ManageUsersComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatDialogModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexModule
  ]
})
export class AdminModule { }
