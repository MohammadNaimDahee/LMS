import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Student } from '../models/Student';
@Injectable({
  providedIn: 'root',
})
export class StudentService {
  studentsCollection!: AngularFirestoreCollection<Student>;
  studentDoc!: AngularFirestoreDocument<Student>;
  students!: Observable<Student[]>;
  student!: Observable<Student>;
  constructor(private afs: AngularFirestore) {
    this.students = this.getStudents();
  }

  getStudents = (): Observable<Student[]> => {
    this.studentsCollection = this.afs.collection('student', (ref) =>
      ref.orderBy('lastName', 'asc')
    );
    // Get the students with the id.
    const students = this.studentsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((action) => {
          const data = action.payload.doc.data() as Student;
          const id = action.payload.doc.id;
          data.id = id;
          return data;
        })
      )
    );
    return students;
  };

  filterStudents = (isActive: boolean): Observable<Student[]> => {
    // Filter Students
    this.studentsCollection = this.afs.collection('student', (ref) =>
      ref.where('isActive', '==', isActive)
    );
    const students = this.studentsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((action) => {
          let data = action.payload.doc.data() as Student;
          const id = action.payload.doc.id;
          data.id = id;
          return data;
        })
      )
    );
    return students;
  };

  newStudent = (student: Student) => {
    this.studentsCollection.add(student);
  };

  getStudent = (id: string): Observable<Student> => {
    this.studentDoc = this.afs.doc<Student>(`student/${id}`);
    this.student = this.studentDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          const emptyStudent: Student = {
            firstName: '',
            lastName: '',
            email: '',
            isActive: true,
            photoUrl: '',
          };
          return emptyStudent;
        } else {
          const data = action.payload.data() as Student;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.student;
  };

  updateStudent = (student: Student) => {
    this.studentDoc = this.afs.doc(`student/${student.id}`);
    this.studentDoc.update(student);
  };

  deleteStudent = (id: string) => {
    this.studentDoc = this.afs.doc(`student/${id}`);
    this.studentDoc.delete();
  };
}
