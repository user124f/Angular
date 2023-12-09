import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName} from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit{
  employeeForm!: FormGroup;
formBuilder: any;
  
    constructor(private http: HttpClient) {}

  ngOnInit() {
    this.employeeForm = new FormGroup({
      fullName: new FormControl(),
      email: new FormControl(),
      skills: new FormGroup({
        skillName: new FormControl(),
        experienceInYears: new FormControl(),
        proficiency: new FormControl()
      })
    });
  }

  onLoadDataClick(): void {
    this.employeeForm.setValue({
     fullName: 'Rudraksh',
     email: 'rudraksh0322@gmail.com',
     skills: {
      skillName: 'Angular',
      experienceInYears: '1',
      proficiency: 'beginner'
     }

    })

  }

onSubmit(): void {
  console.log(this.employeeForm.touched);
  console.log(this.employeeForm.value);

  console.log(this.employeeForm.controls['fullName'].touched);
  console.log(this.employeeForm.controls['fullName'].value);

}

}
