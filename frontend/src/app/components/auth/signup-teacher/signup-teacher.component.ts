import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import {AuthService} from '../../../services/authServices/auth.service';
import  {store} from '../../../reducers/store';
import { authActions } from 'src/app/actions/authAction';
@Component({
  selector: 'app-signup-teacher',
  templateUrl: './signup-teacher.component.html',
  styleUrls: ['./signup-teacher.component.css']
})
export class SignupTeacherComponent implements OnInit {

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

      // 'email': ['', Validators.compose([Validators.required, Validators.email,this.emailValidater.bind(this)])],
      'passWord': ['', Validators.required],
      'phoneNumber': ['', Validators.required],
 
    });
    this.subscription = this.registerForm?.statusChanges.subscribe((d:any)=>
{   
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
      role:"TEACHER"
    }).subscribe((data)=>{

      if( (data as any)[0] ){
        this.msg=(data as any)[0].msg
        this.load=false;

        return

      }
     if((data as any).success){
      store.dispatch(this.authActions.loadedUsers((data as any ).data))
      this.load=false;
     
           this.router.navigate(['tutor'])

    }else{
      this.load=false;

      this.router.navigate(['/'])
    }    
     });
  }
  emailValidater(control:FormControl):Promise<any>|Observable<any>{
    return new Promise((resolve)=>{
      setTimeout(() => {
        this.authService.verifyEmail(control.value).subscribe((data)=>{
         console.log((data as any).data.exists);
          if((data as any).data.exists == true)
          {             resolve(null)

          }
          else{
            resolve({exists:true})

          }
          
   })
      },5000)
        
    })
   }
   
}

