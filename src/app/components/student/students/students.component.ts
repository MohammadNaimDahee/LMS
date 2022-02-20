import { Component, OnInit, Input } from '@angular/core';
import { Enrol } from 'src/app/models/Enrol';
import { Student } from 'src/app/models/Student';
import { EnrolService } from 'src/app/services/enrol.service';
import { StorageService } from 'src/app/services/storage.service';
import { StudentService } from 'src/app/services/student.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  @Input() page = '';
  @Input() courseId?: string;
  students: Student[] = [];
  dummyPhotoUrl: string = environment.appEnvs.dummyPhotoUrl;

  constructor(
    private studentService: StudentService,
    private storageService: StorageService,
    private enrolService: EnrolService
  ) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents = () => {
    this.studentService.getStudents().subscribe((students) => {
      this.students = students;
    });
  };

  filter = (isActive: boolean) => {
    this.studentService.filterStudents(isActive).subscribe((students) => {
      this.students = students;
    });
  };

  deleteStudent = async (student: Student) => {
    if (student.id !== '' && student.id !== undefined) {
      if (confirm('Are you sure?')) {
        if (student.photoUrl !== '' && student.photoUrl !== undefined) {
          await this.storageService.deleteFile(student.photoUrl);
        }
        await this.studentService.deleteStudent(student.id);
      }
    }
  };

  enrolStudent = (id: string) => {
    if (
      id !== '' &&
      id !== undefined &&
      this.courseId !== '' &&
      this.courseId !== undefined
    ) {
      let enrolButton = <HTMLButtonElement>(
        document.getElementById(`student_${id}`)
      );

      const enrol: Enrol = {
        studentId: id,
        courseId: this.courseId,
      };
      this.enrolService.newEnrol(enrol);
      enrolButton.innerHTML = 'Enroled';
      enrolButton.disabled = true;
      enrolButton.classList.remove('bg-green-500');
      enrolButton.classList.remove('hover:bg-green-700');
      enrolButton.classList.add('bg-gray-500');
      enrolButton.classList.add('hover:bg-gray-700');
    }
  };
}
