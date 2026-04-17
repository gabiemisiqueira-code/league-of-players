function searchPlayer() {
  const input = document.getElementById('searchInput');
  const name = input.value.trim();

  if (!name) {
    alert('Digite o nome do jogador');
    return;
  }

  window.location.href = `/player?name=${encodeURIComponent(name)}`;
 }