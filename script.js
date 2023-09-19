function add(n1, n2) {
    return n1 + n2;
}

function subtract(n1, n2) {
    return n1 - n2;
}

function multiply(n1, n2) {
    return n1 * n2;
}

function divide(n1, n2) {
    (n2 === 0) ? "ERROR" : n1 / n2;
}

function operate(n1, operator, n2) {
    switch(operator) {
        case "plus":
            return add(n1, n2);
        case "minus":
            return subtract(n1, n2);
        case "time":
            return multiply(n1, n2);
        case "divide":
            return divide(n1, n2);
    }
}

const display = document.querySelector(".display");
const btn = document.querySelectorAll(".numbers button");
const btnSign = document.querySelectorAll(".operator button");
const btnEqual = document.querySelector("#equal");
const btnClear = document.querySelector("#clear");

let n1;
let n2 = 0;
let operator;
let operatorText;
let sequence = "";

btn.forEach(button => button.addEventListener("click", function(e) {
    display.textContent = `${e.target.innerText}`;
    sequence += `${e.target.innerText}`;
}) );

btnSign.forEach(button => button.addEventListener("click", function(e) {
    n1 = +sequence;
    operator = e.target.id;
    operatorText = ` ${e.target.innerText} `;
    sequence += ` ${e.target.innerText} `;
    display.textContent = operate(n1, operator, n2);
    console.log(n1);
    console.log(operator);
}) );

// btnEqual.addEventListener("click", () => {
//     n2 = +(sequence).replace(`${n1}`+ operatorText, "");
//     console.log(n2);
//     display.textContent = operate(n1, operator, n2);
//     sequence = display.textContent;
//     console.log(display.textContent);

// });

btnClear.addEventListener("click", () => {
    display.textContent = "";
    sequence = "";
    n1 = 0;
    n2 = 0;
    operator = "";
});

