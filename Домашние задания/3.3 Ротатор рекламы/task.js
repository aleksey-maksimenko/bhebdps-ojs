function nextCaseIdx(cases, idx) {
  cases[idx].classList.remove('rotator__case_active');
  idx++;
  if (idx >= cases.length) 
    idx = 0;

  const nextCase = cases[idx];
  nextCase.style.color = nextCase.dataset.color;
  nextCase.classList.add('rotator__case_active');

  return idx;
}

function startRotation(rotator) {
  const cases = rotator.querySelectorAll('.rotator__case');
  let idx = 0; 
  cases[idx].style.color = cases[idx].dataset.color;

  setInterval(() => {
    idx = nextCaseIdx(cases, idx);
  }, parseInt(cases[idx].dataset.speed));
}

const rotators = document.querySelectorAll('.rotator');
rotators.forEach(rotator => {
  startRotation(rotator);
});