import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { TeacherService } from 'src/app/services/teacher.service';
import { Teacher } from 'src/app/models/Teacher';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css'],
})
export class EditTeacherComponent implements OnInit {
  id: string = '';
  teacher: Teacher = {
    firstName: '',
    lastName: '',
    photoUrl: '',
    email: '',
    isActive: false,
  };
  constructor(
    private teacherService: TeacherService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getTeacher();
  }

  getTeacher = () => {
    // get id from url
    this.id = this.route.snapshot.params['id'];
    // get the teacher;
    this.teacherService.getTeacher(this.id || '').subscribe((teacher) => {
      this.teacher = teacher;
      if (this.teacher.email === '') {
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
      this.teacherService.updateTeacher(value);
      this.router.navigate([`/teachers/`]);
    }
  };
}
