//Eddie's Google Maps API Key
var GMapsAPIKey = "AIzaSyDwoapQMiuQh-V8VL7c9GZ09jMcILHLs_Y";

//Alex's API Key
var OpenWeatherAPIKey = "e4080c0ab10ee56dbfeb23db4f5570f5";



// Here we run our AJAX call to the OpenWeatherMap API
$("#submit").on("click", function(event) {
    event.preventDefault();

    var destForecast = $("#pac-input2").val().trim();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" +
    "q=" + destForecast + "&units=imperial&appid=" + OpenWeatherAPIKey;

    

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
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 39.015697, lng: -94.565559 },
        zoom: 10,
        mapTypeId: 'roadmap'
    });
    directionsDisplay.setMap(map);

    document.getElementById('submit').addEventListener('click', function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);

    


    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    
    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });
    
    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    // searchBox.addListener('places_changed', function () {
    //     var places = searchBox.getPlaces();
        
    //     if (places.length == 0) {
    //         return;
    //     }
        
    //     // Clear out the old markers.
    //     markers.forEach(function (marker) {
    //         marker.setMap(null);
    //     });
    //     markers = [];
        
    //     // For each place, get the icon, name and location.
    //     var bounds = new google.maps.LatLngBounds();
    //     places.forEach(function (place) {
    //         if (!place.geometry) {
    //             console.log("Returned place contains no geometry");
    //             return;
    //         }
    //         var icon = {
    //             url: place.icon,
    //             size: new google.maps.Size(71, 71),
    //             origin: new google.maps.Point(0, 0),
    //             anchor: new google.maps.Point(17, 34),
    //             scaledSize: new google.maps.Size(25, 25)
    //         };
            
    //         // Create a marker for each place.
    //         markers.push(new google.maps.Marker({
    //             map: map,
    //             icon: icon,
    //             title: place.name,
    //             position: place.geometry.location
    //         }));
    //         console.log(markers);
            
    //         if (place.geometry.viewport) {
    //             // Only geocodes have viewport.
    //             bounds.union(place.geometry.viewport);
    //         } else {
    //             bounds.extend(place.geometry.location);
    //         }
    //     });
    //     map.fitBounds(bounds);
    // });
    // Create the search box and link it to the UI element.
    var input2 = document.getElementById('pac-input2');
    var searchBox2 = new google.maps.places.SearchBox(input2);
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input2);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox2.setBounds(map.getBounds());
    });
    var markers2 = [];
    // searchBox2.addListener('places_changed', function () {
    //     var places2 = searchBox2.getPlaces();
        
    //     if (places2.length == 0) {
    //         return;
    //     }
        
    //     // Clear out the old markers.
    //     markers2.forEach(function (marker2) {
    //         marker2.setMap(null);
    //     });
    //     markers2 = [];

    //     // For each place, get the icon, name and location.
    //     var bounds2 = new google.maps.LatLngBounds();
    //     places2.forEach(function (place2) {
    //         if (!place2.geometry) {
    //             console.log("Returned place contains no geometry");
    //             return;
    //         }
    //         var icon2 = {
    //             url: place2.icon2,
    //             size: new google.maps.Size(71, 71),
    //             origin: new google.maps.Point(0, 0),
    //             anchor: new google.maps.Point(17, 34),
    //             scaledSize: new google.maps.Size(25, 25)
    //         };

    //         // Create a marker for each place.
    //         markers2.push(new google.maps.Marker({
    //             map: map,
    //             icon: icon2,
    //             title: place2.name,
    //             position: place2.geometry.location
    //         }));
    //         console.log(markers2);

    //         if (place2.geometry.viewport) {
    //             // Only geocodes have viewport.
    //             bounds2.union(place2.geometry.viewport);
    //         } else {
    //             bounds2.extend(place2.geometry.location);
    //         }
    //     });
    //     map.fitBounds(bounds2);
    // });
}
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var waypts = [];
    //var checkboxArray = document.getElementById('waypoints');
    // for (var i = 0; i < checkboxArray.length; i++) {
    //   if (checkboxArray.options[i].selected) {
    //     waypts.push({
    //       location: checkboxArray[i].value,
    //       stopover: true
    //     });
    //   }
    // }
    directionsService.route({
        origin: document.getElementById('pac-input').value,
        destination: document.getElementById('pac-input2').value,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
          var route = response.routes[0];
          var summaryPanel = document.getElementById('directions-panel');
          summaryPanel.innerHTML = '';
          // For each route, display summary information.
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