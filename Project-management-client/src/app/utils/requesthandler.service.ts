import { LocalStorageService } from './localstorage.service';
import { UtilitiesService } from './utilities.service';
import { CustomRequest } from './../models/customrequest';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { REQUEST_TYPE, BASE_URL } from '../utils/constants';

@Injectable()
export class RequesthandlerService {

  constructor(private http: Http, private utils: UtilitiesService, private localStorage: LocalStorageService) { }

  public sendRequest(request: CustomRequest, isTokened = false) {
    request.url = BASE_URL + request.url;
    if(!request.headers) {
      request.headers = new Headers();
    }
    if (isTokened) {
      request.headers.append('Token', this.localStorage.getCurrentUser().token);
    }
    let requestResponse: any;
    switch (request.type) {
      case REQUEST_TYPE.GET:
        requestResponse = this.getData(request);
      break;
      case REQUEST_TYPE.POST:
        requestResponse = this.postData(request);
      break;
      case REQUEST_TYPE.PUT:
        requestResponse = this.putData(request);
      break;
    }
    return requestResponse;
  }

  private getData(request: CustomRequest) {
    if (request.params) {
      if (request.params.length > 0) {
        return this.http.get(this.utils.getFormattedQueryString(request), {headers: request.headers});
      }
    } else {
      return this.http.get(request.url, {headers: request.headers});
    }
  }

  private postData(request: CustomRequest) {
    return this.http.post(request.url, request.body, {headers: request.headers});
  }

  private putData(request: CustomRequest) {
    return this.http.put(request.url, request.body, {headers: request.headers});
  }

}
