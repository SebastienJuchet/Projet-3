class Carousel {
	constructor(id) {
		this.id = document.getElementById(id);
		this.index = 0;
		this.slides = this.id.querySelectorAll('.slide');
		this.btnNext = document.querySelector('.next');
		this.btnPrev = document.querySelector('.prev');
		this.idPlayPause = document.querySelector('.playPause');
		this.time = false;
		this.events();
		this.btnPlayPause();
		this.initAutoSlide();
	}

	nextPicture() {
		this.slides[this.index].classList.remove('slide_current');
		this.index++;
		if (this.index >= this.slides.length) {
			this.index = 0;
		}
		this.slides[this.index].classList.add('slide_current');
	}

	prevPicture() {
		this.slides[this.index].classList.remove('slide_current');
		this.index--;
		if (this.index < 0 ) { 
			this.index = this.slides.length -1;
		}
		this.slides[this.index].classList.add('slide_current');
	}

	events() {
		this.btnNext.addEventListener('click', (event) => {
			this.nextPicture();
		})

		this.btnPrev.addEventListener('click', (event) => {
			this.prevPicture();
		})

		document.addEventListener('keyup', (event) => {
			if (event.key === 'ArrowLeft') {
				this.prevPicture()
			} else if (event.key === 'ArrowRight') {
				this.nextPicture()
			}
		})		
	}
	
	btnPlayPause() {
		this.idPlayPause.addEventListener('click', (event) => {
			if (this.time) {
				this.time = false;
				this.idPlayPause.firstChild.classList.remove('fa-play-circle');
				this.idPlayPause.firstChild.classList.add('fa-pause-circle');
			  } else {
				this.time = true;
				this.idPlayPause.firstChild.classList.remove('fa-pause-circle');
				this.idPlayPause.firstChild.classList.add('fa-play-circle');
				
			  }
		})
		
	}

	initAutoSlide() {
		setInterval(() => {  //  si pause activé
			if (this.time) {
			  return;
			}
				this.nextPicture();
		  }, 5000); // intervalle 5 sec
	}
}

