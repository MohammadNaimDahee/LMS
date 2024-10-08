import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { AddCourseComponent } from './components/course/add-course/add-course.component';
import { CoursesComponent } from './components/course/courses/courses.component';
import { EnrolStudentComponent } from './components/course/enrol-student/enrol-student.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddStudentComponent } from './components/student/add-student/add-student.component';
import { EditStudentComponent } from './components/student/edit-student/edit-student.component';
import { StudentsComponent } from './components/student/students/students.component';
import { AddTeacherComponent } from './components/teacher/add-teacher/add-teacher.component';
import { EditTeacherComponent } from './components/teacher/edit-teacher/edit-teacher.component';
import { TeachersComponent } from './components/teacher/teachers/teachers.component';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'add-user',
    component: AddUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'students',
    component: StudentsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-student',
    component: AddStudentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-student/:id',
    component: EditStudentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'teachers',
    component: TeachersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-teacher',
    component: AddTeacherComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-teacher/:id',
    component: EditTeacherComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-course',
    component: AddCourseComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'enrol-student/:id',
    component: EnrolStudentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'analytics',
    component: AnalyticsComponent,
    canActivate: [AuthGuard],
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  exports: [RouterModule],
  providers: [AuthGuard],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
