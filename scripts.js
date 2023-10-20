const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandElement = document.querySelector("[data-previous-operand]");
const currentOperandElement = document.querySelector("[data-current-operand]");

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a , b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function Calculator() {
  this.previousOperand = "";
  this.currentOperand = "";
  this.currentOperator = "";

  this.appendNumber = function(number) {
    this.currentOperand += number;
    console.log(calculator)
  }

  this.selectOperator = function(operator) {
    this.currentOperator = operator;
    if (this.result) {
      this.previousOperand = this.result;
    }
    else {
      this.previousOperand = this.currentOperand;
    }
    this.currentOperand = "";
    console.log(calculator);
  }

  this.performOperation = function(operator) {
    let operate;
    switch(operator) {
      case "+":
        operate = add;
        break;
      case "-":
        operate = subtract;
        break;
      case "x":
        operate = multiply;
        break;
      case "÷":
        operate = divide;
        break;  
    }
    this.result = operate(+this.previousOperand, +this.currentOperand);
    console.log(calculator);
  }

  this.allClear = function() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.currentOperator = "";
    this.result = undefined;
    console.log(calculator);
  }
}

const calculator = new Calculator();

numberButtons.forEach(numberButton => {
  numberButton.addEventListener("click", () => {
    let selectedNumber = numberButton.textContent
    calculator.appendNumber(selectedNumber);
  })
});

operatorButtons.forEach(operatorButton => {
  operatorButton.addEventListener("click", () => {
    let selectedOperator = operatorButton.textContent;
    if (!calculator.currentOperator) {
      calculator.selectOperator(selectedOperator);
    }
    else {
      calculator.performOperation(calculator.currentOperator);
      calculator.selectOperator(selectedOperator);
    }
  })
});

equalsButton.addEventListener("click", () => {
  calculator.performOperation(calculator.currentOperator);
});

allClearButton.addEventListener("click", () => {
  calculator.allClear();
});