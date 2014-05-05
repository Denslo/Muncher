$(document).ready(function() {

    var itemsForShoppingList = [];
    var itemsForInclude = [];
    var itemsForExlude = [];

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
            itemsForShoppingList.push("<input id='"+entry._id+"' class='shopping_list_item' type=\"number\" value='0' min='0'");
            itemsForShoppingList.push("</td>");

            itemsForShoppingList.push("</tr>");
            
            itemsForInclude.push("<tr>");

            itemsForInclude.push("<td>");
            itemsForInclude.push("<img src='");
            itemsForInclude.push(entry.img);
            itemsForInclude.push("'></td>");

            itemsForInclude.push("<td>");
            itemsForInclude.push(entry.name);
            itemsForInclude.push("</td>");

            itemsForInclude.push("<td>");
            itemsForInclude.push("<input type=\"checkbox\" class='include_list_item' id='"+entry._id+"'");
            itemsForInclude.push("</td>");

            itemsForInclude.push("</tr>");
            
            itemsForExlude.push("<tr>");

            itemsForExlude.push("<td>");
            itemsForExlude.push("<img src='");
            itemsForExlude.push(entry.img);
            itemsForExlude.push("'></td>");

            itemsForExlude.push("<td>");
            itemsForExlude.push(entry.name);
            itemsForExlude.push("</td>");

            itemsForExlude.push("<td>");
            itemsForExlude.push("<input type=\"checkbox\" class='exlude_list_item' id='"+entry._id+"'");
            itemsForExlude.push("</td>");

            itemsForExlude.push("</tr>");

        });

        $('#shopinglist_placeHolder').replaceWith(itemsForShoppingList.join(''));
        $('#surprise_box_placeHolder_include').replaceWith(itemsForInclude.join(''));
        $('#surprise_box_placeHolder_exclude').replaceWith(itemsForExlude.join(''));
    });

});