import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CepData } from '../interfaces/weather.models';

@Injectable({ providedIn: 'root' })
export class ViaCepService {
  private readonly api = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  buscarCep(cep: string): Observable<CepData> {
    const num = cep.replace(/\D/g, '');
    return this.http.get<CepData>(`${this.api}/${num}/json/`);
  }
}
