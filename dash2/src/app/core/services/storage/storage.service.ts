import { Injectable } from '@angular/core';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  uploadPercent?: Observable<number>;
  public url: any;
  constructor(private storage: Storage) {}

  async upload(
    folder: string,
    name: string,
    file: File | null
  ): Promise<string> {
    const path = `${folder}/${name}`;
    {
      if (file) {
        try {
          const storageRef = ref(this.storage, path);
          const task = uploadBytesResumable(storageRef, file);

          await task;
          this.url = await getDownloadURL(storageRef);
          console.log(this.url);
          console.log(task);
        } catch (e: any) {
          console.error(e);
        }
      } else {
        // handle invalid file
      }
      return this.url;
    }
  }
}
