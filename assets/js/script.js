var albumsEl = document.querySelector("#albums");
var baseItunesSearchApi = "https://itunes.apple.com/search?";
// var artistName = "term=kendrick+lamar";
var attributeParameter = "&attribute=albumTerm";
var paramterLimit = "&limit=10";
var userInput = document.querySelector("#inputSearch");
var userFormInputEl = document.querySelector("#searchArtist");



var formItunesInputHandler = function(event) {
    // call preventDefault
    event.preventDefault();
    
    // get a value from the user
    var artistLookup = userInput.value.toLowerCase().replace(" ", "+");
    // console.log(artistLookup);
    // check to make sure a value is entered
    if (artistLookup) {
        getItunesApi(artistLookup);

    }

};


var getItunesApi = function(artistName) {
    fetch(baseItunesSearchApi + "term="+ artistName + attributeParameter + paramterLimit)
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        return displayAlbum(data);
    })
};

var displayAlbum = function(artist) {
    console.log(artist)

    for (var i = 0; i < artist.results.length; i++) {

        // define a variable to the api field
        var albumArtwork = artist.results[i].artworkUrl60;
        var albumName = artist.results[i].collectionName;
        var albumArtist = artist.results[i].artistName;

        // variable to get the artist's itune page
        // var artistPage = artist.results[i].artistViewUrl;
        // var artistPageEl = document.createElement("a");
        // artistPageEl.textContent = artist.results[i].artistName;

        // albumsEl.appendChild(artistPageEl);


        // create a container for each album
        var albumEl = document.createElement("img");
        albumEl.setAttribute("src", albumArtwork);

        // create a span element to hold album name/picture/ artist name
        var albumCover = document.createElement("span");
        albumCover.img = albumArtwork;

        var albumHeader = document.createElement("span");
        albumHeader.textContent = albumName;

        var albumCreator = document.createElement("span");
        albumCreator.textContent = albumArtist;

        // create a button for them to go into
        var albumButton = document.createElement("button");

        albumButton.appendChild(albumEl);
        albumButton.appendChild(albumCover);
        albumButton.appendChild(albumHeader);
        albumButton.appendChild(albumCreator);

        // append them to the albums ID div
        albumsEl.appendChild(albumButton);
    }
};

// getItunesApi();

userFormInputEl.addEventListener("submit", formItunesInputHandler);

// song name - trackName
// artist link - artistViewUrl
// album name 


// add local storage below the developed by team 5 button for previous searches