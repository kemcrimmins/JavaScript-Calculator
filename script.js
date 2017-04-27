var mainDisplay = document.querySelector('#displayArea');
var displayLimit = 8;
var calculationsDisplay = document.querySelector('#calculationsArea');


var inputArray = []; // array for calculations
//var displayArray = []; // array for displaying all operations



function startCalculator () {
	/*---- addEventListener to execute key-binding functions on all keys ----*/
	var numberKeys = document.querySelectorAll('.number');
	for (var i = 0; i < numberKeys.length; i++) {
		numberKeys[i].addEventListener('click', processNumberKeys);
	}

	var operatorKeys = document.querySelectorAll('.operator');
	for (var j = 0; j < operatorKeys.length; j++) {
		operatorKeys[j].addEventListener('click', processOperatorKeys);
	}	

	document.querySelector('#AC').addEventListener('click', allClear);
	document.querySelector('#CE').addEventListener('click', clearEntry);
	document.querySelector('#Calculate').addEventListener('click', calculateSum);
}

// 	BEGIN KEY-BINDING FUNCTIONS
function processNumberKeys () {
	if(mainDisplay.innerHTML === '0' ||   // check whether beginning new number
	  mainDisplay.innerHTML === '+' ||   
	  mainDisplay.innerHTML === '-' ||
	  mainDisplay.innerHTML === 'x' ||
	  mainDisplay.innerHTML === '&#247') 
	{
		mainDisplay.innerHTML = this.innerHTML; 
		if (calculationsDisplay.innerHTML.length > 1) { // if numbers already entered
			calculationsDisplay.innerHTML += this.innerHTML;
		} else {
			calculationsDisplay.innerHTML = this.innerHTML; // no numbers already entered
		}
		
	} else {								 // otherwise continue building number
		mainDisplay.innerHTML += this.innerHTML;
		calculationsDisplay.innerHTML += this.innerHTML;
	}	
}

function processOperatorKeys () {
	if (mainDisplay.innerHTML !== '+' &&      // prevent successive operators
		mainDisplay.innerHTML !== '-' &&
		mainDisplay.innerHTML !== 'x' &&
		mainDisplay.innerHTML !== '&#247') 
	{
		inputArray.push(numberBuilder(), this.innerHTML); 	/* convert str -> num, 
															 push num and operator to array */

		//displayArray.push(numberBuilder(), this.innerHTML); // update displayArray

		mainDisplay.innerHTML = this.innerHTML;	 // set display to operator		
		calculationsDisplay.innerHTML += this.innerHTML;
	}
}

function calculateSum () {  // CLEAN THIS UP. DELETE var input, ETC
	var input = inputArray;
	var result = input[0];


	if (mainDisplay.innerHTML === '+' ||
		mainDisplay.innerHTML === '-' ||
		mainDisplay.innerHTML === 'x' ||
		mainDisplay.innerHTML === '&#247') return; // Exit calculateSum if last keyentry was an operator 
		
	inputArray.push(numberBuilder());
	for (var i = 0; i < input.length - 1; i+=2) { // length - 1 so don't exceeed array
		if (input[i + 1] === '+') {
			result = result + input[i + 2];
		} else {
			result = result - input[i + 2];
		}
		//input[i + 2] = result;
		//console.log(result);
	}
	mainDisplay.innerHTML = result;
	calculationsDisplay.innerHTML = result;
	inputArray = [];
}

function clearEntry() {
	if (mainDisplay.innerHTML === '+' ||
		mainDisplay.innerHTML === '-' ||
		mainDisplay.innerHTML === 'x' ||
		mainDisplay.innerHTML === '&#247') { 
		inputArray.splice(-1);    // remove operator from end of array
	}
	mainDisplay.innerHTML = '0';	
}

function allClear () {
	mainDisplay.innerHTML = '0';
	calculationsDisplay.innerHTML = '0';
	inputArray = [];
}
// END KEY-BINDING FUNCTIONS

// HELPER FUNCTIONS
function numberBuilder () {
	var number = parseFloat(mainDisplay.innerHTML, 10);
	//console.log(number);
	return number;
}

function multiply (a, b) {
	return a * b;
}

function divide (a, b) {
	return a / b;
}




startCalculator();