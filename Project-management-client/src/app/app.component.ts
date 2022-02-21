import { LocalStorageService } from './utils/localstorage.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

declare var demo: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isUserLoggedIn = false;

  constructor(private localStorage: LocalStorageService, private router: Router) {
    console.log(demo);
    this.isUserLoggedIn = this.localStorage.isUserLoggedIn();
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });
}
  

}
