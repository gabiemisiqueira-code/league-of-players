const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'js')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'ranking.html'));
});

app.get('/ranking', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'ranking.html'));
});

app.get('/champions', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'champions.html'));
});

app.get('/player', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'player.html'));
});

app.get('/compare', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'compare.html'));
});

app.get('/guides', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'guides.html'));
});

app.get('/pro', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'pro.html'));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`