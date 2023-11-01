function showPokemonModal(pokemonData) {
  // Crear un modal usando Bootstrap Modal

  const modal = document.createElement("div");
  modal.classList.add("modal", "fade");
  modal.id = "pokemonModal";
  modal.tabIndex = -1;
  modal.setAttribute("aria-labelledby", "exampleModalLabel");
  modal.setAttribute("aria-hidden", "true");

  //Obtengo el segun el tipo de pokemon
  const typeColorMap = {
    fire: "#F08030",
    water: "#6890F0",
    grass: "#78C850",
    electric: "#F8D030",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dark: "#705848",
    dragon: "#7038F8",
    steel: "#B8B8D0",
    fairy: "#F0B6BC",
  };

  const typeColor = typeColorMap[pokemonData.types[0].type.name] || "black";

  createModal(pokemonData, typeColor, modal);
}

function createModal(pokemonData, typeColor, modal) {
  modal.innerHTML = `
  <div class="modal-dialog modal-dialog-centered modal-lg ">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${pokemonData.name}</h5>
        <button type="button" class="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
     <div class="modal-body">
<div class="row">
  <div class="col-md-6">
    <div class="pokemon-img">
      <img id="modal-img" src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}" ">
    </div>
  </div>
  <div class="col-md-6">
    <div class="stats">
      <p class="tipo" style="background-color: ${typeColor};"> ${pokemonData.types[0].type.name}</p>





      <!-------- Estadísticas del Pokémon ------------>
      <div class="table-responsive  ">
      <table class="table table-striped table-hover table-bordered caption-top">
      <caption>Estadísticas</caption>
        <thead>
          <tr>
            <th>HP</th>
            <th>Ataque</th>
            <th>Defensa</th>
            <th>Velocidad</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${pokemonData.stats[0].base_stat}</td>
            <td>${pokemonData.stats[1].base_stat}</td>
            <td>${pokemonData.stats[2].base_stat}</td>
            <td>${pokemonData.stats[5].base_stat}</td>
            <!-- Agrega más valores de estadísticas aquí si es necesario -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</div>
</div>

`;

  document.body.appendChild(modal);
  const modalInstance = new bootstrap.Modal(modal);
  modalInstance.show();
}
