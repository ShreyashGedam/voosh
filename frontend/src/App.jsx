import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { useState } from "react";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div style={{ textAlign: "center", marginTop: "5vh" }}>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} user={user} />} />
        <Route path="/home" element={<Home setUser={setUser} user={user} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
      </Routes>
    </div>
  );
}

export default App;
