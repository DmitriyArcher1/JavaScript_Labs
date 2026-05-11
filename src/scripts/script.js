'use strict';

(function() {
    // получаю DOM элементы
    const form = document.getElementById('pensionForm');
    const ageInput = document.getElementById('ageInput');
    const resultTextarea = document.getElementById('resultField');
    
    // функция для сброса  стилизации ошибок
    function clearValidationStyles() {
        ageInput.classList.remove('error-marker');
    }
    
    function getPensionMessage(age, gender) {

        if (isNaN(age) || age === null || age === undefined || age === '') {
            return "Да кто ты такой вообще?";
        }

        const ageNum = Number(age);
        if (!Number.isInteger(ageNum) || !isFinite(ageNum)) {
            return "Да кто ты такой вообще?";
        }
        
        // основные задания по таске
        // 1) возраст от 0 до 17 включительно
        if (ageNum >= 0 && ageNum <= 17) {
            return "Вам работать ещё рано — учитесь";
        }
        
        // 2) проверка пола
        if (gender === 'male') {

            if (ageNum >= 18 && ageNum <= 59) {
                return "Вам ещё работать и работать";
            }
            else if (ageNum >= 60 && ageNum <= 64) {
                return "Скоро пенсия!";
            }
            else if (ageNum >= 65) {
                return "Вам пора на пенсию";
            }
            else {
                return "Да кто ты такой вообще?";
            }
        } 
        else if (gender === 'female') {
            if (ageNum >= 18 && ageNum <= 54) {
                return "Вам ещё работать и работать";
            }
            else if (ageNum >= 55 && ageNum <= 59) {
                return "Скоро пенсия!";
            }
            else if (ageNum >= 60) {
                return "Вам пора на пенсию";
            }
            else {
                return "Да кто ты такой вообще?";
            }
        }
        else {
            return "Да кто ты такой вообще?";
        }
    }
    
    // обработчик отправки формы
    function onFormSubmit(event) {
        event.preventDefault();
        
        clearValidationStyles();
        
        let ageValue = ageInput.value.trim();
        let ageNumber = null;
        let ageErrorFlag = false;
        
        if (ageValue === "") {
            ageErrorFlag = true;
            ageInput.classList.add('error-marker');
        } else {
            const parsed = Number(ageValue);

            if (isNaN(parsed) || !Number.isInteger(parsed) || parsed < 0 || parsed > 200) {
                ageErrorFlag = true;
                ageInput.classList.add('error-marker');
            } else {
                ageNumber = parsed;
            }
        }
        
        let selectedGender = null;
        const genderRadios = document.querySelectorAll('input[name="gender"]');
        for (let radio of genderRadios) {
            if (radio.checked) {
                selectedGender = radio.value;
                break;
            }
        }
        
        let isGenderValid = (selectedGender === 'male' || selectedGender === 'female');
        
        if (ageErrorFlag || !isGenderValid) {

            let errorMsg = "Да кто ты такой вообще?";
            resultTextarea.value = errorMsg;
            
            if (!isGenderValid) {
                const genderGroupDiv = document.querySelector('.gender-group');
                if (genderGroupDiv) {
                    genderGroupDiv.style.transition = "0.1s";
                    genderGroupDiv.style.border = "2px solid #d9534f";
                    setTimeout(() => {
                        if (genderGroupDiv) genderGroupDiv.style.border = "";
                    }, 1000);
                }
            }
            if (ageErrorFlag) {
                ageInput.classList.add('error-marker');
            }
            return;
        }
        
        const genderGroupDiv = document.querySelector('.gender-group');
        if (genderGroupDiv) genderGroupDiv.style.border = "";
        
        const finalMessage = getPensionMessage(ageNumber, selectedGender);
        resultTextarea.value = finalMessage;
    }
    
    form.addEventListener('submit', onFormSubmit);
    
    ageInput.addEventListener('focus', function() {
        ageInput.classList.remove('error-marker');
    });
    
    const allRadios = document.querySelectorAll('input[name="gender"]');
    allRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const genderGroup = document.querySelector('.gender-group');
            if (genderGroup) genderGroup.style.border = "";
        });
    });
    
    resultTextarea.value = "";
})();