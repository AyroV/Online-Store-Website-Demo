function add(name, price, image) {
    fetch("https://ayrov.github.io/Online-Store-Website-Demo/snippets/cart-items-snippet.html")
        .then(resp=>resp.text())
        .then(function(data) {
            var value = parseFloat(price);
            cartTotal += value;

            cartItems[cartItemCount] = new Array(name, price, image);
            cartItemCount++;
            sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
            sessionStorage.setItem("cartValue", cartTotal.toString());

            var element = document.getElementById("cart-list");
            var imageString = 'https://' + image;
            data = insertProperty(data, "name", name);
            data = insertProperty(data, "price", price);
            data = insertProperty(data, "image", imageString);
            data = insertProperty(data, "cart-id", cartItemCount);

            element.innerHTML += data;

            for(var i = 0; i < cartValues.length; i++){
                cartValues[i].innerHTML = cartTotal;
            }
        })
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