import { Injectable } from '@angular/core';
import { CourseService } from './course.service';
import { StudentService } from './student.service';
import { TeacherService } from './teacher.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    private courseService: CourseService,
    private studentService: StudentService,
    private teacherService: TeacherService
  ) {}

  getCoursesData = () => {
    return new Promise((resolve, reject) => {
      this.courseService.getCourses().subscribe(
        (courses) => resolve(courses),
        (err) => reject(err)
      );
    });
  };

  getStudentsCount = async () => {
    return new Promise((resolve, reject) => {
      this.studentService.getStudents().subscribe(
        (students) => resolve(students),
        (err) => reject(err)
      );
    });
  };

  getTeachers = async () => {
    return new Promise((resolve, reject) => {
      this.teacherService.getTeachers().subscribe(
        (teachers) => resolve(teachers),
        (err) => reject(err)
      );
    });
  };
}
