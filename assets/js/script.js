var albumsEl = document.querySelector("#albums");
var baseItunesSearchApi = "https://itunes.apple.com/search?";
var artistName = "term=Kendrick Lamar";
var attributeParameter = "&attribute=albumTerm";
var paramterLimit = "&limit=10";


var getItunesApi = function() {
    fetch(baseItunesSearchApi + artistName + attributeParameter + paramterLimit)
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        return displayAlbum(data);
        // console.log(data);
    })
};

var displayAlbum = function(artist) {
    console.log(artist)
    for (var i = 0; i < artist.results.length; i++) {
        // define a variable to the api field
        var albumArtwork = artist.results[i].artworkUrl60;
        var albumName = artist.results[i].collectionName;
        var albumArtist = artist.results[i].artistName;
        var artistPage = artist.results[i].artistViewUrl;

        // create a container for each album
        var albumEl = document.createElement("img");
        albumEl.classList = ""
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

getItunesApi();

// song name - trackName
// artist link - artistViewUrl
// album name 
