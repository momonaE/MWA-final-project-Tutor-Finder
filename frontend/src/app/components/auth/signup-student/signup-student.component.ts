import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {AuthService} from '../../../services/authServices/auth.service';
import  {store} from '../../../reducers/store';
import { authActions } from 'src/app/actions/authAction';
@Component({
  selector: 'app-signup-student',
  templateUrl: './signup-student.component.html',
  styleUrls: ['./signup-student.component.css']
})
export class SignupStudentComponent implements OnInit {
  registerForm:FormGroup;
  load:boolean=false;
  msg:string=''
  private subscription: Subscription | undefined;
  constructor(private formBuilder:FormBuilder,private router:Router,private authService:AuthService,
    private authActions:authActions) { 
    this.registerForm = formBuilder.group({
      'firstName': ['', Validators.compose([Validators.required])],
      'lastName': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'passWord': ['', Validators.required],
      'phoneNumber': ['', Validators.required],
 
    });
    this.subscription = this.registerForm?.statusChanges.subscribe((d:any)=>
{   
   console.log("============== "+ this.registerForm.get('email')?.valid)
   this.registerForm.get('email')?.valid
}    
    )
  }

  ngOnInit(): void {
  }
  onSubmit(){
    const { email, firstName,lastName,passWord,phoneNumber} = this.registerForm.value;
    console.log(this.registerForm.value);
    this.load=true;
    this.authService.registerUser({
      email:email,
      firstName:firstName,
      lastName:lastName,
      passWord:passWord,
      phoneNumber:phoneNumber,
      role:"STUDENT"
    }).subscribe((data)=>{
      if( (data as any)[0] ){
        this.msg=(data as any)[0].msg
        this.load=false;

        return

      }
   
     if((data as any).success){
      this.authService.storeInSession((data as any).token, (data as any).data);
      store.dispatch(this.authActions.loadedUsers((data as any ).data))
      console.log(store.getState());
      this.load=false;


           this.router.navigate(['search'])

    }else{
         this.router.navigate(['/signupStudent'])

    }    
     });
  }
   
}
