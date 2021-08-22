var cartItemCount = 0;
var cartValues = document.querySelectorAll('.cart-total .price-value');
//localStorage.removeItem("cartValue");
//localStorage.removeItem("cartItems");
var cartTotal = parseFloat(sessionStorage.getItem("cartValue"));
if(Number.isNaN(cartTotal)) {
    cartTotal = 0;
}

var storedCart = JSON.parse(sessionStorage.getItem("cartItems"));
var cartItems = new Array();

if(storedCart != null) {
    for(var i = 0; i < storedCart.length; i++) {
        cartItems[cartItemCount] = new Array(storedCart[i][0], storedCart[i][1], storedCart[i][2]);
        cartItemCount++;
    }
    if(storedCart.length != 0) {
        loadCart();
    }
}

if(cartItemCount == 0) {
    cartTotal = 0;
}

for(var i = 0; i < cartValues.length; i++){
    cartValues[i].innerHTML = cartTotal;
}

function loadCart() {
    fetch("https://ayrov.github.io/Online-Store-Website-Demo/snippets/cart-items-snippet.html")
        .then(resp=>resp.text())
        .then(function(data) {
            var element = document.getElementById("cart-list");
            var imageString;

            var tempData = data;
            for(var i = 0; i < cartItemCount; i++) {
                imageString = cartItems[i][2];
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

function removeItem(id, price) {
    cartItemCount--;
    var value = parseInt(id);
    value = value - 1;

    var itemPrice = parseFloat(price);
    cartTotal -= itemPrice;
    if(cartItemCount == 0) {
        cartTotal = 0;
    }
    sessionStorage.setItem("cartValue", cartTotal.toString());

    cartItems.splice(value, 1);
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));

    var element = document.getElementById("cart-list");
    element.innerHTML = "";
    loadCart();
}


var input = document.getElementById("searchbarOne");
input.addEventListener("keyup", function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    document.getElementById("searchbarButton").click();
  }
});

// function categoryClick(category) {
//     sessionStorage.setItem("searchbarValue", category);
//     document.location.href = "../search-page.html";
// }

// function searchbar(searchbarID) {
//     var searchBar = document.getElementById(searchbarID);
//     var searchString = searchBar.value;

//     sessionStorage.setItem("searchbarValue", searchString);
//     document.location.href = "../search-page.html";
// }

function loadProductPage(productID) {
    var productLink = 'https://fakestoreapi.com/products/' + productID;

    fetch(productLink)
            .then(res=>res.json())
            .then(function (data) {
                fetch("https://ayrov.github.io/Online-Store-Website-Demo/snippets/product-page-snippet.html")
                    .then(resp=>resp.text())
                    .then(function(productHtml) {
                        productHtml = insertProperty(productHtml, "id", data.id);
                        productHtml = insertProperty(productHtml, "name", data.title);
                        productHtml = insertProperty(productHtml, "price", data.price);
                        productHtml = insertProperty(productHtml, "image", data.image);
                        insertHtml("#main-content", productHtml);
                    })   
            })
}

Flickity.prototype.stopPlayer = function() {
    this.player.stop();
    this.player.play();
};

var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
};

var insertProperty = function (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    string = string.replace(new RegExp(propToReplace, "g"), propValue);
    return string;
};

function makeProductSliderCell(cellHTML) {
    var cell = document.createElement('div');
    cell.className = 'product-cell';
    cell.innerHTML = cellHTML;
    return cell;
}

//First product page
fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(function (data) {
        fetch("https://ayrov.github.io/Online-Store-Website-Demo/snippets/product-snippet.html")
            .then(resp=>resp.text())
            .then(function(productHtml) {
                var tempHtml = productHtml;
                var productList;
                for(var i = 0; i < 12; i++) {
                    if(data[i].title.includes('/')) {
                        data[i].title = data[i].title.replace('/', '');
                    }
                    productHtml = insertProperty(productHtml, "id", data[i].id);
                    productHtml = insertProperty(productHtml, "name", data[i].title);
                    productHtml = insertProperty(productHtml, "page-html", data[i].title);
                    productHtml = insertProperty(productHtml, "price", data[i].price);
                    productHtml = insertProperty(productHtml, "image", data[i].image);
                    if(productList === undefined) {
                        productList = productHtml;
                    }

                    else {
                        productList += productHtml;
                    }
                    productHtml = tempHtml;
                }

                insertHtml("#product-list", productList);
            })
    })

var productSlider = new Flickity(document.getElementById('product-carousel'));
//Product slider
fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(function (data) {
                fetch("https://ayrov.github.io/Online-Store-Website-Demo/snippets/product-on-slider-snippet.html")
                    .then(resp=>resp.text())
                    .then(function(productHtml) {
                        var tempHtml = productHtml;
                        for(var i = 9; i < 20; i++) {
                            if(data[i].title.includes('/')) {
                                data[i].title = data[i].title.replace('/', '');
                            }
                            productHtml = insertProperty(productHtml, "id", data[i].id);
                            productHtml = insertProperty(productHtml, "name", data[i].title);
                            productHtml = insertProperty(productHtml, "page-html", data[i].title);
                            productHtml = insertProperty(productHtml, "price", data[i].price);
                            productHtml = insertProperty(productHtml, "image", data[i].image);
                            var newCell = makeProductSliderCell(productHtml);
                            productSlider.insert(newCell);
                            productHtml = tempHtml;
                        }
                    })
            })