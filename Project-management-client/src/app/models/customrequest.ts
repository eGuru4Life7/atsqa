import { Params } from '@angular/router';
import { Body } from '@angular/http/src/body';
import {Headers} from '@angular/http';

export class CustomRequest {
    private _url: string;
    private _type: string;
    private _headers: Headers;
    private _body: {};
    private _params: any;

    public get url() {
      return this._url;
    }
    public set url(url: string) {
      this._url = url;
    }
    public get type() {
      return this._type;
    }
    public set type(type: string) {
      this._type = type;
    }
    public get headers() {
      return this._headers;
    }
    public set headers(header: Headers) {
      this._headers = header;
    }
    public get body() {
      return this._body;
    }
    public set body(body: any) {
      this._body = body;
    }
    public get params() {
      return this._params;
    }
    public set params(params: any) {
      this._params = params;
    }

    public toObject() {
      return {
        url: this._url,
        type: this._type,
        headers: this._headers,
        body: this._body,
        params: this._params
      };
    }

}
