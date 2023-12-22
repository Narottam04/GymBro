import { useState } from "react";
// import { Client } from 'appwrite';
import "./App.css";
import Login from "./pages/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Login />
    </>
  );
}

export default App;
