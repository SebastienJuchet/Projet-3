class Canvas {
    constructor() {
        this.btnCancelReservation = document.getElementById('button-annulation');
        this.btnClear = document.getElementById('clear');
        this.btnReserve = document.querySelector('.valid');
        this.btnCancel = document.getElementById('cancel');
        this.btnValidForm = document.getElementById('btn-form');
        this.canvas = document.getElementById('sign-canvas');
        this.mapDiv = document.getElementById('map');
        this.formDiv = document.getElementById('form');
        this.timerDiv = document.getElementById('timer');
        this.timerInfoStationDiv = document.getElementById('timer-infos');
        this.canvasDiv = document.getElementById('canvas');
        this.infoStationTimer = document.getElementById('sign-infos');
        this.infoStationCanvas = document.getElementById('infos-station-canvas');
        this.time = new Timer;

        this.ctx = this.canvas.getContext('2d');
        this.painting = false;
        this.finger = false;
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.ctx.lineWidth = 5;
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = 'black';
        this.startX = 0;
        this.startY = 0;

        this.draw();
        this.drawSign();
        
        this.handleClearCanvas();
		this.handleReservationDisplayTimer();
        this.handleCancelCanvas();
        this.handleCancelReservation();
    }

    finishedPosition() {
        this.painting = false;
        this.ctx.beginPath();
    }

    draw(e) {
        if(this.painting === false) {
        	return;
        }

        let mouseX;
        let mouseY;
		// getBoundingClientRect renvoie la taille et la position de l'element par rapport à la fenêtre
        //screenX et Y renvoient les coordonnées de la souris par rapport à l'écran au click de la souris
		//clientX et Y renvoient les coordonnées de la souris par rapport à la fenêtre actuelle au click de la souris
        //pageX et Y renvoieent les coordonnées de la souris par rapport au document au click de la souris
        if (this.finger === false) {
            mouseX = e.clientX - this.canvas.getBoundingClientRect().left;
            mouseY = e.clientY - this.canvas.getBoundingClientRect().top;
        } else if (e.touches.length === 1) {
            mouseX = e.touches[0].pageX - this.canvas.getBoundingClientRect().left;
            mouseY = e.touches[0].pageY - this.canvas.getBoundingClientRect().top - (e.touches[0].pageY - e.touches[0].clientY);
        }

        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(mouseX, mouseY);
        this.ctx.stroke();
        this.ctx.closePath();
        if (sessionStorage.getItem('timer_end') === null) {
            this.displayBtnReserve();
        }

        this.startX = mouseX;
        this.startY = mouseY;
    }

    drawSign() {
        //signature pc
        this.canvas.addEventListener('mousedown', (e) => {
            this.startX = e.clientX - this.canvas.getBoundingClientRect().left;
            this.startY = e.clientY - this.canvas.getBoundingClientRect().top;
            this.painting = true;
        }, false);
        this.canvas.addEventListener('mouseup', (e) => {
            this.ctx.closePath();
            this.painting = false;
        }, false);
        this.canvas.addEventListener('mousemove', (e) => {
            e.preventDefault();
            this.draw(e);
        }, false);

        //signature tactile: touchStart, touchEnd et touchMove
        this.canvas.addEventListener('touchstart', (e) => {
            this.startX = e.touches[0].pageX - this.canvas.getBoundingClientRect().left;
            this.startY = e.touches[0].pageY - this.canvas.getBoundingClientRect().top - (e.touches[0].pageY - e.touches[0].clientY);
            this.painting = true;
            this.finger = true;
        }, false);
        this.canvas.addEventListener('touchend', (e) => {
            this.ctx.closePath();
            this.painting = false;
            this.finger = false;
        }, false);
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.finger = true;
            this.draw(e);
        }, false);
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.btnReserve.classList.remove('submit');
        this.btnReserve.classList.add('valid');
        this.btnReserve.style.cursor = 'not-allowed';
        this.btnReserve.disabled = true;
    }

    displayBtnReserve() {
        this.btnReserve.classList.remove('valid');
        this.btnReserve.classList.add('submit');
        this.btnReserve.style.cursor = 'pointer';
        this.btnReserve.disabled = false;
    }

    handleClearCanvas() {
        this.btnClear.addEventListener('click', (e) => {
            this.clearCanvas();
        })        
    }

    handleReservationDisplayTimer() {
    	this.btnReserve.addEventListener('click', (e) => {
    		e.preventDefault();
            this.clearCanvas();
            this.time.startTimer(Date.now() + 1000 * 1200);
            this.canvasDiv.style.visibility = 'hidden';
            this.timerInfoStationDiv.style.display = 'block';
            this.formDiv.style.visibility = 'visible';
            this.infoStationTimer.innerHTML = this.infoStationCanvas.innerHTML;
            sessionStorage.setItem('text_station', this.infoStationCanvas.innerHTML);
        })
    }

    handleCancelCanvas() {
        this.btnCancel.addEventListener('click', (e) => {
            document.getElementById('name-station').textContent = '';
            document.getElementById('address').textContent = '';
            document.getElementById('total-bikes').textContent = '';
            document.getElementById('available-bikes').textContent = '';
            document.getElementById('available-bikes-stands').textContent = '';
            document.getElementById('status-station').textContent = '';
            this.clearCanvas();
            this.formDiv.style.visibility = 'visible';
            this.canvasDiv.style.visibility = 'hidden';
        })
    }

    handleCancelReservation() {
        this.btnCancelReservation.addEventListener('click', (e) => {
            if (confirm('Voulez vous vraiment annuler ?') === true) {
                this.clearCanvas();
                this.time.stopTimer();
                this.timerInfoStationDiv.style.display = 'none';   
            } else {
                return;
            }
        })
    }
}
