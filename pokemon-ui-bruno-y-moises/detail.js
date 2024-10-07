  $(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var pokemonId = urlParams.get("id");

    if (pokemonId == null) {
      alert("No se ha recibido el ID de pokemon");
      return;
    }

    // Fetch Pokémon details from the API
    $.ajax({
      url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
      method: 'GET',
      success: function (data) {
        // Fetch species details for additional information
        $.ajax({
          url: data.species.url,
          method: 'GET',
          success: function (speciesData) {
            // Fetch evolution chain
            $.ajax({
              url: speciesData.evolution_chain.url,
              method: 'GET',
              success: function (evolutionData) {
                var evolutions = [];
                var evoChain = evolutionData.chain;

                do {
                  var evoDetails = evoChain['evolves_to'];
                  evolutions.push({
                    "species_name": evoChain.species.name,
                    "url": evoChain.species.url
                  });

                  evoChain = evoDetails[0];
                } while (!!evoChain && evoChain.hasOwnProperty('evolves_to'));

                // Create a template for Pokémon details
                var types = data.types.map(typeInfo => `<span class="${typeInfo.type.name}">${typeInfo.type.name.toUpperCase()}</span>`).join(' ');
                var abilities = data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');

                var template = `
                  <section class="pokemon-info container">
                    <img src="${data.sprites.front_default}" alt="${data.name}">
                    <div class="pokemon-details">
                      <h2>${data.name}</h2>
                      <div class="types">
                        ${types}
                      </div>
                      <ul class="list-unstyled">
                        <li><strong>N°${data.id.toString().padStart(3, '0')} - ${speciesData.generation.name}</strong></li>
                        <li>Altura: ${data.height / 10}m</li>
                        <li><strong>Peso:</strong> ${data.weight / 10}kg</li>
                        <li>Sexo: ♂ ♀</li>
                        <li>Categoría: ${speciesData.genera.find(genus => genus.language.name === 'es').genus}</li>
                        <li>Habilidad: ${abilities}</li>
                      </ul>
                    </div>
                  </section>
                  <section class="container evoluciones-container">
                    <div class="evoluciones">
                      ${evolutions.map(evo => `<div class="evolucion"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.species_name}.png" alt="${evo.species_name}"></div>`).join('')}
                    </div>
                    <div class="bulbasaur-text">
                      <p>${speciesData.flavor_text_entries.find(entry => entry.language.name === 'es').flavor_text}</p>
                    </div>
                  </section>
                `;

                // Append the template to a container element
                $('#pokemon-container').html(template);
              },
              error: function () {
                alert("No se pudo obtener la cadena de evolución del Pokémon");
              }
            });
          },
          error: function () {
            alert("No se pudo obtener los detalles de la especie del Pokémon");
          }
        });
      },
      error: function () {
        alert("No se pudo obtener los detalles del Pokémon");
      }
    });
  });
