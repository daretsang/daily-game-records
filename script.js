// 1. Tab Switching Logic
function openGame(gameName) {
    var games = document.getElementsByClassName("game-section");
    for (var i = 0; i < games.length; i++) {
        games[i].style.display = "none";
    }

    var tabButtons = document.getElementsByClassName("tab-btn");
    for (var i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className = tabButtons[i].className.replace(" active", "");
    }

    document.getElementById(gameName).style.display = "block";
    document.getElementById("btn-" + gameName).className += " active";
}

// 2. Score Calculation Logic
function updateScores() {
    // --- CONTEXTO CALCULATIONS ---
    let contextoDarren = 0;
    let contextoWinnie = 0;
    
    // Get all rows in the Contexto table body
    const contextoRows = document.querySelectorAll('#contexto tbody tr');
    
    contextoRows.forEach(row => {
        const winnerCell = row.cells[1];
        if (winnerCell.classList.contains('winner-darren')) {
            contextoDarren++;
        } else if (winnerCell.classList.contains('winner-winnie')) {
            contextoWinnie++;
        }
    });

    // Update the HTML numbers
    document.getElementById('contexto-darren').innerText = contextoDarren;
    document.getElementById('contexto-winnie').innerText = contextoWinnie;

    // --- WORDLE CALCULATIONS ---
    let wordleDarren = 0;
    let wordleWinnie = 0;
    let wordleTie = 0;

    // Get all rows in the Wordle table body
    const wordleRows = document.querySelectorAll('#wordle tbody tr');

    wordleRows.forEach(row => {
        const winnerCell = row.cells[1];
        if (winnerCell.classList.contains('winner-darren')) {
            wordleDarren++;
        } else if (winnerCell.classList.contains('winner-winnie')) {
            wordleWinnie++;
        } else if (winnerCell.classList.contains('winner-tie')) {
            wordleTie++;
        }
    });

    // Update the HTML numbers
    document.getElementById('wordle-darren').innerText = wordleDarren;
    document.getElementById('wordle-winnie').innerText = wordleWinnie;
    document.getElementById('wordle-tie').innerText = wordleTie;
}

// 3. Win Rate Logic (New)
function calculateWinRates() {
    // WORDLE CALCULATIONS
    // We grab the numbers from the HTML (which were just updated by the function above)
    const wDarren = Number(document.getElementById('wordle-darren').innerText);
    const wWinnie = Number(document.getElementById('wordle-winnie').innerText);
    const wTie = Number(document.getElementById('wordle-tie').innerText);
    const wTotal = wDarren + wWinnie + wTie;

    if (wTotal > 0) {
        document.querySelector('#wordle .darren-score .win-rate').innerText = ((wDarren / wTotal) * 100).toFixed(0) + "%";
        document.querySelector('#wordle .winnie-score .win-rate').innerText = ((wWinnie / wTotal) * 100).toFixed(0) + "%";
        document.querySelector('#wordle .tie-score .win-rate').innerText = ((wTie / wTotal) * 100).toFixed(0) + "%";
    }

    // CONTEXTO CALCULATIONS
    const cDarren = Number(document.getElementById('contexto-darren').innerText);
    const cWinnie = Number(document.getElementById('contexto-winnie').innerText);
    const cTotal = cDarren + cWinnie;

    if (cTotal > 0) {
        document.querySelector('#contexto .darren-score .win-rate').innerText = ((cDarren / cTotal) * 100).toFixed(0) + "%";
        document.querySelector('#contexto .winnie-score .win-rate').innerText = ((cWinnie / cTotal) * 100).toFixed(0) + "%";
    }
}

// 4. Run EVERYTHING when the page loads
window.onload = function() {
    updateScores();       // First, count the wins
    calculateWinRates();  // Second, calculate the percentages based on those wins
};