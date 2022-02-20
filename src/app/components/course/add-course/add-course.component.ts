import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/Course';
import { Teacher } from 'src/app/models/Teacher';
import { CourseService } from 'src/app/services/course.service';
import { StorageService } from 'src/app/services/storage.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnInit {
  teachers: Teacher[] = [];
  course: Course = {
    title: '',
    description: '',
    cover: '',
    teacherId: '',
  };
  loading: boolean = false;
  constructor(
    private teacherService: TeacherService,
    private storageService: StorageService,
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTeachers();
  }

  getTeachers = () => {
    this.teacherService.getTeachers().subscribe((teachers) => {
      this.teachers = teachers;
      console.log(this.teachers);
    });
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
      this.course.cover = res;
      this.loading = false;
    });
  };

  onSubmit = (form: NgForm) => {
    const { valid } = form;
    if (!valid) {
      alert('Please fill the form');
      return;
    }

    if (this.course.cover === '' || this.course.cover === undefined) {
      alert('please select a cover photo');
      return;
    }

    // Add new Course
    this.courseService.newCourse(this.course);
    // redirect to students page.
    this.router.navigate(['/courses']);
  };
}
