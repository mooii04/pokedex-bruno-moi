$(document).ready(function() {
    fetchStarWarsData();

    $('#btn-get-data').click(function() {
        fetchStarWarsData();
    });

    function fetchStarWarsData() {
        $.ajax({
            url: 'https://swapi.dev/api/people/',
            method: 'GET',
            success: function(response) {
                console.log('Fetched Star Wars characters list:', response.results);

                displayCharacters(response.results);
            },
            error: function(error) {
                console.error('Error fetching data:', error);
            }
        });
    }

    function displayCharacters(characterList) {
        var dataContent = $('#data-content');
        dataContent.empty();

        var index = 0;
        function fetchNextBatch() {
            if (index >= characterList.length) {
                $('.character-card').click(function() {
                    var characterUrl = $(this).data('url');
                    window.location.href = 'detail.html?url=' + encodeURIComponent(characterUrl);
                });
                return;
            }

            var rowContent = $('<div class="character-row"></div>');
            var batch = characterList.slice(index, index + 3);
            var requests = batch.map(function(character) {
                return $.ajax({
                    url: character.url,
                    method: 'GET'
                });
            });

            $.when.apply($, requests).done(function() {
                var responses = Array.prototype.slice.call(arguments);
                responses.forEach(function(response) {
                    var characterData = response[0];
                    console.log('Fetched Star Wars character data:', characterData);
                    var characterCard = `
                        <div class="character-card" data-url="${characterData.url}">
                            <div class="character-info">
                                <div class="character-name">${capitalizeFirstLetter(characterData.name)}</div>
                                <div class="character-details">
                                    <div>Height: ${characterData.height}</div>
                                    <div>Mass: ${characterData.mass}</div>
                                    <div>Gender: ${capitalizeFirstLetter(characterData.gender)}</div>
                                </div>
                            </div>
                        </div>
                    `;
                    rowContent.append(characterCard);
                });

                dataContent.append(rowContent);
                index += 3;
                fetchNextBatch();
            }).fail(function(error) {
                console.error('Error fetching Star Wars character data:', error);
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
