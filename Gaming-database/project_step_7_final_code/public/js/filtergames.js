function filterGamesByGenre() {
    //get the id of the selected game genre from the filter dropdown
    var game_genre_id = document.getElementById('game_genre_filter').value
    //construct the URL and redirect to it
    window.location = '/games/filter/' + parseInt(game_genre_id)
}
