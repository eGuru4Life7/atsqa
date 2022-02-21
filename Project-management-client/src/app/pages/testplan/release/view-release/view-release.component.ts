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
  selector: 'app-view-release',
  templateUrl: './view-release.component.html',
  styleUrls: ['./view-release.component.css']
})
export class ViewReleaseComponent implements OnInit {
  modules: any;
  releases:any;
  searchText: any;
  filteredReleases:any;
  dataTable: DataTable;
  projects : any;
  release: any = {
    projectid: '0',
    moduleid: '0'
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
      request.url = API_ROUTES.FETCH_RELEASE  + this.release.projectid;
      request.type = REQUEST_TYPE.GET;
      this.requestHandler.sendRequest(request, true).subscribe(
        data => {
          const result = data.json();
          if (result.success) {
            this.releases = result.data;
            this.filteredReleases = this.releases;
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

    searchReleases(){
    this.filteredReleases = this.filteredReleases.filter(item => {
        return item.title.includes(this.searchText)||item.description.includes(this.searchText);
    });
    if(this.searchText==''){
        this.filteredReleases = this.releases;
    }
  }

  populateDataTable() {
    this.dataTable = {
        headerRow: [  'Title', 'Release Note'],
        footerRow: [  'Title', 'Release Note' ],
        dataRows: [{
          'title': 'Airi Satou',
          'description': 'Andrew Mike',
          
         
        }]
    };
  }
}
