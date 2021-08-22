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
            data = insertProperty(data, "name", name);
            data = insertProperty(data, "price", Number(price).toFixed(2));
            data = insertProperty(data, "image", image);
            data = insertProperty(data, "cart-id", cartItemCount);

            element.innerHTML += data;

            for(var i = 0; i < cartValues.length; i++){
                cartValues[i].innerHTML = cartTotal;
            }
        })
}

var query = window.location.search;
if(!query.includes("?id="))
    window.location.href = 'https://ayrov.github.io/Online-Store-Website-Demo/index.html';
var productID = query.split("=")[1];

var fetchURL = 'https://fakestoreapi.com/products' + '/' + productID;
fetch(fetchURL)
    .then(res=>res.json())
    .then(data=>{
        fetch("https://ayrov.github.io/Online-Store-Website-Demo/snippets/product-page-snippet.html")
            .then(resp=>resp.text())
            .then(productPageHTML=> {
                productPageHTML = insertProperty(productPageHTML, "image", data.image);
                productPageHTML = insertProperty(productPageHTML, "id", data.id);
                productPageHTML = insertProperty(productPageHTML, "name", data.title);
                productPageHTML = insertProperty(productPageHTML, "price", Number(data.price).toFixed(2));

                insertHtml("#main-content", productPageHTML);
            })
    })

var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
};

var insertProperty = function (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    string = string.replace(new RegExp(propToReplace, "g"), propValue);
    return string;
};