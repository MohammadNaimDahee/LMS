import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Course } from 'src/app/models/Course';
import { CourseRep } from 'src/app/models/CourseRep';
import { Student } from 'src/app/models/Student';
import { Teacher } from 'src/app/models/Teacher';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  courses: Course[] = [];
  coursesRepData: CourseRep[] = [];
  toatlStudents: number = 0;
  totalTeachers: number = 0;
  totalCourses: number = 0;

  dims = { height: 600, width: 600, radius: 300 };
  cent = { x: this.dims.width / 2 + 5, y: this.dims.height / 2 + 5 };

  graph = {
    data: [
      {
        x: this.coursesRepData.map((coures) => coures.course),
        y: this.coursesRepData.map((coures) => coures.enrolled),
        type: 'scatter',
        mode: 'lines+points',
        marker: { color: 'green' },
      },
      {
        x: this.coursesRepData.map((coures) => coures.course),
        y: this.coursesRepData.map((coures) => coures.enrolled),
        type: 'bar',
      },
    ],
    layout: { width: 320, height: 240, title: 'A Fancy Plot' },
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.getCoursesRep();
    this.getTotalStudents();
    this.getTotalTeachers();
  }

  getCoursesRep = async () => {
    await this.dashboardService.getCoursesData().then((courses) => {
      const cous = courses as Course[];
      this.totalCourses = cous.length;
      this.courses = cous;
      this.populateCoursesChartData();
    });
  };

  getTotalStudents = async () => {
    await this.dashboardService.getStudentsCount().then((students) => {
      const stus = students as Array<Student[]>;
      this.toatlStudents = stus.length;
    });
  };

  getTotalTeachers = async () => {
    await this.dashboardService.getTeachers().then((teachers) => {
      const teachs = teachers as Array<Teacher[]>;
      this.totalTeachers = teachs.length;
    });
  };

  populateCoursesChartData = () => {
    setTimeout(() => {
      this.courses.forEach((course) => {
        const courseRep: CourseRep = {
          courseId: course.id!,
          course: course.title,
          enrolled: course.enrol?.length!,
        };
        this.coursesRepData.push(courseRep);
      });
      const device: string = this.getDevice();
      switch (device) {
        case 'mobile':
          this.dims = { height: 400, width: 400, radius: 160 };
          break;
        default:
          break;
      }

      // Plotly Graph
      this.graph = {
        data: [
          {
            x: this.coursesRepData.map((coures) => coures.course),
            y: this.coursesRepData.map((coures) => coures.enrolled),
            type: 'scatter',
            mode: 'lines+points',
            marker: { color: 'red' },
          },
          {
            x: this.coursesRepData.map((coures) => coures.course),
            y: this.coursesRepData.map((coures) => coures.enrolled),
            type: 'bar',
          },
        ],
        layout: {
          width: this.dims.width - 70,
          height: this.dims.height,
          title: 'Enrolled Students per course',
        },
      };

      this.createSvg();
      this.createColors();
      this.drawChart(this.coursesRepData);
    }, 1000);
  };

  private svg!: any;
  // The radius of the pie chart is half the smallest side
  private colors!: any;

  private createSvg(): void {
    this.svg = d3
      .select('figure.figure1')
      .append('svg')
      .attr('width', this.dims.width)
      .attr('height', this.dims.height)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.dims.width / 2 + ',' + this.dims.height / 2 + ')'
      );
  }
  private createColors(): void {
    this.colors = d3
      .scaleOrdinal()
      .domain(this.coursesRepData.map((d) => d.course.toString()))
      .range(d3['schemeSet3']);
  }

  private drawChart(data: any): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.enrolled));

    // Build the pie chart
    this.svg
      .selectAll('pieces')
      .data(pie(data))
      .enter()
      .append('path')
      .attr(
        'd',
        d3
          .arc()
          .innerRadius(this.dims.radius / 3)
          .outerRadius(this.dims.radius)
      )
      .attr('fill', (d: any, i: any) => this.colors(i))
      .attr('stroke', '#121926')
      .style('stroke-width', '1px');

    // Add labels
    const labelLocation = d3
      .arc()
      .innerRadius(100)
      .outerRadius(this.dims.radius);

    this.svg
      .selectAll('pieces')
      .data(pie(data))
      .enter()
      .append('text')
      .text((d: any) => d.data.course)
      .attr(
        'transform',
        (d: any) => 'translate(' + labelLocation.centroid(d) + ')'
      )
      .style('text-anchor', 'middle')
      .style('font-size', 15);
  }

  getDevice = (): string => {
    var ua = navigator.userAgent;

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
        ua
      )
    )
      return 'mobile';
    else if (/Chrome/i.test(ua)) return 'chrome';
    else return 'desktop';
  };
}
