import { Component, OnInit,  } from '@angular/core';
import { Client } from '../../model/client.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.css'
})
export default class ClientDetailsComponent implements OnInit {
  client: Client | null = null;
  fullName!: string | null;
  documentType: string | null = null;
  documentNumber: string | null = null;
  error: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.documentType = sessionStorage.getItem('documentType');
    this.documentNumber = sessionStorage.getItem('documentNumber');
    const clientData = sessionStorage.getItem('clientData');
    if (clientData) {
      this.client = JSON.parse(clientData);
      this.fullName = `${this.client?.firstName} ${this.client?.middleName} ${this.client?.lastName} ${this.client?.secondLastName}`
    } else {
      this.error = 'No se han proporcionado los parámetros necesarios.';
    }
  }

  getDocumentTypeText(documentType: string | null): string {
    switch (documentType) {
      case 'C':
        return 'Cédula de Ciudadanía';
      case 'P':
        return 'Pasaporte';
      default:
        return 'Tipo de Documemento';
    }
  }

  goBackAndClearStorage(): void {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
