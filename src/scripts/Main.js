
let pokemonCount = 4;
const loadMoreButton = document.getElementById("load-more-button");
loadMoreButton.addEventListener("click", loadPokemon);
const loadingOverlay = document.getElementById("loading-overlay");
const loadingMessage = document.querySelector(".loading-message");


async function loadPokemon() {
  try {
    loadingOverlay.style.display = "block";

    const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${pokemonCount}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    const pokemonArray = data.results;
    const app = document.querySelector(".app");


    for (const pokemon of pokemonArray) {
      try {
        const pokemonResponse = await fetch(pokemon.url);

        if (!pokemonResponse.ok) {
          throw new Error(
            `Error: ${pokemonResponse.status} - ${pokemonResponse.statusText}`
          );
        }

        const pokemonData = await pokemonResponse.json();
        createCard(app, pokemonData);
      } catch (error) {
        console.error("Error al cargar los datos del Pokémon:", error);
      }
    }

    // Incrementar el contador para cargar más Pokémon en la próxima carga
    pokemonCount += 12;

    // Ocultar la capa de superposición y el mensaje de carga
    loadingOverlay.style.display = "none";
  } catch (error) {
    errorMessage();
  }
}



// Evento de carga inicial
window.addEventListener("load", loadPokemon);

function createCard(app, pokemonData) {
  // Crea una tarjeta para el Pokémon
  const card = document.createElement("div");
  card.classList.add("card", "col-12", "col-sm-6", "col-md-4", "col-lg-3"); // Clases de Bootstrap para hacer la tarjeta responsiva

  const name = document.createElement("h5");
  name.classList.add("card-title");
  name.textContent = pokemonData.name;

  const image = document.createElement("img");
  image.classList.add("card-img-top", "img-fluid"); // Clase de Bootstrap para hacer la imagen responsiva
  image.src = pokemonData.sprites.front_default;

  const button = document.createElement("a");
  button.href = "#";
  button.classList.add("btn-ver", "btn", "btn-outline-primary","rounded-pill");
  button.textContent = "Más";

  button.addEventListener("click", () => {
    showPokemonModal(pokemonData);
  });

  card.appendChild(image);
  card.appendChild(name);
  card.appendChild(button);
  app.appendChild(card);
}
