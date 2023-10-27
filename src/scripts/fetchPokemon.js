async function fetchAllPokemon() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10"); 
    const data = await response.json();
    const pokemonArray = data.results;

    const app = document.querySelector(".app");

    pokemonArray.forEach(async (pokemon) => {
      const response = await fetch(pokemon.url);
      const pokemonData = await response.json();

      // Crea una tarjeta para cada Pokémon
      const card = document.createElement("div");
      card.classList.add("card");

      const name = document.createElement("h5");
      name.classList.add("card-title");
      name.textContent = pokemonData.name;

      const image = document.createElement("img");
      image.classList.add("card-img-top");
      image.src = pokemonData.sprites.front_default;

      const button = document.createElement("a");
      button.href = "#";
      button.classList.add("btn-ver", "btn", "btn-outline-primary");
      button.textContent = "Más";

      // Agrega un manejador de eventos para el botón "Más" si es necesario

      card.appendChild(image);
      card.appendChild(name);
      card.appendChild(button);

      app.appendChild(card);
    });
  } catch (error) {
    errorMessage();
  }
}

fetchAllPokemon();

function errorMessage() {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: "Tuvimos un error al cargar el pokemon",
  });
}
