var inputValue = 0;
var inputArray = [1, '+',1.5,'-',20];

function numberBuilder () {

}

function multiply (a, b) {
	return a * b;
}

function divide (a, b) {
	rerutn a / b;
}

function calculateSum () {
	var result = 0;
	for (var i = 0; i < inputArray.length - 1; i+=2) { // length - 1 so don't exceeed array
		if (inputArray[i + 1] === '+') {
			result = inputArray[i] + inputArray[i + 2];
		} else {
			result = inputArray[i] - inputArray[i + 2];
		}
		inputArray[i + 2] = result;
	}
	return result;
}

function clearEntry() {
	return inputArray.pop();
}

function allClear () {
	inputArray = [];
}