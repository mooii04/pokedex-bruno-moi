$(document).ready(function() {
  $('#btn-get-data').click(function() {
      fetchPokemonData();
  });

  function fetchPokemonData() {
      $.ajax({
          url: 'https://pokeapi.co/api/v2/pokemon?limit=151', // Puedes cambiar el límite según tus necesidades
          method: 'GET',
          success: function(response) {
              console.log('Fetched Pokémon list:', response.results); // Log para depurar
              displayPokemon(response.results);
          },
          error: function(error) {
              console.error('Error fetching data:', error);
          }
      });
  }

  function displayPokemon(pokemonList) {
      const dataContent = $('#data-content');
      dataContent.empty(); // Limpiar el contenido anterior

      pokemonList.forEach(pokemon => {
          $.ajax({
              url: pokemon.url,
              method: 'GET',
              success: function(pokemonData) {
                  console.log('Fetched Pokémon data:', pokemonData); // Log para depurar
                    const pokemonCard = `
                      <div class="pokemon-row">
                        <a href="detail.html?id=${pokemonData.id}" class="pokemon-card">
                          <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                          <div class="pokemon-info">
                            <div class="pokemon-name">${capitalizeFirstLetter(pokemonData.name)}</div>
                            <div class="pokemon-number">#${pokemonData.id.toString().padStart(3, '0')}</div>
                          </div>
                          <div class="pokemon-types">
                            ${pokemonData.types.map(typeInfo => `<span class="type-badge ${typeInfo.type.name}">${capitalizeFirstLetter(typeInfo.type.name)}</span>`).join('')}
                          </div>
                        </a>
                      </div>
                    `;
                  dataContent.append(pokemonCard);
              },
              error: function(error) {
                  console.error('Error fetching Pokémon data:', error);
              }
          });
      });
  }

  function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
});