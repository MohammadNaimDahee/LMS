import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/Student';
import { StorageService } from 'src/app/services/storage.service';
import { StudentService } from 'src/app/services/student.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  dummyPhotoUrl: string = environment.appEnvs.dummyPhotoUrl;

  constructor(
    private studentService: StudentService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents = () => {
    this.studentService.getStudents().subscribe((students) => {
      this.students = students;
    });
  };

  filter = (isActive: boolean) => {
    this.studentService.filterStudents(isActive).subscribe((students) => {
      this.students = students;
    });
  };

  deleteStudent = async (student: Student) => {
    if (student.id !== '' && student.id !== undefined) {
      if (confirm('Are you sure?')) {
        if (student.photoUrl !== '' && student.photoUrl !== undefined) {
          await this.storageService.deleteFile(student.photoUrl);
        }
        await this.studentService.deleteStudent(student.id);
      }
    }
  };
}
