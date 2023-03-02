import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpApiService {
  constructor(private http: HttpClient) {}

  get<T>(apiUrl: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(apiUrl, { params });
  }
}
