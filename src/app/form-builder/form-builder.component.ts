import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName,FormBuilder, Validators} from '@angular/forms';


interface IFormErrors {
  [key: string]: string ;
}

interface IValidationMessages {
  [key: string]: {[key: string]: string} ;
}


interface IMessages {
  [key: string]: string ;
}
@Component({
  selector: 'app-create-employee',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit{
  employeeForm!: FormGroup;
skillName: any;
formErrors :IFormErrors = {
  'fullName': '',
  'email': '',
  'skillName': '',
  'experienceInYears': '',
  'proficiency': ''
};
validationMessages:IValidationMessages = {
  'fullName': {
    'required': 'Full Name is required.',
    'minlength': 'Full Name must be greater than 2 characters.',
    'maxlength': 'Full Name must be less than 10 characters.'
  },
  'email': {
    'required': 'Email is required.'
  },
  'skillName': {
    'required': 'Skill Name is required.',
  },
  'experienceInYears': {
    'required': 'Experience is required.',
  },
  'proficiency': {
    'required': 'Proficiency is required.',
  },
};


 constructor(private fb: FormBuilder) {}


  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required,
      Validators.minLength(2), Validators.maxLength(10)]],
      email: ['', Validators.required],
      skills: this.fb.group({
        skillName: ['', Validators.required],
        experienceInYears: ['', Validators.required],
        proficiency: ['', Validators.required]
    })
  });

   this.employeeForm.valueChanges.subscribe((data) => {

      this.logValidationErrors(this.employeeForm);

   });
   }

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
         } else {
      
          this.formErrors[key] = '';  
      if (abstractControl && !abstractControl.valid && 
        (abstractControl.touched || abstractControl.dirty)) {
        const messages:IMessages = this.validationMessages[key] as IMessages;
          
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
      }
    }
  });
   }
 

   onLoadDataClick(): void {
    /* this.logValidationErrors(this.employeeForm);
    console.log(this.formErrors); */
     }

onSubmit(): void {
  console.log(this.employeeForm.touched);
  console.log(this.employeeForm.value);

  console.log(this.employeeForm.controls['fullName'].touched);
  console.log(this.employeeForm.controls['fullName'].value);

}

}
