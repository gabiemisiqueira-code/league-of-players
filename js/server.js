const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = process.env.RIOT_API_KEY;
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Servidor Riot funcionando");
});

app.get("/player/:gameName/:tagLine", async (req, res) => {
  try {
    const { gameName, tagLine } = req.params;

    const accountResponse = await axios.get(
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`,
      {
        headers: {
          "X-Riot-Token": API_KEY
        }
      }
    );

    const puuid = accountResponse.data.puuid;

    const summonerResponse = await axios.get(
      `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
      {
        headers: {
          "X-Riot-Token": API_KEY
        }
      }
    );

    res.json({
      gameName,
      tagLine,
      ...summonerResponse.data
    });
  } catch (error) {
    res.status(error.response?.status || 500).json({
      erro: "Erro ao buscar jogador",
      detalhe: error.response?.data || error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
