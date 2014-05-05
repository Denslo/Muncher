$(document).ready(function() {

    var itemsForShoppingList = [];
    var itemsForSupriseBox = [];

    $.getJSON("/muncher/getProdacts", function(data) {

        data.forEach(function(entry) {

            itemsForShoppingList.push("<tr>");

            itemsForShoppingList.push("<td>");
            itemsForShoppingList.push("<img src='");
            itemsForShoppingList.push(entry.img);
            itemsForShoppingList.push("'></td>");

            itemsForShoppingList.push("<td>");
            itemsForShoppingList.push(entry.name);
            itemsForShoppingList.push("</td>");

            itemsForShoppingList.push("<td>");
            itemsForShoppingList.push(entry.price);
            itemsForShoppingList.push("</td>");

            itemsForShoppingList.push("<td>");
            itemsForShoppingList.push("<input id='"+entry._id+"' type=\"number\" value='0' min='0'");
            itemsForShoppingList.push("</td>");

            itemsForShoppingList.push("</tr>");
            
            itemsForSupriseBox.push("<tr>");

            itemsForSupriseBox.push("<td>");
            itemsForSupriseBox.push("<img src='");
            itemsForSupriseBox.push(entry.img);
            itemsForSupriseBox.push("'></td>");

            itemsForSupriseBox.push("<td>");
            itemsForSupriseBox.push(entry.name);
            itemsForSupriseBox.push("</td>");

            itemsForSupriseBox.push("<td>");
            itemsForSupriseBox.push("<input type=\"checkbox\" id='"+entry._id+"' type=\"number\"");
            itemsForSupriseBox.push("</td>");

            itemsForSupriseBox.push("</tr>");

        });

        $('#shopinglist_placeHolder').replaceWith(itemsForShoppingList.join(''));
        $('.surprise_box_placeHolder').replaceWith(itemsForSupriseBox.join(''));
    });

});