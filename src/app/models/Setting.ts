import { User } from './User';

export interface Setting {
  isLoggedIn: boolean;
  user?: User;
}
