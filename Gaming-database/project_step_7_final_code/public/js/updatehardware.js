function updateHardware(id){
    $.ajax({
        url: '/hardware/' + id,
        type: 'PUT',
        data: $('#update-hardware').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};