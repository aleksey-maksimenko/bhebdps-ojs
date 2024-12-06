const tooltipElements = document.querySelectorAll('.has-tooltip');

function showTooltip(event) {
  event.preventDefault();

  // обеспечиваем появление только одной подсказки на экране
  const existingTooltip = document.querySelector('.tooltip');
  if (existingTooltip) {
    existingTooltip.remove();
  }

  // новая подсказка
  const tooltipText = this.getAttribute('title');
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip tooltip_active';
  tooltip.textContent = tooltipText;

  document.body.appendChild(tooltip);

  // позиционирование текста подсказки, регулируем отступы от ссылки
  const rect = this.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const position = this.getAttribute('data-position') || 'top'; // получаем позицию через атрибуты элементов
  
  switch (position) {
    case 'top':
      tooltip.style.left = `${rect.left + (rect.width - tooltipRect.width) / 2}px`;
      tooltip.style.top = `${rect.top - tooltipRect.height - 5}px`; 
      break;
    case 'bottom':
      tooltip.style.left = `${rect.left + (rect.width - tooltipRect.width) / 2}px`;
      tooltip.style.top = `${rect.bottom + 5}px`;
      break;
    case 'left':
      tooltip.style.left = `${rect.left - tooltipRect.width - 5}px`;
      tooltip.style.top = `${rect.top + (rect.height - tooltipRect.height) / 2}px`;
      break;
    case 'right':
      tooltip.style.left = `${rect.right + 5}px`;
      tooltip.style.top = `${rect.top + (rect.height - tooltipRect.height) / 2}px`;
      break;
    default:
      break;
  }

  this.removeAttribute('title');

  tooltip.addEventListener('click', () => {
    this.setAttribute('title', tooltipText);
    tooltip.remove();
  });
}

tooltipElements.forEach(element => {
  element.addEventListener('click', showTooltip);
});