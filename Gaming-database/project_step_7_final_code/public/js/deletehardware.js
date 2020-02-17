function deleteHardware(id){
    $.ajax({
        url: '/hardware/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};