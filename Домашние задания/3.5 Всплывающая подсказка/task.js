const tooltipElements = document.querySelectorAll('.has-tooltip');

let activeTooltip = null; // активная подсказка

function showTooltip(event) {
  event.preventDefault();

  const tooltipText = this.getAttribute('title');
  
  if (activeTooltip && activeTooltip.textContent === tooltipText) 
    activeTooltip.classList.toggle('tooltip_active'); // если это повторный клик, инвертируем отображение подсказки
    return; 
  }

  if (activeTooltip) {
    activeTooltip.remove();
  }

  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip tooltip_active';
  tooltip.textContent = tooltipText;

  document.body.appendChild(tooltip);
  
  const rect = this.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const position = this.getAttribute('data-position') || 'top'; 
  
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

  activeTooltip = tooltip;

  tooltip.addEventListener('click', () => {
    this.setAttribute('title', tooltipText);
    tooltip.remove();
    activeTooltip = null;
  });
}

tooltipElements.forEach(element => {
  element.addEventListener('click', showTooltip);
});
