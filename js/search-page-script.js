var searchString = sessionStorage.getItem("searchbarValue");
var searchType = sessionStorage.getItem("searchType");
sessionStorage.removeItem("searchType");
sessionStorage.setItem("searchbarValue", "");

var relatedItems = new Array();
var tempRelatedItems = new Array();
var priceRangeItems = new Array();

fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(function (data) {
            fetch("https://ayrov.github.io/Online-Store-Website-Demo/snippets/search-page-product-snippet.html")
                .then(resp=>resp.text())
                .then(function(productHtml) {

                    if(searchString == "") {
                        for(var i = 0; i < data.length; i++) {
                            relatedItems.push(data[i]);
                        }
                    }

                    else {
                        for(var i = 0; i < data.length; i++) {
                            if(data[i].title.includes(searchString) && searchType != "category") {
                                relatedItems.push(data[i]);
                            }
    
                            else if(data[i].category == searchString && searchType == "category") {
                                relatedItems.push(data[i]);
                            }
                        }
                    }

                    tempRelatedItems = JSON.parse(JSON.stringify(relatedItems));

                    var tempHtml = productHtml;
                    var productList;
                    for(var i = 0; i < relatedItems.length; i++) {
                        productHtml = insertProperty(productHtml, "id", relatedItems[i].id);
                        productHtml = insertProperty(productHtml, "name", relatedItems[i].title);
                        productHtml = insertProperty(productHtml, "page-html", relatedItems[i].title);
                        productHtml = insertProperty(productHtml, "price", relatedItems[i].price);
                        productHtml = insertProperty(productHtml, "image", relatedItems[i].image);

                        if(productList === undefined) {
                            productList = productHtml;
                        }
    
                        else {
                            productList += productHtml;
                        }
                        productHtml = tempHtml;
                    }

                    insertHtml("#search-page-list", productList);
                    if(relatedItems.length == 0) {
                        fetch("https://ayrov.github.io/Online-Store-Website-Demo/snippets/search-failed-snippet.html")
                            .then(resp=>resp.text())
                            .then(function(productHtml) {
                                insertHtml("#search-page-content", productHtml);
                            })
                    }
                })
        })

var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
};

var appendHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML += html;
};

var insertProperty = function (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    string = string.replace(new RegExp(propToReplace, "g"), propValue);
    return string;
};

function filterPriceIncreasing(deviceType) {
    if(deviceType == 'desktop') {
        if(!document.getElementById('increasingCheck').checked) {
            if(priceRangeItems.length == 0) {
                relatedItems = JSON.parse(JSON.stringify(tempRelatedItems));
            }
            else {
                relatedItems = JSON.parse(JSON.stringify(priceRangeItems));
            }
        }
    
        else {
            if(priceRangeItems.length == 0) {
                relatedItems = JSON.parse(JSON.stringify(tempRelatedItems));
            }
            else {
                relatedItems = JSON.parse(JSON.stringify(priceRangeItems));
            }
            relatedItems.sort(compareOne);
        }
    }

    else {
        if(!document.getElementById('increasingCheckMobile').checked) {
            if(priceRangeItems.length == 0) {
                relatedItems = JSON.parse(JSON.stringify(tempRelatedItems));
            }
            else {
                relatedItems = JSON.parse(JSON.stringify(priceRangeItems));
            }
        }
    
        else {
            if(priceRangeItems.length == 0) {
                relatedItems = JSON.parse(JSON.stringify(tempRelatedItems));
            }
            else {
                relatedItems = JSON.parse(JSON.stringify(priceRangeItems));
            }
            relatedItems.sort(compareOne);
        }
    }
    document.getElementById('decreasingCheck').checked = false;
    document.getElementById('decreasingCheckMobile').checked = false;
    updatePorductList();
}

function filterPriceDecreasing(deviceType) {
    if(deviceType == 'desktop') {
        if(!document.getElementById('decreasingCheck').checked) {
            if(priceRangeItems.length == 0) {
                relatedItems = JSON.parse(JSON.stringify(tempRelatedItems));
            }
            else {
                relatedItems = JSON.parse(JSON.stringify(priceRangeItems));
            }
        }
    
        else {
            if(priceRangeItems.length == 0) {
                relatedItems = JSON.parse(JSON.stringify(tempRelatedItems));
            }
            else {
                relatedItems = JSON.parse(JSON.stringify(priceRangeItems));
            }
            relatedItems.sort(compareTwo);
        }
    }

    else {
        if(!document.getElementById('decreasingCheckMobile').checked) {
            if(priceRangeItems.length == 0) {
                relatedItems = JSON.parse(JSON.stringify(tempRelatedItems));
            }
            else {
                relatedItems = JSON.parse(JSON.stringify(priceRangeItems));
            }
        }
    
        else {
            if(priceRangeItems.length == 0) {
                relatedItems = JSON.parse(JSON.stringify(tempRelatedItems));
            }
            else {
                relatedItems = JSON.parse(JSON.stringify(priceRangeItems));
            }
            relatedItems.sort(compareTwo);
        }
    }
    document.getElementById('increasingCheck').checked = false;
    document.getElementById('increasingCheckMobile').checked = false;
    updatePorductList();
}

function filterPriceRange(priceRange, checkbox) {
    var rangeOne = priceRange.split("-")[0];
    var rangeTwo = priceRange.split("-")[1];

    if(checkbox.checked) {
        rangeOne = parseInt(rangeOne);
        if(rangeTwo != 'inf') {
            rangeTwo = parseInt(rangeTwo);
            for(var i = 0; i < tempRelatedItems.length; i++) {
                if(tempRelatedItems[i].price > rangeOne && tempRelatedItems[i].price < rangeTwo) {
                    priceRangeItems.push(tempRelatedItems[i]);
                }
            }
        }

        else {
            for(var i = 0; i < tempRelatedItems.length; i++) {
                if(tempRelatedItems[i].price > rangeOne) {
                    priceRangeItems.push(tempRelatedItems[i]);
                }
            }
        }
    }

    else {
        if(rangeTwo != 'inf') {
            rangeTwo = parseInt(rangeTwo);
            for(var i = 0; i < priceRangeItems.length; i++) {
                if(priceRangeItems[i].price > rangeOne && priceRangeItems[i].price < rangeTwo) {
                    priceRangeItems.splice(i, 1);
                    i--;
                }
            }
        }

        else {
            for(var i = 0; i < priceRangeItems.length; i++) {
                if(priceRangeItems[i].price > rangeOne) {
                    priceRangeItems.splice(i, 1);
                    i--;
                }
            }
        }
    }

    if(priceRangeItems.length == 0) {
        relatedItems = JSON.parse(JSON.stringify(tempRelatedItems));
    }

    else {
        relatedItems = JSON.parse(JSON.stringify(priceRangeItems));
    }

    if(document.getElementById('increasingCheck').checked || document.getElementById('increasingCheckMobile').checked) {
        relatedItems.sort(compareOne);
    }

    else if(document.getElementById('decreasingCheck').checked || document.getElementById('decreasingCheckMobile').checked) {
        relatedItems.sort(compareTwo);
    }

    updatePorductList();
}

function compareOne(a, b) {
    if(a.price > b.price || a.price == b.price) {
        return 1;
    }

    if(b.price > a.price) {
        return -1;
    }

    return 0;
}

function compareTwo(a, b) {
    if(a.price > b.price || a.price == b.price) {
        return -1;
    }

    if(b.price > a.price) {
        return 1;
    }

    return 0;
}

function updatePorductList() {
    fetch("https://ayrov.github.io/Online-Store-Website-Demo/snippets/search-page-product-snippet.html")
        .then(resp=>resp.text())
        .then(function(productHtml) {
            var tempHtml = productHtml;
            var productList;
            for(var i = 0; i < relatedItems.length; i++) {
                productHtml = insertProperty(productHtml, "id", relatedItems[i].id);
                productHtml = insertProperty(productHtml, "name", relatedItems[i].title);
                productHtml = insertProperty(productHtml, "page-html", relatedItems[i].title);
                productHtml = insertProperty(productHtml, "price", relatedItems[i].price);
                productHtml = insertProperty(productHtml, "image", relatedItems[i].image);

                if(productList === undefined) {
                    productList = productHtml;
                }

                else {
                    productList += productHtml;
                }
                productHtml = tempHtml;
            }

            insertHtml("#search-page-list", productList);
        })
}