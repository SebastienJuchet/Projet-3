class Form {
	constructor() {
		this.btnValidForm = document.getElementById('btn-form');
        this.btnClear = document.getElementById('clear');
        this.btnReserve = document.querySelector('.valid');		
		this.name = document.getElementById('name');
		this.nameError = document.getElementById('name-error');
		this.firstName = document.getElementById('first-name');
		this.firstNameError = document.getElementById('first-name-error');

		this.canvasDiv = document.getElementById('canvas');
		this.mapDiv = document.getElementById('map');
		this.formDiv = document.getElementById('form');

		this.regex = /^[a-zA-ZéèîïÈÉÎÏ]+([-'\s][a-zA-ZéèîïÈÉÊËÎÏ]+)?/;

		this.validFormDisplayCanvas();
	}


	validFormDisplayCanvas() {
		this.btnValidForm.addEventListener('click', (e) => {
			e.preventDefault();		
			if (this.name.validity.valueMissing) {
				this.name.classList.add('error');
				this.nameError.innerHTML = 'Veuillez saisir le champs';
			} else if (this.regex.test(this.name.value) === false) {
				this.name.classList.add('error');
				this.nameError.innerHTML = 'Mauvais format';
			} else if (this.firstName.validity.valueMissing) {
				this.nameError.innerHTML = '';
				this.firstName.classList.add('error');
				this.firstNameError.innerHTML = 'Veuillez saisir le champs';
			} else if (this.regex.test(this.firstName.value) === false) {
				this.firstName.classList.add('error');
				this.name.classList.remove('error');
				this.firstNameError.innerHTML = 'Mauvais format';
			} else if (sessionStorage.getItem('timer_end') !== null) {
					alert('Une réservation est en cours, merci d\'annulé celle-ci avant une nouvelle réservation');
			}else {
				this.firstName.classList.remove('error');
    			this.btnValidForm.style.visibility = 'hidden';
    			this.formDiv.style.visibility = 'hidden';
    			this.canvasDiv.style.visibility = 'visible';
				localStorage.setItem('first_name', this.firstName.value);
				localStorage.setItem('name', this.name.value);
				
			}
		})
	}
}


