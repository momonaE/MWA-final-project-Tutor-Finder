import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//modules
import {Routes, RouterModule} from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


///components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { CoursesComponent } from './components/courses/courses.component';

import { CourseComponent } from './components/courses/course/course.component';
import { CourseListComponent } from './components/courses/course-list/course-list.component';
import { CourseAddComponent } from './components/courses/course-add/course-add.component';
import { CourseEditComponent } from './components/courses/course-edit/course-edit.component';

import { SignupStudentComponent } from './components/auth/signup-student/signup-student.component';
import { SignupTeacherComponent } from './components/auth/signup-teacher/signup-teacher.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import  {AuthGuard} from './services/authServices/auth.guard'
import {RoleTeacherGuard} from './services/authServices/roleTeacher.guard'
import {RoleStudentGuard} from './services/authServices/roleStudent.guard'
import { AuthInterceptor } from './services/authServices/AuthInterceptor';
import { CourseListsComponent } from './components/dashboard/course-lists/course-lists.component';
import { FooterComponent } from './components/footer/footer.component';
import { TeacherComponent } from './components/dashboard/teacher/teacher.component';
import { EnrolledStudentsComponent } from './components/dashboard/enrolled-students/enrolled-students.component';
//  paths
const MyRoutes:Routes =[
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component: HomeComponent},
  {path: 'search', component: SearchComponent},
  {path:'teacher',component:CourseComponent},
  {path:'signupStudent',component:SignupStudentComponent},
  {path:'SignupTeacher',component:SignupTeacherComponent},
  // {path:'SignupTeacher',component:SignupTeacherComponent,canActivate:[AuthGuard]},
  {path:'signin',component:SigninComponent},
  {path:'courselists',component:CourseListsComponent},
  {path:'tutor',component:TeacherComponent},
  {path:"enrolledStudents",component:EnrolledStudentsComponent},
  {path:'**',component:HomeComponent}
 


]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SearchComponent,
    TeachersComponent,
    CoursesComponent,
    CourseComponent,
    CourseListComponent,
    CourseAddComponent,
    CourseEditComponent,
    SignupStudentComponent,
    SignupTeacherComponent,
    SigninComponent,
    CourseListsComponent,
    FooterComponent,
    TeacherComponent,
    EnrolledStudentsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(MyRoutes),
    HttpClientModule,
    ReactiveFormsModule    
  ],
   providers: [  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }  ],
    
  bootstrap: [AppComponent]
})
export class AppModule {
  

 }
