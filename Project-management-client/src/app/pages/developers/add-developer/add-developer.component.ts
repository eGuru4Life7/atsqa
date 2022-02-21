import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../../../utils/utilities.service';
import { CustomRequest } from '../../../models/customrequest';
import { RequesthandlerService } from './../../../utils/requesthandler.service';
import {REQUEST_TYPE, API_ROUTES, ALERT_TYPE} from '../../../utils/constants';

@Component({
  selector: 'app-add-developer',
  templateUrl: './add-developer.component.html',
  styleUrls: ['./add-developer.component.css']
})
export class AddDeveloperComponent implements OnInit {
  developerData: any = {
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
  //   if (this.developerData.username != '' && this.developerData.fname != '' && this.developerData.lname != '' && this.developerData.email != '' && this.developerData.password != ''){
  //       return true;
  //   }
  //   return false;
  // }
  let username = document.getElementById('username');
  let fname = document.getElementById('fname');
  let lname = document.getElementById('lname');
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  
  
}


  addDeveloper() {
    let __this = this;
   
    if (this.isDataValid()) {
        const request = new CustomRequest();
        request.url = API_ROUTES.ADD_DEVELOPER;
        request.body = this.developerData;
        request.type = REQUEST_TYPE.POST;
        this.requestHandler.sendRequest(request, true).subscribe(
          data => {
            const response = data.json();
            if (response.success) {
              console.log(response.data);
           //   this.utils.showAlert('Developer Added Successfully');
           this.utils.showSuccessAlert('Developer Added Successfully');    
           __this.router.navigate(['view/developers']);
            }
            else
            {
              this.utils.showAlert('Developer With Same Email Already Exist , Try With Some Other Email Address');
            }
          },
          error => {
            console.log(error);
          }
        );
    } else {
      this.utils.showAlert('Invalid Data');
    }
  }

}
