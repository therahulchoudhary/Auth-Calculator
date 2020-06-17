import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../models/user'
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('num1') num1:ElementRef;
  @ViewChild('num2') num2:ElementRef;
  @ViewChild('optype') optype:ElementRef;
  user : User;
  errorMessage : string;
  output : any;
  disableField : boolean;
  constructor(private router:Router,private dataService:DataService) { 
    this.errorMessage = '';
    this.disableField = false;
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if(this.user.isLoggedIn==false){
      this.router.navigate(['']);
    }
    this.dataService.findResult({username:this.user.email,cookie:'dafb7fb38ufbui9wess'},'cookie/set').subscribe(data=>{
            
    })
  }

  logout(){
    this.user.isLoggedIn = false;
    localStorage.setItem('currentUser',JSON.stringify(this.user));
    this.router.navigate(['']);
  }

  calculate(){
    if(this.num1.nativeElement.value==''){
      this.errorMessage = "First Number field is required";
    }   
    else{
      this.errorMessage = '';
      let payload = {num1:parseInt(this.num1.nativeElement.value),num2:parseInt(this.num2.nativeElement.value)};
      this.dataService.findResult(payload,this.optype.nativeElement.value).subscribe(data=>{
        this.output = data.result;
      })
    }
  }

  changeOption(){
    if(this.optype.nativeElement.value == "log" || this.optype.nativeElement.value == "sine" || this.optype.nativeElement.value == "cosine" || this.optype.nativeElement.value == "fact" || this.optype.nativeElement.value == "log10"){
      this.disableField = true;
    }
    else{
      this.disableField = false;
    }
  }
}
