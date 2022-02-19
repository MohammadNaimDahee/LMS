import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Student } from 'src/app/models/Student';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {
  student: Student = {
    firstName: '',
    lastName: '',
    photoUrl: '',
    email: '',
    isActive: true,
  };
  constructor() {}

  ngOnInit(): void {}

  onSubmit = (form: NgForm) => {};
}
