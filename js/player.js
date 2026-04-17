function getPlayerNameFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('name');
}

function loadPlayer() {
  const name = getPlayerNameFromURL();

  const playerName = document.getElementById('playerName');
  const playerInfo = document.getElementById('playerInfo');

  if (!playerName || !playerInfo) {
    return;
  }

  if (!name) {
    playerName.innerText = 'Nenhum jogador informado';
    playerInfo.innerText = 'Volte para a home e pesquise um jogador.';
    return;
  }

  playerName.innerText = name;
  playerInfo.innerHTML = `
    Rank: Mestre <br>
    Win Rate: 62% <br>
    KDA: 4.9 <br>
    Campeão favorito: Ahri
  `;
}

window.onload = loadPlayer;