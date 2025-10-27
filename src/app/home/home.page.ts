import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { ClimaResultado, GeocodingResult, CepData } from '../interfaces/weather.models';
import { ViaCepService } from '../services/via-cep.service';
import { GeocodingService } from '../services/geocoding.service';
import { WeatherService } from '../services/weather.service';

import { validarEntrada } from '../utils/validators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage {

  private viaCepService = inject(ViaCepService);
  private geocodingService = inject(GeocodingService);
  private weatherService = inject(WeatherService);

  termoBusca: string = '';
  carregando: boolean = false;
  mensagemErro: string | null = null;
  resultadoClima: ClimaResultado | null = null;

  constructor() {}

  /**
   * Método principal acionado pelo botão 'Buscar'.
   */
  async buscarClima() {
    this.carregando = true;
    this.mensagemErro = null;
    this.resultadoClima = null;

    const termo = this.termoBusca.trim();

    if (!termo) {
      this.mensagemErro = 'Por favor, digite um CEP ou uma cidade.';
      this.carregando = false;
      return;
    }

    // Valida se a entrada é um CEP ou uma cidade
    const tipoEntrada = validarEntrada(termo);

    try {
      let coords: GeocodingResult | null = null;

      if (tipoEntrada === 'cep') {
        // Fluxo de busca por CEP (8 dígitos)
        const dadosCep: CepData = await firstValueFrom(this.viaCepService.buscarCep(termo));

        if (dadosCep.erro) {
          throw new Error('CEP inválido ou não encontrado.');
        }

        const localidade = `${dadosCep.localidade}, ${dadosCep.uf}`;
        coords = await firstValueFrom(this.geocodingService.getCoordinates(localidade));

      } else if (tipoEntrada === 'cidade') {
        // Fluxo de busca por Cidade (contém letras)
        coords = await firstValueFrom(this.geocodingService.getCoordinates(termo));

      } else if (tipoEntrada === 'cep_invalido') {
        // Trata CEPs com mais ou menos de 8 dígitos
        throw new Error('CEP inválido. Um CEP deve conter 8 números.');
      }

      // Buscar o clima com as coordenadas
      if (!coords) {
        throw new Error('Cidade não encontrada.');
      }

      const clima: ClimaResultado | null = await firstValueFrom(this.weatherService.getClima(coords));

      if (!clima) {
        throw new Error('Não foi possível obter os dados do clima para esta região.');
      }

      this.resultadoClima = clima;

    } catch (error: any) {
      console.error('Erro na busca:', error);
      this.mensagemErro = error.message;
    } finally {
      this.carregando = false;
    }
  }
}
