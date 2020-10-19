$(function(){
  
    $('.avatar').click(function () {
        $('#menu').toggle()
    })

    loadUserInfo().then(function (response) {
        displayUserInfo(response)
    })
    .catch(function () {
        alert('Error loading user info')
    });

});

function loadUserInfo() {
    return $.get(
        {
            url: 'https://private-anon-609e31d177-wad20postit.apiary-mock.com/users/1',
            success: function (response) {
                return response;
            },
            error: function () {
                alert('error')
            }
        }
    );
}

function displayUserInfo(response) {
    $('#name').text(response.firstname + " " + response.lastname);
    $('#email').text(response.email);
    $('.avatar').attr('src',response.avatar);
}