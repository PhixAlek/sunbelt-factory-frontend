import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Client } from '../model/client.model';


@Injectable({
  providedIn: 'root'
})
export class ClientSearchService {
  private port=8090;

  private apiUrl = `http://localhost:${this.port}/api/customers/find`;

  constructor(private http: HttpClient) {}

  searchClient(documentType: string, documentNumber: string): Observable<Client | null> {
    const params = new HttpParams()
      .set('documentType', documentType)
      .set('documentNumber', documentNumber);

    return this.http.post<Client>(this.apiUrl, null, { params }).pipe(
      tap((data: Client | null) => {
      }),
      catchError((error: HttpErrorResponse) => {
          console.error('An error occurred:', error.message);
          return throwError(() => error); // Returns an empty observable in case of error
      })
    );
  }
}
