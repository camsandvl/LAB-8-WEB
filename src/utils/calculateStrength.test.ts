import { describe, it, expect } from "vitest";
import { calculateStrength } from "../utils/calculateStrength";

describe("calculateStrength", () => {
  // ── Estado vacío ──────────────────────────────────────────────
  it('retorna "vacía" cuando la contraseña es una cadena vacía', () => {
    expect(calculateStrength("")).toBe("vacía");
  });

  // ── Débil ─────────────────────────────────────────────────────
  it('retorna "débil" cuando la contraseña tiene menos de 8 caracteres', () => {
    expect(calculateStrength("abc")).toBe("débil");
  });

  it('retorna "débil" para una contraseña de exactamente 7 caracteres', () => {
    expect(calculateStrength("abcdefg")).toBe("débil");
  });

  it('retorna "débil" con solo símbolos y menos de 8 caracteres', () => {
    expect(calculateStrength("!@#$%^&")).toBe("débil");
  });

  // ── Media ─────────────────────────────────────────────────────
  it('retorna "media" para una contraseña de exactamente 8 caracteres sin números ni símbolos', () => {
    expect(calculateStrength("abcdefgh")).toBe("media");
  });

  it('retorna "media" para una contraseña larga sin números ni símbolos', () => {
    expect(calculateStrength("abcdefghij")).toBe("media");
  });

  it('una contraseña de 8 caracteres sin números NO debe ser "débil"', () => {
    expect(calculateStrength("abcdefgh")).not.toBe("débil");
  });

  it('una contraseña de 7 caracteres NO debe ser "media"', () => {
    expect(calculateStrength("abcdefg")).not.toBe("media");
  });

  // ── Fuerte ────────────────────────────────────────────────────
  it('retorna "fuerte" para contraseña de 8+ caracteres con al menos un número', () => {
    expect(calculateStrength("abcdefg1")).toBe("fuerte");
  });

  it('retorna "fuerte" con múltiples números pero sin símbolos', () => {
    expect(calculateStrength("abcde123")).toBe("fuerte");
  });

  // ── Muy fuerte ────────────────────────────────────────────────
  it('retorna "muy fuerte" para contraseña de 8+ caracteres con número y símbolo', () => {
    expect(calculateStrength("abcdefg1!")).toBe("muy fuerte");
  });

  it('retorna "muy fuerte" cuando el símbolo es un espacio', () => {
    expect(calculateStrength("abcde1 g")).toBe("muy fuerte");
  });

  it('retorna "muy fuerte" con variedad de símbolos', () => {
    expect(calculateStrength("Passw0rd@")).toBe("muy fuerte");
  });

  // ── Punto extra: mayúsculas y minúsculas mezcladas ────────────
  it('retorna "muy fuerte" con 8+ chars, número, símbolo y mayúsculas mezcladas', () => {
    expect(calculateStrength("Abc1!xyz")).toBe("muy fuerte");
  });

  it('retorna "fuerte con case" cuando tiene 8+ chars, número y mayúsculas pero sin símbolo', () => {
    expect(calculateStrength("AbcDefg1")).toBe("fuerte con case");
  });
});
