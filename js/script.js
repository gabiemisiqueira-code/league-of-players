const loginForm = document.getElementById("loginForm");
const welcomeText = document.getElementById("welcomeText");
const searchBtn = document.getElementById("searchBtn");
const summonerInput = document.getElementById("summonerInput");
const searchHint = document.getElementById("searchHint");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nickname = document.getElementById("nickname").value.trim();
    const email = document.getElementById("email").value.trim();

    localStorage.setItem("lop_nickname", nickname);
    localStorage.setItem("lop_email", email);

    window.location.href = "dashboard.html";
  });
}

if (welcomeText) {
  const savedNickname = localStorage.getItem("lop_nickname");
  welcomeText.textContent = savedNickname ? `Bem-vindo, ${savedNickname}` : "Bem-vindo, jogador";
}

if (searchBtn && summonerInput) {
  searchBtn.addEventListener("click", function () {
    const nick = summonerInput.value.trim();

    if (!nick) {
      searchHint.textContent = "Digite um Riot ID para continuar.";
      return;
    }

    localStorage.setItem("searched_player", nick);
    searchHint.textContent = `Busca preparada para: ${nick}`;

    setTimeout(() => {
      window.location.href = "pages/player.html";
    }, 500);
  });
}
