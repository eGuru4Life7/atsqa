import { UtilitiesService } from './../../utils/utilities.service';
import { LocalStorageService } from './../../utils/localstorage.service';
import {Router} from '@angular/router';
import { RequesthandlerService } from './../../utils/requesthandler.service';
import { CustomRequest } from '../../models/customrequest';
import { API_ROUTES, REQUEST_TYPE, ALERT_TYPE } from '../../utils/constants';
import { error } from 'util';
import { request } from 'http';
import { Response } from '@angular/http';
import { selector } from '@angular-cli/ast-tools/node_modules/rxjs/operator/publish';
import { Component, OnInit } from '@angular/core';
declare var demo : any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData: any = {
    email: '',
    password: ''
  };
  isDataValid() {
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let __this = this;
  if(this.loginData.email != '')
  {
    if (this.loginData.password != '')
    {
      return true;
    }
   // this.utils.showAlert("Please Enter Password");
   email.focus(); 
   return false;
      
  }
  //this.utils.showAlert("Please Enter An Email");
  password.focus();
  return false;
  }
  constructor(private requestHandler: RequesthandlerService, private router: Router, private localStorage: LocalStorageService, private utils: UtilitiesService) { }

  ngOnInit() {
  }

  loginUser() {
    if (this.isDataValid())
    {
      let request = new CustomRequest();
      request.url = API_ROUTES.LOGIN;
      request.type = REQUEST_TYPE.POST;
      request.body = {email: this.loginData.email, password: this.loginData.password};
      this.requestHandler.sendRequest(request).subscribe(
        (data: Response) => {
          const result = data.json();
          if (result.success) {
            window.location.reload();
            this.localStorage.setUserLoginData(result.data.user);
            this.router.navigate(['dashboard']);
            
          } else {
            this.utils.showAlert('Invalid Credentials');
          }
        },
        error => {
          console.log(error);
        }
      );  
    }
    else
    {

    }
  }
  forgetPassword()
  {
    let _this = this;
    _this.router.navigate(['forgotpassword']);
  }

}
