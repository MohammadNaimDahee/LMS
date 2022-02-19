export interface User {
  uid: string;
  displayName?: string;
  email: string;
  emailVerified: boolean;
  phoneNumber?: string;
  photoUrl?: string;
  refreshToken: string;
}
