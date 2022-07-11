var eventTicketContainerEl = document.querySelector('.ticketmaster');
var userFormEl = document.querySelector('#searchArtist');
var artistInputEl = document.querySelector('#inputSearch');
var bannerTopEl = document.querySelector(".banner-top");


var formSubmitHandler = function(event) {
    eventTicketContainerEl.textContent = "";
    event.preventDefault();
    var artistName = artistInputEl.value.trim();
    if (artistName){
        getTicketApi(artistName);

    };
};

var getTicketApi = function(artist){
    var apiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?' + '&keyword=' + artist + '&apikey=3JcNn4ea56JrBolF27QIGsWgd58v9GSZ';

    fetch(apiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        return displayEvents(data);
    })

};

var displayEvents = function(events) {

    for (var i=0; i < events._embedded.events.length; i++) {

        var eventName = events._embedded.events[i].name;
        var eventDate = events._embedded.events[i].dates.start.localDate;

        let eventUrl = events._embedded.events[i].url;
        let eventUrlEl = document.createElement("a");
        eventUrlEl.setAttribute("target", "_blank");
        eventUrlEl.setAttribute("href", eventUrl);


        var eventNameEl = document.createElement("span");
        eventNameEl.classList = "album-button ticketMasterBtn";
        eventNameEl.textContent = eventName
        

        var eventDateEl = document.createElement("span");
        eventDateEl.classList = "album-button";
        eventDateEl.textContent = eventDate;


        var eventEl = document.createElement("button");
        eventEl.classList = "btn";
        eventEl.appendChild(eventNameEl);
        eventEl.appendChild(eventDateEl);

        eventUrlEl.appendChild(eventEl)

        eventTicketContainerEl.appendChild(eventUrlEl);

    }
};

userFormEl.addEventListener("submit", formSubmitHandler);