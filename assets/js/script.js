var albumsEl = document.querySelector("#albums-panel");
var baseItunesSearchApi = "https://itunes.apple.com/search?";
var attributeParameter = "&entity=album";
var paramterLimit = "&limit=10";
var userInput = document.querySelector("#inputSearch");
var userFormInputEl = document.querySelector("#searchArtist");
var previousArtistSearchEl = document.querySelector("#previousArtist");
// var albumButtonEl = document.querySelector(".album-btn");

// create an array to store previous searches
var artistSearch = [];



var formItunesInputHandler = function(event) {
    // call preventDefault
    event.preventDefault();

    // reset the albums displayed on the right side
    albumsEl.textContent = "";
    
    // get a value from the user
    var artistLookup = userInput.value.toLowerCase().replace(" ", "+");
    var artistLookupEl = userInput.value;

    // push artist name into artistSearch array
    artistSearch.push(artistLookupEl);

    // console.log(artistLookup);
    // check to make sure a value is entered
    if (artistLookup) {
        getItunesApi(artistLookup);

    }
    // saving the input and calling the function to display a previous search 
    saveInput(artistLookupEl);
    previousSearch(artistLookupEl);

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
    // console.log(artist)


    for (var i = 0; i < artist.results.length; i++) {

        // define a variable to the api field
        var albumArtwork = artist.results[i].artworkUrl100;
        var albumName = artist.results[i].collectionName;
        // var albumArtist = artist.results[i].artistName;

        // variable to get the artist's itune page
        var artistPage = artist.results[i].artistViewUrl;
        var artistPageEl = document.createElement("a");
        artistPageEl.setAttribute("href", artistPage);
        // albumEl.setAttribute("target", "_blank");

        // create a container for each album
        var albumEl = document.createElement("img");
        albumEl.setAttribute("src", albumArtwork);
        

        // create a span element to hold album name/picture/ artist name
        var albumCover = document.createElement("span");
        albumCover.img = albumArtwork;

        var albumHeader = document.createElement("span");
        albumHeader.classList="song-name";
        albumHeader.textContent = albumName;

        // create a button for them to go into
        var albumButton = document.createElement("button");
        albumButton.classList="album-btn";
        albumButton.setAttribute("name", "album-button");
        albumButton.setAttribute("type", "submit");
        

        // albumButton.appendChild(artistPageEl);
        albumButton.appendChild(albumEl);
        albumButton.appendChild(albumCover);
        albumButton.appendChild(albumHeader);
        //albumButton.appendChild(albumCreator);
        // if you click the album button it will bring you to the artist's page
        artistPageEl.appendChild(albumButton)

        // append them to the albums ID div
        albumsEl.appendChild(artistPageEl);
    }
};

// var openAlbumLink = function(event) {
//     var setOpenAlbum = event.target.setAttribute("target", "_blank");
//     var openAlbum = event.target.getAttribute("href");
//     window.open(openAlbum, "_blank").focus();
// };

var saveInput = function() {
    localStorage.setItem("artistSearch", JSON.stringify(artistSearch));
    console.log(artistSearch);
};

var loadPreviousInput = function() {
    // get items from local storage
    var savedItems = JSON.parse(localStorage.getItem("artistSearch"));
    console.log(savedItems);

    for (var i = 0; i < savedItems.length; i++) {
        // working to show up on the left side
        previousSearch(savedItems[i]);
    }



};

// 
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
        getItunesApi(artistSearched);
    }
    // reset the albums displayed on the right side
    albumsEl.textContent = "";

};


userFormInputEl.addEventListener("submit", formItunesInputHandler);
previousArtistSearchEl.addEventListener("click", previousSearchHandler);
// albumsEl.addEventListener("click", openAlbumLink);

loadPreviousInput();