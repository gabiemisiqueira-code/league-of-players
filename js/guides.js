const itemsList = document.getElementById('itemsList');
const spellsList = document.getElementById('spellsList');

async function getLatestVersion() {
  const response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
  if (!response.ok) {
    throw new Error('Não foi possível carregar a versão do Data Dragon.');
  }

  const versions = await response.json();
  return versions[0];
}

async function loadItemsAndSpells() {
  try {
    itemsList.innerHTML = '<p>Carregando itens...</p>';
    spellsList.innerHTML = '<p>Carregando spells...</p>';

    const version = await getLatestVersion();

    const itemsUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/data/pt_BR/item.json`;
    const spellsUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/data/pt_BR/summoner.json`;

    const [itemsResponse, spellsResponse] = await Promise.all([
      fetch(itemsUrl),
      fetch(spellsUrl)
    ]);

    if (!itemsResponse.ok || !spellsResponse.ok) {
      throw new Error('Não foi possível carregar itens e spells.');
    }

    const itemsData = await itemsResponse.json();
    const spellsData = await spellsResponse.json();

    const items = Object.entries(itemsData.data)
      .map(([id, item]) => ({
        id,
        name: item.name,
        description: item.plaintext || 'Sem descrição.'
      }))
      .filter((item) => item.name && item.description)
      .slice(0, 24);

    const spells = Object.values(spellsData.data)
      .map((spell) => ({
        id: spell.id,
        name: spell.name,
        description: spell.description
          .replace(/<[^>]*>/g, '')
          .replace(/\{\{[^}]+\}\}/g, '')
      }))
      .slice(0, 10);

    renderItems(items, version);
    renderSpells(spells, version);
  } catch (error) {
    itemsList.innerHTML = `
      <div class="card">
        <div class="card-content">
          <h3>Erro</h3>
          <p>${error.message}</p>
        </div>
      </div>
    `;

    spellsList.innerHTML = `
      <div class="card">
        <div class="card-content">
          <h3>Erro</h3>
          <p>${error.message}</p>
        </div>
      </div>
    `;
  }
}

function renderItems(items, version) {
  itemsList.innerHTML = items.map((item) => `
    <div class="card">
      <img
        class="card-image"
        src="https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.id}.png"
        alt="${item.name}"
        style="object-fit: contain; background: rgba(0,0,0,0.25); padding: 24px;"
      >
      <div class="card-content">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
      </div>
    </div>
  `).join('');
}

function renderSpells(spells, version) {
  spellsList.innerHTML = spells.map((spell) => `
    <div class="card">
      <img
        class="card-image"
        src="https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.id}.png"
        alt="${spell.name}"
        style="object-fit: contain; background: rgba(0,0,0,0.25); padding: 24px;"
      >
      <div class="card-content">
        <h3>${spell.name}</h3>
        <p>${spell.description}</p>
      </div>
    </div>
  `).join('');
}

window.addEventListener('load', loadItemsAndSpells);