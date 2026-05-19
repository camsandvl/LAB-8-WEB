export type Strength =
  | "vacía"
  | "débil"
  | "media"
  | "fuerte con case"
  | "fuerte"
  | "muy fuerte";

/**
 * Calcula la fortaleza de una contraseña según las reglas del ejercicio.
 *
 * Reglas (en orden de prioridad):
 *   - vacía:          longitud === 0
 *   - débil:          longitud < 8
 *   - muy fuerte:     longitud >= 8, tiene número Y símbolo (y opcionalmente case mixto)
 *   - fuerte con case: longitud >= 8, tiene número, tiene case mixto, SIN símbolo
 *   - fuerte:         longitud >= 8, tiene número, SIN símbolo, SIN case mixto
 *   - media:          longitud >= 8, sin número
 *
 * Un símbolo es cualquier caracter que no sea letra ni número.
 */
export function calculateStrength(password: string): Strength {
  if (password.length === 0) return "vacía";
  if (password.length < 8) return "débil";

  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);
  const hasMixedCase = /[a-z]/.test(password) && /[A-Z]/.test(password);

  if (hasNumber && hasSymbol) return "muy fuerte";
  if (hasNumber && hasMixedCase) return "fuerte con case";
  if (hasNumber) return "fuerte";
  return "media";
}
