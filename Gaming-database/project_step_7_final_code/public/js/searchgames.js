function searchGamesByTitle() {
    //get the title
    var title_search_string  = document.getElementById('title_search_string').value
    //construct the URL and redirect to it
    window.location = '/games/search/' + encodeURI(title_search_string)
}
