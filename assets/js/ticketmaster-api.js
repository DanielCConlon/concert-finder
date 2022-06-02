var requestUrl = 'https://app.ticketmaster.com/discovery/v2/attractions/K8vZ917GSg0.json?apikey=2GjJzLeBAi7sy6v7tcK6BaGgf668jLJh';
var listEl = document.getElementById("artist");
var userInputEl = document.querySelector('#inputSearch');

fetch(requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        return displayBannerImage(data);
    })

    var displayBannerImage = function(event){
        console.log(event)
        var bannerTopDiv = document.querySelector('.banner-top');
        var bannerImgEl = document.createElement('img');
        bannerImgEl.setAttribute("src", event.images[3].url);
        bannerTopDiv.appendChild (bannerImgEl);

    var UpcomingEvents = function(event) {
        var displayEvents = document.querySelector('.ticketmaster');
        var displayUpcomingEvents = document.createElement('span')
        displayUpcomingEvents.textContent = event.url
        displayEvents.appendChild(displayUpcomingEvents)
    }
    }

    var formTicketMasterApi = function(event) {
        var ticketMasterEvent = userInputEl.value;
    
        if (ticketMasterEvent) {
            displayBannerImage(ticketMasterEvent);
        }
    }
    userInputEl.addEventListener("submit", formTicketMasterApi);
    