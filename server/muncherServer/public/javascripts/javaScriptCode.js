/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function goToOrderFromList() {
    $.mobile.changePage("#shopping_list", {transition: "slide"});
}

function goToOrderSurpriseBox() {
    $.mobile.changePage("#surprise_box", {transition: "slide"});
}

function goToAddres() {
    $.mobile.changePage("#addres", {transition: "slide"});
}

//load address page
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
                    zoom: 18,
                    disableDefaultUI: true
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
    //create json
    //send json to server
}

//set dinamic height to map
$(function() {
    $('#map_canvas').height($(window).height() * 0.65);
});

//sweet salt slider
$(document).on("pageshow", "#surprise_box", function() {

    updateSweetSalt();

    $("#salt_sweet_slider").on("change", updateSweetSalt);
});

//sweet salt slider
function updateSweetSalt() {
    var cur = parseInt($("#salt_sweet_slider").val());

    $('#sweet_pr').val(100 - cur);
    $('#salt_pr').val(cur);
}

var db;
db = openDatabase("Muncher", "1.0", "muncher data base", "200000");
db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS USER (user unique)');
});

var isFristTimeInLogIn = true;

//outo login
$(document).on("pageshow", "#login", function() {
    db = openDatabase("Muncher", "1.0", "muncher data base", "200000");
    db.transaction(function(tx) {
        tx.executeSql('SELECT user FROM USER', [], function(tx, result) {
            if (result.rows.length > 0 && isFristTimeInLogIn) {
                $('#phone_number').val(result.rows.item(result.rows.length -1).user);
                login();
            }
            isFristTimeInLogIn = false;
        });
    });
});

function login() {
    if ($('#phone_number').val() === '') {
        $('#login_popup').popup('open', {positionTo: "#phone_number", transition: "flow"});
    } else {
        //ajax to server was true
        db.transaction(function(tx) {
            tx.executeSql('SELECT user FROM USER where user =\'' + $('#phone_number').val() + '\'', [], function(tx, result) {
                if (result.rows.length === 0) {
                    tx.executeSql('INSERT INTO USER (user) VALUES (\"' + $('#phone_number').val() + '\")');
                }
            });
        });
        $.mobile.changePage("#page_order_type", {transition: "slide"});
    }
}

var prodracts = {};