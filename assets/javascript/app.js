//Eddie's Google Maps API Key
var GMapsAPIKey = "AIzaSyDwoapQMiuQh-V8VL7c9GZ09jMcILHLs_Y";

//Alex's API Key
var OpenWeatherAPIKey = "e4080c0ab10ee56dbfeb23db4f5570f5";



var tripMilage;

// Here we run our AJAX call to the OpenWeatherMap API
$("#submit").on("click", function(event) {
    event.preventDefault();
    $("#forecast-panel").empty();

    var destArr = $("#pac-input2").val().trim().split(",");
    var destForecast = destArr[0].trim() +", "+destArr[1].trim();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" +
    "q=" + destForecast + ",us&units=imperial&appid=" + OpenWeatherAPIKey;

    

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {
            var results = response.list;
        
            console.log(results);
            
            
            
            for (i = 0; i < results.length; i=i+8) {
                var cardColumn = $("<div class='col-lg-2'>");
                var forecastPanelCard = $("<div class='card' style='width: 12rem;'>");
                var forecastCardhead = $("<h2 class='card-header'>").text(destForecast);
                var forecastImg = $("<img>");
                var cardBody = $("<div class='card-body'>");
                
                var forecastTemp = results[i].main.temp;
                var forecastTempP = $("<p class='card-text'>").text("Temp: " + forecastTemp);
                var forecastSky = results[i].weather[0].description;
                var forecastSkyP = $("<p class='card-text'>").text("Sky: " + forecastSky);
                forecastImg.attr("src", "http://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png");
                
                cardBody.append(forecastTempP);
                cardBody.append(forecastSkyP);
                cardBody.append(forecastImg);
                forecastPanelCard.append(forecastCardhead, cardBody);
                cardColumn.append(forecastPanelCard);


                $("#forecast-panel").append(cardColumn);
            }
            
        });

})



function initAutocomplete() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true,
        map: map
    })
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 39.015697, lng: -94.565559 },
        zoom: 10,
        mapTypeId: 'roadmap'
    });
    directionsDisplay.setMap(map);

     directionsDisplay.addListener('directions_changed', function() {
        computeTotalDistance(directionsDisplay.getDirections());
       });

    document.getElementById('submit').addEventListener('click', function () {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    
    // Create the search box and link it to the UI element.
    var input2 = document.getElementById('pac-input2');
    var searchBox2 = new google.maps.places.SearchBox(input2);
    
    // Create the search box and link it to the UI element.
    var input3 = document.getElementById('pac-input3');
    var searchBox3 = new google.maps.places.SearchBox(input3);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
        searchBox2.setBounds(map.getBounds());
        searchBox3.setBounds(map.getBounds());
    });
}
var waypts = [];
$('#addStop').on('click', function(){
    event.preventDefault;
    console.log('button was clicked')
    var newWaypt = $('#pac-input3').val().trim();
    waypts.push({
        location: newWaypt,
        stopover: true
    });
    $('#pac-input3').val('');
})
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
        origin: document.getElementById('pac-input').value,
        destination: document.getElementById('pac-input2').value,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
            var summaryPanel = document.getElementById('directions-panel');
            summaryPanel.innerHTML = '';
            // For each route, display summary information.
            summaryPanel.innerHTML += '<b> Total Trip Milage:</b> ' + computeTotalDistance(directionsDisplay.getDirections()) + ' Miles<br>';
            for (var i = 0; i < route.legs.length; i++) {
                var routeSegment = i + 1;
                summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
                    '</b><br>';
                summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
            }
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    total = (total / 1000) * 0.621371;
    tripMilage = total;
    $('#mileage-panel').text("Total Trip Milage: " + tripMilage + " Miles");
    return total
  }