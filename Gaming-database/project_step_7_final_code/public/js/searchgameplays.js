function searchGamePlaysByCharacter() {
    //get the title
    var character_search_string  = document.getElementById('character_search_string').value
    //construct the URL and redirect to it
    window.location = '/game_play/search/' + encodeURI(character_search_string)
}
