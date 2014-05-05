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

    var d = new Date();
    var order = {};
    if (orderType === 'surprise_box') {
        
        order['salt_sweet_slider'] = $('#salt_sweet_slider').val();
        order['sweet_pr'] = $('#sweet_pr').val();
        order['salt_pr'] = $('#salt_pr').val();
        order['cost'] = $('#cost').val();
        order.ex = {};
        order.in = {};
        $('.exlude_list_item').each(function(index){
            order.ex[this.id] = this.checked;
        });
        $('.include_list_item').each(function(index){
            order.in[this.id] = this.checked;
        });
    } else {
        $('.shopping_list_item').each(function(index){
            order[this.id] = this.value;
        });
    }

    var arr = {
        user: $('#phone_number').val(),
        address: $('#geocomplete').val(),
        orderType: orderType,
        order: order,
        date: d.toUTCString()
    };

    $.ajax({
        url: '/muncher/submitOrder',
        type: 'POST',
        data: JSON.stringify(arr),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
    });
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
                $('#phone_number').val(result.rows.item(result.rows.length - 1).user);
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
        db.transaction(function(tx) {
            tx.executeSql('SELECT user FROM USER where user =\'' + $('#phone_number').val() + '\'', [], function(tx, result) {
                if (result.rows.length === 0) {
                    tx.executeSql('INSERT INTO USER (user) VALUES (\"' + $('#phone_number').val() + '\")');
                }
            });
        });
        $.mobile.changePage("#page_order_type", {transition: "slide"});

        var arr = {
            user: $('#phone_number').val()
        }

        $.ajax({
            url: '/muncher/getHistory',
            type: 'POST',
            data: JSON.stringify(arr),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: loadHistory
        });
    }
}

var orderHistory;

function loadHistory(data, textStatus, jqXHR) {

    orderHistory = data;

    var address = [];
    var box = [];
    var shopingList = [];

    for (var i = 0; i < orderHistory.length; i++)
    {
        address.push("<button onclick='loadAddress(" + i + ")'>" + orderHistory[i].address + "</button><br>");
        if (orderHistory[i].orderType === "shopping_list") {
            shopingList.push("<button onclick='loadOrder(" + i + ")'>" + orderHistory[i].date + "</button><br>");
        } else {
            box.push("<button onclick='loadOrder(" + i + ")'>" + orderHistory[i].date + "</button><br>");
        }
    }
    
    $('#history_shopingList_placeHolder').replaceWith(shopingList.join(""));
    $('#history_surprise_box_placeHolder').replaceWith(box.join(""));
    $('#history_address_placeHolder').replaceWith(address.join(""));
}

function loadOrder(i){
    if (orderHistory[i].orderType === "shopping_list") {
        $.each(orderHistory[i].order,function(key,data){
           $('#'+key).val(data);
        });
    } else {
        $('#cost').val(orderHistory[i].order.cost);
        $('#salt_sweet_slider').val(orderHistory[i].order.salt_sweet_slider);
        $('#salt_sweet_slider').slider('refresh');
        
        //update the in ex list?
    }
}

function loadAddress(i){
    $('#geocomplete').val(orderHistory[i].address);
    //update the map?
}

var orderType = "";

$(document).on("pageshow", "#surprise_box", function() {
    orderType = "surprise_box";
});

$(document).on("pageshow", "#shopping_list", function() {
    orderType = "shopping_list";
});