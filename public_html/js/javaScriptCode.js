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

$(function() {
    $('#addres').on("pageshow", function() {

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
                    }
                });
            });
        }, function() {
            var options = {
                map: "#map_canvas",
                location: "Israel, Tel Aviv",
                markerOptions: {
                    draggable: true
                }
            };
            $("#geocomplete").geocomplete(options);
            $("#geocomplete").bind("geocode:dragged", function(event, latLng) {
                geocoder = new google.maps.Geocoder();
                geocoder.geocode({
                    latLng: latLng
                }, function(responses) {
                    if (responses && responses.length > 0) {
                        $('#geocomplete').val(responses[0].formatted_address);
                    }
                });
            });
        });
    });
});
function submitOrder() {
}

$(function() {
    $('#map_canvas').height($(window).height() * 0.65);
});

$(document).on("pageshow", "#surprise_box", function() {
    
    updateSweetSalt();
    
    $("#salt_sweet_slider").on("slidestop", updateSweetSalt);
});

function updateSweetSalt(){
    var cur =  parseInt($("#salt_sweet_slider").val());

    $('#sweet_pr').val(100 - cur);
    $('#salt_pr').val(cur);
}