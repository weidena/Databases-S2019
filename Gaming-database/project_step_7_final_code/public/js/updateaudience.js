function updateAudience(id){
    $.ajax({
        url: '/audiences/' + id,
        type: 'PUT',
        data: $('#update-audience').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};