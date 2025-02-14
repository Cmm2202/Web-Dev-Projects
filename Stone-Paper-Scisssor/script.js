document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menu-button");
    const sidebar = document.getElementById("sidebar");
    const closeButton = document.getElementById("close-menu");
    const choices = document.querySelectorAll(".choice");
    const resultText = document.getElementById("round-result");
    const playerScoreText = document.getElementById("player-score");
    const computerScoreText = document.getElementById("computer-score");
    const resetButton = document.getElementById("reset");
    const newGameButton = document.createElement("button");

    newGameButton.id = "new-game";
    newGameButton.textContent = "New Game?";
    newGameButton.style.display = "none";
    document.body.appendChild(newGameButton);

    let playerScore = 0;
    let computerScore = 0;
    let roundsPlayed = 0;

    const choicesArray = ["rock", "paper", "scissors"];

    choices.forEach(choice => {
        choice.addEventListener("click", () => {
            if (roundsPlayed < 3) {
                const playerChoice = choice.dataset.choice;
                const computerChoice = choicesArray[Math.floor(Math.random() * 3)];
                determineWinner(playerChoice, computerChoice);
            }
        });
    });

    function determineWinner(player, computer) {
        let emojis = { rock: "✊", paper: "✋", scissors: "✌️" };
        if (player === computer) {
            resultText.textContent = `It's a tie! ${emojis[player]} vs ${emojis[computer]}`;
        } else if (
            (player === "rock" && computer === "scissors") ||
            (player === "scissors" && computer === "paper") ||
            (player === "paper" && computer === "rock")
        ) {
            playerScore++;
            resultText.textContent = `You win! ${emojis[player]} beats ${emojis[computer]}`;
            roundsPlayed++;
        } else {
            computerScore++;
            resultText.textContent = `You lose! ${emojis[computer]} beats ${emojis[player]}`;
            roundsPlayed++;
        }

        playerScoreText.textContent = playerScore;
        computerScoreText.textContent = computerScore;

        if (roundsPlayed === 3) {
            showFinalResult();
            disableGame();
        }
    }

    function showFinalResult() {
        if (playerScore > computerScore) {
            resultText.textContent = `Congratulations! You won the game! 🎉`;
        } else if (computerScore > playerScore) {
            resultText.textContent = `Sorry! The computer won the game. 😞`;
        } else {
            resultText.textContent = `It's a tie game! 🤝`;
        }
        showConfetti();
        newGameButton.style.display = "block";
    }

    function showConfetti() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    function disableGame() {
        choices.forEach(choice => {
            choice.disabled = true;
        });
    }

    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        roundsPlayed = 0;
        resultText.textContent = "";
        playerScoreText.textContent = "0";
        computerScoreText.textContent = "0";
        newGameButton.style.display = "none";
        choices.forEach(choice => {
            choice.disabled = false;
        });
    }

    resetButton.addEventListener("click", () => {
        resetGame();
    });

    newGameButton.addEventListener("click", () => {
        resetGame();
    });

    menuButton.addEventListener("click", () => sidebar.classList.toggle("show"));
    closeButton.addEventListener("click", () => sidebar.classList.remove("show"));
});
