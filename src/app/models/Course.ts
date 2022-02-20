import { Enrol } from './Enrol';
import { Teacher } from './Teacher';

export interface Course {
  id?: string;
  title: string;
  description: string;
  cover: string;
  teacherId: string;
  teacher?: Teacher;
  enrol?: Enrol[];
}
