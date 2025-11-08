// Botão menu hamburguer
const menuBtn = document.querySelector('.menu-toggle');

menuBtn.addEventListener('click', () => {
  document.body.classList.toggle('menu-aberto'); // abre/fecha menu
});

// Fecha o menu quando clicar em algum link
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.remove('menu-aberto');
  });
});

// Modo escuro simples
const toggle = document.getElementById('toggle');
if (toggle) {
  const dark = localStorage.getItem('modoEscuro') === '1';
  toggle.checked = dark;
  document.body.classList.toggle('escuro', dark);

  toggle.addEventListener('change', () => {
    document.body.classList.toggle('escuro', toggle.checked);
    localStorage.setItem('modoEscuro', toggle.checked ? '1' : '0');
  });
}
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const userText = userInput.value.trim();
  if (userText === "") return;

  // Mostra mensagem do usuário
  appendMessage(userText, "user");

  // Limpa o campo
  userInput.value = "";

  // Processa resposta do bot
  setTimeout(() => {
    const botReply = getBotResponse(userText);
    appendMessage(botReply, "bot");
  }, 600);
}

function appendMessage(message, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add(`${sender}-message`);
  messageDiv.innerText = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(input) {
  input = input.toLowerCase();

  if (input.includes("oi") || input.includes("olá")) {
    return "Oi! Tudo bem? 😊";
  } else if (input.includes("curso") || input.includes("cursos")) {
    return "Temos cursos de informática básica, digitação e uso de celular 📱";
  } else if (input.includes("cadastro") || input.includes("inscrição")) {
    return "Você pode se cadastrar clicando no botão 'Cadastre-se' no topo do site.";
  } else if (input.includes("obrigado") || input.includes("valeu")) {
    return "De nada! 😄";
  } else {
    return "Desculpe, ainda não sei responder isso 😅. Pode tentar perguntar de outro jeito!";
  }
}
