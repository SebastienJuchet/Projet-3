class Timer {
  constructor(){
    this.min = 0;
    this.sec = 0;
    this.endTime = 0;
    this.timer = document.getElementById('timer');
    this.infosStationsCanvas = document.getElementById('infos-station-canvas');
    this.timerInfosBtn = document.getElementById('timer-infos');
    // copie auto les données du sessionStorage
    this.endTime = sessionStorage.getItem('timer_end');
    if (this.endTime !== null) {
      this.startTimer(this.endTime);
      this.timerInfosBtn.style.display ='block';
    }
  }

  startTimer(date) {
    this.endTime = date;
    this.updateTimer();
    sessionStorage.setItem('timer_end', this.endTime);
    this.interval = setInterval( (e) => this.endTimer(), 1000 );
  }

  stopTimer() {
    clearInterval(this.interval);
    this.timer.innerHTML = `Réservation est annulée <br>Temps dépassé`;
    sessionStorage.removeItem('timer_end');
    sessionStorage.removeItem('text_station');
  }

  updateTimer(){
    let time = new Date(this.endTime - Date.now())
    this.min = Math.round(time.getMinutes());
    this.sec = Math.round(time.getSeconds());
    let s = this.sec;
    let m = this.min;
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;    
    this.timer.innerHTML = `Il vous reste :<br>${m} min : ${s}sec <br>avant annulation de la réservation`;
  }

  endTimer() {
    this.updateTimer();
    if (this.sec === 0 && this.min === 0) { 
      this.stopTimer();
    }
  }
}