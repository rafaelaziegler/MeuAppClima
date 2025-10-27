// 1. Resposta da API ViaCEP
export interface CepData {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string; // Cidade
  uf: string;         // Estado (ex: SP, GO)
  ibge: string;
  erro?: boolean;
}

// 2. Resposta da API Open-Meteo Geocoding
export interface GeocodingLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1: string; // Estado
}
export interface OpenMeteoGeocodingResponse {
  results?: GeocodingLocation[];
}

// 3. Resposta da API Open-Meteo Forecast
export interface CurrentWeather {
  time: string; // ISO 8601
  temperature_2m: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  weather_code: number;
}
export interface OpenMeteoResponse {
  current: CurrentWeather;
  current_units: {
    temperature_2m: string;
    wind_speed_10m: string;
  }
}

// --- Modelos Internos do App (UI) ---
export interface GeocodingResult {
  latitude: number;
  longitude: number;
  city?: string;
  state?: string;
}

export interface ClimaResultado {
  cidade?: string;
  estado?: string;
  temperatura: number;
  condicao: string;
  umidade: number;
  vento: number;
  atualizacao: Date;
  unidades: {
    temperatura: string;
    vento: string;
  }
}
