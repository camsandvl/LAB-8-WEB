import { useState } from "react";
import { calculateStrength, type Strength } from "../utils/calculateStrength";
import styles from "./PasswordStrengthMeter.module.css";

// Mapeo de fortaleza → valor numérico para la barra de progreso (0–100)
const STRENGTH_VALUE: Record<Strength, number> = {
  vacía: 0,
  débil: 20,
  media: 45,
  fuerte: 65,
  "fuerte con case": 80,
  "muy fuerte": 100,
};

// Mapeo de fortaleza → clase CSS para color de la barra
const STRENGTH_CLASS: Record<Strength, string> = {
  vacía: styles.empty,
  débil: styles.weak,
  media: styles.medium,
  fuerte: styles.strong,
  "fuerte con case": styles.strongCase,
  "muy fuerte": styles.veryStrong,
};

export function PasswordStrengthMeter() {
  const [password, setPassword] = useState("");
  const strength = calculateStrength(password);
  const progressValue = STRENGTH_VALUE[strength];

  return (
    <div className={styles.container}>
      <label htmlFor="password-input" className={styles.label}>
        Contraseña
      </label>

      <input
        id="password-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
        placeholder="Escribe tu contraseña…"
        autoComplete="new-password"
      />

      {/* Barra de progreso (punto extra) */}
      <div
        role="progressbar"
        aria-valuenow={progressValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Indicador de fortaleza"
        className={styles.progressBar}
      >
        <div
          className={`${styles.progressFill} ${STRENGTH_CLASS[strength]}`}
          style={{ width: `${progressValue}%` }}
        />
      </div>

      {/* Indicador textual */}
      <p role="status" className={`${styles.strengthText} ${STRENGTH_CLASS[strength]}`}>
        {strength}
      </p>
    </div>
  );
}
