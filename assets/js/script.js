var albumsEl = document.querySelector("#albums");
var baseItunesSearchApi = "https://itunes.apple.com/search?";
var attributeParameter = "&entity=album";
var paramterLimit = "&limit=10";
var userInput = document.querySelector("#inputSearch");
var userFormInputEl = document.querySelector("#searchArtist");
var previousArtistSearchEl = document.querySelector("#previousArtist");

// create an array to store previous searches
var artistSearch = [];



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
    // saving the input and calling the function to display a previous search 
    saveInput();
    previousSearch(artistLookup);

};


var getItunesApi = function(artistName) {
    fetch(baseItunesSearchApi + "term="+ artistName + paramterLimit + attributeParameter)
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
        var artistPage = artist.results[i].artistViewUrl;
        var artistPageEl = document.createElement("a");
        artistPageEl.setAttribute("href", artistPage);

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
        albumButton.setAttribute("type", "submit");

        albumButton.appendChild(artistPageEl);
        albumButton.appendChild(albumEl);
        albumButton.appendChild(albumCover);
        albumButton.appendChild(albumHeader);
        albumButton.appendChild(albumCreator);

        // append them to the albums ID div
        albumsEl.appendChild(albumButton);
    }
};

var saveInput = function() {
    localStorage.setItem("artistSearch", JSON.stringify(artistSearch));
};

var previousSearch = function(pastSearch) {
    previousArtist = document.createElement("button");
    previousArtist.setAttribute("data-artist", pastSearch);
    previousArtist.setAttribute("type", "submit");
    previousArtist.textContent = pastSearch;

    previousArtistSearchEl.appendChild(previousArtist);
};

var previousSearchHandler = function(event) {
    var artistSearched = event.target.getAttribute("data-artist");
    if (artistSearched) {
        formItunesInputHandler(artistSearched);
    }
};

// getItunesApi();

userFormInputEl.addEventListener("submit", formItunesInputHandler);
previousArtistSearchEl.addEventListener("click", previousSearchHandler);

// song name - trackName
// artist link - artistViewUrl
// album name 


// add local storage below the developed by team 5 button for previous searches