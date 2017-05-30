var mainDisplay = document.querySelector('#displayArea');
var displayLimit = 8;
var operators = ['+', '-', '/', '*'];
var inputArray = []; // array for calculations
var calculatedResult = false; // handler for new calculation

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
	  	operators.indexOf(mainDisplay.innerHTML) > - 1
	  	|| mainDisplay.innerHTML ==='ERROR'
	  	|| calculatedResult === true)
	{
		mainDisplay.innerHTML = this.innerHTML; 
		calculatedResult = false;
		
	} else if (mainDisplay.innerHTML.length > displayLimit) { // ERROR if input exceeds displayLimit
		mainDisplay.innerHTML = "ERROR";
	}

	else {								 // otherwise continue building number
		mainDisplay.innerHTML += this.innerHTML;
	}	
}

function processOperatorKeys () {
	if((mainDisplay.innerHTML === '0' // prevent operator as first entry
		&& operators.indexOf(this.innerHTML) > -1
		&& inputArray.length === 0) 
		|| (mainDisplay.innerHTML === 'ERROR')) // handle ERROR from previous calculation
		{
		if (this.innerHTML === '-') { // exception for negative as first entry
			mainDisplay.innerHTML = this.innerHTML;
			inputArray.push(this.innerHTML);
		} else {
			console.log("Cannot begin calculations with an operator");
		}
	} else if (operators.indexOf(mainDisplay.innerHTML) < 0 ) {     // prevent successive operators
		inputArray.push(numberBuilder(), this.innerHTML); 	//convert str -> num, push num & operator to array
		mainDisplay.innerHTML = this.innerHTML;	 // set display to operator		
	}
}

function checkDecimal () {
	/*------ Prevents entry of multiple decimals  ------*/
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
	result = eval(inputArray.join('')).toString(); // calculate and convert to string for parsing
	console.log(result.length);

	if (result.length > displayLimit ) { // check result against display length
		if (result.indexOf('.') > 8 || result.indexOf('.') < 0) { // 
			result = "ERROR";
		} else {
			result = result.slice(0, 9);
		}
	}

	mainDisplay.innerHTML = result;
	inputArray = []; // prepare inputArray for next calculation
	calculatedResult = true; // prepare mainDisplay for next calculation
}

function clearEntry() {  
	if (operators.indexOf(mainDisplay.innerHTML) > -1) { // check for operator
		inputArray.splice(-1);    // remove operator from end of inputArray
		mainDisplay.innerHTML = inputArray[inputArray.length - 1]; // update display; update inputArray
		inputArray.splice(-1);
	} else if (calculatedResult = true) { // clearEntry for subsequent calculation
		allClear();
		calculatedResult = false;
	}else {
		mainDisplay.innerHTML = inputArray[inputArray.length - 1];
	}

}

function allClear () {
	mainDisplay.innerHTML = '0';
	inputArray = [];
}
// END KEY-BINDING FUNCTIONS

// HELPER FUNCTION
function numberBuilder () {
	var number = parseFloat(mainDisplay.innerHTML, 10);
	return number;
}

// MAKE IT GO!
startCalculator();