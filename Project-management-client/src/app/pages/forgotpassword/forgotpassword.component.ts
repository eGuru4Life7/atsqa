import { UtilitiesService } from '../../utils/utilities.service';
import { request } from 'http';
import { Router } from '@angular/router';
import { RequesthandlerService } from '../../utils/requesthandler.service';
import { Component, OnInit } from '@angular/core';
import {REQUEST_TYPE, API_ROUTES, ALERT_TYPE} from '../../utils/constants';
import {CustomRequest} from '../../models/customrequest';
import '../../../assets/js/demo.js';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
declare var $ : any;

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private requestHandler: RequesthandlerService, private router: Router, private utils: UtilitiesService) { 
    // this.setToday();
  
    }

  ngOnInit() {
  }

  forgetpassword()
  {
    let _this = this;
    this.router.navigate(['forgotpassword']);
  }

}
