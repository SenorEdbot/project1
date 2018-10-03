//Eddie's Google Maps API Key
var GMapsAPIKey = "AIzaSyDwoapQMiuQh-V8VL7c9GZ09jMcILHLs_Y";

//Alex's API Key
var OpenWeatherAPIKey = "e4080c0ab10ee56dbfeb23db4f5570f5";




var fromLat;
var fromLng;
var toLng;
var toLng;
var tripMilage = 0;
var secondsTotal = 0;
var finalTime;
var avgMPG =35;
var gasPrice = 2.88;
var tripGasCost;

// Here we run our AJAX call to the OpenWeatherMap API
$("#submit").on("click", function (event) {
    event.preventDefault();
    $("#forecastRow1").empty();
    $("#forecastRow2").empty();

    var fromArr = $("#pac-input").val().trim().split(",");
    var fromForecast = fromArr[0].trim() + ", " + fromArr[1].trim();

    var destArr = $("#pac-input2").val().trim().split(",");
    var destForecast = destArr[0].trim() + ", " + destArr[1].trim();
    // var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" +
    // "q=" + destForecast + ",us&units=imperial&appid=" + OpenWeatherAPIKey;

    // https://api.openweathermap.org/data/2.5/weather?lat=41.8781136&lon=-87.62979819999998&units=imperial&appid=e4080c0ab10ee56dbfeb23db4f5570f5
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" +
        "lat=" + toLat + "&lon=" + toLng + "&units=imperial&appid=" + OpenWeatherAPIKey;
    var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?" +
        "lat=" + fromLat + "&lon=" + fromLng + "&units=imperial&appid=" + OpenWeatherAPIKey;

    console.log(toLat);
    console.log(toLng);

    function getToURL() {
        return axios.get(queryURL);
    }
    function getFromURL() {
        return axios.get(queryURL2);
    }
    axios.all([getToURL(), getFromURL()])
        .then(axios.spread(function (to, from) {
            var results = to.data.list;
            var results2 = from.data.list;

            for (i = 0; i < results2.length; i = i + 8) {
                var cardColumn2 = $("<div class='col-lg-2'>");
                var forecastPanelCard2 = $("<div class='card' style='width: 12rem;'>");
                var forecastCardhead2 = $("<h2 class='card-header'>").text(fromForecast);
                var forecastImg2 = $("<img>");
                var cardBody2 = $("<div class='card-body'>");

                var forecastTemp2 = results2[i].main.temp;
                var forecastTempP2 = $("<p class='card-text'>").text("Temp: " + Math.round(forecastTemp2) + "\xB0");
                var forecastSky2 = results2[i].weather[0].description;
                var forecastSkyP2 = $("<p class='card-text'>").text("Sky: " + forecastSky2);
                forecastImg2.attr("src", "http://openweathermap.org/img/w/" + results2[i].weather[0].icon + ".png");

                cardBody2.append(forecastTempP2);
                cardBody2.append(forecastSkyP2);
                cardBody2.append(forecastImg2);
                forecastPanelCard2.append(forecastCardhead2, cardBody2);
                cardColumn2.append(forecastPanelCard2);


                $("#forecastRow1").append(cardColumn2);
            }

            for (i = 0; i < results.length; i = i + 8) {
                var cardColumn = $("<div class='col-lg-2'>");
                var forecastPanelCard = $("<div class='card' style='width: 12rem;'>");
                var forecastCardhead = $("<h2 class='card-header'>").text(destForecast);
                var forecastImg = $("<img>");
                var cardBody = $("<div class='card-body'>");

                var forecastTemp = results[i].main.temp;
                var forecastTempP = $("<p class='card-text'>").text("Temp: " + Math.round(forecastTemp) + "\xB0");
                var forecastSky = results[i].weather[0].description;
                var forecastSkyP = $("<p class='card-text'>").text("Sky: " + forecastSky);
                forecastImg.attr("src", "http://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png");

                cardBody.append(forecastTempP);
                cardBody.append(forecastSkyP);
                cardBody.append(forecastImg);
                forecastPanelCard.append(forecastCardhead, cardBody);
                cardColumn.append(forecastPanelCard);

                $("#forecastRow2").append(cardColumn);


            }
        }))
})



function initAutocomplete() {
    var directionsService = new google.maps.DirectionsService;
    // var geocoder = new google.maps.Geocoder;
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

    directionsDisplay.addListener('directions_changed', function () {
        computeTotalDistance(directionsDisplay.getDirections());
    });

    document.getElementById('submit').addEventListener('click', function () {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    });

    // Create the search box and link it to the UI element.
    var autocomplete1 = new google.maps.places.Autocomplete(document.getElementById('pac-input'));
    google.maps.event.addListener(autocomplete1, 'place_changed', function () {
        var place = autocomplete1.getPlace();
        fromLat = place.geometry.location.lat();
        fromLng = place.geometry.location.lng();
    })

    // Create the search box and link it to the UI element.
    var autocomplete2 = new google.maps.places.Autocomplete(document.getElementById('pac-input2'));
    google.maps.event.addListener(autocomplete2, 'place_changed', function () {
        var place = autocomplete2.getPlace();
        toLat = place.geometry.location.lat();
        toLng = place.geometry.location.lng();
    })

    // Create the search box and link it to the UI element.
    var autocomplete3 = new google.maps.places.Autocomplete(document.getElementById('pac-input3'));

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        autocomplete1.setBounds(map.getBounds());
        autocomplete2.setBounds(map.getBounds());
        autocomplete3.setBounds(map.getBounds());
    });
}
var waypts = [];
$('#addStop').on('click', function () {
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
            //summaryPanel.innerHTML += '<b> Total Trip Milage:</b> ' + computeTotalDistance(directionsDisplay.getDirections()) + ' Miles<br>';
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
    tripMilage = 0;
    secondsTotal = 0;
    tripGasCost = 0;
    var myroute = result.routes[0];
    $('#car').css('border', '3px solid green'); 
    console.log(myroute);
    for (var i = 0; i < myroute.legs.length; i++) {
        tripMilage += myroute.legs[i].distance.value;
        secondsTotal += myroute.legs[i].duration.value;
    }
    tripMilage = ((tripMilage / 1000) * 0.621371).toFixed(2);
    tripGasCost = ((tripMilage / avgMPG) * gasPrice).toFixed(2);
    $('#fuelSpan').text(tripGasCost);
    $('#milesSpan').text(tripMilage);
    $('#timeSpan').text(getTime(secondsTotal));
}
function getTime(seconds) {
    //the amount of seconds we have left
    var leftover = seconds;

    //how many full days fits in the amount of leftover seconds
    var days = Math.floor(leftover / 86400);

    //how many seconds are left
    leftover = leftover - (days * 86400);

    //how many full hours fits in the amount of leftover seconds
    var hours = Math.floor(leftover / 3600);

    //how many seconds are left
    leftover = leftover - (hours * 3600);

    //how many minutes fits in the amount of leftover seconds
    var minutes = Math.ceil(leftover / 60);

    leftover = leftover - (minutes * 60);

    finalTime = days + ' Day ' + hours + ' Hours ' + minutes + ' Minutes';
    return finalTime
}
$(document).on('click', '.vehicles', function() {
    if ($(this).attr('id') === 'car') {
        //if a car is pushed
        avgMPG = parseInt($(this).attr('avgMPG'));
        $('.vehicles').css('border', '0px');
        $(this).css('border', '3px solid green'); 
    } else if ($(this).attr('id') === 'truck') {
        //if a truck is pushed
        avgMPG = parseInt($(this).attr('avgMPG'));
        $('.vehicles').css('border', '0px');
        $(this).css('border', '3px solid green');  
    } else if ($(this).attr('id')=== 'suv') {
        //if a suv is pushed
        avgMPG = parseInt($(this).attr('avgMPG'));
        $('.vehicles').css('border', '0px');
        $(this).css('border', '3px solid green'); 
    }
})
