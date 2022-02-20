import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private afStorage: AngularFireStorage) {}

  uploadProfilePhoto = async (file: any, filePath: string) => {
    await this.afStorage.upload(filePath, file);
  };

  getProfileUrl = (path: string) => {
    const ref = this.afStorage.ref(path);
    return ref.getDownloadURL();
  };

  deleteFile = async (filePath: string) => {
    try {
      await this.afStorage.storage.refFromURL(filePath).delete();
      return true;
    } catch (error) {
      return false;
    }
  };
}
