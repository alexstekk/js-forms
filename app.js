// Практика на работу с формой
// Дана простая форма авторизации.

// Необходимо отменить отправку формы по умолчанию и проверить поля с логином и паролем по следующим признакам:

// поля непустые (если одно из полей пустое, вывести в консоль сообщение "All fields are required")

// логин и пароль должны соответствовать одной и записей в массива registeredUsers файла app.js (в случае несовпадения, вывести в консоль сообщение "Incorrect login or password")

// если учетные данные подходят, вывести в консоль сообщение "Access granted" и очистить поля формы.

const registeredUsers = [
	['a', '1'],
	['manager', 'SuperMe108'],
	['editor', '12345'],
];

const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');
const login = document.querySelector('[name=login]');
const password = document.querySelector('[name=password]');

form.addEventListener('submit', handleSubmit);
inputs.forEach((input) => input.addEventListener('keydown', handleKeydown));

function handleKeydown(e) {
	if (e.key === 'Enter') {
		this.nextElementSibling.focus();
	}
}

function handleSubmit(e) {
	e.preventDefault();
	validate();
}

function validate() {
	if (!checkEmptyInputs()) return console.log('All fields are required');
	if (!checkUser()) {
		console.log('Incorrect login or password');
	} else {
		console.log('Access granted');
		form.reset();
	}
}

function checkEmptyInputs() {
	let isInputEmpty = true;
	for (let input of inputs) {
		if (!input.value.trim()) {
			input.style.borderColor = 'red';
			isInputEmpty = false;
		} else {
			input.style.borderColor = 'rgb(118, 118, 118)';
		}
	}
	return isInputEmpty;
}

function checkUser() {
	let userFound = false;
	for (let user of registeredUsers) {
		const [currentLogin, currentPassword] = user;
		if (login.value === currentLogin) {
			if (password.value === currentPassword) {
				userFound = true;
			}
		}
	}
	return userFound;
}
