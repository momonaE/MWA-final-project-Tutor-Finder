import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authServices/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navbarCollapsed:boolean=true;
  userRole:string='';
  loggIn:boolean=true;
  constructor(private authService:AuthService,private router:Router) {
    this.isLoggedIn()

   }
ngAfterViewInit(){
  this.isLoggedIn()

}
  ngOnInit(): void {
this.isLoggedIn()
  }
  isUserRole(){
    const user =this.authService.isLoggedIn();
     this. userRole= (user as any).decodedToken.user.role;

    return this.userRole
  }
  isLoggedIn(){
    const data =this.authService.isLoggedIn();

    if(data == true){
      return false;
    }else if(data.isExpired ==false){
       this.loggIn=true;
        return true;
    }else{
         return false;
    }
   }
   logout(){
     if (this.authService.logout()==null){
        this.userRole=''
        this.loggIn=false;

       this.router.navigate(['/signin'])
     }else{
 
     }
   }

toggleNavbarCollapsing() {
  this.navbarCollapsed = !this.navbarCollapsed

   return  this.navbarCollapsed ;
}
togglNavbarCollapsing() {

   return  this.navbarCollapsed ;
}

}
