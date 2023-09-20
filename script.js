const add = (n1, n2) => n1 + n2;
const subtract = (n1, n2) => n1 - n2;
const multiply = (n1, n2) => n1 * n2;
const divide = (n1, n2) => n2 === 0 ? "Infinity" : n1 / n2;
const percentage = (n1, n2) => n2 === 0 ? "ERROR": `${(n1 / n2) * 100}%`;

const operate = (n1, op, n2) => {
    return op === "+" ? add(n1, n2)
    : op === "-" ? subtract(n1, n2)
    : op === "*" ? multiply(n1, n2)
    : op === "/" ? divide(n1, n2)
    : op === "%" ? percentage(n1, n2)
    : 0;
};

const display = document.querySelector(".content");
const btn = document.querySelectorAll("button");
const btnNum = document.querySelectorAll(".numbers button");
const btnSign = document.querySelectorAll(".signs button");
const btnEqual = document.querySelector("#equal");
const btnClear = document.querySelector("#clear");
const btnDelete = document.querySelector("#delete");

let n1;
let n2;
let op;
let isNumInput;
let decimal;
let sequence;
let arrDisplay = [];
let sign;
let isActionBefore;
display.textContent = "0";

btnNum.forEach(button => {

    button.addEventListener("click", (e) => {
        //check if there's already a decimal on display
        arrDisplay.includes(".") ? decimal = true : decimal = false;
        if (decimal) if (e.target.innerText === ".") return;

        //hitting decimal after an operator should results "0."
        if (e.target.innerText === ".") if (isActionBefore) {
            display.textContent = "0.";
            return;
        }

        arrDisplay.push(e.target.innerText);
        display.textContent = arrDisplay.join("");
        sequence = arrDisplay.join("");

        isNumInput = true;
        isActionBefore = false;

    });
});

btnSign.forEach(button => {

    button.addEventListener("click", (e) => {
    
        // to show a sign op being used
        if (sign) sign.classList.remove("isPressed");
        e.target.classList.toggle("isPressed");
        sign = e.target;
    
        //only after a num1 and an op has been input and support chain operation (++, --, ...)
        if ((op && isNumInput)) {
            n2 = Number(sequence);
            display.textContent = operate(n1, op, n2);
            sequence = display.textContent;
        }

        //keep n1 if before is an action
        if (!isActionBefore) n1 = Number(sequence);
        op= e.target.id;
        
        arrDisplay = [];
        isNumInput = false;
        isActionBefore = true;
    
    });
});

btnEqual.addEventListener("click", () => {

    if (sign) sign.classList.remove("isPressed");
    n2 = Number(sequence);
    //support (+=, -=, *=, /=)
    if (isActionBefore || isNumInput) {
        display.textContent = operate(n1, op, n2);
        n1 = +display.textContent;
    }

    
    arrDisplay = [];
    isNumInput = false;
    isActionBefore = true;

});

btnClear.addEventListener("click", () => {

    if (sign) sign.classList.remove("isPressed");
    display.textContent = "0";
    sequence = "";
    n1 = 0;
    n2 = 0;
    op= false;
    arrDisplay = [];
    isNumInput = false;
    isActionBefore = true;

});

btnDelete.addEventListener("click", () => {

    if (sign) sign.classList.remove("isPressed");
    arrDisplay.pop();
    display.textContent = arrDisplay.join("");
    sequence = arrDisplay.join("");

    if (!sequence) display.textContent = "0";

    op = false;
    isNumInput = false;
    n1 = sequence;
    isActionBefore = true;

});

//show which button is being clicked on
btn.forEach(button => {
    button.addEventListener("mousedown", (e) => {
        e.target.classList.add("isClickOn");
    });

    button.addEventListener("mouseup", (e) => {
        e.target.classList.remove("isClickOn");
    });

    button.addEventListener("mouseout", (e) => {
        e.target.classList.remove("isClickOn");
    });
});
