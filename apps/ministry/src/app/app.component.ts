import { AfterViewInit, Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NavigationEnd, Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription, delay, filter } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { OrganizationsRepository } from './state'; 
import { OrganizationUnitsService } from "./organization-units/organization-units.service";

@UntilDestroy()
@Component({
  selector: 'central-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'ministry';
  @ViewChild('left') sidenav!: MatSidenav;

  public showUnits = false;

  subscription: Subscription= new Subscription();

  constructor(
    private observer: BreakpointObserver, 
    private router: Router,
    private repoOrganization: OrganizationsRepository,
    private ouService: OrganizationUnitsService,
  ) {}

  ngOnInit() {
    this.repoOrganization.setOrganizations();
    this.subscription = this.ouService.getOUCodes()
      .subscribe(data=>{
        if (data.length>0) {
          this.showUnits = true;
        } else 
          this.showUnits = false;
      })
  }

  ngAfterViewInit() {
    this.observer.observe('(max-width: 800px)')
    .pipe(delay(1), untilDestroyed(this))
    .subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
