import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService, Student } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, RouterModule], // Import necessary modules
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
  providers: [StudentService]
})
export class StudentFormComponent implements OnInit {
  studentForm!: FormGroup;
  studentID: number | null = null; // Define studentID

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      address: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    });

    // Get student ID from the route
    this.studentID = Number(this.route.snapshot.paramMap.get('id'));
    if (this.studentID) {
      this.studentService.getStudent(this.studentID).subscribe(student => {
        this.studentForm.patchValue(student);
      });
    }
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const studentData: Student = {
        ...this.studentForm.value,
        studentID: this.studentID // Include studentID in the form data
      };

      if (this.studentID) {
        // Update student
        this.studentService.updateStudent(this.studentID, studentData).subscribe(() => {
          this.router.navigate(['/']);
        });
      } else {
        // Create new student
        this.studentService.createStudent(studentData).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }
}