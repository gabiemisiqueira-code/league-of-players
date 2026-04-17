async function loadPlayer() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name');

  const playerName = document.getElementById('playerName');
  const playerInfo = document.getElementById('playerInfo');

  if (!name) {
    playerName.innerText = 'Nenhum jogador informado';
    playerInfo.innerText = 'Volte e pesquise.';
    return;
  }

  try {
    playerName.innerText = "Carregando...";

    const response = await fetch(`/api/player/${encodeURIComponent(name)}`);
    const data = await response.json();

    if (data.error) {
      playerName.innerText = "Não encontrado";
      playerInfo.innerText = data.error;
      return;
    }

    playerName.innerText = data.name;

    playerInfo.innerHTML = `
      Nível: ${data.level} <br><br>
      <img src="${data.icon}" width="80">
    `;

  } catch (err) {
    playerName.innerText = "Erro";
    playerInfo.innerText = "Não foi possível carregar.";
  }
}

window.onload = loadPlayer;