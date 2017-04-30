import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EmployeeSharedService } from "../employee-shared.service";
import { Employee } from "../employee";
import { City } from "../city";
import { CityService } from "../city.service";
import { EmployeeService } from "../employee.service";

import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'employee-detail',
  providers: [EmployeeService, CityService],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit, OnChanges {

  selectedEmployee: Employee;
  employeeForm: FormGroup;
  cities: City[];

  genders: any = [
    { genderId: 1, gender: 'Male' },
    { genderId: 2, gender: 'Female' },
    { genderId: 3, gender: 'Not Stated' }
  ];

  maritalStatuses: any = [
    {maritalStatusId:1, maritalStatus:"Single"},
    {maritalStatusId:2, maritalStatus:"Married"},
    {maritalStatusId:3, maritalStatus:"Widowed"}
  ];

  subDivisions: any = [
    {subDivisionId: 1, subDivision:"Java Bootcamp"},
    {subDivisionId: 2, subDivision:"C# Bootcamp"},
    {subDivisionId: 3, subDivision:"Javascript Bootcamp"}
  ];

  statuses: any = [
    {statusId:1, status:"Contract"},
    {statusId:2, status:"Permanent"}
  ];

  grades: any = [
    {gradeId: 1, grade:"SE - JP"},
    {gradeId: 2, grade:"SE - PG"},
    {gradeId: 3, grade:"SE - AP"},
    {gradeId: 4, grade:"SE - AN"},
  ];

  divisions: any = [
    {divisionId:1, division:"CDC"},
    {divisionId:2, division:"SWD"}
  ];

  url: string;

  constructor(private employeeService: EmployeeService, private cityService: CityService, private employeeSharedService: EmployeeSharedService, private fb: FormBuilder) { }

  ngOnInit() {
    console.log('init EmployeeDetailComponent');
    this.fetchAvailableCities();
    this.createForm();
    this.subscribeSelectedEmployee();

  }

  ngOnChanges(): void {
    this.resetFormValue();
  }

  fileChange(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.selectedEmployee.profilePicture = event.target.result;
        this.employeeForm.markAsDirty();
        console.log('evt target result', event.target.result);
        console.log('this.selEmp.profpic', this.selectedEmployee.profilePicture);
        this.employeeForm.value.profilePicture = event.target.result;
        // this.employeeForm.controls.profilePicture = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);

      console.log('files', event.target.files[0]);
      console.log('reader res', reader);
    }
  }

  fetchAvailableCities() {
    this.cityService.getAllCities().then(result => this.cities = result);
  }

  subscribeSelectedEmployee() {
    this.employeeSharedService.getSelectedEmployee().subscribe(e => {
      console.log("subj sel Emp", e);
      if (e) {
        if (e.empId) {
          this.selectedEmployee = e;
          this.resetFormValue();
          this.setFormValue();
        }
      } else {
        const emp:Employee = {
          empId: null,
          firstName: '',
          lastName: '',
          gender: null,
          dateOfBirth: null,
          nationality: null,
          maritalStatus: null,
          phone: '',
          city: {
            cityId: null,
            city: ''
          },
          subDivision: null,
          status: null,
          suspendDate: null,
          hiredDate: null,
          grade: null,
          division: null,
          email: '',
          profilePicture: null
        };
        this.selectedEmployee = emp;
        this.nullifyFormValue();
      }

      // return this.selectedEmployee;
    });
  }

  createForm() {
    this.employeeForm = this.fb.group({
      empId: '',
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      nationality: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      phone: '',
      city: ['', Validators.required],
      subDivision: ['', Validators.required],
      status: ['', Validators.required],
      suspendDate: '',
      hiredDate: ['', Validators.required],
      grade: ['', Validators.required],
      division: ['', Validators.required],
      email: ['', Validators.required],
      profilePicture: ''
    });
  }

  setFormValue() {
    // this.employeeForm.setValue(this.selectedEmployee);
    this.employeeForm.setValue({
      empId: this.selectedEmployee.empId,
      firstName: this.selectedEmployee.firstName,
      lastName: this.selectedEmployee.lastName,
      gender: this.selectedEmployee.gender,
      dateOfBirth: this.selectedEmployee.dateOfBirth,
      nationality: this.selectedEmployee.nationality,
      maritalStatus: this.selectedEmployee.maritalStatus,
      phone: this.selectedEmployee.phone,
      city: this.selectedEmployee.city.cityId,
      subDivision: this.selectedEmployee.subDivision,
      status: this.selectedEmployee.status,
      suspendDate: this.selectedEmployee.suspendDate,
      hiredDate: this.selectedEmployee.hiredDate,
      grade: this.selectedEmployee.grade,
      division: this.selectedEmployee.division,
      email: this.selectedEmployee.email,
      profilePicture: this.selectedEmployee.profilePicture ? this.selectedEmployee.profilePicture : null
    });
  }

  resetFormValue() {
    this.fetchAvailableCities();
    // this.employeeForm.reset(this.selectedEmployee);
    this.employeeForm.reset({
      empId: this.selectedEmployee.empId,
      firstName: this.selectedEmployee.firstName,
      lastName: this.selectedEmployee.lastName,
      gender: this.selectedEmployee.gender,
      dateOfBirth: this.selectedEmployee.dateOfBirth,
      nationality: this.selectedEmployee.nationality,
      maritalStatus: this.selectedEmployee.maritalStatus,
      phone: this.selectedEmployee.phone,
      city: this.selectedEmployee.city.cityId,
      subDivision: this.selectedEmployee.subDivision,
      status: this.selectedEmployee.status,
      suspendDate: this.selectedEmployee.suspendDate,
      hiredDate: this.selectedEmployee.hiredDate,
      grade: this.selectedEmployee.grade,
      division: this.selectedEmployee.division,
      email: this.selectedEmployee.email,
      profilePicture: this.selectedEmployee.profilePicture ? this.selectedEmployee.profilePicture : null
    });
  }

  nullifyFormValue() {
    // this.employeeForm.reset(new Employee());

    this.employeeForm.reset({
      empId: null,
      firstName: '',
      lastName: '',
      gender: '',
      dateOfBirth: '',
      nationality: '',
      maritalStatus: '',
      phone: '',
      city: '',
      subDivision: '',
      status: '',
      suspendDate: '',
      hiredDate: '',
      grade: '',
      division: '',
      email: '',
      profilePicture: null
    });
  }

  saveUpdateEmployee() {
    this.selectedEmployee = this.prepareSaveEmployee();
    console.log('saveUpdateEmployee', this.selectedEmployee);
    if (this.selectedEmployee.empId) {
      this.employeeService.updateEmployee(this.selectedEmployee)
        .then(resp => this.employeeSharedService.broadcastChange(true));
    } else {
      this.employeeService.addEmployee(this.selectedEmployee)
        .then(resp => this.employeeSharedService.broadcastChange(true));
    }
    this.ngOnChanges();
  }

  prepareSaveEmployee(): Employee {
    const formModel = this.employeeForm.value;

    console.log('formModel on prepare', formModel);

    // const saveEmployee: Employee = formModel;

    const saveEmployee: Employee = {
      empId: formModel.empId ? formModel.empId : null,
      firstName: formModel.firstName,
      lastName: formModel.lastName,
      gender: formModel.gender,
      dateOfBirth: formModel.dateOfBirth,
      nationality: formModel.nationality,
      maritalStatus: formModel.maritalStatus,
      phone: formModel.phone,
      city: { cityId: formModel.city, city: null },
      subDivision: formModel.subDivision,
      status: formModel.status,
      suspendDate: formModel.suspendDate,
      hiredDate: formModel.hiredDate,
      grade: formModel.grade,
      division: formModel.division,
      email: formModel.email,
      profilePicture: formModel.profilePicture
    };
    return saveEmployee;
  }

  get diagnostic() { return JSON.stringify(this.selectedEmployee); }

  
  nationalities: any = [
    {
      nationalityId: 1,
      nationality: "Afghan"
    },
    {
      nationalityId: 2,
      nationality: "Albanian"
    },
    {
      nationalityId: 3,
      nationality: "Algerian"
    },
    {
      nationalityId: 4,
      nationality: "American"
    },
    {
      nationalityId: 5,
      nationality: "Andorran"
    },
    {
      nationalityId: 6,
      nationality: "Angolan"
    },
    {
      nationalityId: 7,
      nationality: "Antiguans"
    },
    {
      nationalityId: 8,
      nationality: "Argentinean"
    },
    {
      nationalityId: 9,
      nationality: "Armenian"
    },
    {
      nationalityId: 10,
      nationality: "Australian"
    },
    {
      nationalityId: 11,
      nationality: "Austrian"
    },
    {
      nationalityId: 12,
      nationality: "Azerbaijani"
    },
    {
      nationalityId: 13,
      nationality: "Bahamian"
    },
    {
      nationalityId: 14,
      nationality: "Bahraini"
    },
    {
      nationalityId: 15,
      nationality: "Bangladeshi"
    },
    {
      nationalityId: 16,
      nationality: "Barbadian"
    },
    {
      nationalityId: 17,
      nationality: "Barbudans"
    },
    {
      nationalityId: 18,
      nationality: "Batswana"
    },
    {
      nationalityId: 19,
      nationality: "Belarusian"
    },
    {
      nationalityId: 20,
      nationality: "Belgian"
    },
    {
      nationalityId: 21,
      nationality: "Belizean"
    },
    {
      nationalityId: 22,
      nationality: "Beninese"
    },
    {
      nationalityId: 23,
      nationality: "Bhutanese"
    },
    {
      nationalityId: 24,
      nationality: "Bolivian"
    },
    {
      nationalityId: 25,
      nationality: "Bosnian"
    },
    {
      nationalityId: 26,
      nationality: "Brazilian"
    },
    {
      nationalityId: 27,
      nationality: "British"
    },
    {
      nationalityId: 28,
      nationality: "Bruneian"
    },
    {
      nationalityId: 29,
      nationality: "Bulgarian"
    },
    {
      nationalityId: 30,
      nationality: "Burkinabe"
    },
    {
      nationalityId: 31,
      nationality: "Burmese"
    },
    {
      nationalityId: 32,
      nationality: "Burundian"
    },
    {
      nationalityId: 33,
      nationality: "Cambodian"
    },
    {
      nationalityId: 34,
      nationality: "Cameroonian"
    },
    {
      nationalityId: 35,
      nationality: "Canadian"
    },
    {
      nationalityId: 36,
      nationality: "Cape Verdean"
    },
    {
      nationalityId: 37,
      nationality: "Central African"
    },
    {
      nationalityId: 38,
      nationality: "Chadian"
    },
    {
      nationalityId: 39,
      nationality: "Chilean"
    },
    {
      nationalityId: 40,
      nationality: "Chinese"
    },
    {
      nationalityId: 41,
      nationality: "Colombian"
    },
    {
      nationalityId: 42,
      nationality: "Comoran"
    },
    {
      nationalityId: 43,
      nationality: "Congolese"
    },
    {
      nationalityId: 44,
      nationality: "Costa Rican"
    },
    {
      nationalityId: 45,
      nationality: "Croatian"
    },
    {
      nationalityId: 46,
      nationality: "Cuban"
    },
    {
      nationalityId: 47,
      nationality: "Cypriot"
    },
    {
      nationalityId: 48,
      nationality: "Czech"
    },
    {
      nationalityId: 49,
      nationality: "Danish"
    },
    {
      nationalityId: 50,
      nationality: "Djibouti"
    },
    {
      nationalityId: 51,
      nationality: "Dominican"
    },
    {
      nationalityId: 52,
      nationality: "Dutch"
    },
    {
      nationalityId: 53,
      nationality: "East Timorese"
    },
    {
      nationalityId: 54,
      nationality: "Ecuadorean"
    },
    {
      nationalityId: 55,
      nationality: "Egyptian"
    },
    {
      nationalityId: 56,
      nationality: "Emirian"
    },
    {
      nationalityId: 57,
      nationality: "Equatorial Guinean"
    },
    {
      nationalityId: 58,
      nationality: "Eritrean"
    },
    {
      nationalityId: 59,
      nationality: "Estonian"
    },
    {
      nationalityId: 60,
      nationality: "Ethiopian"
    },
    {
      nationalityId: 61,
      nationality: "Fijian"
    },
    {
      nationalityId: 62,
      nationality: "Filipino"
    },
    {
      nationalityId: 63,
      nationality: "Finnish"
    },
    {
      nationalityId: 64,
      nationality: "French"
    },
    {
      nationalityId: 65,
      nationality: "Gabonese"
    },
    {
      nationalityId: 66,
      nationality: "Gambian"
    },
    {
      nationalityId: 67,
      nationality: "Georgian"
    },
    {
      nationalityId: 68,
      nationality: "German"
    },
    {
      nationalityId: 69,
      nationality: "Ghanaian"
    },
    {
      nationalityId: 70,
      nationality: "Greek"
    },
    {
      nationalityId: 71,
      nationality: "Grenadian"
    },
    {
      nationalityId: 72,
      nationality: "Guatemalan"
    },
    {
      nationalityId: 73,
      nationality: "Guinea-Bissauan"
    },
    {
      nationalityId: 74,
      nationality: "Guinean"
    },
    {
      nationalityId: 75,
      nationality: "Guyanese"
    },
    {
      nationalityId: 76,
      nationality: "Haitian"
    },
    {
      nationalityId: 77,
      nationality: "Herzegovinian"
    },
    {
      nationalityId: 78,
      nationality: "Honduran"
    },
    {
      nationalityId: 79,
      nationality: "Hungarian"
    },
    {
      nationalityId: 80,
      nationality: "I-Kiribati"
    },
    {
      nationalityId: 81,
      nationality: "Icelander"
    },
    {
      nationalityId: 82,
      nationality: "Indian"
    },
    {
      nationalityId: 83,
      nationality: "Indonesian"
    },
    {
      nationalityId: 84,
      nationality: "Iranian"
    },
    {
      nationalityId: 85,
      nationality: "Iraqi"
    },
    {
      nationalityId: 86,
      nationality: "Irish"
    },
    {
      nationalityId: 87,
      nationality: "Israeli"
    },
    {
      nationalityId: 88,
      nationality: "Italian"
    },
    {
      nationalityId: 89,
      nationality: "Ivorian"
    },
    {
      nationalityId: 90,
      nationality: "Jamaican"
    },
    {
      nationalityId: 91,
      nationality: "Japanese"
    },
    {
      nationalityId: 92,
      nationality: "Jordanian"
    },
    {
      nationalityId: 93,
      nationality: "Kazakhstani"
    },
    {
      nationalityId: 94,
      nationality: "Kenyan"
    },
    {
      nationalityId: 95,
      nationality: "Kittian and Nevisian"
    },
    {
      nationalityId: 96,
      nationality: "Kuwaiti"
    },
    {
      nationalityId: 97,
      nationality: "Kyrgyz"
    },
    {
      nationalityId: 98,
      nationality: "Laotian"
    },
    {
      nationalityId: 99,
      nationality: "Latvian"
    },
    {
      nationalityId: 100,
      nationality: "Lebanese"
    },
    {
      nationalityId: 101,
      nationality: "Liberian"
    },
    {
      nationalityId: 102,
      nationality: "Libyan"
    },
    {
      nationalityId: 103,
      nationality: "Liechtensteiner"
    },
    {
      nationalityId: 104,
      nationality: "Lithuanian"
    },
    {
      nationalityId: 105,
      nationality: "Luxembourger"
    },
    {
      nationalityId: 106,
      nationality: "Macedonian"
    },
    {
      nationalityId: 107,
      nationality: "Malagasy"
    },
    {
      nationalityId: 108,
      nationality: "Malawian"
    },
    {
      nationalityId: 109,
      nationality: "Malaysian"
    },
    {
      nationalityId: 110,
      nationality: "Maldivan"
    },
    {
      nationalityId: 111,
      nationality: "Malian"
    },
    {
      nationalityId: 112,
      nationality: "Maltese"
    },
    {
      nationalityId: 113,
      nationality: "Marshallese"
    },
    {
      nationalityId: 114,
      nationality: "Mauritanian"
    },
    {
      nationalityId: 115,
      nationality: "Mauritian"
    },
    {
      nationalityId: 116,
      nationality: "Mexican"
    },
    {
      nationalityId: 117,
      nationality: "Micronesian"
    },
    {
      nationalityId: 118,
      nationality: "Moldovan"
    },
    {
      nationalityId: 119,
      nationality: "Monacan"
    },
    {
      nationalityId: 120,
      nationality: "Mongolian"
    },
    {
      nationalityId: 121,
      nationality: "Moroccan"
    },
    {
      nationalityId: 122,
      nationality: "Mosotho"
    },
    {
      nationalityId: 123,
      nationality: "Motswana"
    },
    {
      nationalityId: 124,
      nationality: "Mozambican"
    },
    {
      nationalityId: 125,
      nationality: "Namibian"
    },
    {
      nationalityId: 126,
      nationality: "Nauruan"
    },
    {
      nationalityId: 127,
      nationality: "Nepalese"
    },
    {
      nationalityId: 128,
      nationality: "New Zealander"
    },
    {
      nationalityId: 129,
      nationality: "Nicaraguan"
    },
    {
      nationalityId: 130,
      nationality: "Nigerian"
    },
    {
      nationalityId: 131,
      nationality: "Nigerien"
    },
    {
      nationalityId: 132,
      nationality: "North Korean"
    },
    {
      nationalityId: 133,
      nationality: "Northern Irish"
    },
    {
      nationalityId: 134,
      nationality: "Norwegian"
    },
    {
      nationalityId: 135,
      nationality: "Omani"
    },
    {
      nationalityId: 136,
      nationality: "Pakistani"
    },
    {
      nationalityId: 137,
      nationality: "Palauan"
    },
    {
      nationalityId: 138,
      nationality: "Panamanian"
    },
    {
      nationalityId: 139,
      nationality: "Papua New Guinean"
    },
    {
      nationalityId: 140,
      nationality: "Paraguayan"
    },
    {
      nationalityId: 141,
      nationality: "Peruvian"
    },
    {
      nationalityId: 142,
      nationality: "Polish"
    },
    {
      nationalityId: 143,
      nationality: "Portuguese"
    },
    {
      nationalityId: 144,
      nationality: "Qatari"
    },
    {
      nationalityId: 145,
      nationality: "Romanian"
    },
    {
      nationalityId: 146,
      nationality: "Russian"
    },
    {
      nationalityId: 147,
      nationality: "Rwandan"
    },
    {
      nationalityId: 148,
      nationality: "Saint Lucian"
    },
    {
      nationalityId: 149,
      nationality: "Salvadoran"
    },
    {
      nationalityId: 150,
      nationality: "Samoan"
    },
    {
      nationalityId: 151,
      nationality: "San Marinese"
    },
    {
      nationalityId: 152,
      nationality: "Sao Tomean"
    },
    {
      nationalityId: 153,
      nationality: "Saudi"
    },
    {
      nationalityId: 154,
      nationality: "Scottish"
    },
    {
      nationalityId: 155,
      nationality: "Senegalese"
    },
    {
      nationalityId: 156,
      nationality: "Serbian"
    },
    {
      nationalityId: 157,
      nationality: "Seychellois"
    },
    {
      nationalityId: 158,
      nationality: "Sierra Leonean"
    },
    {
      nationalityId: 159,
      nationality: "Singaporean"
    },
    {
      nationalityId: 160,
      nationality: "Slovakian"
    },
    {
      nationalityId: 161,
      nationality: "Slovenian"
    },
    {
      nationalityId: 162,
      nationality: "Solomon Islander"
    },
    {
      nationalityId: 163,
      nationality: "Somali"
    },
    {
      nationalityId: 164,
      nationality: "South African"
    },
    {
      nationalityId: 165,
      nationality: "South Korean"
    },
    {
      nationalityId: 166,
      nationality: "Spanish"
    },
    {
      nationalityId: 167,
      nationality: "Sri Lankan"
    },
    {
      nationalityId: 168,
      nationality: "Sudanese"
    },
    {
      nationalityId: 169,
      nationality: "Surinamer"
    },
    {
      nationalityId: 170,
      nationality: "Swazi"
    },
    {
      nationalityId: 171,
      nationality: "Swedish"
    },
    {
      nationalityId: 172,
      nationality: "Swiss"
    },
    {
      nationalityId: 173,
      nationality: "Syrian"
    },
    {
      nationalityId: 174,
      nationality: "Taiwanese"
    },
    {
      nationalityId: 175,
      nationality: "Tajik"
    },
    {
      nationalityId: 176,
      nationality: "Tanzanian"
    },
    {
      nationalityId: 177,
      nationality: "Thai"
    },
    {
      nationalityId: 178,
      nationality: "Togolese"
    },
    {
      nationalityId: 179,
      nationality: "Tongan"
    },
    {
      nationalityId: 180,
      nationality: "Trinidadian or Tobagonian"
    },
    {
      nationalityId: 181,
      nationality: "Tunisian"
    },
    {
      nationalityId: 182,
      nationality: "Turkish"
    },
    {
      nationalityId: 183,
      nationality: "Tuvaluan"
    },
    {
      nationalityId: 184,
      nationality: "Ugandan"
    },
    {
      nationalityId: 185,
      nationality: "Ukrainian"
    },
    {
      nationalityId: 186,
      nationality: "Uruguayan"
    },
    {
      nationalityId: 187,
      nationality: "Uzbekistani"
    },
    {
      nationalityId: 188,
      nationality: "Venezuelan"
    },
    {
      nationalityId: 189,
      nationality: "Vietnamese"
    },
    {
      nationalityId: 190,
      nationality: "Welsh"
    },
    {
      nationalityId: 191,
      nationality: "Yemenite"
    },
    {
      nationalityId: 192,
      nationality: "Zambian"
    },
    {
      nationalityId: 193,
      nationality: "Zimbabwean"
    }
  ];

}
