var cartItemCount = 0;
var cartValues = document.querySelectorAll('.cart-total .price-value');
//localStorage.removeItem("cartValue");
//localStorage.removeItem("cartItems");
var cartTotal = parseFloat(localStorage.getItem("cartValue"));
if(Number.isNaN(cartTotal)) {
    cartTotal = 0;
}

var storedCart = JSON.parse(localStorage.getItem("cartItems"));
var cartItems = new Array();

if(storedCart != null) {
    for(var i = 0; i < storedCart.length; i++) {
        cartItems[cartItemCount] = new Array(storedCart[i][0], storedCart[i][1], storedCart[i][2]);
        cartItemCount++;
    }
    if(storedCart.length != 0) {
        loadCartPage();
    }
}

if(cartItemCount == 0) {
    cartTotal = 0;
}

for(var i = 0; i < cartValues.length; i++){
    cartValues[i].innerHTML = cartTotal;
}

function loadCartPage() {
    fetch("../snippets/cart-page-items-snippet.html")
        .then(resp=>resp.text())
        .then(function(data) {
            var element = document.getElementById("cart-page-list");
            var imageString;

            var tempData = data;
            for(var i = 0; i < cartItemCount; i++) {
                imageString = 'https://' + cartItems[i][2];
                tempData = insertProperty(tempData, "name", cartItems[i][0]);
                tempData = insertProperty(tempData, "price", cartItems[i][1]);
                tempData = insertProperty(tempData, "image", imageString);
                tempData = insertProperty(tempData, "cart-id", i+1);
                element.innerHTML += tempData;
                tempData = data;
            }

            for(var i = 0; i < cartValues.length; i++){
                cartValues[i].innerHTML = cartTotal;
            }
        })
}

function loadCart() {
    fetch("../snippets/cart-items-snippet.html")
        .then(resp=>resp.text())
        .then(function(data) {
            var element = document.getElementById("cart-list");
            var imageString;

            var tempData = data;
            for(var i = 0; i < cartItemCount; i++) {
                imageString = 'https://' + cartItems[i][2];
                tempData = insertProperty(tempData, "name", cartItems[i][0]);
                tempData = insertProperty(tempData, "price", cartItems[i][1]);
                tempData = insertProperty(tempData, "image", imageString);
                tempData = insertProperty(tempData, "cart-id", i+1);
                element.innerHTML += tempData;
                tempData = data;
            }

            for(var i = 0; i < cartValues.length; i++){
                cartValues[i].innerHTML = cartTotal;
            }
        })
}

function removeCartPageItem(id, price) {
    cartItemCount--;
    var value = parseInt(id);
    value = value - 1;

    cartItems.splice(value, 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    var element = document.getElementById("cart-page-list");
    element.innerHTML = "";
    loadCartPage();
    removeItem(id, price);
}

function removeItem(id, price) {
    cartItemCount--;
    var value = parseInt(id);
    value = value - 1;

    var itemPrice = parseFloat(price);
    cartTotal -= itemPrice;
    if(cartItemCount == 0) {
        cartTotal = 0;
    }
    localStorage.setItem("cartValue", cartTotal.toString());

    cartItems.splice(value, 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    var element = document.getElementById("cart-list");
    element.innerHTML = "";
    loadCart();
}

var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
};

var insertProperty = function (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    string = string.replace(new RegExp(propToReplace, "g"), propValue);
    return string;
};