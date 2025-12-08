function openGame(gameName) {
    // 1. Hide all game sections
    var games = document.getElementsByClassName("game-section");
    for (var i = 0; i < games.length; i++) {
        games[i].style.display = "none";
    }

    // 2. Remove the "active" class from all tab buttons
    var tabButtons = document.getElementsByClassName("tab-btn");
    for (var i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className = tabButtons[i].className.replace(" active", "");
    }

    // 3. Show the specific game chosen
    document.getElementById(gameName).style.display = "block";

    // 4. Add "active" class to the button that was clicked
    // We construct the ID: "btn-" + "wordle" = "btn-wordle"
    document.getElementById("btn-" + gameName).className += " active";
}

document.addEventListener('DOMContentLoaded', function() {
    calculateWinRates();
});

function calculateWinRates() {
    // WORDLE CALCULATIONS
    const wDarren = Number(document.getElementById('wordle-darren').innerText);
    const wWinnie = Number(document.getElementById('wordle-winnie').innerText);
    const wTie = Number(document.getElementById('wordle-tie').innerText);
    const wTotal = wDarren + wWinnie + wTie;

    if (wTotal > 0) {
        // use querySelector to find the win-rate div specifically inside the wordle section's classes
        document.querySelector('#wordle .darren-score .win-rate').innerText = ((wDarren / wTotal) * 100).toFixed(0) + "%";
        document.querySelector('#wordle .winnie-score .win-rate').innerText = ((wWinnie / wTotal) * 100).toFixed(0) + "%";
        document.querySelector('#wordle .tie-score .win-rate').innerText = ((wTie / wTotal) * 100).toFixed(0) + "%";
    }

    // CONTEXTO CALCULATIONS
    const cDarren = Number(document.getElementById('contexto-darren').innerText);
    const cWinnie = Number(document.getElementById('contexto-winnie').innerText);
    const cTotal = cDarren + cWinnie;

    if (cTotal > 0) {
        // target the win-rate divs specifically inside the #contexto section
        document.querySelector('#contexto .darren-score .win-rate').innerText = ((cDarren / cTotal) * 100).toFixed(0) + "%";
        document.querySelector('#contexto .winnie-score .win-rate').innerText = ((cWinnie / cTotal) * 100).toFixed(0) + "%";
    }
}