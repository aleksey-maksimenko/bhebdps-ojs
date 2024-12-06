const itemsTable = document.getElementById('items');
const loader = document.getElementById('loader');

async function loadCurrencyRates() {
  try {
    loader.classList.add('loader_active');

    const prevCurrencies = localStorage.getItem('currencyRates');
    
    if (prevCurrencies) { // отображаем кэшированные данные
      printCurrencies(JSON.parse(prevCurrencies).response.Valute);
    }

    const response = await fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses');
    if (!response.ok) { // если не получили нужный ответ сервера
      throw new Error('Неудалось загрузить курсы валют');
    }

    const data = await response.json();
    localStorage.setItem('currencyRates', JSON.stringify(data)); // заносим в localStorage
    printCurrencies(data.response.Valute);
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  } finally { // скрытие загрузки
    loader.classList.remove('loader_active');
  }
}

// функция отображения курсов валют
function printCurrencies(currencies) {
  itemsTable.innerHTML = ''; 
  for (const key in currencies) {
    if (currencies.hasOwnProperty(key)) {
      const currency = currencies[key];

      const divItem = document.createElement('div');
      divItem.className = 'item';

      divItem.innerHTML = `
        <div class="item__code">${currency.CharCode}</div>
        <div class="item__value">${currency.Value.toFixed(2)}</div>
        <div class="item__currency">руб.</div>
      `;
      itemsTable.appendChild(divItem);
    }
  }
}

window.onload = loadCurrencyRates;