var categoryList = new Array();
var tempCategoryList = new Array();

function initializeCategory() {
    for(var i = 0; i < relatedItems.length; i++) {
        if(!categoryList.includes(relatedItems[i].category)) {
            categoryList.push(relatedItems[i].category);
        }
    }

    fetch("../snippets/category-checkbox-snippet.html")
        .then(resp=>resp.text())
        .then(function(productHtml) {
            var tempHtml = productHtml;
            var productList;
            for(var i = 0; i < categoryList.length; i++) {
                productHtml = insertProperty(productHtml, "category", categoryList[i]);

                if(productList === undefined) {
                    productList = productHtml;
                }

                else {
                    productList += productHtml;
                }
                productHtml = tempHtml;
            }

            appendHtml("#filter", productList);
        })
}

function filterCategory(category, checkbox) {

    if(checkbox.checked) {
        for(var i = 0; i < relatedItems.length; i++) {
            if(category != relatedItems[i].category) {
                relatedItems.splice(i, 1);
                i--;
            }
        }

        tempCategoryList = JSON.parse(JSON.stringify(relatedItems));
    }

    else {
        if(priceRangeItems.length == 0) {
            relatedItems = JSON.parse(JSON.stringify(tempRelatedItems));
        }
        else {
            relatedItems = JSON.parse(JSON.stringify(priceRangeItems));
        }
    }

    updatePorductList();
}

function filterPriceIncreasing() {
    var categoryCheckboxes = document.getElementsByClassName("category-checkbox");

    for(var i = 0; i < categoryCheckboxes.length; i++) {
        if(categoryCheckboxes[i].checked) {
            if(document.getElementById('increasingCheck').checked) {
                relatedItems.sort(compareOne);
            }

            else {
                relatedItems = JSON.parse(JSON.stringify(tempCategoryList));
            }

            document.getElementById('decreasingCheck').checked = false;
            updatePorductList();
            return;
        }
    }
}

function filterPriceDecreasing() {
    var categoryCheckboxes = document.getElementsByClassName("category-checkbox");

    for(var i = 0; i < categoryCheckboxes.length; i++) {
        if(categoryCheckboxes[i].checked) {
            if(document.getElementById('decreasingCheck').checked) {
                relatedItems.sort(compareTwo);
            }

            else {
                relatedItems = JSON.parse(JSON.stringify(tempCategoryList));
            }

            document.getElementById('increasingCheck').checked = false;
            updatePorductList();
            return;
        }
    }
}