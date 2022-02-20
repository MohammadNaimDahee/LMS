import { Course } from './Course';
export interface Teacher {
  id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  isActive?: boolean;
  photoUrl?: string;
  courses?: Course[];
}
