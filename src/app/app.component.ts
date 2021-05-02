import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PhoneDetailService } from './phone-detail.service';
import { FilterDataRequestBody } from './phone-FilterDataRequestBody';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //please install theses dependences
  //npm install --save @angular/material @angular/cdk
  //npm i ngx-pagination

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('divErrorfocus') divErrorfocus: ElementRef;
  @ViewChildren("CheckBoxForm") checkBoxs: QueryList<MatCheckbox>;
  @ViewChild('divfocus') divfocus: ElementRef;
  
  dataLength: String;
  dataSource: Array<any>;
  page:Number=1
  
   title = 'CustomTable';
   headers = ["name","phone","countryCode","countryName","status"];

   start = 0;
   pageLength = 45;
   end: number;
   defaultData: any;
   dataLoaded = false;
  filterArray: any;
  serviceError = false;
  errorMsg;

  actionDone: boolean = false;
  isFilter = false;
  filterStart = 0;
  filterSize = 5;
  filterText='';
  selected='';
  Modules: any;
  dataItems: any;


  selectionChanged(event){
    console.log('drop down ',event.target.value)
    this.selected=event.target.value;
    console.log(this.selected)
    console.log(this.filterText)
     if(this.selected)
     {
    this.getPhoneDetailsService(this.start, this.pageLength,this.selected);
      }else
      this.getPhoneDetailsService(this.start, this.pageLength,"");
 }
  constructor( private service :PhoneDetailService){}
  ngOnInit() {

    this. getDropDownListItemsService()
    this.getPhoneDetailsService(this.start, this.pageLength, '');
   
  }
  updatePage(event) {
    this.actionDone = false
    this.serviceError = false

    // console.log('isFilter ' + this.isFilter)

    if (!this.isFilter) {
      this.filterStart = 0;

      this.start = event.pageIndex;
      this.end = this.pageLength;
      // console.log('start ' + this.start + ' limit ' + this.pageLength)
      this.getPhoneDetailsService(this.start, this.end, '');
    } else {
      this.start = 0

      this.filterStart = event.pageIndex;
      this.end = this.filterSize;
      // console.log('start ' + this.filterStart + ' limit ' + this.filterSize)
      this.getPhoneDetailsService(this.filterStart, this.pageLength, this.filterText);
    }
  }
  getDropDownListItemsService() {
    // this.Modules =  this.service.getAllAvailableItems();
    // console.log( this.Modules);
     this.service.getAllAvailableItems().subscribe(
      res => {
        console.log(res)
        this.dataItems = res['dropDownItems'];
  })
}
    getPhoneDetailsService(start, limit, searchText) {
    let dataRequest = new FilterDataRequestBody( start, limit, searchText);
     this.service.getPhoneDetail(dataRequest).subscribe(
      res => {
        console.log(res)
        this.dataLength = res['totalCount'];

        this.dataSource = res['customers'];
        //this.dataSource = res;
        //this.dataSource.notificationTopic.name;
        
        this.defaultData = res;
        this.dataLoaded = true;
        this.filterArray = new MatTableDataSource(this.defaultData);
      }, e => {
        console.log(e)
        this.dataLoaded = true;
        this.serviceError = true;
        if (e['status'] == 500) {
          this.errorMsg = e.error['message']
        } else {
          this.errorMsg = 'Service not avaliable,Try again later.'
        }
        //this.goToDivErrorMsg();
      }
    )
    }
  /////////////////////////////////////////////////
  //npm install --save @angular/material @angular/cdk
  //npm i ngx-pagination
//////////////////////////////////////////////////////
}
