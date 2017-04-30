import { Component, OnInit } from '@angular/core';
import {EmployeeSharedService} from "../employee-shared.service";
import {EmployeeSearchService} from "./employee-search.service";

@Component({
  selector: 'employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.css']
})
export class EmployeeSearchComponent implements OnInit {

  constructor(private employeeSharedService:EmployeeSharedService) { }

  ngOnInit() {

  }

  performSearch(query:string) {
    // this.employeeSharedService.broadcastSearch(query);
    console.log('performSearch',query);
  }

}
