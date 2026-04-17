const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();

// ⚠️ COLOCA SUA API KEY AQUI
const RIOT_API_KEY = "COLOQUE_SUA_API_KEY_AQUI";

// arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'js')));

// páginas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'ranking.html'));
});

app.get('/player', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'player.html'));
});

app.get('/champions', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'champions.html'));
});

app.get('/guides', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'guides.html'));
});

// 🔥 API: buscar jogador
app.get('/api/player/:name', async (req, res) => {
  const name = req.params.name;

  try {
    // muda região se quiser (br1 = Brasil)
    const url = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(name)}?api_key=${RIOT_API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(404).json({ error: 'Jogador não encontrado' });
    }

    const data = await response.json();

    res.json({
      name: data.name,
      level: data.summonerLevel,
      icon: `https://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${data.profileIconId}.png`
    });

  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar jogador' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});