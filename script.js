var display = document.querySelector('#displayArea');
var displayLimit = 8;

var inputValue = 0;
var inputArray = []; // Reset to empty array after testing

function numberBuilder () {
	var number = parseFloat(display.innerHTML, 10);
	console.log(number);
	return number;
}

function multiply (a, b) {
	return a * b;
}

function divide (a, b) {
	return a / b;
}

function calculateSum () { 
	var input = inputArray;
	var result = input[0];
	for (var i = 0; i < input.length - 1; i+=2) { // length - 1 so don't exceeed array
		if (input[i + 1] === '+') {
			result = result + input[i + 2];
		} else {
			result = result - input[i + 2];
		}
		//input[i + 2] = result;
		console.log(result);
	}
	display.innerHTML = result;
	inputArray = [];
}

function clearEntry() {
	display.innerHTML = '0';
	inputArray.pop();
}

function allClear () {
	display.innerHTML = '0';
	inputArray = [];
}

/*---- addEventListener to all keys ----*/

var numberKeys = document.querySelectorAll('.number');
for (var i = 0; i < numberKeys.length; i++) {
	numberKeys[i].addEventListener('click', function() {
		if (display.innerHTML === '0' ||
			display.innerHTML === '+' ||
			display.innerHTML === '-' ||
			display.innerHTML === 'x' ||
			display.innerHTML === '&#247') {
			display.innerHTML = this.innerHTML;
		} else {
			display.innerHTML += this.innerHTML;
		}	
	});
}

var operatorKeys = document.querySelectorAll('.operator');
for (var j = 0; j < operatorKeys.length; j++) {
	operatorKeys[j].addEventListener('click', function(){
		if (display.innerHTML !== '+' && 
			display.innerHTML !== '-' &&
			display.innerHTML !== 'x' &&
			display.innerHTML !== '&#247') 
		{
			inputArray.push(numberBuilder(), this.innerHTML);
			display.innerHTML = this.innerHTML;
		}
	});
}	

document.querySelector('#AC').addEventListener('click', allClear);
document.querySelector('#CE').addEventListener('click', clearEntry);
document.querySelector('#Calculate').addEventListener('click', function(){
	inputArray.push(numberBuilder());
	calculateSum();
});