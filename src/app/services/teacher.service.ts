import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Teacher } from '../models/Teacher';
@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  teachersCollection!: AngularFirestoreCollection<Teacher>;
  teacherDoc!: AngularFirestoreDocument<Teacher>;
  teachers!: Observable<Teacher[]>;
  teacher!: Observable<Teacher>;
  constructor(private afs: AngularFirestore) {
    this.teachers = this.getTeachers();
  }

  getTeachers = (): Observable<Teacher[]> => {
    this.teachersCollection = this.afs.collection('teacher', (ref) =>
      ref.orderBy('lastName', 'asc')
    );
    // Get the teachers with the id.
    const teachers = this.teachersCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((action) => {
          const data = action.payload.doc.data() as Teacher;
          const id = action.payload.doc.id;
          data.id = id;
          return data;
        })
      )
    );
    return teachers;
  };

  filterTeachers = (isActive: boolean): Observable<Teacher[]> => {
    // Filter Teachers
    this.teachersCollection = this.afs.collection('teacher', (ref) =>
      ref.where('isActive', '==', isActive)
    );
    const teachers = this.teachersCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((action) => {
          let data = action.payload.doc.data() as Teacher;
          const id = action.payload.doc.id;
          data.id = id;
          return data;
        })
      )
    );
    return teachers;
  };

  newTeacher = (teacher: Teacher) => {
    this.teachersCollection.add(teacher);
  };

  getTeacher = (id: string): Observable<Teacher> => {
    this.teacherDoc = this.afs.doc<Teacher>(`teacher/${id}`);
    this.teacher = this.teacherDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          const emptyTeacher: Teacher = {
            firstName: '',
            lastName: '',
            email: '',
            isActive: true,
            photoUrl: '',
          };
          return emptyTeacher;
        } else {
          const data = action.payload.data() as Teacher;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.teacher;
  };

  updateTeacher = (teacher: Teacher) => {
    this.teacherDoc = this.afs.doc(`teacher/${teacher.id}`);
    this.teacherDoc.update(teacher);
  };

  deleteTeacher = async (id: string) => {
    this.teacherDoc = this.afs.doc(`teacher/${id}`);
    await this.teacherDoc.delete();
  };
}
