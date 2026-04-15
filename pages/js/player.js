const playerTitle = document.getElementById("playerTitle");
const playerSubtitle = document.getElementById("playerSubtitle");
const playerLevel = document.getElementById("playerLevel");
const playerId = document.getElementById("playerId");
const playerAccount = document.getElementById("playerAccount");
const playerRegion = document.getElementById("playerRegion");
const playerSearchInput = document.getElementById("playerSearchInput");
const playerSearchBtn = document.getElementById("playerSearchBtn");
const playerSearchHint = document.getElementById("playerSearchHint");
const playerStatusBadge = document.getElementById("playerStatusBadge");
const summaryProfile = document.getElementById("summaryProfile");
const summaryProgress = document.getElementById("summaryProgress");

const BACKEND_URL = "http://localhost:3000";

function shortValue(value) {
  if (!value) return "--";
  if (value.length <= 18) return value;
  return value.slice(0, 18) + "...";
}

function setLoadingState() {
  playerSearchHint.textContent = "Buscando jogador...";
  playerStatusBadge.textContent = "Buscando";
}

function setErrorState(message) {
  playerSearchHint.textContent = message;
  playerStatusBadge.textContent = "Erro";
}

function setReadyState(message) {
  playerSearchHint.textContent = message;
  playerStatusBadge.textContent = "Online";
}

function fillPlayerData(data, searchedName) {
  playerTitle.textContent = data.name || searchedName || "Jogador encontrado";
  playerSubtitle.textContent = "Dados carregados pelo backend.";
  playerLevel.textContent = data.summonerLevel ?? "--";
  playerId.textContent = shortValue(data.id);
  playerAccount.textContent = shortValue(data.accountId);
  playerRegion.textContent = "BR1";
  summaryProfile.textContent = data.name || searchedName || "Invocador";
  summaryProgress.textContent = `Nível ${data.summonerLevel ?? "--"}`;
}

async function searchPlayer(name) {
  try {
    setLoadingState();

    const response = await fetch(`${BACKEND_URL}/summoner/${encodeURIComponent(name)}`);
    const data = await response.json();

    if (!response.ok) {
      setErrorState(data.erro || "Erro ao buscar jogador.");
      return;
    }

    fillPlayerData(data, name);
    setReadyState("Jogador encontrado com sucesso.");
    localStorage.setItem("searched_player", name);
  } catch (error) {
    setErrorState("Não foi possível conectar ao backend.");
  }
}

if (playerSearchBtn) {
  playerSearchBtn.addEventListener("click", () => {
    const name = playerSearchInput.value.trim();

    if (!name) {
      setErrorState("Digite um nick para buscar.");
      return;
    }

    searchPlayer(name);
  });
}

if (playerSearchInput) {
  playerSearchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const name = playerSearchInput.value.trim();

      if (!name) {
        setErrorState("Digite um nick para buscar.");
        return;
      }

      searchPlayer(name);
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const savedPlayer = localStorage.getItem("searched_player");

  if (savedPlayer && playerSearchInput) {
    playerSearchInput.value = savedPlayer;
    playerSearchHint.textContent = `Última busca: ${savedPlayer}`;
  }
});
