import { RequesthandlerService } from '../../../../../utils/requesthandler.service';
import { API_ROUTES, REQUEST_TYPE } from './../../../../../utils/constants';
import { CustomRequest } from './../../../../../models/customrequest';
//import { Component, OnInit } from '@angular/core';
import { Component, OnInit,AfterViewChecked,AfterViewInit } from '@angular/core';
import { UtilitiesService } from './../../../../../utils/utilities.service';
declare var $ : any;
declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: [{}];
}
@Component({
  selector: 'app-view-modules',
  templateUrl: './view-modules.component.html',
  styleUrls: ['./view-modules.component.css']
})
export class ViewModulesComponent implements OnInit {
  modules: any [] ;
  filteredModules: any;
  searchText: any;
  projects : any;
  dataTable: DataTable;
  requirement: any = {

    projectid: '0',
    moduleid: '0'
  };
  constructor(private requestHandler: RequesthandlerService , private utils : UtilitiesService) {

    
   

  }

  ngOnInit() {
  // this.fetchModules();
  this.populateDataTable();
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
        else
        {

        }
      },
      error => {
        console.log(error);
      }
    );
  }

  fetchModules() {
    const request = new CustomRequest();
    request.url = API_ROUTES.FETCH_MODULES  + this.requirement.projectid;
    request.type = REQUEST_TYPE.GET;
    this.requestHandler.sendRequest(request, true).subscribe(
      data => {
        const result = data.json();
        if (result.data.length > 0 && result.success) {
          this.modules = result.data;
          this.filteredModules = this.modules;
          setTimeout(function()
          {
        $(function()
        {
          $('#datatabless').DataTable();
        });
          },2000);
        }
        else
        {
          this.utils.showAlert("No Modules Found");
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  searchModules(){
    this.filteredModules = this.filteredModules.filter(item => {
        return item.title.includes(this.searchText)||item.description.includes(this.searchText);
    });
    if(this.searchText==''){
        this.filteredModules = this.modules;
    }
  }
  populateDataTable() {
    this.dataTable = {
        headerRow: [  'Title', 'Description' ],
        footerRow: [  'Title', 'Description' ],
        dataRows: [{
          'title': 'Airi Satou',
          'description': 'Andrew Mike'
        }]
    };
  }

}
