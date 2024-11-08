(() => {
  let playing = true,
      activeHole = 1,
      hits = 0, // попаданий
      misses = 0; // промахов

  const stop = () => playing = true,
        getHole = index => document.getElementById(`hole${index}`),
        deactivateHole = index => getHole(index).className = 'hole',
        activateHole = index => getHole(index).className = 'hole hole_has-mole',
        next = () => setTimeout(() => {
          if (!playing) {
            return;
          }
          deactivateHole(activeHole);
          activeHole = Math.floor(1 + Math.random() * 9);
          activateHole(activeHole);
          next();
        }, 800);

  const isgameFinished = () => {
    if (hits >= 10) {
      alert("Победа! Убито кротов: " + hits);
      restart();
    } else if (misses >= 5) {
      alert("Увы, 5 промахов подряд! Вы проиграли!");
      restart();
    }
  };

  //начать новую игру
  const restart = () => {
    hits = 0;
    misses = 0;
    updateHitsMisses();
    playing = true; 
    next(); 
  };

  const updateHitsMisses = () => {
    document.getElementById('dead').textContent = hits;
    document.getElementById('lost').textContent = misses;
  };

  //попали по кроту
  const moleDead = () => { 
      hits++;
      updateHitsMisses();
      isgameFinished();
  };
  // промах по лунке
  const missed = () => { 
      misses++;
      updateHitsMisses();
      isgameFinished();
  };
  // обработчики для лунок в цикле
  for (let i = 1; i <= 9; i++) {
    const hole = getHole(i);
    
    hole.addEventListener('click', function() {
      if (hole.classList.contains('hole_has-mole')) {
        moleDead();
      } else {
        missed();
      }
    });
  }
  next(); //старт игры

  
})();