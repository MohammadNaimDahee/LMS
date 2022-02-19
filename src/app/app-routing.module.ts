import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { AddCourseComponent } from './components/course/add-course/add-course.component';
import { CoursesComponent } from './components/course/courses/courses.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddStudentComponent } from './components/student/add-student/add-student.component';
import { EditStudentComponent } from './components/student/edit-student/edit-student.component';
import { StudentsComponent } from './components/student/students/students.component';
import { AddTeachersComponent } from './components/teacher/add-teachers/add-teachers.component';
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
    component: AddTeachersComponent,
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
