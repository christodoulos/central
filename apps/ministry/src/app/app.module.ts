import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';
import { MaterialModule } from '@central/material';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http'
import { AgGridModule } from 'ag-grid-angular';

import { NxWelcomeComponent } from './nx-welcome.component';
import { OrganizationsComponent } from './organizations/organizations.component';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, OrganizationsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: NxWelcomeComponent },
      { path: 'organizations', component: OrganizationsComponent },
    ]),
    MaterialModule,
    AgGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
