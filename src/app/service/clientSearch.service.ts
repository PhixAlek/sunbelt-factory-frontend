import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse  } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Client } from '../model/client.model';


@Injectable({
  providedIn: 'root'
})
export class ClientSearchService {

  private apiUrl = 'http://localhost:8080/api/customers/find';

  constructor(private http: HttpClient) {}

  searchClient(documentType: string, documentNumber: string): Observable<Client | null> {
    const params = new HttpParams()
      .set('documentType', documentType)
      .set('documentNumber', documentNumber);

    return this.http.post<Client>(this.apiUrl, null, { params }).pipe(
      tap((data: Client | null) => {
        console.log('Request parameters:', { documentType, documentNumber });
        console.log('Received response:', data);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('An error occurred:', error.message);
        console.error('Status code:', error.status);
        console.error('Status text:', error.statusText);
        console.error('URL:', error.url);
        return of(null); // Retorna un observable vacío en caso de error
      })
    );
  }
}
