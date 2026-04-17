const championsList = document.getElementById('championsList');
const championSearch = document.getElementById('championSearch');

let allChampions = [];

async function getLatestVersion() {
  const response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
  if (!response.ok) {
    throw new Error('Não foi possível carregar a versão do Data Dragon.');
  }

  const versions = await response.json();
  return versions[0];
}

async function loadChampions() {
  try {
    championsList.innerHTML = '<p>Carregando campeões...</p>';

    const version = await getLatestVersion();
    const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/pt_BR/champion.json`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Não foi possível carregar os campeões.');
    }

    const data = await response.json();

    allChampions = Object.values(data.data)
      .map((champion) => ({
        id: champion.id,
        name: champion.name,
        title: champion.title,
        blurb: champion.blurb
      }))
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

    renderChampions(allChampions);
  } catch (error) {
    championsList.innerHTML = `
      <div class="card">
        <div class="card-content">
          <h3>Erro ao carregar</h3>
          <p>${error.message}</p>
        </div>
      </div>
    `;
  }
}

function renderChampions(champions) {
  if (!champions.length) {
    championsList.innerHTML = `
      <div class="card">
        <div class="card-content">
          <h3>Nenhum campeão encontrado</h3>
          <p>Tente outro nome na busca.</p>
        </div>
      </div>
    `;
    return;
  }

  championsList.innerHTML = champions.map((champion) => `
    <div class="card">
      <img
        class="card-image"