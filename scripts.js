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
  this.operator = undefined;
  this.result = undefined;

  this.appendNumber = function(number) {
    this.currentOperand += number;
    console.log(calculator)
  }

  this.selectOperation = function(operator) {
    this.operator = operator;
    if (this.result) {
      this.previousOperand = this.result;
    }
    else {
      this.previousOperand = this.currentOperand;
    }
    this.currentOperand = "";
    console.log(calculator);
  }

  this.performOperation = function() {
    switch(this.operator) {
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
}

const calculator = new Calculator();

numberButtons.forEach(numberButton => {
  numberButton.addEventListener("click", () => {
    calculator.appendNumber(numberButton.textContent);
  })
});

operatorButtons.forEach(operatorButton => {
  operatorButton.addEventListener("click", () => {
    if (!calculator.previousOperand) {
      calculator.selectOperation(operatorButton.textContent);
    }
    else {
      calculator.performOperation();
      calculator.selectOperation(operatorButton.textContent);
    }
  })
});

equalsButton.addEventListener("click", () => {
  calculator.performOperation();
});