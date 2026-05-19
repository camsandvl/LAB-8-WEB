import { PasswordStrengthMeter } from "./components/PasswordStrengthMeter";
import "./App.css";

function App() {
  return (
    <main className="app">
      <div className="card">
        <h1 className="title">Password Strength Meter</h1>
        <p className="subtitle">Escribe una contraseña para ver su fortaleza en tiempo real.</p>
        <PasswordStrengthMeter />
      </div>
    </main>
  );
}

export default App;
