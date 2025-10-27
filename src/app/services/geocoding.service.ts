import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, catchError } from 'rxjs';
// Importa os modelos
import { GeocodingResult, OpenMeteoGeocodingResponse } from '../interfaces/weather.models';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private http = inject(HttpClient);
  private apiUrl = 'https://geocoding-api.open-meteo.com/v1/search';

  /**
   * Este é o método que estava faltando
   */
  getCoordinates(locationName: string): Observable<GeocodingResult | null> {
    const params = {
      name: locationName,
      count: '1',
      language: 'pt',
      format: 'json'
    };

    return this.http.get<OpenMeteoGeocodingResponse>(this.apiUrl, { params }).pipe(
      map(response => {
        if (response.results && response.results.length > 0) {
          const mainResult = response.results[0];

          return {
            latitude: mainResult.latitude,
            longitude: mainResult.longitude,
            city: mainResult.name,
            state: mainResult.admin1
          } as GeocodingResult;
        } else {
          return null;
        }
      }),
      catchError(error => {
        console.error('Erro ao buscar coordenadas (Geocoding):', error);
        return of(null);
      })
    );
  }
}
