function filterHardwaresByPlatform() {
    //get the id of the selected game genre from the filter dropdown
    var hardware_platform_id = document.getElementById('hardware_platform_filter').value
    //construct the URL and redirect to it
    window.location = '/hardware/filter/platform/' + parseInt(hardware_platform_id)
}

function filterHardwaresByControls() {
    //get the id of the selected game genre from the filter dropdown
    var hardware_controls_id = document.getElementById('hardware_controls_filter').value
    //construct the URL and redirect to it
    window.location = '/hardware/filter/controls/' + parseInt(hardware_controls_id)
}