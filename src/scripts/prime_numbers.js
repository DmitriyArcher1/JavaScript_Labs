(function() {
    // ========== 1. ПРОСТЫЕ ЧИСЛА ==========
    function isPrime(num) {
        if (num <= 1) return false;
        if (num === 2) return true;
        if (num % 2 === 0) return false;
        const limit = Math.sqrt(num);
        for (let i = 3; i <= limit; i += 2) {
            if (num % i === 0) return false;
        }
        return true;
    }

    function getPrimesUpToN(n) {
        if (!Number.isInteger(n) || n < 2) return [];
        const primes = [];
        for (let candidate = 2; candidate <= n; candidate++) {
            if (isPrime(candidate)) {
                primes.push(candidate);
            }
        }
        return primes;
    }

    function renderPrimes(n) {
        const displaySpan = document.getElementById('displayN');
        const primesContainer = document.getElementById('primesResult');
        const badgeCount = document.getElementById('primeCountBadge');
        
        let numericN = Number(n);
        if (isNaN(numericN) || !Number.isInteger(numericN) || numericN < 2) {
            displaySpan.innerText = numericN >= 0 ? numericN : '?';
            primesContainer.innerHTML = '<span class="empty-message">⚠️ Пожалуйста, введите целое число больше 1 (например, 2, 10, 100).</span>';
            badgeCount.innerText = `количество: 0`;
            return;
        }
        
        const primesArray = getPrimesUpToN(numericN);
        displaySpan.innerText = numericN;
        badgeCount.innerText = `количество: ${primesArray.length}`;
        
        if (primesArray.length === 0) {
            primesContainer.innerHTML = '<span class="empty-message">🔍 Нет простых чисел в данном диапазоне.</span>';
            return;
        }
        
        let formattedHtml = '<div style="display: flex; flex-wrap: wrap; gap: 8px 16px;">';
        primesArray.forEach(p => {
            formattedHtml += `<span style="background: #e2edf2; padding: 5px 12px; border-radius: 40px; font-weight: 500;">${p}</span>`;
        });
        formattedHtml += '</div>';
        primesContainer.innerHTML = formattedHtml;
    }

    const primeInput = document.getElementById('primeInput');
    const showBtn = document.getElementById('showPrimesBtn');
    
    function handlePrimeSubmit() {
        let rawValue = primeInput.value.trim();
        if (rawValue === "") rawValue = "2";
        const n = Number(rawValue);
        if (isNaN(n)) {
            document.getElementById('displayN').innerText = '?';
            document.getElementById('primesResult').innerHTML = '<span class="empty-message">❌ Ошибка: введите числовое значение.</span>';
            document.getElementById('primeCountBadge').innerText = 'количество: 0';
            return;
        }
        let intN = Math.floor(n);
        if (intN < 2) intN = 2;
        if (intN !== n) {
            primeInput.value = intN;
            renderPrimes(intN);
            console.log(`ℹ️ Было введено дробное число ${n}, используем целую часть: ${intN}`);
        } else {
            renderPrimes(intN);
        }
    }
    
    showBtn.addEventListener('click', handlePrimeSubmit);
    primeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handlePrimeSubmit();
        }
    });
    
    renderPrimes(30);

    // ========== 2. ТАБЛИЦА DOG/CAT В КОНСОЛЬ ==========
    // Правильная генерация таблицы со сдвигом строк (как в примере задачи)
    function generateAnimalTable(rowsCount) {
        if (!Number.isInteger(rowsCount) || rowsCount <= 0) return [];
        
        const BASE = ['dog', 'dog', 'dog', 'cat', 'cat']; // 3 собаки, 2 кота
        const period = BASE.length; // 5
        
        // Получение элемента по индексу в бесконечной последовательности
        const getAnimalByIndex = (idx) => BASE[idx % period];
        
        const resultRows = [];
        for (let row = 0; row < rowsCount; row++) {
            const startIdx = row; // сдвиг каждой строки на номер строки (0,1,2...)
            const rowAnimals = [];
            for (let col = 0; col < 6; col++) {
                const globalIdx = startIdx + col;
                rowAnimals.push(getAnimalByIndex(globalIdx));
            }
            resultRows.push(rowAnimals.join('\t')); // разделитель - табуляция
        }
        return resultRows;
    }
    
    function printTableToConsole(rowsCount) {
        const finalRows = Math.max(1, Math.floor(rowsCount));
        const table = generateAnimalTable(finalRows);
        
        if (table.length === 0) {
            console.warn(`Не удалось сгенерировать таблицу для ${finalRows} строк`);
            return false;
        }
        
        console.group(`🐕🐈 Таблица (${finalRows} строк, 6 столбцов, разделитель - табуляция)`);
        for (let i = 0; i < table.length; i++) {
            console.log(table[i]);
        }
        console.groupEnd();
        
        // Обновляем подсказку на странице
        const lastHintDiv = document.getElementById('lastConsoleHint');
        if (table.length > 0) {
            let preview = table.slice(0, Math.min(2, table.length)).join('  →  ');
            if (table.length > 2) {
                preview += `  … и ещё ${table.length - 2} строка(и)`;
            }
            lastHintDiv.innerHTML = `✅ Последний вызов (${finalRows} строк):<br>` +
                `<span style="font-family: monospace; background:#2c3e44; display:inline-block; padding:6px 10px; border-radius:14px; margin-top:8px; font-size:0.75rem;">${preview.replace(/\t/g, '␉')}</span><br>` +
                `🖥️ Полная таблица в консоли (откройте DevTools)`;
        } else {
            lastHintDiv.innerHTML = `⚠️ Не удалось сгенерировать таблицу для rows = ${finalRows}.`;
        }
        return true;
    }
    
    const rowsInput = document.getElementById('rowsInput');
    const drawBtn = document.getElementById('drawTableBtn');
    const rowCountPreviewSpan = document.getElementById('rowCountPreview');
    
    function updateRowPreview() {
        let val = parseInt(rowsInput.value, 10);
        if (isNaN(val) || val < 1) {
            val = 1;
        }
        rowCountPreviewSpan.innerText = val;
    }
    
    function handleDrawTable() {
        let rawRows = rowsInput.value.trim();
        if (rawRows === "") rawRows = "6";
        let rowsCount = Number(rawRows);
        
        if (isNaN(rowsCount)) {
            console.error("Ошибка: введите корректное число строк.");
            rowsCount = 1;
            rowsInput.value = 1;
            rowCountPreviewSpan.innerText = 1;
        } else {
            if (!Number.isInteger(rowsCount)) {
                const integerRows = Math.floor(rowsCount);
                if (integerRows <= 0) {
                    rowsCount = 1;
                } else {
                    rowsCount = integerRows;
                }
                rowsInput.value = rowsCount;
                rowCountPreviewSpan.innerText = rowsCount;
                console.log(`ℹ️ Количество строк округлено до целого: ${rowsCount}`);
            } else if (rowsCount <= 0) {
                rowsCount = 1;
                rowsInput.value = 1;
                rowCountPreviewSpan.innerText = 1;
                console.log("ℹ️ Количество строк не может быть ≤0, установлено 1.");
            } else {
                rowCountPreviewSpan.innerText = rowsCount;
            }
        }
        
        const finalRows = Math.max(1, Math.floor(rowsCount));
        if (finalRows !== rowsCount) {
            rowsInput.value = finalRows;
            rowCountPreviewSpan.innerText = finalRows;
        }
        
        printTableToConsole(finalRows);
    }
    
    // Обработчики событий
    drawBtn.addEventListener('click', handleDrawTable);
    
    rowsInput.addEventListener('input', function() {
        let v = parseInt(rowsInput.value, 10);
        if (!isNaN(v) && v >= 1) {
            rowCountPreviewSpan.innerText = v;
        } else {
            rowCountPreviewSpan.innerText = '1';
        }
    });
    
    rowsInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleDrawTable();
        }
    });
    
    // Инициализация превью
    updateRowPreview();
    
    console.log("✅ Страница готова! Таблица генерируется с правильным сдвигом (как в примере задачи)");
})();