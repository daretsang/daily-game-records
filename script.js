const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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

function formatDate(iso) {
    const parts = String(iso).split("-");
    if (parts.length !== 3) {
        return iso;
    }
    const [year, month, day] = parts;
    const monthName = MONTHS[Number(month) - 1];
    if (!monthName) {
        return iso;
    }
    return monthName + " " + day + " " + year;
}

function winnerClass(winner) {
    return "winner-" + String(winner).toLowerCase();
}

function renderHistory(tbodyId, matches) {
    const tbody = document.getElementById(tbodyId);
    tbody.replaceChildren();

    matches.forEach((match) => {
        const row = document.createElement("tr");

        const dateCell = document.createElement("td");
        dateCell.textContent = formatDate(match.date);

        const winnerCell = document.createElement("td");
        winnerCell.className = winnerClass(match.winner);
        winnerCell.textContent = match.winner;

        const guessesCell = document.createElement("td");
        const guesses = document.createElement("span");
        guesses.className = "guesses";
        guesses.textContent = match.guesses;
        guessesCell.appendChild(guesses);

        row.append(dateCell, winnerCell, guessesCell);
        tbody.appendChild(row);
    });
}

function countWins(matches) {
    const scores = { Darren: 0, Winnie: 0, Tie: 0 };
    matches.forEach((match) => {
        if (Object.prototype.hasOwnProperty.call(scores, match.winner)) {
            scores[match.winner] += 1;
        }
    });
    return scores;
}

function setText(id, value) {
    document.getElementById(id).innerText = value;
}

function updateScores(contextoMatches, wordleMatches) {
    const contexto = countWins(contextoMatches);
    setText("contexto-darren", contexto.Darren);
    setText("contexto-winnie", contexto.Winnie);

    const wordle = countWins(wordleMatches);
    setText("wordle-darren", wordle.Darren);
    setText("wordle-winnie", wordle.Winnie);
    setText("wordle-tie", wordle.Tie);
}

function calculateWinRates() {
    const wDarren = Number(document.getElementById("wordle-darren").innerText);
    const wWinnie = Number(document.getElementById("wordle-winnie").innerText);
    const wTie = Number(document.getElementById("wordle-tie").innerText);
    const wTotal = wDarren + wWinnie + wTie;

    if (wTotal > 0) {
        document.querySelector("#wordle .darren-score .win-rate").innerText = ((wDarren / wTotal) * 100).toFixed(0) + "%";
        document.querySelector("#wordle .winnie-score .win-rate").innerText = ((wWinnie / wTotal) * 100).toFixed(0) + "%";
        document.querySelector("#wordle .tie-score .win-rate").innerText = ((wTie / wTotal) * 100).toFixed(0) + "%";
    }

    const cDarren = Number(document.getElementById("contexto-darren").innerText);
    const cWinnie = Number(document.getElementById("contexto-winnie").innerText);
    const cTotal = cDarren + cWinnie;

    if (cTotal > 0) {
        document.querySelector("#contexto .darren-score .win-rate").innerText = ((cDarren / cTotal) * 100).toFixed(0) + "%";
        document.querySelector("#contexto .winnie-score .win-rate").innerText = ((cWinnie / cTotal) * 100).toFixed(0) + "%";
    }
}

async function loadMatches(path) {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) {
        throw new Error("Could not load " + path);
    }
    return response.json();
}

window.onload = async function() {
    try {
        const [contextoMatches, wordleMatches] = await Promise.all([
            loadMatches("data/contexto.json"),
            loadMatches("data/wordle.json")
        ]);

        renderHistory("contexto-history", contextoMatches);
        renderHistory("wordle-history", wordleMatches);
        updateScores(contextoMatches, wordleMatches);
        calculateWinRates();
    } catch (error) {
        console.error(error);
        document.querySelector(".container").insertAdjacentHTML(
            "afterbegin",
            "<p>Could not load match data. Serve this folder over HTTP (for example <code>python -m http.server</code>) rather than opening the HTML file directly.</p>"
        );
    }
};
