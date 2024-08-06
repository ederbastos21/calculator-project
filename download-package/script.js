//DOM Elements
const key0 = document.getElementById("0");
const key1 = document.getElementById("1");
const key2 = document.getElementById("2");
const key3 = document.getElementById("3");
const key4 = document.getElementById("4");
const key5 = document.getElementById("5");
const key6 = document.getElementById("6");
const key7 = document.getElementById("7");
const key8 = document.getElementById("8");
const key9 = document.getElementById("9");
const visor1 = document.getElementById("visor");
const acButton = document.getElementById("ac");
const timesButton = document.getElementById("times");
const cButton = document.getElementById("c");
const divideButton = document.getElementById("divide");
const subtractButton = document.getElementById("subtract");
const addButton = document.getElementById("add");
const equalButton = document.getElementById("equal");
const decimalButton = document.getElementById("decimal");
const signalElement = document.getElementById("signal");

//EMPTY ARRAYS AND INDICATORS
let arrayVisorNumber = [];
let arrayBaseNumber = [];
let addIndicator = false;
let subtractIndicator = false;
let divideIndicator = false;
let equalIndicator = false;
let equalLog = false;
let timesIndicator = false;

//FUNCTIONS
const insertNumber = function (event) {
  if (equalIndicator === true || arrayVisorNumber.length >= 15) {
    return;
  }
  const buttonValue = event.target.textContent;
  if (buttonValue === "." && arrayVisorNumber.includes(".")) {
    return;
  }
  arrayVisorNumber.push(buttonValue);
  visor1.textContent = arrayVisorNumber.join("");
  debug();
};
const cleanFunction = function () {
  arrayVisorNumber = [];
  arrayBaseNumber = [];
  addIndicator = false;
  subtractIndicator = false;
  divideIndicator = false;
  equalIndicator = false;
  timesIndicator = false;
  visor1.textContent = "";
};
const acFunction = function () {
  cleanFunction();
  visor1.textContent = "";
  signalElement.textContent = "";
  debug();
};
const cFunction = function () {
  if (equalIndicator === true) {
    return;
  }
  arrayVisorNumber = [];
  visor1.textContent = "";
  signalElement.textContent = "";
};

const disableOperations = function () {
  if (visor1.textContent === "") {
    subtractIndicator = false;
    divideIndicator = false;
    timesIndicator = false;
    addIndicator = false;
    equalIndicator = false;
    return true;
  } else {
    return false;
  }
};

const scientificNotation = function (result) {
  if (result.toString().length > 15) {
    visor1.textContent = result.toExponential(10);
  } else {
    visor1.textContent = result;
  }
};

const addFlashEffect = function () {
  const text = visor1.textContent;
  visor1.innerHTML = `<span class="flash">${text}</span>`;
  const span = visor1.querySelector(".flash");
  span.addEventListener(
    "animationend",
    function () {
      visor1.textContent = text;
    },
    { once: true }
  );
};

const operationLogic = function () {
  if (arrayBaseNumber.length > 0 && arrayVisorNumber.length > 0) {
    equalFunction();
  }
};

//OPERATIONS FUNCTIONS
const addFunction = function (event) {
  operationLogic();
  if (disableOperations()) {
    return;
  }
  addFlashEffect();
  if (addIndicator === true) {
    return;
  } else if (
    subtractIndicator === true ||
    divideIndicator === true ||
    timesIndicator === true
  ) {
    subtractIndicator = false;
    divideIndicator = false;
    timesIndicator = false;
    addIndicator = true;
  } else {
    addIndicator = true;
    equalIndicator = false;
    arrayBaseNumber = arrayVisorNumber;
    arrayVisorNumber = [];
  }
  signalElement.textContent = "+";
  //debugging
  debug();
};

const subtractFunction = function () {
  operationLogic();
  if (disableOperations()) {
    return;
  }
  addFlashEffect();
  if (subtractIndicator === true) {
    return;
  } else if (
    addIndicator === true ||
    divideIndicator === true ||
    timesIndicator === true
  ) {
    addIndicator = false;
    divideIndicator = false;
    timesIndicator = false;
    subtractIndicator = true;
  } else {
    subtractIndicator = true;
    equalIndicator = false;
    arrayBaseNumber = arrayVisorNumber;
    arrayVisorNumber = [];
  }
  signalElement.textContent = "-";
  //debugging
  debug();
};

const divideFunction = function () {
  operationLogic();
  if (disableOperations()) {
    return;
  }
  addFlashEffect();
  if (divideIndicator === true) {
    return;
  } else if (
    addIndicator === true ||
    subtractIndicator === true ||
    timesIndicator === true
  ) {
    addIndicator = false;
    subtractIndicator = false;
    timesIndicator = false;
    divideIndicator = true;
  } else {
    divideIndicator = true;
    equalIndicator = false;
    arrayBaseNumber = arrayVisorNumber;
    arrayVisorNumber = [];
  }
  signalElement.textContent = "/";
  //debugging
  debug();
};

const timesFunction = function () {
  operationLogic();
  if (disableOperations()) {
    return;
  }
  addFlashEffect();
  if (timesIndicator === true) {
    return;
  } else if (
    addIndicator === true ||
    subtractIndicator === true ||
    divideIndicator === true
  ) {
    addIndicator = false;
    subtractIndicator = false;
    divideIndicator = false;
    timesIndicator = true;
  } else {
    timesIndicator = true;
    equalIndicator = false;
    arrayBaseNumber = arrayVisorNumber;
    arrayVisorNumber = [];
  }
  signalElement.textContent = "x";
  //debugging
  debug();
};

const equalFunction = function (event) {
  if (disableOperations()) {
    return;
  }
  if (arrayVisorNumber.length === 0) {
    arrayVisorNumber = arrayBaseNumber;
  }
  addFlashEffect();
  if (equalIndicator === true) {
    return;
  }
  if (addIndicator === true) {
    let number1 = parseFloat(arrayBaseNumber.join(""));
    let number2 = parseFloat(arrayVisorNumber.join(""));
    result = number1 + number2;
    arrayVisorNumber = [result];
    scientificNotation(result);
    arrayBaseNumber = 0;
    addIndicator = false;
    equalIndicator = true;
    //debugging
    debug();
  } else if (subtractIndicator === true) {
    let number1 = parseFloat(arrayBaseNumber.join(""));
    let number2 = parseFloat(arrayVisorNumber.join(""));
    result = number1 - number2;
    arrayVisorNumber = [result];
    scientificNotation(result);
    arrayBaseNumber = 0;
    subtractIndicator = false;
    equalIndicator = true;
    //debugging
    debug();
  } else if (divideIndicator === true) {
    let number1 = parseFloat(arrayBaseNumber.join(""));
    let number2 = parseFloat(arrayVisorNumber.join(""));
    result = number1 / number2;
    arrayVisorNumber = [result];
    scientificNotation(result);
    arrayBaseNumber = 0;
    divideIndicator = false;
    equalIndicator = true;
    //debugging
    debug();
  } else if (timesIndicator === true) {
    let number1 = parseFloat(arrayBaseNumber.join(""));
    let number2 = parseFloat(arrayVisorNumber.join(""));
    result = number1 * number2;
    arrayVisorNumber = [result];
    scientificNotation(result);
    arrayBaseNumber = 0;
    timesIndicator = false;
    equalIndicator = true;
    //debugging
    debug();
  }
};

//EVENT LISTENERS
key0.addEventListener("click", insertNumber);
key1.addEventListener("click", insertNumber);
key2.addEventListener("click", insertNumber);
key3.addEventListener("click", insertNumber);
key4.addEventListener("click", insertNumber);
key5.addEventListener("click", insertNumber);
key6.addEventListener("click", insertNumber);
key7.addEventListener("click", insertNumber);
key8.addEventListener("click", insertNumber);
key9.addEventListener("click", insertNumber);
acButton.addEventListener("click", acFunction);
timesButton.addEventListener("click", timesFunction);
cButton.addEventListener("click", cFunction);
divideButton.addEventListener("click", divideFunction);
subtractButton.addEventListener("click", subtractFunction);
addButton.addEventListener("click", addFunction);
equalButton.addEventListener("click", equalFunction);
decimalButton.addEventListener("click", insertNumber);

//DEBUGGING
let debug = function () {
  // Define CSS styles for true and false indicators
  const trueStyle = "color: green;";
  const falseStyle = "color: grey;";

  // Log the debug information with conditional styling for indicators
  console.log(
    `
        arrayVisorNumber = [${arrayVisorNumber}],
        arrayBaseNumber = [${arrayBaseNumber}],  

        addIndicator = [%c${addIndicator}%c],
        subtractIndicator = [%c${subtractIndicator}%c],
        divideIndicator = [%c${divideIndicator}%c],
        timesIndicator = [%c${timesIndicator}%c],
        equalIndicator = [%c${equalIndicator}%c]
    `,
    addIndicator ? trueStyle : falseStyle,
    "",
    subtractIndicator ? trueStyle : falseStyle,
    "",
    divideIndicator ? trueStyle : falseStyle,
    "",
    timesIndicator ? trueStyle : falseStyle,
    "",
    equalIndicator ? trueStyle : falseStyle,
    ""
  );
};
