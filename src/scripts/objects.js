/**
 * Класс Book - представляет книгу с названием, годом издания и ценой
 * @class
 */
class Book {
    /**
     * Создает экземпляр книги
     * @param {string} title - Название книги (не должно быть пустым)
     * @param {number} pubYear - Год издания (положительное число)
     * @param {number} price - Цена книги (положительное число)
     * @throws {Error} Если параметры не соответствуют требованиям
     */
    constructor(title, pubYear, price) {
        this._pubYear = pubYear; // защищённое поле
        this._price = price; // приватное поле
        
        // Используем сеттеры для валидации
        this.title = title;
        this.pubYear = pubYear;
        this.price = price;
    }
    
    /**
     * Выводит в консоль название и цену книги
     */
    show() {
        console.log(`Название: ${this.title}, Цена: ${this.price}`);
    }
    
    /**
     * Геттер для title
     * @returns {string} Название книги
     */
    get title() {
        return this._title;
    }
    
    /**
     * Сеттер для title с валидацией
     * @param {string} value - Название книги
     * @throws {Error} Если название - пустая строка
     */
    set title(value) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new Error('Название книги не должно быть пустой строкой');
        }
        this._title = value.trim();
    }
    
    /**
     * Геттер для pubYear (защищённое поле)
     * @returns {number} Год издания
     */
    get pubYear() {
        return this._pubYear;
    }
    
    /**
     * Сеттер для pubYear с валидацией
     * @param {number} value - Год издания
     * @throws {Error} Если год не является положительным числом
     */
    set pubYear(value) {
        if (typeof value !== 'number' || value <= 0 || !Number.isInteger(value)) {
            throw new Error('Год издания должен быть положительным целым числом');
        }
        this._pubYear = value;
    }
    
    /**
     * Геттер для price (приватное поле)
     * @returns {number} Цена книги
     */
    get price() {
        return this._price;
    }
    
    /**
     * Сеттер для price с валидацией
     * @param {number} value - Цена книги
     * @throws {Error} Если цена не является положительным числом
     */
    set price(value) {
        if (typeof value !== 'number' || value <= 0) {
            throw new Error('Цена должна быть положительным числом');
        }
        this._price = value;
    }
    
    /**
     * Статический метод сравнения книг по году издания
     * @param {Book} a - Первая книга
     * @param {Book} b - Вторая книга
     * @returns {number} Отрицательное число, если a.pubYear < b.pubYear,
     *                   положительное, если a.pubYear > b.pubYear,
     *                   ноль, если равны
     */
    static compare(a, b) {
        return a.pubYear - b.pubYear;
    }
}

/**
 * Проверяет, пустой ли объект
 * @param {Object} obj - Проверяемый объект
 * @returns {boolean|undefined} true - если объект пустой, 
 *                               false - если есть свойства,
 *                               undefined - для примитивных типов
 */
function isEmpty(obj) {
    // Проверка на примитивные типы
    if (typeof obj !== 'object' || obj === null) {
        return undefined;
    }
    
    // Проверка собственных свойств (включая символьные)
    const keys = Reflect.ownKeys(obj);
    return keys.length === 0;
}

/**
 * Класс для работы со списком классов
 */
class ClassList {
    /**
     * Создает объект с начальным списком классов
     * @param {string} className - Строка с классами, разделёнными пробелами
     */
    constructor(className = '') {
        this.className = className;
    }
    
    /**
     * Добавляет класс в список, если его там ещё нет
     * @param {string} cls - Добавляемый класс
     * @returns {ClassList} Возвращает сам объект для цепочки вызовов
     */
    addClass(cls) {
        if (typeof cls !== 'string' || cls.trim() === '') {
            return this;
        }
        
        const classes = this.className ? this.className.split(' ') : [];
        const trimmedCls = cls.trim();
        
        if (!classes.includes(trimmedCls)) {
            classes.push(trimmedCls);
            this.className = classes.join(' ');
        }
        
        return this;
    }
    
    /**
     * Удаляет класс из списка, если он есть
     * @param {string} cls - Удаляемый класс
     * @returns {ClassList} Возвращает сам объект для цепочки вызовов
     */
    removeClass(cls) {
        if (typeof cls !== 'string' || cls.trim() === '') {
            return this;
        }
        
        const trimmedCls = cls.trim();
        const classes = this.className ? this.className.split(' ') : [];
        const filtered = classes.filter(c => c !== trimmedCls);
        
        this.className = filtered.join(' ');
        return this;
    }
}

/**
 * Возвращает количество секунд, прошедших с начала текущего дня
 * @returns {number} Количество секунд
 */
function getSecondsToday() {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.floor((now - startOfDay) / 1000);
}

/**
 * Форматирует дату в строку формата "дд.мм.гг"
 * @param {Date} date - Объект даты
 * @returns {string} Отформатированная строка
 */
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}.${month}.${year}`;
}

// ============================================================
// ДЕМОНСТРАЦИЯ РАБОТЫ
// ============================================================

// Задание 1: Создание класса Book и вызов метода show
console.log('=== Задание 1 ===');
const book1 = new Book('Война и мир', 1869, 1500);
book1.show();

// Задание 2: Геттеры, сеттеры и защищённые поля
console.log('\n=== Задание 2 ===');
try {
    console.log('Книга:', book1.title, book1.pubYear, book1.price);
    book1.title = 'Анна Каренина';
    book1.pubYear = 1877;
    book1.price = 1200;
    console.log('Обновлённая книга:', book1.title, book1.pubYear, book1.price);
    
    // Попытка установить некорректные значения
    // book1.title = ''; // Ошибка!
    // book1.pubYear = -5; // Ошибка!
    // book1.price = -100; // Ошибка!
} catch (error) {
    console.error('Ошибка:', error.message);
}

// Задание 3: Статический метод compare
console.log('\n=== Задание 3 ===');
const books = [
    new Book('1984', 1949, 800),
    new Book('Мастер и Маргарита', 1967, 950),
    new Book('Евгений Онегин', 1833, 700)
];

console.log('До сортировки:');
books.forEach(book => console.log(`${book.title} (${book.pubYear})`));

books.sort(Book.compare);

console.log('После сортировки по году:');
books.forEach(book => console.log(`${book.title} (${book.pubYear})`));

// Задание 4: Функция isEmpty
console.log('\n=== Задание 4 ===');
console.log('isEmpty({}):', isEmpty({}));
console.log('isEmpty({[Symbol()]: true}):', isEmpty({[Symbol()]: true}));

const objWithProp = {};
Object.defineProperty(objWithProp, 'name', { value: 'John' });
console.log('isEmpty(объект с defineProperty):', isEmpty(objWithProp));
console.log('isEmpty(5):', isEmpty(5));
console.log('isEmpty("test"):', isEmpty('test'));
console.log('isEmpty(null):', isEmpty(null));

// Задание 5: Работа с классами
console.log('\n=== Задание 5 ===');
const obj = {
    className: 'open menu'
};

// Добавляем методы в объект
obj.addClass = function(cls) {
    const classes = this.className ? this.className.split(' ') : [];
    const trimmedCls = cls.trim();
    
    if (!classes.includes(trimmedCls)) {
        classes.push(trimmedCls);
        this.className = classes.join(' ');
    }
    return this;
};

obj.removeClass = function(cls) {
    const trimmedCls = cls.trim();
    const classes = this.className ? this.className.split(' ') : [];
    const filtered = classes.filter(c => c !== trimmedCls);
    this.className = filtered.join(' ');
    return this;
};

console.log('Начальный объект:', obj.className);
obj.addClass('new');
console.log('После addClass("new"):', obj.className);
obj.addClass('menu');
console.log('После addClass("menu") (дубликат):', obj.className);
obj.removeClass('open');
console.log('После removeClass("open"):', obj.className);

// Задание 6: JSON
console.log('\n=== Задание 6 ===');
const data = {
    name: 'John',
    age: 30,
    address: {
        city: 'Moscow',
        street: 'Tverskaya',
        house: 15
    },
    hobbies: ['reading', 'sports']
};

const jsonString = JSON.stringify(data, null, 2);
console.log('JSON строка:');
console.log(jsonString);

const obj2 = JSON.parse(jsonString);
console.log('Равенство объектов (проверка):', JSON.stringify(data) === JSON.stringify(obj2));

// Задание 7: getSecondsToday
console.log('\n=== Задание 7 ===');
console.log('Секунд с начала дня:', getSecondsToday());

// Задание 8: formatDate
console.log('\n=== Задание 8 ===');
const now = new Date();
console.log('Текущая дата:', formatDate(now));
const testDate = new Date(2024, 4, 11);
console.log('Тестовая дата (11.05.2024):', formatDate(testDate));

// Экспорт функций (если используется как модуль)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Book,
        isEmpty,
        ClassList,
        getSecondsToday,
        formatDate
    };
}