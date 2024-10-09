$(document).ready(function() {
    fetchPokemonData();

    $('#btn-get-data').click(function() {
        fetchPokemonData();
    });

    function fetchPokemonData() {
        $.ajax({
            url: 'https://pokeapi.co/api/v2/pokemon?limit=151',
            method: 'GET',
            success: function(response) {
                console.log('Fetched Pokémon list:', response.results);

                response.results.sort(function(a, b) {
                    var idA = parseInt(a.url.split('/').slice(-2, -1)[0]);
                    var idB = parseInt(b.url.split('/').slice(-2, -1)[0]);
                    return idA - idB;
                });

                displayPokemon(response.results);
            },
            error: function(error) {
                console.error('Error fetching data:', error);
            }
        });
    }

    function displayPokemon(pokemonList) {
        var dataContent = $('#data-content');
        dataContent.empty();

        var index = 0;
        function fetchNextBatch() {
            if (index >= pokemonList.length) {
                $('.pokemon-card').click(function() {
                    var pokemonId = $(this).data('id');
                    window.location.href = 'detail.html?id=' + pokemonId;
                });
                return;
            }

            var rowContent = $('<div class="pokemon-row"></div>');
            var batch = pokemonList.slice(index, index + 3);
            var requests = batch.map(function(pokemon) {
                return $.ajax({
                    url: pokemon.url,
                    method: 'GET'
                });
            });

            $('.pokemon-card').click(function() {
                var pokemonId = $(this).data('id');
                window.location.href = 'detail.html?id=' + pokemonId;
            });
            

            $.when.apply($, requests).done(function() {
                var responses = Array.prototype.slice.call(arguments);
                responses.forEach(function(response) {
                    var pokemonData = response[0];
                    console.log('Fetched Pokémon data:', pokemonData);
                    var pokemonCard = `
                        <div class="pokemon-card" data-id="${pokemonData.id}">
                            <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}" class="pokemon-image">
                            <div class="pokemon-info">
                                <div class="pokemon-name">${capitalizeFirstLetter(pokemonData.name)}</div>
                                <div class="pokemon-number">#${pokemonData.id.toString().padStart(3, '0')}</div>
                            </div>
                            <div class="pokemon-types">
                                ${pokemonData.types.map(function(typeInfo) {
                                    return '<span class="type-badge ' + typeInfo.type.name + '">' + capitalizeFirstLetter(typeInfo.type.name) + '</span>';
                                }).join('')}
                            </div>
                        </div>
                    `;
                    rowContent.append(pokemonCard);
                });

                dataContent.append(rowContent);
                index += 3;
                fetchNextBatch();
            }).fail(function(error) {
                console.error('Error fetching Pokémon data:', error);
                index += 3;
                fetchNextBatch();
            });
        }

        fetchNextBatch();
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});
