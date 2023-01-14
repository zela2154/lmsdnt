import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
   userSubMenuActive: boolean
   submenuActive1: boolean
   submenuActive2: boolean
   submenuActive3: boolean
   submenuActive4: boolean
  constructor( private router: Router) { 
    this.submenuActive1 = false
    this.submenuActive2 = false
    this.submenuActive3 = false
    this.submenuActive4 = false
    this.userSubMenuActive = false
  }

  ngOnInit(): void {
  }

  gotoDashbord(){
    this.router.navigate(['lms-dnt/admin/dashbord'])
  }
  gotoCourses(){
    this.router.navigate(['lms-dnt/admin/courses'])
  }
  gotoAddCourse(){
    this.router.navigate(['lms-dnt/admin/add-course'])
  }
  gotoCategories(){
    this.router.navigate(['lms-dnt/admin/categories'])
  }
  gotoAddCategory(){
    this.router.navigate(['lms-dnt/admin/add-category'])
  }
  gotoStudents(){
    this.router.navigate(['lms-dnt/admin/students'])
  }
  gotoHistory(){
    this.router.navigate(['lms-dnt/admin/history'])
  }
  gotoStudentEnrole(){
    this.router.navigate(['lms-dnt/admin/student-enrole'])
  }
  gotoAdminReport(){
    this.router.navigate(['lms-dnt/admin/admin-report'])
  }
  gotoInstructorReport(){
    this.router.navigate(['lms-dnt/admin/instructor-report'])
  }
  gotoMessages(){
    this.router.navigate(['lms-dnt/admin/messages'])
  }
  gotoSystemParameter(){
    this.router.navigate(['lms-dnt/admin/system-parameter'])
  }
  gotoWebParameter(){
    this.router.navigate(['lms-dnt/admin/web-parameter'])
  }
  gotoPayementParameter(){
    this.router.navigate(['lms-dnt/admin/payement-parameter'])
  }
  gotoInstructorParameter(){
    this.router.navigate(['lms-dnt/admin/instructor-parameter'])
  }
  gotoLanguageParameter(){
    this.router.navigate(['lms-dnt/admin/language-parameter'])
  }
  gotoAboutUsParameter(){
    this.router.navigate(['lms-dnt/admin/about-us-parameter'])
  }
}
