import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private afStorage: AngularFireStorage) {}

  uploadProfilePhoto = async (file: any, filePath: string) => {
    await this.afStorage.upload(filePath, file);
  };

  getProfileUrl = (path: string) => {
    const ref = this.afStorage.ref(path);
    return ref.getDownloadURL();
  };
}
