import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName,FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit{
  employeeForm!: FormGroup;
skillName: any;

 constructor(private fb: FormBuilder) {}


  ngOnInit() {
    this.employeeForm = this.fb.group({
     fullName:['',[Validators.required,Validators.minLength(2),Validators.maxLength(10)]],
     email:['',[Validators.required,Validators.email]],
    skills: this.fb.group({
      skillName:['',Validators.required,Validators.minLength(1)],
      experienceInYears:['',Validators.required],
      proficiency:['']
     
    }) 

    })
  } 

  onLoadDataClick(): void {
    this.employeeForm.setValue({
     fullName: 'Atharav',
     email: 'aatharv123@gmail.com',
     skills: {
      skillName: 'Dance',
      experienceInYears: '2',
      proficiency: 'intermidiate'
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
