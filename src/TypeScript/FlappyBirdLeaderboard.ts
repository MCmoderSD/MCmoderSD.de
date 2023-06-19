document.addEventListener('DOMContentLoaded', fetchLeaderboardData);

function fetchLeaderboardData() {
    fetch('src/PHP/fetch_leaderboard.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Fehler beim Abrufen der Daten: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            displayLeaderboard(data);
        })
        .catch(error => {
            console.error(error);
        });
}

function displayLeaderboard(data) {
    const table = document.getElementById('Leaderboard');
    table.innerHTML = ''; // Tabelle leeren

    // Tabellenkopf erstellen
    const tableHead = document.createElement('thead');
    const headRow = document.createElement('tr');
    const headers = ['Platz', 'Name', 'Punkte'];

    for (const header of headers) {
        const th = document.createElement('th');
        th.textContent = header;
        headRow.appendChild(th);
    }

    tableHead.appendChild(headRow);
    table.appendChild(tableHead);

    // Tabelleninhalt erstellen
    const tableBody = document.createElement('tbody');

    for (const entry of data) {
        const row = document.createElement('tr');

        const rankCell = document.createElement('td');
        rankCell.textContent = entry.rank;
        row.appendChild(rankCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = entry.name;
        row.appendChild(nameCell);

        const scoreCell = document.createElement('td');
        scoreCell.textContent = entry.score;
        row.appendChild(scoreCell);

        tableBody.appendChild(row);
    }

    table.appendChild(tableBody);
}
