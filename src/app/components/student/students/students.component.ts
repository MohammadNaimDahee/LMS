import { Component, OnInit } from '@angular/core';
import { enc } from 'src/app/helpers/enc';
import { Student } from 'src/app/models/Student';
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

  constructor(private studentService: StudentService) {}

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

  deleteStudent = (id: string) => {
    if (confirm('Are you sure?')) {
      this.studentService.deleteStudent(id);
      alert('Student Deleted');
    }
  };
}
