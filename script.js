var display = document.querySelector('#dislplayArea');
var displayLimit = 8;

var inputValue = 0;
var inputArray = [1, '+',1.5,'-',20]; // Reset to empty array after testing

var keys = document.querySelectorAll('.key');
for (var i = 0; i < keys.length; i++) {
	keys[i].addEventListener('click', function() {
		console.log(this.innerHTML);
	});
}

function numberBuilder () {

}

function multiply (a, b) {
	return a * b;
}

function divide (a, b) {
	return a / b;
}

function calculateSum (inputArr) { 
	var result = 0;
	for (var i = 0; i < inputArr.length - 1; i+=2) { // length - 1 so don't exceeed array
		if (inputArr[i + 1] === '+') {
			result = inputArr[i] + inputArr[i + 2];
		} else {
			result = inputArr[i] - inputArr[i + 2];
		}
		inputArr[i + 2] = result;
	}
	return result;
}

function clearEntry() {
	display.innerHTML = '0';
	inputArray.pop();
}

function allClear () {
	display.innerHTML = '0';
	inputArray = [];
}