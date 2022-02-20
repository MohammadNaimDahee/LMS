import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/Course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-enrol-student',
  templateUrl: './enrol-student.component.html',
  styleUrls: ['./enrol-student.component.css'],
})
export class EnrolStudentComponent implements OnInit {
  id: string = '';
  course: Course = {
    title: '',
    description: '',
    cover: '',
    teacherId: '',
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.getCourse();
  }

  getCourse = () => {
    // get id from url
    this.id = this.route.snapshot.params['id'];
    // get the course;
    this.courseService.getCourse(this.id || '').subscribe((course) => {
      this.course = course;
      if (this.course.id === '' || this.course.id === undefined) {
        this.router.navigate(['/404']);
      }
    });
  };
}
