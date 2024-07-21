import { Component } from '@angular/core';
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

  constructor(private fb: FormBuilder,private router: Router, private clientSearchService: ClientSearchService) {
    this.clientSearchForm = this.fb.group({
      documentType: ['', Validators.required],
      documentNumber: ['', Validators.required]
    });
  }

  searchClient(): void {
    this.error = null; // Reset error message

    if (this.clientSearchForm.invalid) {
      this.clientSearchForm.markAllAsTouched(); // Mark all fields as touched to trigger validation messages
      window.alert('Ambos campos son requeridos.');
      return;
    }

    const { documentType, documentNumber } = this.clientSearchForm.value;

    this.clientSearchService.searchClient(documentType, documentNumber).subscribe(
      (data) => {
        this.client = data;
        this.error = null;
        sessionStorage.setItem('documentType', documentType);
        sessionStorage.setItem('documentNumber', documentNumber);
        sessionStorage.setItem('clientData', JSON.stringify(data));
        this.router.navigate(['/client-details']);
        console.log('Client found:', data);
      },
      (error) => {
        this.error = 'Cliente no encontrado o ha ocurrido un error.';
        this.client = null;
        console.error('Error:', error);
      }
    );
  }

  isFieldInvalid(field: string): boolean {
    const control = this.clientSearchForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
}
