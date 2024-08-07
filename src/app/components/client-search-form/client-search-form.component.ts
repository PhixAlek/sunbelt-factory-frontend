import { Component } from '@angular/core';
import { catchError } from 'rxjs';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClientSearchService } from '../../service/clientSearch.service';
import { Client } from '../../model/client.model';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-client-search-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './client-search-form.component.html',
  styleUrls: ['./client-search-form.component.css']
})
export default class ClientSearchFormComponent {
  clientSearchForm: FormGroup;
  client: Client | null = null;
  error: string | null = null;
  serverError: boolean = false;
  notFoundError: boolean = false;
  errorCode: number | null = null;

  constructor(private fb: FormBuilder,private router: Router, private clientSearchService: ClientSearchService) {
    this.clientSearchForm = this.fb.group({
      documentType: ['', Validators.required],
      documentNumber: ['', Validators.required]
    });
  }

  searchClient(): void {
    this.error = null;
    this.serverError = false;
    this.notFoundError = false;
    this.errorCode = null;

    if (this.clientSearchForm.invalid) {
      this.clientSearchForm.markAllAsTouched(); // Mark all fields as touched to trigger validation messages
      window.alert('Ambos campos son requeridos.');
      return;
    }

    const { documentType, documentNumber } = this.clientSearchForm.value;

    this.clientSearchService.searchClient(documentType, documentNumber).subscribe(
      (data) => {
        if (data) {
          this.client = data;
          this.error = null;
          sessionStorage.setItem('documentType', documentType);
          sessionStorage.setItem('documentNumber', documentNumber);
          sessionStorage.setItem('clientData', JSON.stringify(data));
          this.router.navigate(['/client-details']);
        } else {
          this.error = 'The client was not found.';
          this.notFoundError = true;
        }
      },
      (error) => {
        if (error.status === 500) {
          this.serverError = true;
          this.errorCode = error.status;
        } else if (error.status === 404) {
          this.notFoundError = true;
        } else {
          this.serverError = true;
          this.error = 'An unexpected error occurred.';
        }
        this.client = null;
        console.error('Error:', error);
      }
    );
  }


  isFieldInvalid(field: string): boolean {
    const control = this.clientSearchForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  closePopup(): void {
    this.serverError = false;
    this.notFoundError = false;
  }
}
