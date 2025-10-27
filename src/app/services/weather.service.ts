import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
// Importa os modelos
import { OpenMeteoResponse, ClimaResultado, GeocodingResult } from '../interfaces/weather.models';
// Importa a função do arquivo que você acabou de corrigir
import { obterCondicaoClima } from '../utils/weather-codes';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.open-meteo.com/v1/forecast';

  /**
   * Este é o outro método que estava faltando
   */
  getClima(coords: GeocodingResult): Observable<ClimaResultado | null> {
    const params = {
      latitude: coords.latitude.toString(),
      longitude: coords.longitude.toString(),
      // Pede as unidades para a API
      current: 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code',
      temperature_unit: 'celsius',
      wind_speed_unit: 'kmh',
      timezone: 'auto',
      forecast_days: '1'
    };

    // 👇 O ERRO DE DIGITAÇÃO ESTAVA AQUI (OpenMEteoResponse) 👇
    return this.http.get<OpenMeteoResponse>(this.apiUrl, { params }).pipe(
      map(response => {
        const current = response.current;
        // Pega as unidades da resposta da API
        const units = response.current_units;

        return {
          cidade: coords.city,
          estado: coords.state,
          temperatura: Math.round(current.temperature_2m), // Arredonda
          condicao: obterCondicaoClima(current.weather_code), // Usa a função
          umidade: current.relative_humidity_2m,
          vento: current.wind_speed_10m,
          atualizacao: new Date(current.time),
          unidades: {
            temperatura: units.temperature_2m, // ex: °C
            vento: units.wind_speed_10m        // ex: km/h
          }
        } as ClimaResultado;
      }),
      catchError(error => {
        console.error('Erro ao buscar dados de clima:', error);
        return of(null);
      })
    );
  }
}
