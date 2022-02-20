import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/models/Teacher';
import { StorageService } from 'src/app/services/storage.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
})
export class TeachersComponent implements OnInit {
  teachers: Teacher[] = [];
  dummyPhotoUrl: string = environment.appEnvs.dummyPhotoUrl;

  constructor(
    private teacherService: TeacherService,
    private storageService: StorageService
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

  filter = (isActive: boolean) => {
    this.teacherService.filterTeachers(isActive).subscribe((teachers) => {
      this.teachers = teachers;
    });
  };

  deleteTeacher = async (teacher: Teacher) => {
    if (teacher.id !== '' && teacher.id !== undefined) {
      if (confirm('Are you sure?')) {
        if (teacher.photoUrl !== '' && teacher.photoUrl !== undefined) {
          await this.storageService.deleteFile(teacher.photoUrl);
        }
        await this.teacherService.deleteTeacher(teacher.id);
      }
    }
  };
}
