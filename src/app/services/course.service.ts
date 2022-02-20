import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Course } from '../models/Course';
import { EnrolService } from './enrol.service';
import { TeacherService } from './teacher.service';
@Injectable({
  providedIn: 'root',
})
export class CourseService {
  coursesCollection!: AngularFirestoreCollection<Course>;
  courseDoc!: AngularFirestoreDocument<Course>;
  courses!: Observable<Course[]>;
  course!: Observable<Course>;
  constructor(
    private afs: AngularFirestore,
    private teacherService: TeacherService,
    private enrolService: EnrolService
  ) {
    this.coursesCollection = this.afs.collection('course');
    this.courses = this.getCourses();
  }

  getCourses = (): Observable<Course[]> => {
    // Get the courses with the id.
    const courses = this.coursesCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((action) => {
          const data = action.payload.doc.data() as Course;
          const id = action.payload.doc.id;
          data.id = id;
          this.teacherService
            .getTeacher(data.teacherId)
            .subscribe((teacher) => {
              data.teacher = teacher;
            });
          data.enrol = [];
          this.enrolService.filterEnrols(data.id).subscribe((enrols) => {
            data.enrol = enrols;
          });
          return data;
        })
      )
    );
    return courses;
  };

  newCourse = (course: Course) => {
    this.coursesCollection.add(course);
  };

  getCourse = (id: string): Observable<Course> => {
    this.courseDoc = this.afs.doc<Course>(`course/${id}`);
    this.course = this.courseDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          const emptyCourse: Course = {
            title: '',
            description: '',
            teacherId: '',
            cover: '',
            teacher: {
              email: '',
            },
          };
          return emptyCourse;
        } else {
          const data = action.payload.data() as Course;
          data.id = action.payload.id;
          this.teacherService
            .getTeacher(data.teacherId)
            .subscribe((teacher) => {
              data.teacher = teacher;
            });
          this.enrolService.filterEnrols(data.id).subscribe((enrols) => {
            data.enrol = enrols;
          });
          return data;
        }
      })
    );
    return this.course;
  };

  updateCourse = (course: Course) => {
    this.courseDoc = this.afs.doc(`course/${course.id}`);
    this.courseDoc.update(course);
  };

  deleteCourse = async (id: string) => {
    this.courseDoc = this.afs.doc(`course/${id}`);
    await this.courseDoc.delete();
  };
}
