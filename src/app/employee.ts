/**
 * Created by root on 4/17/2017.
 */

import { City } from './city';

export class Employee {
  empId?:number;
  firstName:string;
  lastName:string;
  gender:string;
  dateOfBirth:Date;
  nationality:string;
  maritalStatus:string;
  phone:string;
  city: City;
  subDivision:string;
  status:string;
  suspendDate:Date;
  hiredDate:Date;
  grade:string;
  division:string;
  email:string;
  profilePicture?:string;
}
