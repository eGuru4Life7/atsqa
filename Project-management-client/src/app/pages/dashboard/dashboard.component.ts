import {Response} from '@angular/http';
import { CustomRequest } from './../../models/customrequest';
import { RequesthandlerService } from './../../utils/requesthandler.service';
import { Component, OnInit } from '@angular/core';
import {REQUEST_TYPE, API_ROUTES} from '../../utils/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private requestHandler: RequesthandlerService) { }

  ngOnInit() {
  }
}
