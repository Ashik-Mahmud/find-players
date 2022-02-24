/* 
TODO:
- 
-
-
-
-
-


*/

/* step 1. select all elements */
const playerContent = document.querySelector(".player-content");
const searchField = document.getElementById("search-player");


/* step 2. create function for showing all of players  */

const loadPlayers = async () => {
    let response = await fetch(`https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p`);
    let data = await response.json();
    displayPlayer(data.player)
}


/* search player function  */
searchField.addEventListener('input', async (event) => {
    let playerName = event.target.value;
    let response = await fetch(`https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${playerName}`);
    let data = await response.json();
    displayPlayer(data.player);
})


/* step 3. display player  */
const displayPlayer = players => {
    playerContent.textContent = '';
    console.log(players)
    if (!players) {
        playerContent.innerHTML = `<h1 style="position:absolute;text-align:center;width:100%;margin:6rem 0rem; color: #f00">Player not found.</h1>`;
    } else {
        players.forEach((player) => {
            playerContent.innerHTML += `
                        <div class="card" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <div class="card-img-top">
                            <img class="rounded-2" src="${player.strThumb ? player.strThumb : 'https://bit.ly/3h9jO22'}"
                                alt="">
                        </div>
                        <div class="details">
                            <h4>${player.strPlayer}</h4>
                            <span>Team : <strong>${player.strTeam.slice(0, 15)}</strong></span>
                            <p class="m-0"> <span id="designation">Nationality</span> <strong>${player.strNationality}</strong></p>
                            <p class="m-0"> <span id="gender">Sports</span> <strong>${player.strSport}</strong></p>
                            <p class="m-0"> <span id="Height">Height</span> <strong>${player.strHeight}</strong></p>
                        </div>
                        </div>`;
        });
    }
}

loadPlayers();