const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandElement = document.querySelector("[data-previous-operand]");
const currentOperandElement = document.querySelector("[data-current-operand]");

function Calculator() {
  this.previousOperand = "";
  this.currentOperand = "";

  this.appendNumber = function(number) {
    this.currentOperand += number;
    console.log(calculator)
  }
}

const calculator = new Calculator();

numberButtons.forEach(numberButton => {
  numberButton.addEventListener("click", () => {
    calculator.appendNumber(numberButton.textContent);
  })
});