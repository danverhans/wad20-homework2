let persons = [];

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

    loadBrowseInfo()
        .then(function (response){
            for (let person of response){
                persons.push(new Person(person.firstname, person.lastname, person.avatar));
            }

        displayPersons()
    })
    .catch(function(){
        alert('Error loading browse info')
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

function loadBrowseInfo() {
    return $.get(
        {
            url: 'https://private-anon-1a5282cbfb-wad20postit.apiary-mock.com/profiles',
            success: function (response) {
                return response;
            },
            error: function () {
                alert('error')
            }
        }
    );
}

function displayPersons(){

    var i =1;
    for(let person of persons){
        $('.personArea').append("<div id=\"person"+i +"\"></div>" );
        $('#person'+i).append("<img src=" + person.avatar + " id=\"avatar\"></img>" );
        $('#person'+i).append("<h1>" + person.firstname + " " + person.lastname +"</h1>" );
        $('#person'+i).append("<button id=\"follow" + i +"\" value=\"Follow\" onclick=\"change("+i+")\">Follow</button>");
        i++;
    }
}

function displayUserInfo(response) {
    $('#name').text(response.firstname + " " + response.lastname);
    $('#email').text(response.email);
    $('.avatar').attr('src',response.avatar);
}

function change(i)
{
    var elem = document.getElementById("follow"+i);
    if (elem.value=="Follow") {
        elem.value = "Followed";
        elem.innerHTML="Followed";
        elem.style.backgroundColor="#8a8a8a"
    }
    else {
        elem.value = "Follow";
        elem.innerHTML="Follow";
        elem.style.backgroundColor="#01579b"}
    
}