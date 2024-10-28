class AlarmClock {
  constructor() {
    this.alarmCollection = []; 
    this.intervalId = null; 
  }
	
  addClock(time, callback) {
    if (!time || !callback) {
      throw new Error('Отсутствуют обязательные аргументы');
    }

    for (let i = 0; i < this.alarmCollection.length; i++) {
      if (this.alarmCollection[i].time === time) {
        console.warn('Уже присутствует звонок на это же время');
      }
    }
	
    this.alarmCollection.push({
      time: time,
      callback: callback,
      canCall: true 
    });
  }
  
  removeClock(time) {
    this.alarmCollection = this.alarmCollection.filter(alarm => alarm.time !== time);
  }

  getCurrentFormattedTime() {
	const now = new Date();
	const hours = (now.getHours() < 10 ? '0' : '') + now.getHours();
	const mins = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
	return `${hours}:${mins}`;
  }
  
  start() {
    if (this.intervalId) {
      return; 
    }

    this.intervalId = setInterval(() => {
      const currentTime = this.getCurrentFormattedTime();

      this.alarmCollection.forEach(alarm => {
        if (alarm.time === currentTime && alarm.canCall) {
          alarm.canCall = false; 
          alarm.callback(); 
        }
      });
    }, 1000); // 1 сек
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId); 
      this.intervalId = null;
    }
  }
  
  resetAllCalls() {
    this.alarmCollection.forEach(alarm => {
      alarm.canCall = true;
    });
  }

  clearAlarms() {
    this.stop();
    this.alarmCollection = []; 
  }
  
}
