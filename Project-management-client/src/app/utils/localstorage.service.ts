import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  LOGIN_FIELDS = {
    ID: 'id',
    NAME: 'name',
    EMAIL: 'email',
    TOKEN: 'token',
  };

  constructor() { }

  private setData(key, value) {
    window.localStorage.setItem(key, value);
  }

  private getData(key) {
    return window.localStorage.getItem(key);
  }

  setUserLoginData(user) {
    this.setData(this.LOGIN_FIELDS.ID, user.id);
    this.setData(this.LOGIN_FIELDS.NAME, user.fname + ' ' + user.lname);
    this.setData(this.LOGIN_FIELDS.EMAIL, user.email);
    this.setData(this.LOGIN_FIELDS.TOKEN, user.token);
  }

  isUserLoggedIn() {
    if (this.getData(this.LOGIN_FIELDS.TOKEN)) {
      return true;
    }
    return false;
  }

  getCurrentUser() {
    return {
      'id': this.getData(this.LOGIN_FIELDS.ID),
      'name': this.getData(this.LOGIN_FIELDS.NAME),
      'email': this.getData(this.LOGIN_FIELDS.EMAIL),
      'token': this.getData(this.LOGIN_FIELDS.TOKEN)
    };
  }

  clearCache(){
    window.localStorage.clear();
  }

}
