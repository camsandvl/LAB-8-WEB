import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PasswordStrengthMeter } from "../components/PasswordStrengthMeter";

describe("PasswordStrengthMeter", () => {
  // ── Tests de renderizado ──────────────────────────────────────
  it("renderiza un input de tipo password", () => {
    render(<PasswordStrengthMeter />);
    // Punto extra: accesible por rol + label
    const input = screen.getByLabelText(/contraseña/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "password");
  });

  it('muestra el indicador de fortaleza con el estado inicial "vacía"', () => {
    render(<PasswordStrengthMeter />);
    expect(screen.getByRole("status")).toHaveTextContent("vacía");
  });

  // ── Tests de comportamiento ───────────────────────────────────
  it('muestra "débil" al escribir una contraseña corta', async () => {
    const user = userEvent.setup();
    render(<PasswordStrengthMeter />);
    await user.type(screen.getByLabelText(/contraseña/i), "abc");
    expect(screen.getByRole("status")).toHaveTextContent("débil");
  });

  it('muestra "media" al escribir 8+ caracteres sin números ni símbolos', async () => {
    const user = userEvent.setup();
    render(<PasswordStrengthMeter />);
    await user.type(screen.getByLabelText(/contraseña/i), "abcdefgh");
    expect(screen.getByRole("status")).toHaveTextContent("media");
  });

  it('muestra "fuerte" al escribir 8+ caracteres con al menos un número', async () => {
    const user = userEvent.setup();
    render(<PasswordStrengthMeter />);
    await user.type(screen.getByLabelText(/contraseña/i), "abcdefg1");
    expect(screen.getByRole("status")).toHaveTextContent("fuerte");
  });

  it('muestra "muy fuerte" al escribir 8+ caracteres con número y símbolo', async () => {
    const user = userEvent.setup();
    render(<PasswordStrengthMeter />);
    await user.type(screen.getByLabelText(/contraseña/i), "abcdefg1!");
    expect(screen.getByRole("status")).toHaveTextContent("muy fuerte");
  });

  it('vuelve a "vacía" al borrar completamente la contraseña', async () => {
    const user = userEvent.setup();
    render(<PasswordStrengthMeter />);
    const input = screen.getByLabelText(/contraseña/i);
    await user.type(input, "abc");
    await user.clear(input);
    expect(screen.getByRole("status")).toHaveTextContent("vacía");
  });

  // ── Tests de edge cases ───────────────────────────────────────
  it("una contraseña de exactamente 8 caracteres sin números no debe ser débil", async () => {
    const user = userEvent.setup();
    render(<PasswordStrengthMeter />);
    await user.type(screen.getByLabelText(/contraseña/i), "abcdefgh");
    expect(screen.getByRole("status")).not.toHaveTextContent("débil");
  });

  it("una contraseña de exactamente 7 caracteres no debe ser media", async () => {
    const user = userEvent.setup();
    render(<PasswordStrengthMeter />);
    await user.type(screen.getByLabelText(/contraseña/i), "abcdefg");
    expect(screen.getByRole("status")).not.toHaveTextContent("media");
  });

  it("una contraseña con solo símbolos y menos de 8 caracteres sigue siendo débil", async () => {
    const user = userEvent.setup();
    render(<PasswordStrengthMeter />);
    await user.type(screen.getByLabelText(/contraseña/i), "!@#$%^&");
    expect(screen.getByRole("status")).toHaveTextContent("débil");
  });

  // ── Punto extra: barra de progreso ────────────────────────────
  it("renderiza una barra de progreso", () => {
    render(<PasswordStrengthMeter />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("la barra de progreso tiene valor 0 al inicio", () => {
    render(<PasswordStrengthMeter />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "0");
  });

  it("la barra de progreso aumenta al aumentar la fortaleza", async () => {
    const user = userEvent.setup();
    render(<PasswordStrengthMeter />);
    await user.type(screen.getByLabelText(/contraseña/i), "abcdefg1!");
    const bar = screen.getByRole("progressbar");
    expect(Number(bar.getAttribute("aria-valuenow"))).toBeGreaterThan(0);
  });

  // ── Punto extra: mayúsculas y minúsculas mezcladas ────────────
  it('muestra "fuerte con case" con 8+ chars, número, mayúsculas y minúsculas pero sin símbolo', async () => {
    const user = userEvent.setup();
    render(<PasswordStrengthMeter />);
    await user.type(screen.getByLabelText(/contraseña/i), "AbcDefg1");
    expect(screen.getByRole("status")).toHaveTextContent("fuerte con case");
  });
});
