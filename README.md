# Password Strength Meter

Componente React que evalúa la fortaleza de una contraseña en tiempo real, construido con Vite + TypeScript + Vitest + React Testing Library siguiendo el flujo de **Test Driven Development (TDD)**.

---

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd password-strength-meter

# Instalar dependencias (con Bun)
bun install
```

---

## Scripts disponibles

| Comando              | Descripción                                      |
|----------------------|--------------------------------------------------|
| `bun run dev`        | Inicia el servidor de desarrollo (Vite)          |
| `bun run test:run`   | Corre los tests una sola vez                     |
| `bun run test`       | Corre los tests en modo watch                    |
| `bun run coverage`   | Genera reporte de cobertura en `/coverage`       |
| `bun run lint`       | Analiza el código con ESLint                     |
| `bun run build`      | Compila el proyecto para producción              |

---

## Cómo correr los tests

```bash
bun run test:run
```

Para modo watch mientras desarrollas:

```bash
bun run test
```

Para reporte de cobertura:

```bash
bun run coverage
```

El reporte HTML se genera en `coverage/index.html`.

---

## Cómo correr en modo desarrollo

```bash
bun run dev
```

Abre [http://localhost:5173](http://localhost:5173) en el navegador.

---

## Flujo TDD seguido

El proyecto sigue estrictamente el ciclo **Red → Green → Refactor**:

### 1. 🔴 Red — Tests escritos antes que la implementación

Se escribieron **todos los tests** antes de crear cualquier archivo de implementación:

- `src/utils/calculateStrength.test.ts` — tests unitarios de la función pura
- `src/components/PasswordStrengthMeter.test.tsx` — tests de integración del componente

En este punto, correr `bun run test:run` producía fallos porque los módulos testeados no existían. **Este estado fue commiteado** (`test: write failing tests - TDD red phase`).

### 2. 🟢 Green — Implementación mínima para pasar los tests

Se implementaron los archivos en este orden:

1. `src/utils/calculateStrength.ts` — lógica pura de cálculo de fortaleza.
2. `src/components/PasswordStrengthMeter.tsx` — componente React que consume la función.

La meta era únicamente pasar todos los tests, sin sobre-diseñar.

### 3. 🔵 Refactor — Mejora del código sin romper tests

Con los tests en verde se refactorizó:

- Se extrajo el mapeo `STRENGTH_VALUE` y `STRENGTH_CLASS` a constantes fuera del componente.
- Se refinaron los estilos CSS y la estructura del componente.
- Los tests continuaron pasando durante todo el proceso.

---

## Arquitectura

```
src/
├── components/
│   ├── PasswordStrengthMeter.tsx        # Componente React
│   ├── PasswordStrengthMeter.module.css # Estilos del componente
│   └── PasswordStrengthMeter.test.tsx   # Tests del componente (RTL)
├── utils/
│   ├── calculateStrength.ts             # Lógica pura (sin React)
│   └── calculateStrength.test.ts        # Tests unitarios de la función
├── test/
│   └── setup.ts                         # Configuración global de tests
├── App.tsx
├── App.css
└── main.tsx
```

La lógica de cálculo está **completamente separada** del componente: `calculateStrength` es una función pura que recibe un `string` y retorna un tipo `Strength`. Esto permite testearla de forma independiente y reutilizarla en cualquier contexto.

---

## Reglas de fortaleza

| Condición                                                        | Fortaleza         |
|------------------------------------------------------------------|-------------------|
| Contraseña vacía                                                 | `vacía`           |
| Longitud < 8 caracteres                                          | `débil`           |
| Longitud ≥ 8, sin números                                        | `media`           |
| Longitud ≥ 8, con número, sin símbolo, sin case mixto            | `fuerte`          |
| Longitud ≥ 8, con número, mayúsculas y minúsculas, sin símbolo   | `fuerte con case` |
| Longitud ≥ 8, con número y símbolo                               | `muy fuerte`      |

> Un **símbolo** es cualquier carácter que no sea letra ni número (incluyendo espacios).  
> El conteo de caracteres **incluye espacios**.

---

## Puntos extra implementados

- ✅ **Accesibilidad**: el input es accesible vía `getByLabelText` (label + id).
- ✅ **Barra de progreso**: visual con `role="progressbar"` y `aria-valuenow`.
- ✅ **Case mixto**: regla adicional `"fuerte con case"` para contraseñas con mayúsculas y minúsculas mezcladas.
- ✅ **Coverage**: script `bun run coverage` genera reporte HTML en `/coverage`.
- ✅ **TypeScript**: todo el proyecto tipado estáticamente.
- ✅ **ESLint**: configurado con `bun run lint`.
- ✅ **GitHub Actions CI**: corre los tests en cada push.
