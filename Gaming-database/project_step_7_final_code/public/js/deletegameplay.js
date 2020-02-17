function deleteGamePlay(id){
    $.ajax({
        url: '/game_play/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

