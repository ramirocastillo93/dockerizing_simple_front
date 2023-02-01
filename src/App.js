import logo from './logo.svg';
import './App.css';
import useFetch from "react-fetch-hook";
import { useState } from 'react';

function Capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function randomNumberInRange(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  const [num, setNum] = useState(1)

  const { isLoading, data, error } = useFetch(`https://pokeapi.co/api/v2/pokemon/${num}`)

  const handleClick = () => {
    setNum(randomNumberInRange(1,1001))
  }

  if(error){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Error fetching! Please reload.</p>
        </header>
      </div>
    );
  }

  if(!isLoading){
    console.log(data)
  }

  return (
    <div className="App">
      <header className="App-header">
        {isLoading && <img src="https://archives.bulbagarden.net/media/upload/7/79/Dream_Pok%C3%A9_Ball_Sprite.png" alt="pokemon_sprite" className="Pokemon-image"/>}
        {!isLoading && <img src={data.sprites.front_default === null 
          ? data.sprites.other["official-artwork"].front_default
          : data.sprites.front_default} alt="pokemon_sprite" className="Pokemon-image"/>}
        <p><strong>Name</strong> <br/> {!isLoading && Capitalize(data.name)} {isLoading && 'Carganding...'} <br/><br/>
        <strong>Id</strong> <br/> {!isLoading && data.id} {isLoading && 'Loading...'} </p>
      <button onClick={handleClick} className="Pokemon-button">Catch'em  all!</button>
      </header>
    </div>
  );
}

export default App;
