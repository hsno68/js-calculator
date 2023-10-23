const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
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

function isValidOperator(character) {
  switch(character) {
    case "+":
    case "-":
    case "x":
    case "÷":
      return true;
    default:
      return false;
  }
}

function Calculator(previousOperandElement, currentOperandElement) {
  this.previousOperand = "";
  this.currentOperand = "";
  this.currentOperator = "";

  this.previousOperandElement = previousOperandElement;
  this.currentOperandElement = currentOperandElement;

  this.appendNumber = function(number) {
    if (this.currentOperand === "0") {
      this.currentOperand = "";
    }

    if (number === "." && !this.currentOperand) {
      this.currentOperand = "0";
    }

    if (number != ".") {
      this.currentOperand += number;
    }
    else if (!this.currentOperand.includes(".")) {
      this.currentOperand += number;
    }
  }

  this.selectOperator = function(operator) {
    this.currentOperator = operator;
    if (!this.previousOperand) {
      this.previousOperand = "0";
    }

    if (this.currentOperand) {
      this.previousOperand = this.currentOperand;
    }
    this.currentOperand = "";
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
    if (operate) {
      this.currentOperand = operate(+this.previousOperand, +this.currentOperand).toString();
      this.previousOperand = "";
    }
  }

  this.updateDisplay = function(character) {
    if (isValidOperator(character) && this.previousOperand) {
      this.previousOperandElement.textContent = "";
      this.currentOperandElement.textContent = `${this.previousOperand} ${character}`;
    }
    else if (this.previousOperand && this.currentOperator) {
      this.previousOperandElement.textContent = `${this.previousOperand} ${this.currentOperator}`;
      this.currentOperandElement.textContent = this.currentOperand;
    }
    else {
      this.previousOperandElement.textContent = "";
      this.currentOperandElement.textContent = this.currentOperand;
    }
  }

  this.allClear = function() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.currentOperator = "";
    this.previousOperandElement.textContent = "";
    this.currentOperandElement.textContent = "";
  }

  this.deleteCharacter = function() {
    if (this.previousOperand && !this.currentOperand && this.currentOperator) {
      this.currentOperator = "";
      this.currentOperand = this.previousOperand;
      this.previousOperand = "";
    }
    else {
      let currentOperandArray = this.currentOperand.split("");
      currentOperandArray.pop();
      this.currentOperand = currentOperandArray.join("");
    }
  }
}

const calculator = new Calculator(previousOperandElement, currentOperandElement);

numberButtons.forEach(numberButton => {
  numberButton.addEventListener("click", () => {
    let selectedNumber = numberButton.textContent
    calculator.appendNumber(selectedNumber);
    calculator.updateDisplay();
  })
});

operatorButtons.forEach(operatorButton => {
  operatorButton.addEventListener("click", () => {
    let selectedOperator = operatorButton.textContent;
    if (calculator.previousOperand && calculator.currentOperand && calculator.currentOperator) {
      calculator.performOperation(calculator.currentOperator);
    }
    calculator.selectOperator(selectedOperator);
    calculator.updateDisplay(selectedOperator);
  })
});

equalsButton.addEventListener("click", () => {
  calculator.performOperation(calculator.currentOperator);
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
  calculator.allClear();
});

deleteButton.addEventListener("click", () => {
  calculator.deleteCharacter();
  calculator.updateDisplay();
});