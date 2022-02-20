import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Enrol } from '../models/Enrol';
import { StudentService } from './student.service';
@Injectable({
  providedIn: 'root',
})
export class EnrolService {
  enrolsCollection!: AngularFirestoreCollection<Enrol>;
  enrolDoc!: AngularFirestoreDocument<Enrol>;
  enrols!: Observable<Enrol[]>;
  enrol!: Observable<Enrol>;
  constructor(
    private afs: AngularFirestore,
    private studentService: StudentService
  ) {
    this.enrols = this.getEnrols();
  }

  getEnrols = (): Observable<Enrol[]> => {
    this.enrolsCollection = this.afs.collection('enrol', (ref) =>
      ref.orderBy('lastName', 'asc')
    );
    // Get the enrols with the id.
    const enrols = this.enrolsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((action) => {
          const data = action.payload.doc.data() as Enrol;
          const id = action.payload.doc.id;
          data.id = id;
          this.studentService
            .getStudent(data.studentId!)
            .subscribe((student) => {
              if (student != null || student !== undefined) {
                data.student = student;
              }
            });
          return data;
        })
      )
    );
    return enrols;
  };

  filterEnrols = (courseId: string): Observable<Enrol[]> => {
    // Filter Teachers
    this.enrolsCollection = this.afs.collection('enrol', (ref) =>
      ref.where('courseId', '==', courseId)
    );
    const enrols = this.enrolsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((action) => {
          let data = action.payload.doc.data() as Enrol;
          const id = action.payload.doc.id;
          data.id = id;
          this.studentService
            .getStudent(data.studentId!)
            .subscribe((student) => {
              if (student != null || student !== undefined) {
                data.student = student;
              }
            });
          return data;
        })
      )
    );
    return enrols;
  };

  newEnrol = (enrol: Enrol) => {
    this.enrolsCollection.add(enrol);
  };

  getEnrol = (id: string): Observable<Enrol> => {
    this.enrolDoc = this.afs.doc<Enrol>(`enrol/${id}`);
    this.enrol = this.enrolDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          const emptyEnrol: Enrol = {};
          return emptyEnrol;
        } else {
          const data = action.payload.data() as Enrol;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.enrol;
  };

  deleteEnrol = async (id: string) => {
    this.enrolDoc = this.afs.doc(`enrol/${id}`);
    await this.enrolDoc.delete();
  };
}
