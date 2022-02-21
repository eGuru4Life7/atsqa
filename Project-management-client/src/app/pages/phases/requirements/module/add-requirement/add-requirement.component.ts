import { UtilitiesService } from './../../../../../utils/utilities.service';
import { RequesthandlerService } from './../../../../../utils/requesthandler.service';
import { API_ROUTES, REQUEST_TYPE } from './../../../../../utils/constants';
import { CustomRequest } from './../../../../../models/customrequest';
import { Component, OnInit,AfterViewChecked,AfterViewInit } from '@angular/core';
declare var $ : any;

declare var demo:any;
@Component({
  selector: 'app-add-requirement',
  templateUrl: './add-requirement.component.html',
  styleUrls: ['./add-requirement.component.css']
})
export class AddRequirementComponent implements OnInit {
  projects: any;
  developers: any;
  modules: any;
  requirement: any = {
    title: '',
    description: '',
    status: '0',
    priority: '0',
    projectid: '0',
    moduleid: '0',
    assigneeid: [0]
  };

  constructor(private requestHandler: RequesthandlerService, private utils: UtilitiesService  )  { }

  ngOnInit() {
   
    this.fetchProjects();
    this.fetchDevelopers();
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

  fetchModules() {
    const request = new CustomRequest();
    request.url = API_ROUTES.FETCH_MODULES + this.requirement.projectid;
    request.type = REQUEST_TYPE.GET;
    this.requestHandler.sendRequest(request, true).subscribe(
      data => {
        const result = data.json();
        if (result.success) {
          this.modules = result.data;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  fetchDevelopers() {
    const request = new CustomRequest();
    request.url = API_ROUTES.FETCH_DEVELOPER;
    request.type = REQUEST_TYPE.GET;
    this.requestHandler.sendRequest(request, true).subscribe(
      data => {
        const result = data.json();
        if (result.success) {
          this.developers = result.data;
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
    let developer =  document.getElementById("developer");
    var project1 = (<HTMLInputElement>document.getElementById('project')).value;
    var developer1 = (<HTMLInputElement>document.getElementById('developer')).value;
    var developer2 = (<HTMLInputElement>document.getElementById('dev')).value;
    
   
    let priority =  document.getElementById("priority");
    let module =  document.getElementById("module");
    var module1 = (<HTMLInputElement>document.getElementById('module')).value;
    var module2 = (<HTMLInputElement>document.getElementById('module')).value;
    
  //  let mod =  document.getElementById("mod");
   // let dev =  document.getElementById("dev");
    
    if(this.requirement.title != '')
    {
      if (this.requirement.description != '')
      {
        if(this.requirement.status != "0" )
        {
          if (project1 != "0")
          {
            if(developer1 != "0" ) 
            {
              if (this.requirement.priority != "0")
              {
                if(module1 != "0" && module2 != "0" )
                {
                  return true;
                  
                }
                else
                {
                  module.focus();
                  

                  return false;
                }
              }
              else
              {
                priority.focus();
                return false;
              }
            }
            else
            {
              developer.focus();
           
              return false;
            }
          }
          else{
           project.focus();
            return false;
          }
        }
        else
        {
          status.focus();  
          return false;
         
        }
      }
     else
     {

    //  this.utils.showAlert("Description cannot be Empty");
    description.focus();  
    return false;
     }
    }
    else
    {
      title.focus();
   // this.utils.showAlert("Title cannot be Empty");
    return false;
    }
  }

  addRequirement() {
    let __this = this;
    if (this.isDataValid()) {
      const request = new CustomRequest();
      request.url = API_ROUTES.ADD_REQUIREMENT;
      request.type = REQUEST_TYPE.POST;
      request.body = this.requirement;
      this.requestHandler.sendRequest(request, true).subscribe(
        data => {
          const result = data.json();
          if (result.success) {
            this.utils.showSuccessAlert('Requirement Added Successfully');
            this.requirement.title = "";
            this.requirement.description = "";
            this.requirement.priority = 0;
           this.requirement.projectid = 0;
            this.requirement.assigneeid = 0 ;
           this.requirement.moduleid = 0 ;
           this.requirement.status = 0;
             //__this.router.navigate(['phases/requirements']);
          }
        }
      );
    } else {
     // this.utils.showAlert('Invalid Data');
    }
  }

}
