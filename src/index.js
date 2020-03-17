function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let isOpened = 0;

    let numbers = [];
    let operator = [];
    let arr = expr
        .replace(/\s/g, "")
        .replace(/[\+\-\*\/\(\)]/g, " $& ")
        .replace(/\s\s/g, " ")
        .trim()
        .split(" ");
    let oper = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b
    };

    let obj = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2
    };

    const operate = () => {
        let operatorPop = operator.pop();
        if (operatorPop == "(")
            throw "ExpressionError: Brackets must be paired";

        let b = +numbers.pop();
        let a = +numbers.pop();
        if (operatorPop === "/" && b === 0)
            throw "TypeError: Division by zero.";
        numbers.push(oper[operatorPop](a, b));
    };

    for (let i = 0; i < arr.length; i++) {
        if (isFinite(arr[i])) {
            numbers.push(arr[i]);
        } else if (!isFinite(arr[i])) {
            if (arr[i] == "(") {
                isOpened++;
                operator.push(arr[i]);
            } else if (arr[i] == ")") {
                isOpened--;
                if (isOpened < 0)
                    throw "ExpressionError: Brackets must be paired";
                let m = operator.length - 1;
                while (operator[m] !== "(") {
                    operate();
                    m--;
                }
                operator.pop();
            } else if (
                obj[arr[i]] > obj[operator[operator.length - 1]] ||
                operator.length == 0 ||
                operator[operator.length - 1] == "("
            ) {
                operator.push(arr[i]);
            } else if (
                obj[arr[i]] == obj[operator[operator.length - 1]] ||
                obj[arr[i]] < obj[operator[operator.length - 1]]
            ) {
                operate();
                i--;
            }
        }
    }
    for (let i = 0; i < numbers.length; i++) {
        if (isOpened > 0) throw "ExpressionError: Brackets must be paired";
        if (operator[0] == "(" && operator.length == 1)
            throw "ExpressionError: Brackets must be paired";
        if (numbers.length > 1) {
            operate();
            i--;
        } else return +numbers[0].toFixed(4);
    }
}

module.exports = {
    expressionCalculator
};
