import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';
import { MaterialModule } from '@central/material';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NxWelcomeComponent } from './nx-welcome.component';

import { Actions } from '@ngneat/effects-ng';
import { devTools } from '@ngneat/elf-devtools';

import { OrganizationsComponent } from './organizations/organizations.component';
import { OrganizationsRepository } from './state';
import { OrganizationUnitsComponent } from './organization-units/organization-units.component';
import { MainComponent } from './main/main.component';

export function initElfDevTools(actions: Actions) {
  return () => {
    devTools({
      name: 'minitry',
      actionsDispatcher: actions,
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    OrganizationsComponent,
    OrganizationUnitsComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: MainComponent },
      { path: 'organizations', component: OrganizationsComponent },
      { path: 'organization-units', component: OrganizationUnitsComponent },
    ]),
    MaterialModule,
    AgGridModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initElfDevTools,
      deps: [Actions],
    },
    OrganizationsRepository,
  ],
  bootstrap: [AppComponent],
  exports: [MatSidenavModule, MatToolbarModule],
})
export class AppModule {}
