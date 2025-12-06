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