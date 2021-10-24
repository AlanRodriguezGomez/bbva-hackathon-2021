import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//const API_URL = 'http://localhost:8588/api/test/';
const API_URL = 'http://3.94.90.58:8588/users/';
//const AUTH_API = 'http://localhost:8588/users/';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private http: HttpClient) { }

  upload(username: string,titulo: string, descripcion: string, files: Array<any>): Observable<any> {

    const formData = new FormData();
    formData.append('user', username);
    formData.append('title', titulo);
    formData.append('description', descripcion);
    console.log('files',files);
    for (var i = 0; i < files.length; i++) { 
      formData.append("file", files[i]);
    }

    return this.http.post(
      API_URL + 'todo',
      formData
    );
  }

  uploadGo(email: string,files: Array<any>) : Observable<any> {
    
    const formData = new FormData();

    formData.append("email", email);
    console.log('files',files);

    for (var i = 0; i < files.length; i++) { 
      formData.append("file", files[i]);
    }

    return this.http.post(
      API_URL + 'upload',
      formData
    );
  }

  fetchImages(username: string) {
    return this.http.get(API_URL + 'getImagesByUser/'+username);
  }

}
