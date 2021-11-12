import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import PokeTable from "./components/PokeTable";

function App() {
  const [pokemons, setPokemons] = useState([]);

  async function fetchPokemons() {
    let response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=100"
    );
    response = await response.data.results;
    setPokemons(response);
  }

  useEffect(() => {
    fetchPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <h1 style={{ marginTop: "4rem" }}>Pokemon API - Frontend Technologies</h1>
      <h3 style={{fontFamily:"Helvetica", fontStyle:"italic"}}> Alejandro Olmedo && Tirso Cordova</h3>
      <PokeTable rawPokemons={pokemons} />
    </div>
  );
}

export default App;
