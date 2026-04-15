const BACKEND_URL = "https://https://league-of-players.onrender.com"; // depois você troca

const input = document.getElementById("playerSearchInput");
const button = document.getElementById("playerSearchBtn");
const hint = document.getElementById("playerSearchHint");

const playerName = document.getElementById("playerName");
const playerLevel = document.getElementById("playerLevel");
const playerId = document.getElementById("playerId");

button.onclick = async () => {
  const value = input.value.trim();

  if (!value.includes("#")) {
    hint.textContent = "Use formato: Nome#TAG";
    return;
  }

  const [name, tag] = value.split("#");

  hint.textContent = "Buscando...";

  try {
    const res = await fetch(`${BACKEND_URL}/player/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`);
    const data = await res.json();

    if (!res.ok) {
      hint.textContent = data.erro || "Erro ao buscar jogador";
      return;
    }

    playerName.textContent = `${data.gameName}#${data.tagLine}`;
    playerLevel.textContent = data.summonerLevel;
    playerId.textContent = data.id;

    hint.textContent = "Jogador encontrado!";
  } catch (err) {
    hint.textContent = "Erro ao conectar com backend";
  }
};
