import { RequesthandlerService } from '../../../utils/requesthandler.service';
import { Component, OnInit } from '@angular/core';
import {REQUEST_TYPE, API_ROUTES} from '../../../utils/constants';
import {CustomRequest} from '../../../models/customrequest';
declare var $ : any;
declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: [{}];
}
@Component({
  selector: 'app-view-developer',
  templateUrl: './view-developer.component.html',
  styleUrls: ['./view-developer.component.css']
})
export class ViewDeveloperComponent implements OnInit {
  developers: any [] ;
  filteredDevelopers: any [];
  searchText: any;
  dataTable: DataTable;
  constructor(private requestHandler: RequesthandlerService) { 
    setTimeout(function()
    {
  $(function()
  {
    $('#datatabless').DataTable();
  });
    },3000);
  }

  ngOnInit() {
    this.fetchDevelopers();
    this.populateDataTable();
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
          this.filteredDevelopers = this.developers;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  populateDataTable() {
    this.dataTable = {
        headerRow: [ 'UserName','Name' , 'Email' ],
        footerRow: [ 'UserName', 'Name' , 'Email' ],
        dataRows: [{
          'UserName': 'Airi Satou',
          'Name': 'Andrew Mike',
          'Email': 'Develop'
        }]
    };
  }
  searchUser() {
    this.filteredDevelopers = this.filteredDevelopers.filter(item => {
        return item.fname.includes(this.searchText)||item.lname.includes(this.searchText)||item.username.includes(this.searchText)||item.email.includes(this.searchText);
    });
    if(this.searchText==''){
        this.filteredDevelopers = this.developers;
    }
  }

}
