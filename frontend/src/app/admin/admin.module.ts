import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './dashbord/dashbord.component';
import { HeadComponent } from './layout/head/head.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { AdminHeadComponent } from './layout/admin-head/admin-head.component';
import { CoursComponent } from './cours/cours.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
//import { TabModule } from '@syncfusion/ej2-angular-navigations'
import { AddCourseComponent } from './add-course/add-course.component';
import { DocumentEditorModule } from '@txtextcontrol/tx-ng-document-editor';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ModalSectionComponent } from './modal-section/modal-section.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { ModalLessonComponent } from './modal-lesson/modal-lesson.component';
import { ModalQuizComponent } from './modal-quiz/modal-quiz.component';
import { ModalSectionEditComponent } from './modal-section-edit/modal-section-edit.component';
import { AuthGuard } from '../_helpers/auth.guard';

const adminRoutes: Routes = [
  { path: 'lms-dnt/admin/dashbord', component: DashbordComponent, canActivate:[AuthGuard] },
  { path: 'lms-dnt/admin/courses', component: CoursComponent, canActivate:[AuthGuard]},
  { path: 'lms-dnt/admin/add-course', component: AddCourseComponent, canActivate:[AuthGuard] },
  {path: 'lms-dnt/admin/course-edit/:id', component: AddCourseComponent, canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    DashbordComponent,
    HeadComponent,
    SidebarComponent,
    AdminHeadComponent,
    CoursComponent,
    AddCourseComponent,
    ModalSectionComponent,
    ModalLessonComponent,
    ModalQuizComponent,
    ModalSectionEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    //TabModule,
    HttpClientModule,
    DocumentEditorModule,
    AngularEditorModule,
    MdbModalModule,
    RouterModule.forChild(adminRoutes)
  ]
})
export class AdminModule { }
