import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NavigationEnd, Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { OrganizationsRepository } from './state'; 

@UntilDestroy()
@Component({
  selector: 'central-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'ministry';
  @ViewChild('left') sidenav!: MatSidenav;

  constructor(
    private observer: BreakpointObserver, 
    private router: Router,
    private repoOrganization: OrganizationsRepository
  ) {}

  ngOnInit() {
    this.repoOrganization.setOrganizations();
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
}
