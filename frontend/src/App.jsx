import { useState } from "react";

function App() {
  const [result, setResult] = useState(null);

  async function simulate() {
    const response = await fetch("http://localhost:3000/api/simulate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        keySize: 128,
        guessesPerSecond: 1000000000000,
        cores: 8,
        attackType: "classical"
      })
    });

    const data = await response.json();
    setResult(data);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Cryptography Simulator</h1>

      <button onClick={simulate}>
        Run Simulation
      </button>

      {result && (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}

export default App;