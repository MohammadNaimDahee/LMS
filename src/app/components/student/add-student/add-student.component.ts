import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Student } from 'src/app/models/Student';
import { StudentService } from 'src/app/services/student.service';
import { enc } from 'src/app/helpers/enc';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {
  password: string = '';
  student: Student = {
    firstName: '',
    lastName: '',
    photoUrl: '',
    email: '',
    isActive: true,
  };
  loading: boolean = false;
  constructor(
    private studentService: StudentService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {}

  onSubmit = (form: NgForm) => {
    if (!form.valid) {
      alert('Pleas fill the form.');
      return;
    }
    // Add new Student

    this.student.password = enc.encryptData(this.password)!;
    this.studentService.newStudent(this.student);
    // redirect to students page.
    this.router.navigate(['/students']);
  };

  uploadPhoto = async (event: any) => {
    this.loading = true;
    const file = event.target.files[0];
    const filePath = '/' + Math.floor(Math.random() * 1000000) + file.name;
    await this.storageService.uploadProfilePhoto(file, filePath);
    this.getUploadUrl(filePath);
  };

  getUploadUrl = async (filePath: string) => {
    this.storageService.getProfileUrl(filePath).subscribe((res) => {
      this.student.photoUrl = res;
      this.loading = false;
    });
  };
}
