import { Component, OnInit } from '@angular/core';
import { Employee } from './employee.model';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  isCreateEmployee: boolean = true;;

  employee: any;

  skills: string[] = [];

  constructor(private employeeService: EmployeeService,
    private router: Router,
    private activateRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.employee = this.activateRoute.snapshot.data['employee'];

    console.log(this.employee);

    if(this.employee && this.employee.employeeId>0){  //fr update reason
      this.isCreateEmployee=false;

      if(this.employee.employeeSkills != ''){
        this.skills=[];
        this.skills= this.employee.employeeSkills.split(',');
      }
    }
    else{                              //for add reasons
      this.isCreateEmployee=true;
    }



  }

  selectGender(gender: string): void {
    this.employee.employeeGender = gender;
  }
  onSkillsChanges(event: any): void {
    console.log(event);
    if (event.checked) {
      this.skills.push(event.source.value);
    } else {
      this.skills.forEach(
        (item, index) => {
          if (item == event.source.value) {
            this.skills.splice(index, 1);
          }
        }

      );
    }
    this.employee.employeeSkills = this.skills.toString();
  }


  saveEmployee(employeeForm: NgForm): void {
    
    if (this.isCreateEmployee){   //for creating a new user
      this.employeeService.saveEmployee(this.employee).subscribe(
        {
          next: (res: Employee) => {
            console.log(res);
            employeeForm.reset();
            this.employee.employeeGender = '';
            this.skills= [];
            this.employee.employeeSkills='';
            this.router.navigate(['employee-list']);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          }
        }
      );

    }
    else{   //fpr updating
        this.employeeService.editEmployee(this.employee).subscribe({
          next: (res: Employee)=> {
            this.router.navigate(["/employee-list"]);
          },
          error: (err: HttpErrorResponse)=>{
            console.log(err);
          }
        });
    }

  }

  checkSkills(skill: string) {
    return this.employee.employeeSkills != null && this.employee.employeeSkills.includes(skill);
  }

  checkGender(gender: string) {
    return this.employee.employeeGender != null && this.employee.employeeGender == gender;
  }
}
