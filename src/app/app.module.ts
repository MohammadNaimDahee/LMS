import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import {
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/compat/storage';

import { StudentsComponent } from './components/student/students/students.component';
import { AddStudentComponent } from './components/student/add-student/add-student.component';
import { TeachersComponent } from './components/teacher/teachers/teachers.component';
import { CoursesComponent } from './components/course/courses/courses.component';
import { AddCourseComponent } from './components/course/add-course/add-course.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { EditStudentComponent } from './components/student/edit-student/edit-student.component';
import { environment } from '../environments/environment';
import { EditTeacherComponent } from './components/teacher/edit-teacher/edit-teacher.component';
import { AddTeacherComponent } from './components/teacher/add-teacher/add-teacher.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    AddUserComponent,
    NotFoundComponent,
    StudentsComponent,
    AddStudentComponent,
    TeachersComponent,
    CoursesComponent,
    AddCourseComponent,
    AnalyticsComponent,
    EditStudentComponent,
    EditTeacherComponent,
    AddTeacherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideAuth(() => getAuth()),
    AngularFireStorageModule,
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService,
    {
      provide: BUCKET,
      useValue: 'gs://learning-management-syst-ba7a6.appspot.com',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
