import * as url from 'url';
import { CustomRequest } from './../models/customrequest';
import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import '../../assets/js/demo.js';


declare var demo: any;

declare var demo1: any;
@Injectable()
export class UtilitiesService {

  constructor() { }

  getFormattedQueryString(request: CustomRequest) {
    let url = request.url;
    let paramsArray = [];
    let formattedUrl: any;
    request.params.forEach(param => {
      let singleParam = param.key + '=' + param.value;
      paramsArray.push(singleParam);
    });
    formattedUrl = url + '?' + paramsArray.join('&');
    return formattedUrl;
  }

  showConfirmationAlert(title, text, type, confirmButtonText, callback, showCancelButton = false) {
    return swal({
      title,
      text,
      type,
      showCancelButton,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText
    }).then(callback);
  }

  showAlert(msg) {
    demo.showSwal('basic', msg);
  }
  showSuccessAlert(msg) {
    demo.showSwal('success-message', msg);
  }
 

  showSimpleAlert(title, description, type) {
    demo1.swal(title, description, type);
 }

}
