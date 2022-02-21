import { UtilitiesService } from './../../../../../utils/utilities.service';
import { RequesthandlerService } from './../../../../../utils/requesthandler.service';
import { API_ROUTES, REQUEST_TYPE } from './../../../../../utils/constants';
import { CustomRequest } from './../../../../../models/customrequest';
import { Component, OnInit } from '@angular/core';
declare var $ : any;
import { Router } from '@angular/router';
declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: [{}];
}

@Component({
  selector: 'app-view-requirement',
  templateUrl: './view-requirement.component.html',
  styleUrls: ['./view-requirement.component.css']
})
export class ViewRequirementComponent implements OnInit {
  projects: any;
   modules: any;
   test : any;
   dataTable: DataTable;
   filteredReq : any;
   searchText: any;
  requirement: any = {
    projectid: '0',
    moduleid: '0'
   };

   constructor(private requestHandler: RequesthandlerService, private utils: UtilitiesService) {
  
  
   

    }

  ngOnInit() {
    this.fetchProjects();
    this.populateDataTable();
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
        if (result.success && result.data.length > 0  ) {
          this.projects = result.data;
        }
          else
          {
            this.utils.showAlert("Requirments Not Found");
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
        if (result.success && result.data.length > 0) {
          this.modules = result.data;
        }
else{
  this.utils.showAlert("No Modules Found");
}
      },
      error => {
        console.log(error);
      }
    );
  }

  searchRequirements(){
    this.filteredReq = this.filteredReq.filter(item => {
        return item.title.includes(this.searchText)||item.description.includes(this.searchText)||item.status.includes(this.searchText)||item.priority.includes(this.searchText);
    });
    if(this.searchText==''){
        this.filteredReq = this.test;
    }
  }

  viewRequirement()
  {
    const request = new CustomRequest();
    request.url = API_ROUTES.FETCH_REQUIREMENTS + this.requirement.moduleid;
    request.type = REQUEST_TYPE.GET;
    this.requestHandler.sendRequest(request, true).subscribe(
      data => {
        const result = data.json();
        if (result.success && result.data.length > 0) {
          this.test = result.data;
          this.filteredReq = this.test;
          setTimeout(function()
          {
        $(function()
        {
          $('#datatabless').DataTable();
        });
          },3000);
      
        }
        else
        {
          this.utils.showAlert("No Requirments Found");
        }
      },
      error => {
        console.log(error);
      }
    );
  }


  populateDataTable() {
    this.dataTable = {
        headerRow: [  'Title', 'Description', 'Status', 'Priority', 'Developer' ],
        footerRow: [  'Title', 'Description', 'Status', 'Priority', 'Developer' ],
        dataRows: [{
          'title': 'Airi Satou',
          'description': 'Andrew Mike',
          'startdate': 'Develop',
          'enddate': '2013',
          'descriptionscreen':'projectdetail'
        }]
    };
  }

}
