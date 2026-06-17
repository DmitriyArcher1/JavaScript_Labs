/**
 * Возводит число x в степень n
 * @param {number} x - Основание степени
 * @param {number} n - Показатель степени (целое число)
 * @returns {number} Результат возведения в степень
 * @throws {Error} Если n не является целым числом
 * 
 * @example
 * pow(2, 2) => 4
 * pow(2, 0) => 1
 * pow(2, -2) => 0.25
 */
function pow(x, n) {
    if (!Number.isInteger(n)) {
        throw new Error("Степень n должна быть целым числом");
    }
    
    if (n < 0) {
        return 1 / pow(x, -n);
    }
    
    if (n === 0) {
        return 1;
    }
    
    let result = 1;
    for (let i = 0; i < n; i++) {
        result *= x;
    }
    return result;
}

/**
 * Вычисляет сумму чисел от 1 до n включительно
 * @param {number} n - Натуральное число
 * @returns {number} Сумма чисел от 1 до n
 * 
 * @example
 * sumTo(100) => 5050
 */
function sumTo(n) {
    if (n <= 0) return 0;
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/**
 * Проверяет, является ли год високосным
 * @param {number} year - Год для проверки
 * @returns {boolean} true если год високосный, false в противном случае
 * 
 * @example
 * isLeapYear(2024) => true
 * isLeapYear(2025) => false
 * isLeapYear(2000) => true
 * isLeapYear(1900) => false
 */
function isLeapYear(year) {
    return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
}

/**
 * Вычисляет факториал числа n рекурсивно
 * @param {number} n - Неотрицательное целое число
 * @returns {bigint} Факториал числа n в формате BigInt
 * @throws {Error} Если n отрицательное
 * 
 * @example
 * factorial(0) => 1n
 * factorial(5) => 120n
 */
function factorial(n) {
    const num = Number(n);
    
    if (num < 0) {
        throw new Error("Факториал определён только для неотрицательных чисел");
    }
    
    if (num === 0 || num === 1) {
        return 1n;
    }
    
    return BigInt(num) * factorial(num - 1);
}

/**
 * Вычисляет n-е число Фибоначчи
 * @param {number} n - Индекс числа Фибоначчи (неотрицательное целое число)
 * @returns {bigint} n-е число Фибоначчи в формате BigInt
 * @throws {Error} Если n отрицательное
 * 
 * @example
 * fib(0) => 0n
 * fib(100) => 354224848179261915075n
 */
function fib(n) {
    const num = Number(n);
    
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

/**
 * Создаёт функцию сравнения с заданным числом x
 * @param {number} x - Базовое число для сравнения
 * @returns {Function} Функция, принимающая число y и возвращающая:
 *                     - true, если y > x
 *                     - false, если y < x
 *                     - null, если y === x
 * 
 * @example
 * compare(5)(4) => false
 * compare(5)(5) => null
 * compare(5)(6) => true
 */
function compare(x) {
    return function(y) {
        if (y > x) {
            return true;
        } else if (y < x) {
            return false;
        } else {
            return null;
        }
    };
}

/**
 * Вычисляет сумму всех переданных аргументов
 * @param {...number} args - Числа для суммирования
 * @returns {number} Сумма всех аргументов
 * 
 * @example
 * sum() => 0
 * sum(1) => 1
 * sum(1, 2) => 3
 */
function sum(...args) {
    // Используем умножение на 10^n для точного сложения десятичных дробей
    // Находим максимальное количество знаков после запятой
    let maxDecimals = 0;
    
    args.forEach(arg => {
        if (typeof arg === 'number' && !Number.isInteger(arg)) {
            const str = String(arg);
            const decimalPart = str.split('.')[1];
            if (decimalPart) {
                maxDecimals = Math.max(maxDecimals, decimalPart.length);
            }
        }
    });
    
    // Если есть десятичные дроби, умножаем на 10^maxDecimals для точного сложения
    if (maxDecimals > 0) {
        const multiplier = Math.pow(10, maxDecimals);
        const sum = args.reduce((total, current) => {
            return total + Math.round(current * multiplier);
        }, 0);
        return sum / multiplier;
    }
    
    // Для целых чисел используем обычное сложение
    return args.reduce((total, current) => total + current, 0);
}

/**
 * Добавляет к объекту символьное свойство blackSpot из глобального реестра
 * @param {Object} obj - Объект, к которому будет добавлено свойство
 * @returns {Object} Исходный объект с добавленным свойством
 * 
 * @example
 * addBlackSpot({}) => {[Symbol.for("blackSpot")]: true}
 */
function addBlackSpot(obj) {
    const blackSpotSymbol = Symbol.for("blackSpot");
    obj[blackSpotSymbol] = true;
    return obj;
}

// Для браузера: делаем функции глобальными
if (typeof window !== 'undefined') {
    window.pow = pow;
    window.sumTo = sumTo;
    window.isLeapYear = isLeapYear;
    window.factorial = factorial;
    window.fib = fib;
    window.compare = compare;
    window.sum = sum;
    window.addBlackSpot = addBlackSpot;
}

// Для Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        pow,
        sumTo,
        isLeapYear,
        factorial,
        fib,
        compare,
        sum,
        addBlackSpot
    };
}