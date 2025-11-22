import React, { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const mode = "signup";
  const [msg, setMsg] = useState("");
  const BASE_URL = "https://req-paung.vercel.app/";

  const handleSubmit = async () => {
    const endpoint = mode === "login" ? "/login" : "/signup";

    const res = await fetch(BASE_URL + "/api" + endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    setMsg(data.message);

    if (data.success && mode === "signup") {
      alert("Reset Success!");
    }
  };

  return (
    <div style={{ width: "300px", margin: "80px auto", textAlign: "center" }}>
      <h2>{mode === "login" ? "Login" : "Reset"}</h2>

      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <button
        onClick={handleSubmit}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      >
        {mode === "login" ? "Login" : "Reset"}
      </button>

      

      <p style={{ marginTop: "10px", color: "blue" }}>{msg}</p>
    </div>
  );
}

export default App;
