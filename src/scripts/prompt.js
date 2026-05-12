'use strict';

function requestNumberGreaterThen100() {
    let userInput;

    while (true) {
        userInput = prompt("Введите число, не меньше 100");

        if (userInput === null) {
            return false;
        }

        const number = Number(userInput);

        if (!isNaN(userInput) && number > 100) {
            return true;
        }

        alert('Ошибка! Нужно ввести число не меньше 100')
    }
};

const link = document.getElementById('numberLink');

link.addEventListener('click', function(event) {
    const isSuccess = requestNumberGreaterThen100();

    if (isSuccess) {
        return true;
    } else {
        const allowTransition = confirm("Вы не ввели число меньшее 100, попробуйте ещё раз");
    }

    if (!allowTransition) {
        event.preventDefault();
    }
});