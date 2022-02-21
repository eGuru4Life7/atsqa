import { Router } from '@angular/router';
import { UtilitiesService } from '../../utils/utilities.service';
import { CustomRequest } from '../../models/customrequest';
import { RequesthandlerService } from './../../utils/requesthandler.service';
import { Component, OnInit } from '@angular/core';
import {REQUEST_TYPE, API_ROUTES, ALERT_TYPE} from '../../utils/constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userData: any = {
    username: '',
    fname: '',
    lname: '',
    email: '',
    password: ''
  };

  constructor(private requestHandler: RequesthandlerService, private utils: UtilitiesService, private router: Router) { }

  ngOnInit() {

  }


  isDataValid() {
    // // if(this.userData.username != '' && this.userData.fname != '' && this.userData.lname != '' && this.userData.email != '' && this.userData.password != ''){
    // //     return true;
    // // }
    // // return false;
   let username = document.getElementById("username");

   let fname = document.getElementById("fname");

   let lname = document.getElementById("lname");

   let email = document.getElementById("email");

   let password = document.getElementById("password");

    if (this.userData.username != '')
    {
      if(this.userData.fname != '')
      {
        if(this.userData.lname !='')
        {
          if(this.userData.email !='')
          {
            if(this.userData.password !='' )
            
            {
              if (this.userData.fname != this.userData.lname && this.userData.fname != this.userData.username && this.userData.lname != this.userData.username )
              {
                return true;
              }
              
              this.utils.showAlert("Username , First Name And Last Name should be unique");
              return false;                          
            }
            password.focus();
          //  this.utils.showAlert("Password cannot be Empty");
            return false;
          }
          email.focus();
        //  this.utils.showAlert("Email cannot be Empty");
          return false;
        }
        lname.focus();
    //  this.utils.showAlert("Last Name cannot be Empty");
      return false;
      }
      fname.focus();
   //   this.utils.showAlert("First Name cannot be Empty");
      return false;
    }
    username.focus();
   // this.utils.showAlert("User Name cannot be Empty");
    return false;
  }

  registerUser() {
    let __this = this;
    if(this.isDataValid()){
        let request = new CustomRequest();
        request.url = API_ROUTES.REGISTER;
        request.body = this.userData;
        request.type = REQUEST_TYPE.POST;
        this.requestHandler.sendRequest(request).subscribe(
          data => {
            let response = data.json();
            if(response.success) {
              console.log(response.data);
         //     this.utils.showAlert('User Registered Successfully');
             this.utils.showSuccessAlert('User Registered Successfully');
            //  this.userData.username = "";
            //  this.userData.fname = "";
            //  this.userData.lname = "";
            //  this.userData.email = "";
            //  this.userData.password = "";
                __this.router.navigate(['login']);
            } else {
              this.utils.showAlert(response.message);
            }
          },
          error => {
            console.log(error);
          }
        );
    } else {
     // this.utils.showAlert('Invalid Data');
    }

  }

}
