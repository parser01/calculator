'use strict';

const btns = document.querySelectorAll('.btns-flex .btn'),
		input = document.querySelector('.input'),

		operators = Array.from(document.querySelectorAll('.operators__btn'));

const prefferedWidth = `${btns[0].offsetWidth}px`;

operators.forEach(operator => operator.style.width = prefferedWidth); 

/*for (let i = 0; i < operators.length; i++) {
	operators[i].style.width = `${btns[0].offsetWidth}px`;
} */

btns.forEach(btn => btn.addEventListener('click', inputInfo));

const clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', clearInputOutput);

const equalBtn = document.querySelector('.equal'),
		output = document.querySelector('.output');
equalBtn.addEventListener('click', outputResult);

function inputInfo(e) {
	const inputStr = input.innerHTML,
			lastCharOfInput = inputStr.slice(-2, -1);

	if (inputStr.includes('=')) {

		input.innerHTML = inputStr;

	} else if (event.target.matches('.operators__btn') && 
		 (inputStr === '' || operators.some(operator => lastCharOfInput === operator.innerHTML))) {

		input.innerHTML = inputStr;

	} else if (event.target.matches('.operators__btn')) {

		input.innerHTML += ` ${this.innerHTML} `;

	} else {

		input.innerHTML += this.innerHTML;

	}

}

function clearInputOutput() {
	input.innerHTML = output.innerHTML = '';
}

function outputResult() {

	const result = getResult();

	if (result !== undefined) output.innerHTML = `${result}`;
	else output.innerHTML = output.innerHTML;

}

function getResult() {

	const lastCharOfInput = input.innerHTML.slice(-2, -1);

	if (lastCharOfInput === '\u00D7' ||  lastCharOfInput === '-' || lastCharOfInput === '+') return;

	const operandsList = input.innerHTML.slice(0, -1).split(' ').map(item => +item).filter(item => item === item),
		   operatorsList = input.innerHTML.split(' ').filter(item => +item !== +item && item !== '=');

/*	console.log(operandsList);
	console.log(operatorsList);*/

	let result = operandsList[0];

	for (let i = 0; i < operandsList.length-1; i++) {

			if (operatorsList[i] === '\u00D7') result *= operandsList[i + 1];
			else if (operatorsList[i] === '-') result -= operandsList[i + 1];
			else if (operatorsList[i] === '+') result += operandsList[i + 1];
 
	};

	return result;
}

const calculator = document.querySelector('.calculator');

const clickBtn = document.querySelector('button');
clickBtn.addEventListener('click', function() {
	calculator.classList.toggle('scale');
});






