/* 
TODO:
- select all elements
- create function for showing all of players
- search player function 
- display player
- Load modal data 
- display modal data 


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
    if (!players) {
        playerContent.innerHTML = `<h1 style="position:absolute;text-align:center;width:100%;margin:6rem 0rem; color: #f00">Player not found.</h1>`;
    } else {
        players.forEach((player) => {
            playerContent.innerHTML += `
                        <div class="card" onclick="loadModalData(${player.idPlayer})" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
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
/* Load modal data  */
const loadModalData = async (playerId) => {
    let response = await fetch(`https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerId}`);
    let data = await response.json();
    displayModalData(data.players[0]);
    setTimeout(() => {
        document.getElementById('preloader').style.display ='none';
    }, 3000);
}
/* display modal data  */
const displayModalData = data => {
    const modalContent = document.getElementById("modal-content");
    modalContent.textContent = '';
    let modalTag = `
                <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">${data.strPlayer}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <img style="width: 100%;height: 200px;object-fit:cover;"  src="${data.strBanner ? data.strBanner : data.strCutout ? data.strCutout : data.strThumb ? data.strThumb : 'https://bit.ly/3vf1qNA'}" alt="banner player image">
                    <table class="mt-4 table">
                        <tr>
                            <th>Nationality:</th>
                            <td>${data.strNationality}</td>
                            <th>Teams: </th>
                            <td>${data.strTeam}, ${data.strTeam2 ? data.strTeam2 : ''}</td>
                            <th>Birth Location: </th>
                            <td>${data.strBirthLocation}</td>
                        </tr>
                        <tr>
                            <th>Sports :</th>
                            <td>${data.strSport}</td>
                            <th>Date of Birth: </th>
                            <td>${data.dateBorn}</td>
                            <th>Gender : </th>
                            <td>${data.strGender}</td>
                        </tr>
                        <tr>
                            <th>Position :</th>
                            <td>${data.strPosition}</td>
                            <th>Height : </th>
                            <td>${data.strHeight}</td>
                            <th>Weight : </th>
                            <td>${data.strWeight}</td>
                        </tr>
                        <tr>
                            <th>Social Media :</th>
                            <td>${data.strFacebook ? `<a target="_blank" href="https://${data.strFacebook}">Facebook</a>` : 'nill' }</td>
                            <td>${data.strTwitter ? `<a target="_blank" href="https://${data.strTwitter}">Twitter</a>` : 'nill' }</td>
                            <td>${data.strInstagram ? `<a target="_blank" href="https://${data.strInstagram}">Instagram</a>` : 'nill' }</td>
                            <td>${data.strYoutube ? `<a target="_blank" href="https://${data.strYoutube}">Youtube</a>` : 'nill' }</td>
                            <td>${data.strWebsite ? `<a target="_blank" href="https://${data.strWebsite}">Website</a>` : 'nill' }</td>
                        </tr>
                    </table>
                    <div class="row">
                        <div class="col-lg-3">
                            <img src="${data.strFanart1 ? data.strFanart1 : data.strThumb}" alt="">
                        </div>
                        <div class="col-lg-3">
                            <img src="${data.strFanart2 ? data.strFanart2 : data.strCutout}" alt="">
                        </div>
                        <div class="col-lg-3">
                            <img src="${data.strFanart3}" alt="">
                        </div>
                        <div class="col-lg-3">
                            <img src="${data.strFanart4}" alt="">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>`;
    modalContent.insertAdjacentHTML('beforeend', modalTag);
    const closeBtn = document.querySelectorAll('[data-bs-dismiss="modal"]');
    closeBtn.forEach((btn) =>{
        btn.addEventListener('click', ()=>{
            setTimeout(() => {
                document.getElementById('preloader').style.display ='grid';
            }, 1000);
        })
    })
}
loadPlayers();