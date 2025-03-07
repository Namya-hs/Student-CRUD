import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService, Student } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule,RouterModule],
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
  providers: [StudentService]
})
export class StudentDetailsComponent implements OnInit {
  student: Student = {} as Student; // Initialize with an empty object

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.studentService.getStudent(id).subscribe(data => {
        this.student = data;
      });
    }
  }
}