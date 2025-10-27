# MeuClimaApp (Desafio de Estágio)

Este é um aplicativo simples de consulta de clima, feito em Ionic e Angular (standalone components), que permite buscar o clima atual por CEP ou nome de cidade.

## APIs Utilizadas

* **ViaCEP:** Converte CEP em localidade.
    * *Documentação:* `https://viacep.com.br/`
* **Open-Meteo (Geocoding & Forecast):** Converte localidade em coordenadas e obtém o clima.
    * *Documentação:* `https://open-meteo.com/en/docs`

## Como Rodar o Projeto

1.  **Instale as dependências:**
    ```bash
    npm install
    ```

2.  **Execute o projeto (abre em `http://localhost:8101`):**
    ```bash
    ionic serve
    ```

## Suposições Feitas

* [cite_start]As unidades de medida são Celsius (°C) e km/h[cite: 30].
* [cite_start]O fuso horário é detectado automaticamente pela API (`timezone=auto`)[cite: 30].

## O que poderia ser melhorado

* Adicionar testes unitários para os serviços.
* Criar um cache local (`LocalStorage`) para buscas recentes.
* Melhorar a interface com ícones de clima.
