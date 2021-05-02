import { Component, OnInit, Output, EventEmitter, Injectable, ComponentFactoryResolver } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { FilterDataRequestBody } from './phone-FilterDataRequestBody';


@Injectable({
  providedIn: 'root'
})
export class PhoneDetailService {

  constructor(private http:HttpClient) { }

  public getPhoneDetail(filterDataRequestBody:FilterDataRequestBody){
    return this.http.post('http://localhost:9091/Customer/all',filterDataRequestBody);

  }
  public getAllAvailableItems(){
    return this.http.get('http://localhost:9091/Customer/GetAllItems')
  }
 
}


