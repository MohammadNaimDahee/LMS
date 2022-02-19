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
  id: string = '';
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
    this.id = this.route.snapshot.params['id'];
    // get the student;
    this.studentService.getStudent(this.id || '').subscribe((student) => {
      this.student = student;
      if (this.student.email === '') {
        this.router.navigate(['/404']);
      }
    });
  };

  onSubmit = (form: NgForm) => {
    const { value, valid } = form;
    if (!valid) {
      alert('Please fill the form properly');
    } else {
      // Add id to client;
      value.id = this.id;
      // update the client
      this.studentService.updateStudent(value);
      this.router.navigate([`/students/`]);
    }
  };
}
