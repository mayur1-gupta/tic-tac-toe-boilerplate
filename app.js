const boxElements = document.querySelectorAll(".box");
var winningConfigurations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
var xAttempts = [];
var oAttempts = [];
var clickCount = 0;
var gameWon = 0;
const messageElement = document.getElementById("message");
const gameResultElement = document.getElementById("result");
const restartButton = document.getElementById("button");

boxElements.forEach(box => {
    box.onclick = handleBoxClick;
});

function handleBoxClick(e) {
    console.log(e.target);
    console.log(e.target.getAttribute('id'));
    const index = e.target.getAttribute('id');
    const textElement = document.createElement('p');
    textElement.setAttribute('id', 'text');
    boxElements[index - 1].appendChild(textElement);
    console.log(boxElements[index - 1]);

    if (clickCount % 2 == 0) {
        oAttempts.push(parseInt(index - 1));
        console.log(oAttempts);
        textElement.innerHTML = "O";
        textElement.style.color = "#FAB201";
        checkResult(winningConfigurations, oAttempts, "O");
    } else {
        xAttempts.push(parseInt(index - 1));
        console.log(xAttempts);
        textElement.innerHTML = "X";
        textElement.style.color = "#FAB201";
        checkResult(winningConfigurations, xAttempts, "X");
    }
    clickCount++;
    if (clickCount == 9 && gameWon == 0) {
        gameResultElement.style.visibility = "visible";
        messageElement.innerHTML = "It's a tie 💛";
    }
}

function checkResult(winningConfigurations, attempts, player) {
    let flag = 0;
    let checker = [];
    for (var i = 0; i < winningConfigurations.length; i++) {
        console.log(winningConfigurations[i]);
        if (Array.isArray(winningConfigurations[i])) {
            checkResult(winningConfigurations[i], attempts, player);
        } else {
            if (attempts.includes(winningConfigurations[i])) {
                checker.push(true);
                flag++;
            } else {
                checker.push(false);
            }
        }
    }

    if (checker.every(check => check === true) && flag > 2) {
        gameResultElement.style.visibility = "visible";
        messageElement.innerHTML = "'" + player + "'" + "Won the game!";
        gameWon = 1;
    }
}

restartButton.onclick = () => {
    history.go(0);
};