Flickity.prototype.stopPlayer = function() {
    this.player.stop();
    this.player.play();
};

function makeProductSliderCell(cellHTML) {
    var cell = document.createElement('div');
    cell.className = 'product-cell';
    cell.innerHTML = cellHTML;
    return cell;
}

function categoryClick(category) {
    localStorage.setItem("searchbarValue", category);
    document.location.href = "../search-page.html";
}

fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(function (data) {
        fetch("snippets/product-snippet.html")
            .then(resp=>resp.text())
            .then(function(productHtml) {
                var tempHtml = productHtml;
                var productList;
                for(var i = 0; i < 12; ++i) {
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
                fetch("snippets/product-on-slider-snippet.html")
                    .then(resp=>resp.text())
                    .then(function(productHtml) {
                        var tempHtml = productHtml;
                        for(var i = 9; i < 20; ++i) {
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

var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
};

var insertProperty = function (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    string = string.replace(new RegExp(propToReplace, "g"), propValue);
    return string;
};