const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const invertSignButton = document.querySelector("[data-invert-sign]");
const calculatorButtons = document.querySelectorAll(".calculator button");
const previousOperandElement = document.querySelector("[data-previous-operand]");
const currentOperandElement = document.querySelector("[data-current-operand]");

function add(firstOperand, secondOperand) {
  return firstOperand + secondOperand;
}

function subtract(firstOperand, secondOperand) {
  return firstOperand - secondOperand;
}

function multiply(firstOperand , secondOperand) {
  return firstOperand * secondOperand;
}

function divide(firstOperand, secondOperand) {
  return firstOperand / secondOperand;
}

function Calculator(previousOperandElement, currentOperandElement) {
  this.previousOperand = "";
  this.currentOperand = "";
  this.currentOperator = "";

  this.previousOperandElement = previousOperandElement;
  this.currentOperandElement = currentOperandElement;

  this.appendNumber = function(number) {
    //Prevents numbers from appending to leading 0 ("01")
    if (this.currentOperand === "0") {
      this.currentOperand = "";
    }

    //Stylistic: automatically appends a leading 0 (e.g. 0.1 instead of .1)
    if (number === "." && !this.currentOperand) {
      this.currentOperand = "0";
    }

    if ((number != "." || !this.currentOperand.includes(".")) && this.currentOperand.length < 16) {
      this.currentOperand += number;
    }
  }

  this.selectOperator = function(operator) {
    this.currentOperator = operator;
    //Allows users to select an operator at the start without inputting any operands
    if (!this.previousOperand) {
      this.previousOperand = "0";
    }

    //Selecting an operator should swap the operands and ready the calculator for a new operand input
    if (this.currentOperand) {
      this.previousOperand = this.currentOperand;
    }
    this.currentOperand = "";
  }

  this.performOperation = function() {
    let operate;
    switch(this.currentOperator) {
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
    //Calculates the result and sets the result as the current operand, ready for another calculation
    if (operate) {
      let result = operate(+this.previousOperand, +this.currentOperand).toString();
      //Sets a fixed decimal place for long decimal results
      if (result.length >= 14 && result.includes(".")) {
        this.currentOperand = (+result).toFixed(6).toString();
      }
      else {
        this.currentOperand = result;
      }
      this.previousOperand = "";
      this.currentOperator = "";
    }
  }

  this.updateDisplay = function(character) {
    if (this.isOperator(character)) {
      this.previousOperandElement.textContent = "";
      this.currentOperandElement.textContent = `${this.previousOperand} ${character}`;
    }
    else {
      this.previousOperandElement.textContent = `${this.previousOperand} ${this.currentOperator}`;
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
    //Allows users to delete their operator in the middle of their operation so they could go back and edit their first operand
    if (this.previousOperand && this.currentOperator && !this.currentOperand) {
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

  this.invertSign = function() {
    if (this.currentOperand.includes("-")) {
      this.currentOperand = this.currentOperand.slice(1);
    }
    else {
      this.currentOperand = `-${this.currentOperand}`;
    }
  }

  //Checks if operands and operators are valid (not undefined/falsy)
  //All operands and results are returned as strings, so 0 will always be "0"
  this.canPerformOperation = function() {
    return this.previousOperand && this.currentOperand && this.currentOperator;
  }

  this.isOperator = function(operator) {
    switch(operator) {
      case "+":
      case "-":
      case "x":
      case "÷":
        return true;
      default:
        return;
    }
  }
}

const calculator = new Calculator(previousOperandElement, currentOperandElement);

numberButtons.forEach(numberButton => {
  numberButton.addEventListener("click", () => {
    let selectedNumber = numberButton.textContent
    calculator.appendNumber(selectedNumber);
  })
});

operatorButtons.forEach(operatorButton => {
  operatorButton.addEventListener("click", () => {
    let selectedOperator = operatorButton.textContent;
    if (calculator.canPerformOperation()) {
      calculator.performOperation();
    }
    calculator.selectOperator(selectedOperator);
  })
});

equalsButton.addEventListener("click", () => {
  if (calculator.canPerformOperation()) {
    calculator.performOperation();
  }
});

allClearButton.addEventListener("click", () => {
  calculator.allClear();
});

deleteButton.addEventListener("click", () => {
  calculator.deleteCharacter();
});

invertSignButton.addEventListener("click", () => {
  calculator.invertSign();
});

calculatorButtons.forEach(calculatorButton => {
  calculatorButton.addEventListener("click", () => {
    let selectedButtonText = calculatorButton.textContent;
    calculator.updateDisplay(selectedButtonText);
  })
});

document.addEventListener("keydown", (e) => {
  const pressedKeyElement = document.querySelector(`[data="${e.key}"]`);
  if (!pressedKeyElement) {
    return;
  }

  const pressedKey = pressedKeyElement.textContent;
  switch(true) {
    case (0 <= pressedKey && pressedKey <= 9) || pressedKey === ".":
      calculator.appendNumber(pressedKey);
      break;
    case calculator.isOperator(pressedKey):
      if (calculator.canPerformOperation()) {
        calculator.performOperation();
      }
      calculator.selectOperator(pressedKey);
      break;
    case pressedKey === "=":
      if (calculator.canPerformOperation()) {
        calculator.performOperation();
      }
      break;
    case pressedKey === "AC":
      calculator.allClear();
    case pressedKey === "DEL":
      calculator.deleteCharacter();
      break;
  }
  calculator.updateDisplay(pressedKey);
});