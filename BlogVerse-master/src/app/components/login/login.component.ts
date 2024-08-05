import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { confirmPasswordValidation } from '../../middleware/validators/confirmPassword.validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private readonly loginService: LoginService){}

  loginForm:FormGroup;
  registerForm:FormGroup;
  hasAccount: boolean = true;
  // username = new FormControl('');
  // password = new FormControl('');
  // confirmPassword = new FormControl();
  // email = new FormControl('');
  // phoneNumber = new FormControl('');

  ngOnInit(): void {
      this.registerForm = new FormGroup({
        username: new FormControl(
          '',
          [
            Validators.required,
            Validators.minLength(3), 
            Validators.maxLength(20), 
            Validators.pattern('^[a-zA-Z0-9_]+$')
          ]
        ),
        password: new FormControl(
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_]).{8,}$')
          ]
        ),
        confirmPassword: new FormControl(
          '',
          [
            Validators.required
          ]
        ),
        email: new FormControl(
          '',
          [
            Validators.required,
            Validators.email
          ]
        ),
        phoneNumber: new FormControl(
          '',
          [
            Validators.required
          ]
        ),
      },
      {validators: [confirmPasswordValidation]}
      );

      this.loginForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
      })
  }

  toggleHasAccount(){
    this.hasAccount = !this.hasAccount;    
  }

  login(){
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
        (res) => {
          localStorage.setItem("user", res);
          console.log(res);
          
        },
        (err) => {
          console.error(err);          
        }
      )
      
    }
  }

  register(){
    if (this.registerForm.valid) {
      this.loginService.register({
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        email: this.registerForm.value.email,
        phoneNumber: this.registerForm.value.phoneNumber
      }).subscribe(
        (res) => {
          console.log("user registered successfully!!!");          
          console.log(res);          
        },
        (err) => {
          console.error(err);          
        }
      )
    }   
  }
  

  onSubmit():any{
    console.log("LoggedIn");    
  }

}
