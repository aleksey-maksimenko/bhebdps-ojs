const itemsTable = document.getElementById('items');
const loader = document.getElementById('loader');

async function loadCurrencyRates() {
  try {
    loader.classList.add('loader_active');

    const response = await fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses');
    if (!response.ok) { // если не получили нужный ответ сервера
      throw new Error('Неудалось загрузить курсы валют');
    }

    // разбор json-ответа
    const data = await response.json();
    const currencies = data.response.Valute;
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
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  } finally { // скрытие загрузки
    loader.classList.remove('loader_active');
  }
}

window.onload = loadCurrencyRates;