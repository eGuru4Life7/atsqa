import { Router } from '@angular/router';
import { UtilitiesService } from './../../../../../utils/utilities.service';
import { RequesthandlerService } from './../../../../../utils/requesthandler.service';
import { API_ROUTES, REQUEST_TYPE } from './../../../../../utils/constants';
import { CustomRequest } from './../../../../../models/customrequest';
import { Component, OnInit,AfterViewChecked,AfterViewInit } from '@angular/core';
declare var demo : any;
declare var $ : any;
@Component({
  selector: 'app-create-module',
  templateUrl: './create-module.component.html',
  styleUrls: ['./create-module.component.css']
})
export class CreateModuleComponent implements OnInit {
  projects: any = [];
  module: any = {
    title: '',
    description: '',
    projectid: '0'
  };

  constructor(private requestHandler: RequesthandlerService, private utils: UtilitiesService, private router: Router) { }

  ngOnInit() {
    this.fetchProjects();
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

  isDataValid() {
   // let _this= this;
   let title = document.getElementById("title");
   let description = document.getElementById("description");
   let project =  document.getElementById("project");
   var project1 = (<HTMLInputElement>document.getElementById('project')).value;
   
    if(this.module.title != '')
    {
      if (this.module.description != '')
      {
        if(this.module.projectid)
        {
          if(project1 != "0")
          {
            return true;
            
          }
          else
          {
            project.focus();
            return false;
          }
          
        }
      
        // demo.showSwal("Select Any Project");
        return false;
      // return true;
       
      }
description.focus();
     // this.utils.showAlert("Description cannot be Empty");
      return false;
    }
    //this.utils.showAlert("Title cannot be Empty");
    title.focus();
    return false;
  }

  addModule() {
    let __this = this;
    if(this.isDataValid()) {
      const request = new CustomRequest();
      request.url = API_ROUTES.ADD_MODULE;
      request.type = REQUEST_TYPE.POST;
      request.body = this.module;
      this.requestHandler.sendRequest(request, true).subscribe(
        data => {
          const result = data.json();

          if (result.success) {
          
            this.utils.showAlert('Module Added Successfully');
            this.module.title = "";
            this.module.description = "";
           // this.module.projectid.title = null ;
         //  this.fetchProjects();
          // this.projects.value = null;
this.module.projectid = 0;
            
            //this.module.projectid
            // __this.router.navigate(['view/projects']);
          }
        }
      );
    } else {
  //    this.utils.showAlert('Invalid Data');
    }
  }

}
