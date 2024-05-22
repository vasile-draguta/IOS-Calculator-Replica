let num1 = '0';
let num2 = '';
let result = '';
let operator = '';

const map = {
    '+': 'plusButton',
    '-': 'minusButton',
    'x': 'multiplyButton',
    '/': 'divideButton'
}

const compute = (num1, num2, operator) => {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case 'x':
            return num1 * num2;
        case '/':
            return num1 / num2;
        default:
            return;
    }
}

const display = (num) => {
    document.getElementById('displayArea').innerText = num;
}

const handleDigitClick = (event) => {
    const value = event.target.innerText;

    if (!operator) {
        num1 === '0' ? num1 = value : num1 += value;
        display(num1);
    }
    else {
        num2 = num2 === '0' ? value : num2 + value;
        changeOperatorColor(map[operator], '#FF9500', '#FFFFFF');
        display(num2);
    }
}

const changeOperatorColor = (id, bgColor, textColor) => {
    const button = document.getElementById(id);
    if (!button) return;
    button.style.backgroundColor = bgColor;
    button.style.color = textColor;
}


const handleOperatorClick = (event) => {
    const value = event.target.innerText;
    const oldOperator = operator;
    operator = value;

    if (num2){
        num2 = '0';
    }

    if (oldOperator && oldOperator != operator) {
        changeOperatorColor(map[oldOperator], '#FF9500', '#FFFFFF');
    }
    changeOperatorColor(map[operator], '#FFFFFF', '#FF9500');
}

const handleEqualClick = () => {
    if (!operator) return;
    result = compute(parseFloat(num1), parseFloat(num2), operator);
    changeOperatorColor(map[operator], '#FF9500', '#FFFFFF');
    display(result);
    num1 = result.toString();
    result = '';
}

const handleClearClick = () => {
    num1 = '';
    num2 = '';
    result = '';
    changeOperatorColor(map[operator], '#FF9500', '#FFFFFF');
    operator = '';
    display('0');
}

const handlePercentClick = () => {
    if (!operator) {
        num1 = (parseInt(num1) / 100).toString();
        display(num1);
    } else {
        num2 = (parseInt(num2) / 100).toString();
        display(num2);
    }
}

const handleSignClick = () => {
    if (!operator) {
        num1 = (parseInt(num1) * -1).toString();
        display(num1);
    } else {
        num2 = (parseInt(num2) * -1).toString();
        display(num2);
    }
}

const handleCommaClick = () => {
    if (!operator) {
        if (!num1.includes('.')) {
            num1 += '.';
            display(num1);
        }
    } else {
        if (!num2.includes('.')) {
            num2 += '.';
            display(num2);
        }
    }
}


document.querySelectorAll('button').forEach((button) => {
    button.setAttribute('tabindex', '-1');
});
document.getElementById('clearButton').addEventListener('click', handleClearClick);
document.getElementById('equalButton').addEventListener('click', handleEqualClick);
document.getElementById('percentButton').addEventListener('click', handlePercentClick);
document.getElementById('signButton').addEventListener('click', handleSignClick);
document.getElementById('commaButton').addEventListener('click', handleCommaClick);
document.querySelectorAll('.digit').forEach((button) => {
    button.addEventListener('click', handleDigitClick);
});
document.querySelectorAll('.operation').forEach((button) => {
    button.addEventListener('click', handleOperatorClick);
});

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key >= '0' && key <= '9') {
        handleDigitClick({ target: { innerText: key } });
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleOperatorClick({ target: { innerText: key === '*' ? 'x' : key } });
    } else if (key === 'Enter') {
        handleEqualClick();
    } else if (key === 'Escape') {
        handleClearClick();
    } else if (key === '%') {
        handlePercentClick();
    } else if (key === '.') {
        handleCommaClick();
    }
    else if (key === 's' || key === 'S') {
        handleSignClick();
    }
});

