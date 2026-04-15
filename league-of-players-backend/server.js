const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.RIOT_API_KEY;

app.get("/", (req, res) => {
  res.send("Servidor Riot online 🚀");
});

app.get("/player/:gameName/:tagLine", async (req, res) => {
  try {
    const { gameName, tagLine } = req.params;

    const accountResponse = await axios.get(
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
      {
        headers: { "X-Riot-Token": API_KEY }
      }
    );

    const puuid = accountResponse.data.puuid;

    const summonerResponse = await axios.get(
      `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
      {
        headers: { "X-Riot-Token": API_KEY }
      }
    );

    res.json({
      gameName,
      tagLine,
      ...summonerResponse.data
    });

  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar jogador"
    });
  }
});

app.listen(PORT, () => {
  console.log("Servidor rodando...");
});
