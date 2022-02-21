import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invite-developer',
  templateUrl: './invite-developer.component.html',
  styleUrls: ['./invite-developer.component.css']
})
export class InviteDeveloperComponent implements OnInit {
  developerData: any = {
    username: '',
    fname: '',
    lname: '',
    email: '',
    password: ''
  };
  constructor() { }

  ngOnInit() {
  }

}
