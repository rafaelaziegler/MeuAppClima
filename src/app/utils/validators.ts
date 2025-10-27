// src/app/utils/validators.ts

/**
 * Verifica se o termo de busca é um CEP, uma cidade ou um CEP inválido.
 * @param termo A string para validar.
 * @returns 'cep', 'cidade', ou 'cep_invalido'
 */
export function validarEntrada(termo: string): 'cep' | 'cidade' | 'cep_invalido' {
  // 1. Verifica se contém alguma letra
  const contemLetras = /[a-zA-Z]/.test(termo);
  if (contemLetras) {
    // Se tem letras, é definitivamente uma cidade
    return 'cidade';
  }

  // 2. Se não contém letras, é uma tentativa de CEP. Vamos limpar.
  const apenasNumeros = termo.replace(/\D/g, '');

  // 3. Verifica se o comprimento é 8
  if (apenasNumeros.length === 8) {
    // Ex: "74000-000" ou "74000000"
    return 'cep';
  }

  // 4. Se não contém letras e o comprimento não é 8, é um CEP inválido.
  // (Ex: "1234567" ou "123456789")
  return 'cep_invalido';
}
