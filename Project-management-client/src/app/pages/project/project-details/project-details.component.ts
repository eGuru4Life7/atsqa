import { Component, OnInit } from '@angular/core';
import { CustomRequest } from 'app/models/customrequest';
import { API_ROUTES, REQUEST_TYPE } from 'app/utils/constants';
import { RequesthandlerService } from 'app/utils/requesthandler.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  id: any;
  details: any = {};
  constructor(private requestHandler: RequesthandlerService, private route:ActivatedRoute) { }

  getType(id){
    let title: any = 's';
    switch(id){
      case "1":
        title = 'HR Systems';
      break;
      case "2":
        title = 'Commissions';
      break;
      case "3":
        title = 'Vendor';
      break;
      case "4":
        title = 'Management';
      break;
      default:
        title = '';
      break;
    }
    return title;
  }

  getSubType(id){
    let title: any = '';
    switch(id){
      case "1":
        title = 'Front Office';
      break;
      case "2":
        title = 'Back Office';
      break;
      default:
        title = '';
      break;
    }
    return title;
  }

  getStatus(id)
  {
    let title: any = '';
    switch(id){
      case "1":
        title = 'Pending';
      break;
      case "2":
        title = 'Active';
      break;
      case "3":
      title = "Completed";
      break;
      case "4":
      title = "Inactive";
      break;
      default:
        title = '';
      break;
    }
    return title;
  }

  ngOnInit() {
    let __this = this;
    this.route.params.subscribe((resp: any) => {
      __this.id = resp.id;
      __this.ShowDetailScreen(__this.id);
    });
    // console.log(this.id);
  }

  ShowDetailScreen(id){
    let __this = this;
    const request = new CustomRequest();
    request.url = API_ROUTES.PROJECT_DETAILS + id;
    request.type = REQUEST_TYPE.GET;
    this.requestHandler.sendRequest(request, true).subscribe(
      data => {
        const result = data.json();
        if (result.success) {
          console.log(result.data);
          __this.details = result.data;

        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
