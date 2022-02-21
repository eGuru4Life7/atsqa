import { Router } from '@angular/router';
import { LocalStorageService } from '../../utils/localstorage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private localStorage: LocalStorageService, private router: Router) { }
  userName = '';

  ngOnInit() {
    this.userName = this.localStorage.getCurrentUser().name;
  }

  logoutUser() {
    this.localStorage.clearCache();
    window.location.reload();
    this.router.navigate(['login']);
  }

}
