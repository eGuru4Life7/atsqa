import { UtilitiesService } from '../../../utils/utilities.service';
import { request } from 'http';
import { Router } from '@angular/router';
import { RequesthandlerService } from '../../../utils/requesthandler.service';
import { Component, OnInit } from '@angular/core';
import {REQUEST_TYPE, API_ROUTES, ALERT_TYPE} from '../../../utils/constants';
import {CustomRequest} from '../../../models/customrequest';
import '../../../../assets/js/demo.js';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
declare var $ : any;

declare var value : any;
declare var demo: any;
declare var demo1: any;
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})



export class AddProjectComponent implements OnInit {
  project: any = {
    startdate: '',
    enddate: '',
    title: '',
    description: '',
    status: '0',
    type : '0',
    subtype : '0'
  };
  dropdownlist : HTMLSelectElement;

  constructor(private requestHandler: RequesthandlerService, private router: Router, private utils: UtilitiesService) {
    // this.setToday();

    }

  ngOnInit() {
    let date = new Date();

    this.project.startdate = date.toLocaleString().split(',')[0];
   // this.project.startdate.value = date; 
    date.setDate(date.getDate()+1);
    this.project.enddate = date.toLocaleString().split(',')[0];
    demo.initFormExtendedDatetimepickers();
     $('.selectpicker').selectpicker();
  }

  isDataValid() {

    let el0 = document.getElementById('title');
    let el1 = document.getElementById('description');
    let el2 = document.getElementById('startdate');
    let el3 = document.getElementById('enddate');
    let el4 = document.getElementById('status');
    let el5 = document.getElementById('type');
    let el6 = document.getElementById('subtype');

    if(this.project.title != '') {
      if(this.project.description != '') {
        if(this.project.startdate != '') {
          if(this.project.enddate != '') {
            if(this.project.status != "0")
            {
              if (this.project.type != "0")
              {
                if(this.project.subtype != "0")
                {
                  var sdate = (<HTMLInputElement>document.getElementById('startdate')).value;
                  var sdateFormat = new Date(sdate);
                  var mMonth = sdateFormat.getMonth() + 1  ;
                  var mDay = sdateFormat.getDate();
                  var mYear = sdateFormat.getFullYear();

                  var completeDate = mMonth + "-" + mDay + "-" + mYear;
                  var startdate1 = new Date(completeDate);
                  this.project.startdate = completeDate;
                 // this.project.startdate = new Date(sdate);
                  var edate = (<HTMLInputElement>document.getElementById('enddate')).value;
                   sdateFormat = new Date(edate);
                   mMonth = sdateFormat.getMonth() + 1 ;
                   mDay = sdateFormat.getDate();
                   mYear = sdateFormat.getFullYear();

                   completeDate = mMonth + "-" + mDay + "-" + mYear;
                  var endate1 = new Date(completeDate);

                  this.project.enddate = completeDate;
                  if (startdate1 < endate1 )
                  {
                    return true;

                  }
demo.showSwal('basic','Start Date Should Be Less Than End Date');
                  return false;
                }
                el6.focus();
                return false;
              }
              else
              {
el5.focus();
return false;
              }

            }


            else
            {

              el4.focus();
              return false;

            }
          } else {
        el3.focus();
        //    demo.showSwal('basic', 'End Date can not be empty');
            return false;
          }
        } else {
          //let el2 = document.getElementById('startdate');
          el2.focus();
          return false;
        }
      } else {
       // let el1 = document.getElementById('description');
        el1.focus();
        return false;
      }
    } else {
      //let el0 = document.getElementById('title');
      el0.focus();
      return false;
    }


    // if(this.project.title != '' && this.project.description != '' && this.project.startdate != '' && this.project.enddate != ''){
    //     return true;
    // }
    // return false;
  }

  onSelectEndDate(date: Date) {
    console.log("onSelect End date: ", date);

        var mMonth = date.getMonth();
        var mDay = date.getDate();
        var mYear = date.getFullYear();

        var completeDate = mMonth + "-" + mDay + "-" + mYear;
        console.log(completeDate);

       // this.project.enddate = completeDate;
        var enddate1 = new Date(completeDate);
        this.project.enddate = enddate1;
  }

  onSelectStartDate(date: Date) {
    console.log("onSelect Start date: ", date);

    var mMonth = date.getMonth();
    var mDay = date.getDate();
    var mYear = date.getFullYear();

    var completeDate = mMonth + "-" + mDay + "-" + mYear;
    console.log(completeDate);

    //this.project.startdate = completeDate;
var startdate1 = new Date(completeDate);
this.project.startdate = startdate1;
    // var datePipe = new DatePipe("en-US");
    // this.project.startdate = datePipe.transform(date, 'dd/MM/yyyy');


    // this.project.startdate = date;
  }


  addProject() {
    let __this = this;
    if(this.isDataValid()){
      const request = new CustomRequest();
      request.url = API_ROUTES.ADD_PROJECT;
      request.type = REQUEST_TYPE.POST;
      request.body = this.project;
      this.requestHandler.sendRequest(request, true).subscribe(
        data => {
          const result = data.json();
          if (result.success) {
          //  demo1.showSwal('Project Added Successfully','Test','success-message')
      // demo.showSwal1('success-message','Project Added Successfully')
         //  demo.showConfirmationAlert('Project Added Successfully','Test','sessucc-message',)
     //    demo.showSwal('basic', 'Project Added Successfully');
     this.utils.showSuccessAlert('Project Added Successfully');
     __this.router.navigate(['view/projects']);

          }
        }
      );
    } else {
      // this.utils.showConfirmationAlert('Error', 'Invalid Data', ALERT_TYPE.ERROR, "OK", null);
      // demo.showSwal('basic', 'Invalid Data');

    }

  }



}
