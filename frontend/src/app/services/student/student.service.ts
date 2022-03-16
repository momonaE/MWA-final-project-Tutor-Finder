import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  API_URL = 'http://localhost:3000';

  constructor(public http: HttpClient){}

  jwtDataGenerate():any {
    let token: any = localStorage.getItem('token')

    if (token == null) return  true;
    token = token.split(' ')[1];
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    const expirationDate = helper.getTokenExpirationDate(token);
    const isExpired = helper.isTokenExpired(token);
    const data = {isExpired,decodedToken}
    return data;
  }

  getTeachers(input: any): Observable<any> {
    console.log(input)
    return this.http.get(this.API_URL + '/api/teacher/search/' + input.toLowerCase().trim());
  }

  sendEnrollment(studentId:string,userId:string,firstName:string,courseTitle:string): Observable<any> {
  
    return this.http.post(this.API_URL + '/api/student/enroll/', {studentId,userId,firstName,courseTitle})
  }
  
  getEnrollment(userId:any): Observable<any> {
    console.log(this.API_URL + '/api/student/checkenroll')
  
    return this.http.get(this.API_URL + '/api/student/checkenroll/'+userId );

  }

  courseList(): Observable<any> {
    const data = this.jwtDataGenerate();
    const student = data._id;
    return this.http.get(this.API_URL + '/students/' + student);
  }

  removeCourse(courseId: any): Observable<any> {
    const data = this.jwtDataGenerate();
    const student = data._id;
    return this.http.delete(this.API_URL + '/students/' + student + '/' + courseId)
  }

}
