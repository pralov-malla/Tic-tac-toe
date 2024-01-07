let buttons = document.querySelectorAll(".btn");
let resetBtn = document.querySelector(".reset-btn");
let newGameBtn = document.querySelector(".new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnX = true;
let clickValue = 0;


const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnX = true;
    enableButtons();
    clickValue = 0;
    msgContainer.classList.add("hide");
}
const disableButtons = () => {
    for (let btn of buttons) {
        btn.disabled = true;
    }
}
const enableButtons = () => {
    for (let btn of buttons) {
        btn.disabled = false;
        btn.innerText = "";
    }
}

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        console.log("button was clicked");
        if (turnX) //playerO turn
        {
            btn.innerText = "X";
            turnX = false;
        }
        else { //playerX turn
            btn.innerText = "O";
            turnX = true;
        }
        clickValue++;
        btn.disabled = true;

        let winnerFound = checkWinner();

        if(clickValue==9 && !winnerFound){
            draw();
        }
    });
})


const draw = () => {
    console.log("Draw");
    msg.innerText = "Draw";
    msgContainer.classList.remove("hide");
    disableButtons();
}
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Player ${winner}`;
    msgContainer.classList.remove("hide");
    disableButtons();
}

const checkWinner = () => {

    for (let pattern of winPatterns) {
        let pos1Val = buttons[pattern[0]].innerText;
        let pos2Val = buttons[pattern[1]].innerText;
        let pos3Val = buttons[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("winner", pos1Val);
                showWinner(pos1Val);
                resetBtn.classList.add("hide");
                return true;
            }
        }
    }

}


newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);





