import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  user : User;
  error : string;
  constructor(private formBuilder:FormBuilder,private router:Router) {
    this.user = {
      email:'',
      password:'',
      isLoggedIn:false,
    }
   }

  ngOnInit(): void { 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    if(JSON.parse(localStorage.getItem('currentUser')).isLoggedIn){
      this.router.navigate(['dashboard']);
    }
  }
  submit(){
    if(this.loginForm.value.email == JSON.parse(localStorage.getItem('currentUser')).email && this.loginForm.value.password == JSON.parse(localStorage.getItem('currentUser')).password){
      this.user = {
        email: this.loginForm.value.email,
        password : this.loginForm.value.password,
        isLoggedIn : true
      }
      localStorage.setItem('currentUser',JSON.stringify(this.user));
      this.router.navigate(['dashboard']);
    } 
    else{
      this.error = "Username or Password does not match."
    }   
  }
  addUser(){
    this.user.email = 'testuser';
    this.user.password = 'test';
    localStorage.setItem('currentUser',JSON.stringify(this.user));   
  }
}
