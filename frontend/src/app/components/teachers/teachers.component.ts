import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student/student.service';
import { AuthService } from 'src/app/services/authServices/auth.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']

})
export class TeachersComponent  {

lists: any ;
k:Object[]=[]

  constructor(private studentService: StudentService ,private  authService:AuthService, private router: Router) { }

  ngOnChanges(changes: SimpleChanges) {
   
    
    }

    ngOnInit(): void {
      const data =this.authService.isLoggedIn();
      const userId= (data as any).decodedToken.user._id;
      console.log(userId)
           this.studentService.getEnrollment(userId).subscribe((data)=>{
             console.log(data as any);
             const d= (data as any).data[0].enrolled
             for(let i:number =0;i<d.length;i++){
               console.log(               Object.values(d[i])
               )

              this.k.push(d[i])

             }
             this.lists=this.k
           })
    }
  


}
