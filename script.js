const form = document.getElementById("loginForm");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nick = document.getElementById("nickname").value;
    localStorage.setItem("nick", nick);

    window.location.href = "dashboard.html";
  });
}

const welcome = document.getElementById("welcomeText");

if (welcome) {
  const nick = localStorage.getItem("nick");

  if (nick) {
    welcome.innerText = "Bem-vindo, " + nick;
  }
}
