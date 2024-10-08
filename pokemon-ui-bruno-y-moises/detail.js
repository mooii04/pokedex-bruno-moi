$(document).ready(function () {
  var urlParams = new URLSearchParams(window.location.search);
  var pokemonId = urlParams.get("id");

  if (pokemonId == null) {
    alert("No se ha recibido el ID de pokemon");
    return;
  }

  function changeBackgroundImage(type) {
    const backgroundImageUrls = {
      grass: 'url("fondoplanta.jpg")',
      poison: 'url("fondoveneno.jpg")',
      fire: 'url("fondofuego.jpg")',
      water: 'url("fondoagua.jpg")',
      bug: 'url(fondobicho.jpg)',
      flying: 'url("fondovolador.jpg")',
      // Añade más tipos y sus respectivas imágenes de fondo aquí
    };

    const backgroundImageUrl = backgroundImageUrls[type] || 'url("default-background.jpg")';
    $('.background').css('background-image', backgroundImageUrl);
  }

  // Llama a la función changeBackgroundImage con el tipo del Pokémon
  $.ajax({
    url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
    method: 'GET',
    success: function (data) {
      const primaryType = data.types[0].type.name;
      changeBackgroundImage(primaryType);
    },
    error: function () {
      alert("No se pudo obtener los detalles del Pokémon");
    }
  });

  $.ajax({
    url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
    method: 'GET',
    success: function (data) {
      $.ajax({
        url: data.species.url,
        method: 'GET',
        success: function (speciesData) {
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

              var types = data.types.map(function (typeInfo) {
                return '<span class="' + typeInfo.type.name + '">' + typeInfo.type.name.toUpperCase() + '</span>';
              }).join(' ');

              var abilities = data.abilities.map(function (abilityInfo) {
                return abilityInfo.ability.name;
              }).join(', ');

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
                        <li>Categoría: ${speciesData.genera.find(function (genus) {
                return genus.language.name === 'es';
              }).genus}</li>
                        <li>Habilidad: ${abilities}</li>
                      </ul>
                    </div>
                  </section>
                  <section class="container evoluciones-container">
                    <div class="evoluciones">
                      ${evolutions.map(function (evo) {
                var evoId = evo.url.split('/').filter(Boolean).pop();
                return '<div class="evolucion"><a href="detail.html?id=' + evoId + '"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + evoId + '.png" alt="' + evo.species_name + '"></a></div>';
              }).join('')}
                    </div>
                    <div class="bulbasaur-text">
                      <p>${speciesData.flavor_text_entries.find(function (entry) {
                return entry.language.name === 'es';
              }).flavor_text}</p>
                    </div>
                  </section>
                `;

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
