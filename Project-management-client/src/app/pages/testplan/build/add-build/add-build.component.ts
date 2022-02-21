import { UtilitiesService } from '../../../../utils/utilities.service';
import { request } from 'http';
import { Router } from '@angular/router';
import { RequesthandlerService } from '../../../../utils/requesthandler.service';
//import { Component, OnInit } from '@angular/core';
import {REQUEST_TYPE, API_ROUTES, ALERT_TYPE} from '../../../../utils/constants';
import {CustomRequest} from '../../../../models/customrequest';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
//import { UtilitiesService } from '../../../../utils/utilities.service';
import { Component, OnInit,AfterViewChecked,AfterViewInit } from '@angular/core';
declare var demo: any;
declare var $ : any;
@Component({
  selector: 'app-add-build',
  templateUrl: './add-build.component.html',
  styleUrls: ['./add-build.component.css']
})
export class AddBuildComponent implements OnInit {
  projects: any;
  releases: any;
  developers: any;
  modules: any;
  build: any = {
    title: '',
    description: '',
    status: '0',
    priority: '0',
    projectid: '0',
    buildnote: '',
    releaseid : '0',   
    builddate: new Date(),
    enddate: new Date()
  };
  constructor(private requestHandler: RequesthandlerService, private utils: UtilitiesService , private router: Router) { }
  
  ngOnInit() {
      this.fetchProjects();
      demo.initFormExtendedDatetimepickers();
     // $('.selectpicker').selectpicker(); 
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
        if (result.success && result.data.length > 0) {
          this.projects = result.data;
       
        }
       
      },
      error => {
        console.log(error);
      }
    );
  }
  onSelectEndDate(date: Date) {
    console.log("onSelect End date: ", date);
    
        var mMonth = date.getMonth();
        var mDay = date.getDate();
        var mYear = date.getFullYear();
    
        var completeDate = mMonth + "-" + mDay + "-" + mYear;
        console.log(completeDate);
    
        this.build.builddate = completeDate;
  }
  fetchRelease() {
    const request = new CustomRequest();
    request.url = API_ROUTES.FETCH_RELEASE  + this.build.projectid;
    request.type = REQUEST_TYPE.GET;
    this.requestHandler.sendRequest(request, true).subscribe(
      data => {
        const result = data.json();
        if (result.success )  {
          this.releases = result.data;
        }
        else
        {
          demo.showSwal('basic', 'No Releases Found Against This Project');
        }
      },
      error => {
        console.log(error);
      }
    );

  }


  isDataValid() {
    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let status = document.getElementById("status");
    let project =  document.getElementById("project");
    let release =  document.getElementById("release");
    var project1 = (<HTMLInputElement>document.getElementById('project')).value;
    var release1 = (<HTMLInputElement>document.getElementById('release')).value;
   // var developer2 = (<HTMLInputElement>document.getElementById('dev')).value;
   let buildnote =  document.getElementById("buildnotes");
   
  //  let priority =  document.getElementById("priority");
   let builddate =  document.getElementById("builddate");
   // var module1 = (<HTMLInputElement>document.getElementById('module')).value;
   // var module2 = (<HTMLInputElement>document.getElementById('module')).value;
    
     if(this.build.title != '')
     {
       if (this.build.buildnote != '')
       {
         if(this.build.builddate != '')
         {
           if (this.build.description != '')
           {
             if(project1 != "0")
             {
               if (release1 != "0" || this.build.releaseid != "0" )
               {
                 if (this.build.status != "0")
                 {
                  var sdate = (<HTMLInputElement>document.getElementById('builddate')).value;
                  var sdateFormat = new Date(sdate);
                  var mMonth = sdateFormat.getMonth();
                  var mDay = sdateFormat.getDate();
                  var mYear = sdateFormat.getFullYear();
              
                  var completeDate = mMonth + "-" + mDay + "-" + mYear;
                  var startdate1 = new Date(completeDate); 
                  this.build.builddate = completeDate;
                  return true;
                  
                 }
                else
                {
                  status.focus();
                  return false;
                }
               }
              else{
                release.focus();
                return false;
              }
             }
            else
            {
              project.focus();
              return false;
            }
           }
          else
          {
            description.focus();
            return false;
          } 
         }
builddate.focus();
        // demo.showSwal("Build Cannot Be Empty");
         return false;
       // return true;
        
       }
 buildnote.focus();
     //  this.utils.showAlert("Build cannot be Empty");
       return false;
     }
     title.focus();
     //this.utils.showAlert("Title cannot be Empty");
     return false;
   }

  addBuild() {
    let __this = this;
    if(this.isDataValid()){
      const request = new CustomRequest();
      request.url = API_ROUTES.ADD_BUILD;
      request.type = REQUEST_TYPE.POST;
      request.body = this.build;
      this.requestHandler.sendRequest(request, true).subscribe(
        data => {
          const result = data.json();
          if (result.success) {
          //  demo1.showSwal('Project Added Successfully','Test','success-message')
      // demo.showSwal1('success-message','Project Added Successfully')
         //  demo.showConfirmationAlert('Project Added Successfully','Test','sessucc-message',)
     //    demo.showSwal('basic', 'Project Added Successfully');
     this.utils.showSuccessAlert('Build Added Successfully');  
     this.build.projectid = 0;
     this.build.status = 0;
     this.build.releaseid = 0;
     this.build.description = "";
     this.build.title = "";
     this.build.buildnote = "";
   //  __this.router.navigate(['view/projects']);
          }
        }
      );
    } else {
      // this.utils.showConfirmationAlert('Error', 'Invalid Data', ALERT_TYPE.ERROR, "OK", null);
    //  demo.showSwal('basic', 'Invalid Data');
      
    }

  }



}
