let priceInput = document.querySelector(".priceInput");
let amountInput = document.querySelector(".amountInput");
let enterLimit = document.querySelector(".enterLimit");
let enterMarket = document.querySelector(".enterMarket");
let exitLimit = document.querySelector(".exitLimit");
let exitMarket = document.querySelector(".exitMarket");
let byPrice = document.querySelector(".byPrice");
let calculateButton = document.querySelector(".calculateBtn");
let selectedEnterType = "limit";
let selectedExitType = "limit";


function onKeyPressHandlersForInputs() {
    priceInput.onkeypress = function() {
        let ex = /^[0-9]+\.?[0-9]*$/;
        if(ex.test(priceInput.value) == false) {
            priceInput.value = priceInput.value.substring(0, priceInput.value.length - 1);
        }
    }
    
    amountInput.onkeypress = function() {
        let ex = /^[0-9]+\.?[0-9]*$/;
        if(ex.test(priceInput.value) == false) {
            priceInput.value = priceInput.value.substring(0, priceInput.value.length - 1);
        }
    }
}

function changeStyleForSelectorButtons() {
    enterLimit.onclick = function() {
        if(enterLimit.classList.contains('selectedBtn')) {
            return false;
        } else {
            enterLimit.classList.add("selectedBtn");
            enterMarket.classList.remove("selectedBtn");
            selectedEnterType = "limit";
        }
    }

    enterMarket.onclick = function() {
        if(enterMarket.classList.contains('selectedBtn')) {
            return false;
        } else {
            enterMarket.classList.add("selectedBtn");
            enterLimit.classList.remove("selectedBtn");
            selectedEnterType = "market";
        }
    }

    exitLimit.onclick = function() {
        if(exitLimit.classList.contains('selectedBtn')) {
            return false;
        } else {
            exitLimit.classList.add("selectedBtn");
            exitMarket.classList.remove("selectedBtn");
            selectedExitType = "limit";
        }
    }

    exitMarket.onclick = function() {
        if(exitMarket.classList.contains('selectedBtn')) {
            return false;
        } else {
            exitMarket.classList.add("selectedBtn");
            exitLimit.classList.remove("selectedBtn");
            selectedExitType = "market";
        }
    }
}

function calculateByPrice() {
    let enterPrice = parseFloat(priceInput.value);
    let amount = parseFloat(amountInput.value);
    let totalTaxes = 0;

    if(selectedEnterType === "limit" && selectedExitType === "limit") {
        totalTaxes = 0.040;
    } else if(selectedEnterType === "market" && selectedExitType === "market") {
        totalTaxes = 0.080;
    } else {
        totalTaxes = 0.060;
    }

    let amountInUSDT = (amount * enterPrice);
    let taxesInUSDT = (amountInUSDT * totalTaxes) / 100;
    let priceMovement = taxesInUSDT / amount;
    let totalPriceLong = (priceMovement + enterPrice).toFixed(5);
    let totalPriceShort = (enterPrice - priceMovement).toFixed(5);
    byPrice.innerHTML = "БУ для лонга - " + totalPriceLong + "$"+ "<br>" + "БУ для шорта - " + totalPriceShort + "$";


}


onKeyPressHandlersForInputs();
changeStyleForSelectorButtons();
calculateButton.onclick = calculateByPrice;
