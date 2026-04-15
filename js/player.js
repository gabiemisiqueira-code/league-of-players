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

  const parts = value.split("#");
  const name = parts[0];
  const tag = parts[1];

  hint.textContent = "Buscando...";

  try {
    const res = await fetch(`http://localhost:3000/player/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`);
    const data = await res.json();

    if (!res.ok) {
      hint.textContent = data.erro || "Erro ao buscar jogador";
      return;
    }

    playerName.textContent = `${data.gameName || name}#${data.tagLine || tag}`;
    playerLevel.textContent = data.summonerLevel || "--";
    playerId.textContent = data.id || "--";
    hint.textContent = "Jogador encontrado!";
  } catch {
    hint.textContent = "Erro ao conectar com backend";
  }
};

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("searched_player");
  if (saved && input) input.value = saved;
});
