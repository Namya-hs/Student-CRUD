import { Component, OnInit } from '@angular/core';
import { StudentService, Student } from '../../services/student.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  providers: [StudentService],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('0.5s ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
    });
  }

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.loadStudents(); // Refresh the student list after deletion
    });
  }
}