
const screen = document.getElementById('screen');
const keys = document.querySelectorAll('.key');

let currentInput = '';
let operator = '';
let previousInput = '';

keys.forEach(key => {
    key.addEventListener('click', () => {
        const keyValue = key.textContent;

        if (key.classList.contains('number')) {
            if (currentInput === '0' || currentInput === '') {
                currentInput = keyValue;
            } else {
                currentInput += keyValue;
            }
        } else if (key.classList.contains('operator')) {
            operator = keyValue;
            previousInput = currentInput;
            currentInput = '';
        } else if (key.classList.contains('equal')) {
            currentInput = calculate(previousInput, currentInput, operator);
            operator = '';
        } else if (key.getAttribute('data-action') === 'clear') {
            currentInput = '';
            operator = '';
            previousInput = '';
        } else if (key.getAttribute('data-action') === 'delete') {
            currentInput = currentInput.slice(0, -1);
        }

        screen.textContent = currentInput || '0';
    });
});

function calculate(a, b, operator) {
    const firstNum = parseFloat(a);
    const secondNum = parseFloat(b);

    switch (operator) {
        case '+':
            return (firstNum + secondNum).toString();
        case '-':
            return (firstNum - secondNum).toString();
        case '*':
            return (firstNum * secondNum).toString();
        case '/':
            return (firstNum / secondNum).toString();
        default:
            return b;
    }
}
