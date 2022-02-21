import { UtilitiesService } from '../../../../utils/utilities.service';
import { request } from 'http';
import { Router } from '@angular/router';
import { RequesthandlerService } from '../../../../utils/requesthandler.service';
//import { Component, OnInit } from '@angular/core';
import {REQUEST_TYPE, API_ROUTES, ALERT_TYPE} from '../../../../utils/constants';
import {CustomRequest} from '../../../../models/customrequest';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Component, OnInit,AfterViewChecked,AfterViewInit } from '@angular/core';
declare var $ : any;

declare var demo:any;
@Component({
  selector: 'app-add-release',
  templateUrl: './add-release.component.html',
  styleUrls: ['./add-release.component.css']
})
export class AddReleaseComponent implements OnInit {
  projects: any;
  developers: any;
  modules: any;
  release: any = {
    title: '',
    status: '0',
    projectid: '0',
    releasenote: '',
    startdate: new Date() , 
    code: '' 
    }
    constructor(private requestHandler: RequesthandlerService, private utils: UtilitiesService , private router: Router) { }
    
  
    ngOnInit() {
      this.fetchProjects();
     demo.initFormExtendedDatetimepickers();
  }

  ngAfterViewInit() {
    $('.selectpicker').selectpicker();
}

ngAfterViewChecked() {
    $('.selectpicker').selectpicker('refresh');
}
  fetchProjects() {
    const request = new CustomRequest();
    request.url = API_ROUTES.FETCH_PROJECT;
    request.type = REQUEST_TYPE.GET;
    this.requestHandler.sendRequest(request, true).subscribe(
      data => {
        const result = data.json();
        if (result.success) {
          this.projects = result.data;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  onSelectReleaseDate(date: Date) {
    console.log("onSelect End date: ", date);
    
        var mMonth = date.getMonth();
        var mDay = date.getDate();
        var mYear = date.getFullYear();
    
        var completeDate = mMonth + "-" + mDay + "-" + mYear;
        console.log(completeDate);
    
        this.release.startdate = completeDate;
  }
  isDataValid() {
    // let _this= this;
    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let status = document.getElementById("status");
    let project =  document.getElementById("project");
    var project1 = (<HTMLInputElement>document.getElementById('project')).value;
    let releasecode =  document.getElementById("releasecode");
    let releasenote =  document.getElementById("releasenote");
    
     if(this.release.title != '')
     {
       if (this.release.releasenote != '')
       {
         if(this.release.code != '')
         {
           if (project1 != "0")
           {
             if(this.release.description != '')
             {
               if(this.release.status != "0")
               {
                var sdate = (<HTMLInputElement>document.getElementById('releasedate')).value;
                var sdateFormat = new Date(sdate);
                var mMonth = sdateFormat.getMonth();
                var mDay = sdateFormat.getDate();
                var mYear = sdateFormat.getFullYear();
            
                var completeDate = mMonth + "-" + mDay + "-" + mYear;
                var startdate1 = new Date(completeDate); 
                this.release.startdate = completeDate;
                return true;
                
               }
              status.focus();
              return false;
             }
            description.focus();
            return false;
           }
           project.focus();
           return false;
         }
         releasecode.focus();
       //  demo.showSwal("Release Cannot Be Empty");
         return false;
       // return true;
        
       }
 releasenote.focus();
      // this.utils.showAlert("Description cannot be Empty");
       return false;
     }
     title.focus();
   //  this.utils.showAlert("Title cannot be Empty");
     return false;
   }

  addRelease() {
    let __this = this;
    if(this.isDataValid()){
      const request = new CustomRequest();
      request.url = API_ROUTES.ADD_RELEASE;
      request.type = REQUEST_TYPE.POST;
      request.body = this.release;
      this.requestHandler.sendRequest(request, true).subscribe(
        data => {
          const result = data.json();
          if (result.success) {
          //  demo1.showSwal('Project Added Successfully','Test','success-message')
      // demo.showSwal1('success-message','Project Added Successfully')
         //  demo.showConfirmationAlert('Project Added Successfully','Test','sessucc-message',)
     //    demo.showSwal('basic', 'Project Added Successfully');
     this.utils.showSuccessAlert('Release Added Successfully');  
     this.release.projectid = 0;
     this.release.status = 0;
     this.release.title = "";
     this.release.releasecode = "";
     this.release.releasenote = "";
     
   //  __this.router.navigate(['view/projects']);
          }
        }
      );
    } else {
      // this.utils.showConfirmationAlert('Error', 'Invalid Data', ALERT_TYPE.ERROR, "OK", null);
    //  this.utils.showAlert('Invalid Data');
      
    }

  }
}
