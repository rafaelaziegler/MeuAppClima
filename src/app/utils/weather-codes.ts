const mapaCondicoes: { [key: number]: string } = {
  0: "Céu limpo",
  1: "Principalmente limpo",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Nevoeiro",
  48: "Nevoeiro com deposição",
  51: "Garoa leve",
  53: "Garoa moderada",
  55: "Garoa intensa",
  56: "Garoa congelante leve",
  57: "Garoa congelante intensa",
  61: "Chuva fraca",
  63: "Chuva moderada",
  65: "Chuva forte",
  66: "Chuva congelante leve",
  67: "Chuva congelante forte",
  71: "Neve fraca",
  73: "Neve moderada",
  75: "Neve forte",
  77: "Grãos de neve",
  80: "Aguaceiros fracos",
  81: "Aguaceiros moderados",
  82: "Aguaceiros fortes",
  85: "Aguaceiros de neve fracos",
  86: "Aguaceiros de neve fortes",
  95: "Trovoadas",
  96: "Trovoadas com granizo leve",
  99: "Trovoadas com granizo forte",
};

export function obterCondicaoClima(codigo: number): string {
  return mapaCondicoes[codigo] || 'Condição desconhecida';
}
