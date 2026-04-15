const playerSearchInput = document.getElementById("playerSearchInput");
const playerSearchBtn = document.getElementById("playerSearchBtn");
const playerSearchHint = document.getElementById("playerSearchHint");

const BACKEND_URL = "http://localhost:3000";

function parseRiotID(input) {
  const parts = input.split("#");

  if (parts.length !== 2) return null;

  return {
    gameName: parts[0],
    tagLine: parts[1]
  };
}

async function searchPlayer(input) {
  const parsed = parseRiotID(input);

  if (!parsed) {
    playerSearchHint.textContent = "Use formato: Nome#TAG (ex: Faker#KR1)";
    return;
  }

  try {
    playerSearchHint.textContent = "Buscando...";

    const response = await fetch(
      `${BACKEND_URL}/player/${parsed.gameName}/${parsed.tagLine}`
    );

    const data = await response.json();

    if (!response.ok) {
      playerSearchHint.textContent = "Erro ao buscar jogador.";
      return;
    }

    playerSearchHint.textContent = "Jogador encontrado!";
    console.log(data);

  } catch {
    playerSearchHint.textContent = "Erro de conexão com backend.";
  }
}

playerSearchBtn.addEventListener("click", () => {
  const input = playerSearchInput.value.trim();

  if (!input) {
    playerSearchHint.textContent = "Digite um jogador.";
    return;
  }

  searchPlayer(input);
});
