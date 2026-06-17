/**
 * Возвращает дробную часть числа
 * @param {number} num - Число для обработки
 * @returns {number} Дробная часть числа
 * 
 * @example
 * getDecimal(1.23) => 0.23
 * getDecimal(-1.23) => 0.77
 * getDecimal(1) => 0
 */
function getDecimal(num) {
    // Для целых чисел возвращаем 0
    if (Number.isInteger(num)) {
        return 0;
    }
    
    // Для положительных чисел используем остаток от деления на 1
    if (num > 0) {
        return parseFloat((num % 1).toFixed(10));
    }
    
    // Для отрицательных чисел: вычитаем целую часть
    // Math.floor(-1.23) = -2, поэтому -1.23 - (-2) = 0.77
    const integerPart = Math.floor(num);
    return parseFloat((num - integerPart).toFixed(10));
}

/**
 * Делит числа с остатком
 * @param {number} divident - Делимое
 * @param {number} divisor - Делитель
 * @returns {Array} Массив [частное, остаток]
 * 
 * @example
 * divmod(7, 3) => [2, 1]
 * divmod(-7, 3) => [-3, 2]
 * divmod(7, -3) => [-3, -2]
 * divmod(0, 0) => [NaN, NaN]
 */
function divmod(divident, divisor) {
    if (divisor === 0) {
        return [NaN, NaN];
    }
    const quotient = Math.floor(divident / divisor);
    const remainder = divident - quotient * divisor;
    return [quotient, remainder];
}

/**
 * Возвращает строку с заглавным первым символом
 * @param {string} str - Входная строка
 * @returns {string} Строка с заглавным первым символом
 * 
 * @example
 * ucFirst('') => ''
 * ucFirst('hello') => 'Hello'
 * ucFirst('привет') => 'Привет'
 */
function ucFirst(str) {
    if (str === '') return '';
    return str[0].toUpperCase() + str.slice(1);
}

/**
 * Нормализует URL, добавляя https:// в начале
 * @param {string} url - Адрес сайта
 * @returns {string} Нормализованный URL
 * 
 * @example
 * normalizeUrl('yandex.ru') => 'https://yandex.ru'
 * normalizeUrl('http://yandex.ru') => 'https://yandex.ru'
 * normalizeUrl('https://yandex.ru') => 'https://yandex.ru'
 * normalizeUrl('https.ru') => 'https://https.ru'
 */
function normalizeUrl(url) {
    let cleanUrl = url;
    if (cleanUrl.startsWith('http://')) {
        cleanUrl = cleanUrl.slice(7);
    } else if (cleanUrl.startsWith('https://')) {
        cleanUrl = cleanUrl.slice(8);
    }
    return 'https://' + cleanUrl;
}

/**
 * Проверяет, содержит ли строка запрещённые слова
 * @param {string} str - Проверяемая строка
 * @returns {boolean} true если содержит 'viagra' или 'XXX', иначе false
 * 
 * @example
 * checkSpam('_XxX_') => true
 * checkSpam('__Viagra__') => true
 * checkSpam('test') => false
 */
function checkSpam(str) {
    const lowerStr = str.toLowerCase();
    return lowerStr.includes('viagra') || lowerStr.includes('xxx');
}

/**
 * Обрезает строку до указанной длины, добавляя многоточие
 * @param {string} str - Исходная строка
 * @param {number} maxlength - Максимальная длина
 * @returns {string} Обрезанная строка
 * 
 * @example
 * truncate('Мама мыла раму.', 100) => 'Мама мыла раму.'
 * truncate('Мама мыла раму.', 10) => 'Мама мыла…'
 */
function truncate(str, maxlength) {
    if (str.length <= maxlength) {
        return str;
    }
    return str.slice(0, maxlength - 1) + '…';
}

/**
 * Преобразует строку из kebab-case в camelCase
 * @param {string} str - Строка в kebab-case
 * @returns {string} Строка в camelCase
 * 
 * @example
 * camelize('var-test-text') => 'varTestText'
 */
function camelize(str) {
    return str.split('-').map((word, index) => {
        if (index === 0) return word;
        return ucFirst(word);
    }).join('');
}

/**
 * Возвращает массив чисел Фибоначчи до n-го (не включая его)
 * @param {number} n - Количество чисел Фибоначчи
 * @returns {bigint[]} Массив чисел Фибоначчи
 * 
 * @example
 * fibs(5) => [0n, 1n, 1n, 2n, 3n]
 */
function fibs(n) {
    function fibLocal(num) {
        if (num < 0) {
            throw new Error("Число Фибоначчи определено только для неотрицательных индексов");
        }
        if (num === 0) return 0n;
        if (num === 1) return 1n;
        
        let prev = 0n;
        let curr = 1n;
        for (let i = 2; i <= num; i++) {
            const next = prev + curr;
            prev = curr;
            curr = next;
        }
        return curr;
    }
    
    const result = [];
    for (let i = 0; i < n; i++) {
        result.push(fibLocal(i));
    }
    return result;
}

/**
 * Сортирует массив по убыванию без изменения исходного массива
 * @param {number[]} arr - Исходный массив
 * @returns {number[]} Отсортированный массив
 * 
 * @example
 * arrReverseSorted([1, 3, 22]) => [22, 3, 1]
 */
function arrReverseSorted(arr) {
    return [...arr].sort((a, b) => b - a);
}

/**
 * Возвращает массив уникальных значений
 * @param {any[]} arr - Исходный массив
 * @returns {any[]} Массив уникальных значений
 * 
 * @example
 * unique([0, 1, 1, 2]) => [0, 1, 2]
 * unique(['a', 'b', 'c', 'c']) => ['a', 'b', 'c']
 */
function unique(arr) {
    return [...new Set(arr)];
}