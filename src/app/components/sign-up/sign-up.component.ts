import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  formData: FormData;
  response: any = [];
  submited: boolean = false;

  get validFirstName(){
    return this.form.get('firstName').invalid && this.form.get('firstName').touched;
  }

  get validLastName(){
    return this.form.get('lastName').invalid && this.form.get('lastName').touched;
  }
  
  get validJob(){
    return this.form.get('job').invalid && this.form.get('job').touched;
  }
  
  get validEmail(){
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  get validPass1(){
    return this.form.get('pass1').invalid && this.form.get('pass1').touched;
  }

  get validPass2(){
    return (this.form.get('pass1').value === this.form.get('pass2').value)?false : true;
  }

  constructor(private fb: FormBuilder, private validate: ValidationService, private userService: UsersService) { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(){
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(6)]],
      lastName: ['',[Validators.required,Validators.minLength(3)]],
      job: ['',[Validators.required]],
      email: ['',[Validators.required,this.validate.validEmail]],
      pass1: ['',Validators.required],
      pass2: ['',Validators.required]
    },{
      validators: this.validate.matchPassword('pass1','pass2')
    }
    )
  }

  send(){
    console.log(this.form);
    if(this.form.invalid) {
      return Object.values( this.form.controls ).forEach( control => {
        control.markAsTouched();
        this.submited = false;
      } )
    }else{
      let data = {
        'firstName': this.form.get('firstName').value,
        'lastName': this.form.get('lastName').value,
        'job': this.form.get('job').value,
        'email': this.form.get('email').value,
        'password': this.form.get('pass1').value,
      }

      this.userService.addUser(data).subscribe( (data: any) => {
        this.response = data;
        this.submited = true;
        console.log(this.response);
      } )
    }
  }

  addOther(){
    this.submited = false;
    this.form.reset();
  }
}
