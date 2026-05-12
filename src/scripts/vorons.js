'use strict';

function getCrowEnding(number) {
    const lastTwoDigits = Math.abs(number) % 100;
    const lastDigit = lastTwoDigits % 10;

    switch(true) {
        case (lastTwoDigits >= 11 && lastTwoDigits <= 14):
            return "ворон";
    }

    switch(lastDigit) {
        case 1:
            return 'ворона';
        case 2:
        case 3:
        case 4:
            return 'вороны';
        default:
            return 'ворон'
    }
}

function showCrowsCount() {
    const inputElement = document.getElementById('valueInput');
    let num = parseInt(inputElement.value, 10);

    if (isNaN(num)) {
        alert("Введите целое число!")
        return;
    }

    const absoluteNum = Math.abs(num);

    const ending = getCrowEnding(absoluteNum);

    const message = `На ветке сидит ${absoluteNum} ${ending}`;

    alert(message);
}

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('count-btn');
    if (button) {
        button.addEventListener('click', showCrowsCount);
    }
});