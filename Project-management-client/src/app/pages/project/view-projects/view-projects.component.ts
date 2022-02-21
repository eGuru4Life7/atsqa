import { RequesthandlerService } from '../../../utils/requesthandler.service';
import { Component, OnInit } from '@angular/core';
import {REQUEST_TYPE, API_ROUTES} from '../../../utils/constants';
import {CustomRequest} from '../../../models/customrequest';
declare var $ : any;
import { Router } from '@angular/router';
declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: [{}];
}

@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.css']
})
export class ViewProjectsComponent implements OnInit {
  projects: any = [];
  filteredProjects: any = [];
  dataTable: DataTable;
  searchText: any;


  constructor(private requestHandler: RequesthandlerService , private router : Router ) { 

    setTimeout(function()
  {
$(function()
{
  $('#datatabless').DataTable();
});
  },3000);
  }

  // ngAfterViewInit() {

  // }

  ngOnInit() {
    this.fetchProjects();
    this.populateDataTable();
    


  }

  getDate(date){
    return new Date(date).toDateString();
  }

  fetchProjects() {
    let request = new CustomRequest();
    request.url = API_ROUTES.FETCH_PROJECT;
    request.type = REQUEST_TYPE.GET;
    this.requestHandler.sendRequest(request, true).subscribe(
      data => {
        const result = data.json();
        if (result.success) {
          this.projects = result.data;
          this.filteredProjects = this.projects;
          document.scrollingElement.scrollTop = 0;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  searchProjects() {
    this.filteredProjects = this.filteredProjects.filter(item => {
        return item.id.toString().includes(this.searchText)||item.title.includes(this.searchText)||item.description.includes(this.searchText);
    });
    if(this.searchText==''){
        this.filteredProjects = this.projects;
    }
  }


  populateDataTable() {
    this.dataTable = {
        headerRow: [ 'Id', 'Title', 'Description', 'Start Date', 'End Date', 'Status' ],
        footerRow: [ 'Id', 'Title', 'Description', 'Start Date', 'End Date', 'Status' ],
        dataRows: [{
          'title': 'Airi Satou',
          'description': 'Andrew Mike',
          'startdate': 'Develop',
          'enddate': '2013',
          'descriptionscreen':'projectdetail'
        }]
    };
  }
  ShowDetailScreen(id){
    // const request = new CustomRequest();
    // request.url = API_ROUTES.PROJECT_DETAILS + this.projects;
    // request.type = REQUEST_TYPE.GET;
    // this.requestHandler.sendRequest(request, true).subscribe(
    //   data => {
    //     const result = data.json();
    //     if (result.success) {
    //       // this.projects = result.data;
    //       // this.projects = this.projects.map(item => {
    //       //   item.status = 'pending';
    //       //   return item;
    //       // });
    //     }
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
    this.router.navigate(['project/details', id]);
  }


}
