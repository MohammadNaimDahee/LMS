import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/Student';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
})
export class EditStudentComponent implements OnInit {
  student: Student = {
    firstName: '',
    lastName: '',
    photoUrl: '',
    email: '',
    isActive: false,
  };
  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent = () => {
    // get id from url
    const id = this.route.snapshot.params['id'];
    console.log(id);
    // get the student;
    this.studentService.getStudent(id || '').subscribe((student) => {
      this.student = student;
      if (this.student.email === '') {
        this.router.navigate(['/404']);
      }
    });
  };
}
