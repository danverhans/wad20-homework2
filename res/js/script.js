let persons = [];
let posts = [];
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
    if (document.title=="Browse"){
        loadBrowseInfo()
            .then(function (response){
                for (let person of response){
                    persons.push(new Person(person.firstname, person.lastname, person.avatar));
                }

            displayPersons()
        })
        .catch(function(){
            alert('Error loading browse info')
        });}
    
    if (document.title=="Just Post It"){
        loadPostInfo()
            .then(function (response){
                for (let post of response){
                    if (post.media!=null){
                        posts.push(new Post(post.id,new Person(post.author.firstname, post.author.lastname, post.author.avatar),post.createTime,post.text,new Media(post.media.type, post.media.url),post.likes));
                    }else{
                        posts.push(new Post(post.id,new Person(post.author.firstname, post.author.lastname, post.author.avatar),post.createTime,post.text,null,post.likes));}
                
                    }   

            displayPosts()
        })
        .catch(function(){
            alert('Error loading post info')
        });}

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

function loadPostInfo() {
    return $.get(
        {
            url: 'https://private-anon-eb25be098a-wad20postit.apiary-mock.com/posts',
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

    let i = 1;
    for(let person of persons){
        $('.personArea').append("<div id=\"person"+i +"\"></div>" );
        $('#person'+i).append("<img src=" + person.avatar + " id=\"avatar\"></img>" );
        $('#person'+i).append("<h1>" + person.firstname + " " + person.lastname +"</h1>" );
        $('#person'+i).append("<button id=\"follow" + i +"\" value=\"Follow\" onclick=\"changeFollow("+i+")\">Follow</button>");
        i++;
    }
}

function displayPosts(){

    for(let post of posts){
        
        $('.posts').append("<div id=\"post"+post.id+"\"></div>" );
        $('#post'+post.id).append("<div id=\"postheader"+post.id+"\"></div>");
        $('#postheader'+post.id).append("<img src=" + post.person.avatar + " id=\"postavatar\"></img>" );
        $('#postheader'+post.id).append("<h3 id=\"author\">" + post.person.firstname + " " + post.person.lastname +"</h3>" );
        $('#postheader'+post.id).append("<h5 id=\"time\">" + post.time +"</h5>" );
        if (post.media!=null){
            if (post.media.type=="image") {
                $('#post'+post.id).append("<img src=" + post.media.url + " id=\"postmedia\"></img>" ); 
            }
            else{
                $('#post'+post.id).append("<video controls><source src=" + post.media.url + " type=\"video/mp4\" id=\"postmedia\"></video>" );
            }
        }
        if (post.text!=null){
            $('#post'+post.id).append("<h3>" + post.text +"</h3>" );}
        $('#post'+post.id).append("<button id=\"button"+post.id+"\" value=\"like\" class=\"like-button\" onclick=\"changeLike("+post.id+")\">"+post.likes+"</button>");
    }
}

function displayUserInfo(response) {
    $('#name').text(response.firstname + " " + response.lastname);
    $('#email').text(response.email);
    $('.avatar').attr('src',response.avatar);
}

function changeFollow(i)
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
function changeLike(i)
{
    var elem = document.getElementById("button"+i);
    if (elem.value=="like") {
        elem.value = "liked";
        elem.style.backgroundColor="#8a8a8a"
    }
    else {
        elem.value = "like";
        elem.style.backgroundColor="#01579b"
    }
}