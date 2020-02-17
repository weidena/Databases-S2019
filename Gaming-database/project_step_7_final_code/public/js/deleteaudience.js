function deleteAudience(id){
    $.ajax({
        url: '/audiences/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};