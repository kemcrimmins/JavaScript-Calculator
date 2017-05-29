var mainDisplay = document.querySelector('#displayArea');
//var calculationsDisplay = document.querySelector('#calculationsArea');
var displayLimit = 8;

var operators = ['+', '-', '/', '*'];

var inputArray = []; // array for calculations


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
	document.querySelector('#Decimal').addEventListener('click', checkDecimal);
}

// 	BEGIN KEY-BINDING FUNCTIONS
function processNumberKeys () {
	if(mainDisplay.innerHTML === '0' ||   // check whether beginning new number
	  operators.indexOf(mainDisplay.innerHTML) > - 1)
	{
		mainDisplay.innerHTML = this.innerHTML; 
		
	} else {								 // otherwise continue building number
		mainDisplay.innerHTML += this.innerHTML;
	}	
}

function processOperatorKeys () {
	if (operators.indexOf(mainDisplay.innerHTML) < 0 )      // prevent successive operators
	{
		inputArray.push(numberBuilder(), this.innerHTML); 	/* convert str -> num, 
															 push num and operator to array */

		mainDisplay.innerHTML = this.innerHTML;	 // set display to operator		
	}
}

function checkDecimal () {
	if (mainDisplay.innerHTML.split('.').length - 1 > 0) {
		console.log("Duplicate decimals");
	} else {
		mainDisplay.innerHTML += this.innerHTML;
	}
}

function calculateSum () { 
	var result;

	if (operators.indexOf(mainDisplay.innerHTML) > - 1) 
		return; // Exit calculateSum if last keyentry was an operator 
		
	inputArray.push(numberBuilder());
	result = eval(inputArray.join(''));

	mainDisplay.innerHTML = result;
	inputArray = [];
}

function clearEntry() {  // NEED TO IMPLEMENT CLEAR ENTRY FOR calculationsDisplay
	if (operators.indexOf(mainDisplay.innerHTML) > -1) { // check for operator
		inputArray.splice(-1);    // remove operator from end of array
	}
	mainDisplay.innerHTML = '0';	
}

function allClear () {
	mainDisplay.innerHTML = '0';
	inputArray = [];
}
// END KEY-BINDING FUNCTIONS

// HELPER FUNCTIONS
function numberBuilder () {
	var number = parseFloat(mainDisplay.innerHTML, 10);
	return number;
}

startCalculator();