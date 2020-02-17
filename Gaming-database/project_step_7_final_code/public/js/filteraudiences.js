function filterAudiencesByGender() {
    //get the id of the selected game genre from the filter dropdown
    var audience_gender_id = document.getElementById('audience_gender_filter').value
    //construct the URL and redirect to it
    window.location = '/audiences/filter/' + parseInt(audience_gender_id)
}