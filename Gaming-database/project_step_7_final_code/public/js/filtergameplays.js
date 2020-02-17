function filterGamePlaysByCamera() {
    //get the id of the selected game genre from the filter dropdown
    var game_play_camera_id = document.getElementById('game_play_camera_filter').value
    //construct the URL and redirect to it
    window.location = '/game_play/filter/' + parseInt(game_play_camera_id)
}