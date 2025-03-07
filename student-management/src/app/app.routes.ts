import { Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentFormComponent } from './components/student-form/student-form.component';

export const routes: Routes = [
  { path: '', component: StudentListComponent },
  { path: 'students/:id', component: StudentDetailsComponent },
  { path: 'student-form/:id', component: StudentFormComponent },
  { path: 'student-form', component: StudentFormComponent },
];
