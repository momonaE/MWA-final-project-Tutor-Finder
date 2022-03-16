import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authServices/auth.service';
import { CourseService } from 'src/app/services/courseService/course.service';
import  {store} from '../../../reducers/store';
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  num:number[]=[1,2,3,4];
  courses:any;
  show:boolean=false;
  searchText:any;
  fname:string='';
  lname:string='';
  email:string=''
  flag:boolean=false


   

  constructor(private CourseService:CourseService,private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
    console.log("here"+this.courses)

    const data =this.authService.isLoggedIn();
    const userId= (data as any).decodedToken.user._id;
    this. fname= (data as any).decodedToken.user.firstName;
    this. lname= (data as any).decodedToken.user.lastName;

    this. email= (data as any).decodedToken.user.email;

    this.CourseService.getSelectedCourse(userId).subscribe((data)=>{
      if((data as any)==null){
        this.courses=null
        return;
      }
      console.log((data as any))
      this.courses=(data as any).data.courses
    });
  }
  

  showdesc(){
    this.show=!this.show
  }
  setSearch(name:String){
    this.searchText=name
  };
  deleteCourse(course:any){
    console.log(course);
    console.log(store.getState());
    const data =this.authService.isLoggedIn();
    const courseId=course._id;
    const userId= (data as any).decodedToken.user._id;
    const courseTitle=course.courseTitle
    console.log(courseId,courseTitle,userId);;
    this.CourseService.deleteCourse(userId,courseId).subscribe((data)=>{
      console.log((data as any))
      // this.courses=(data as any).data.courses
      this.CourseService.getSelectedCourse(userId).subscribe((data)=>{
        console.log((data as any))
        this.courses=(data as any).data.courses
      });   
    
    });


  }

}
