/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function login() {
    $.mobile.changePage("#page_order_type", {transition: "slide"});
}

function goToOrderFromList() {
    $.mobile.changePage("#shopping_list", {transition: "slide"});
}

function goToOrderSurpriseBox() {
    $.mobile.changePage("#surprise_box", {transition: "slide"});
}

function goToAddres() {
    $.mobile.changePage("#addres", {transition: "slide"});
}

function toggleTable(tID) {
    $(tID).slideToggle();
}

$(function() {

    navigator.geolocation.getCurrentPosition(function(pos) {

        var lat = pos.coords.latitude;
        var lng = pos.coords.longitude;
        var latlng = new google.maps.LatLng(lat, lng);

        var options = {
            map: "#map_canvas",
            location: latlng,
            markerOptions: {
                draggable: true
            },
            mapOptions: {
                zoom: 18
            }
        };

        $("#geocomplete").geocomplete(options);
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            latLng: latlng
        }, function(responses) {
            if (responses && responses.length > 0) {
                $('#geocomplete').val(responses[0].formatted_address);
            }
        });

        $("#geocomplete").bind("geocode:dragged", function(event, latLng) {
            geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                latLng: latLng
            }, function(responses) {
                if (responses && responses.length > 0) {
                    $('#geocomplete').val(responses[0].formatted_address);
                } else {
                    $('#geocomplete').val('Cannot determine address at this location.');
                }
            });
        });


    }, function(pos) {
        var options = {
            map: "#map_canvas",
            location: "Israel, Tel Aviv",
            markerOptions: {
                draggable: true
            },
        };

        $("#geocomplete").geocomplete(options);

        $("#geocomplete").bind("geocode:dragged", function(event, latLng) {
            geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                latLng: latLng
            }, function(responses) {
                if (responses && responses.length > 0) {
                    $('#geocomplete').val(responses[0].formatted_address);
                } else {
                    $('#geocomplete').val('Cannot determine address at this location.');
                }
            });
        });
    });
});

function submitOrder(){}