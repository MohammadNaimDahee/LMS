import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Teacher } from 'src/app/models/Teacher';
import { TeacherService } from 'src/app/services/teacher.service';
import { enc } from 'src/app/helpers/enc';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css'],
})
export class AddTeacherComponent implements OnInit {
  password: string = '';
  teacher: Teacher = {
    firstName: '',
    lastName: '',
    photoUrl: '',
    email: '',
    isActive: true,
  };
  loading: boolean = false;
  constructor(
    private teacherService: TeacherService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {}

  onSubmit = (form: NgForm) => {
    if (!form.valid) {
      alert('Pleas fill the form.');
      return;
    }
    // Add new Teacher

    this.teacher.password = enc.encryptData(this.password)!;
    this.teacherService.newTeacher(this.teacher);
    // redirect to teachers page.
    this.router.navigate(['/teachers']);
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
      this.teacher.photoUrl = res;
      this.loading = false;
    });
  };
}
