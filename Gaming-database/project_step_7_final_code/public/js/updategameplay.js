function updateGamePlay(id){
    $.ajax({
        url: '/game_play/' + id,
        type: 'PUT',
        data: $('#update-gameplay').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
