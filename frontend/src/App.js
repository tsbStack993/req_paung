import React, { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const mode = "signup";
  const [msg, setMsg] = useState("");
  // Use absolute-root API path so requests target the same deployment's serverless functions
  const handleSubmit = async () => {
    const endpoint = mode === "login" ? "/login" : "/signup";

    try {
      const res = await fetch("/api" + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        setMsg(`Network error: ${res.status} ${res.statusText} ${text}`);
        return;
      }

      const data = await res.json();
      setMsg(data.message || "");

      if (data.success && mode === "signup") {
        alert("Reset Success!");
      }
    } catch (err) {
      console.error(err);
      setMsg("Request failed: " + (err.message || err));
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
