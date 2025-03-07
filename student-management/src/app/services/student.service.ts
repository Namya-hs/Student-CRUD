import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student {
  studentID?: number;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'https://localhost:7038/api/Student';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  updateStudent(id: number, student: Student): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, student);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
