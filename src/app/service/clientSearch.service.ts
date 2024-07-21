import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Client } from '../model/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientSearchService {
  private apiUrl = 'http://localhost:8090/api/customers/find';

  constructor(private http: HttpClient) { }

  SerachClient(documentType: string, documentNumber: string): Observable<Client | null> {
    const params = new HttpParams()
      .set('documentType', documentType)
      .set('documentNumber', documentNumber);

    return this.http.post<Client>(this.apiUrl, null, { params });
  }
}
