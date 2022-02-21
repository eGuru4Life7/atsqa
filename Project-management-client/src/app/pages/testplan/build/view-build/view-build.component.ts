import { RequesthandlerService } from './../../../../utils/requesthandler.service';
import { API_ROUTES, REQUEST_TYPE } from './../../../../utils/constants';
import { CustomRequest } from './../../../../models/customrequest';
//import { Component, OnInit } from '@angular/core';
import { Component, OnInit,AfterViewChecked,AfterViewInit } from '@angular/core';
declare var $ : any;
import { Router } from '@angular/router';
declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: [{}];
}
@Component({
  selector: 'app-view-build',
  templateUrl: './view-build.component.html',
  styleUrls: ['./view-build.component.css']
})
export class ViewBuildComponent implements OnInit {
  modules: any;
  builds : any;
  projects : any;
  releases : any;
  dataTable: DataTable;
  build: any = {
    projectid: '0',
    moduleid: '0',
    releaseid : '0'
  };
  constructor(private requestHandler: RequesthandlerService) { }
  
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
        },
        error => {
          console.log(error);
        }
      );
    }

    fetchRelease() {
      const request = new CustomRequest();
      request.url = API_ROUTES.FETCH_RELEASE  + this.build.projectid;
      request.type = REQUEST_TYPE.GET;
      this.requestHandler.sendRequest(request, true).subscribe(
        data => {
          const result = data.json();
          if (result.success) {
            this.releases = result.data;
          }
        },
        error => {
          console.log(error);
        }
      );

    }
    fetchBuilds() {
      const request = new CustomRequest();
      request.url = API_ROUTES.FETCH_BUILD  + "?pid=" + this.build.projectid + "&rid=" + this.build.releaseid;
      request.type = REQUEST_TYPE.GET;
      this.requestHandler.sendRequest(request, true).subscribe(
        data => {
          const result = data.json();
          if (result.success) {
            this.builds = result.data;
            setTimeout(function()
            {
          $(function()
          {
            $('#datatabless').DataTable();
          });
            },3000);
          }
        },
        error => {
          console.log(error);
        }
      );
    }
    populateDataTable() {
      this.dataTable = {
          headerRow: [  'Title', 'BuildNote', 'BuildDate' ],
          footerRow: [  'Title', 'BuildNote', 'BuildDate' ],
          dataRows: [{
            'title': 'Airi Satou',
            'description': 'Andrew Mike',
            'startdate': 'Develop'
           
          }]
      };
    }
  

}
