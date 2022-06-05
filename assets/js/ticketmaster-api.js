var eventContainerEl = document.querySelector('#tixmaster');
var userFormEl = document.querySelector('#searchArtist');
var artistInputEl = document.querySelector('#inputSearch');


var formSubmitHandler = function(event) {
    eventContainerEl.textContent = "";
    event.preventDefault();
    var artistName = artistInputEl.value.trim();
    if (artistName){
        getTicketApi(artistName);
            response.json()
            .then(function(data){
            return (data, artist);



        }
        );


    };
};

var getTicketApi = function(artist){
    var apiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?' + '&keyword=' + artist + '&apikey=3JcNn4ea56JrBolF27QIGsWgd58v9GSZ';

    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
           console.log(data._embedded.events);
           return {data};
        });


        });

};

var displayEvents = function(events) {




    for (var i=0; i < _embedded.length; i++) {

        var eventName = _embedded.events[i].name;

        var eventNameEl = document.createElement('span');
        eventNameEl.setAttribute("type", eventName);
        eventNameEl.textContent = eventName;
        eventContainerEl.appendChild(eventNameEl);
        console.log(eventName);
        data = events;
};
 };


userFormEl.addEventListener("submit", formSubmitHandler);