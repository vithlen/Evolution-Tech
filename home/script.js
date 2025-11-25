// Garante que o script só vai rodar depois que a página inteira for carregada.
document.addEventListener("DOMContentLoaded", () => {
  // MODO ESCURO

  // Pega o checkbox do modo escuro e o corpo da página.
  const toggle = document.getElementById("toggle");
  const body = document.body;

  // Verifica se o checkbox existe na página antes de adicionar os eventos.
  if (toggle) {
    // Função que ativa ou desativa o modo escuro.
    const toggleDarkMode = () => {
      // Adiciona ou remove a classe 'escuro' do body.
      body.classList.toggle("escuro");
      // Verifica se o modo escuro está ativo agora.
      const isDarkMode = body.classList.contains("escuro");
      // Sincroniza o estado do checkbox com o modo atual.
      toggle.checked = isDarkMode;
      // Salva a preferência do usuário no localStorage para lembrar na próxima visita.
      localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
    };

    // Adiciona um "ouvinte" que chama a função toggleDarkMode sempre que o checkbox mudar.
    toggle.addEventListener("change", toggleDarkMode);

    // Ao carregar a página, verifica se o modo escuro estava ativado da última vez.
    if (localStorage.getItem("darkMode") === "enabled") {
      // Se sim, ativa o modo escuro e marca o checkbox.
      body.classList.add("escuro");
      toggle.checked = true;
    }
  }
  // FIM DO MODO ESCURO

  //INÍCIO DA LÓGICA DE AUTENTICAÇÃO E INTERFACE DO USUÁRIO

  // Verifica no sessionStorage se o usuário está logado.
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  // Pega os elementos do cabeçalho: botão de cadastro, botão de login e o espaço para a saudação.
  const btnCadastro = document.getElementById("btn-cadastro");
  const btnLogin = document.getElementById("btn-login");
  const welcomeUserSpan = document.getElementById("welcome-user");

  // Se o usuário estiver logado, ajusta a interface.
  if (isLoggedIn) {
    // Pega os dados do usuário que foram salvos no sessionStorage durante o login.
    const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));

    // Mostra a mensagem de "Olá, [nome]!" no cabeçalho.
    if (welcomeUserSpan && usuarioLogado && usuarioLogado.nome) {
      welcomeUserSpan.textContent = `Olá, ${usuarioLogado.nome}!`;
      welcomeUserSpan.style.display = "inline";
    }

    // Esconde o botão de "CADASTRE-SE", já que o usuário já está logado.
    if (btnCadastro) btnCadastro.style.display = "none";

    // Modifica o botão de "LOGIN" para virar um botão de "SAIR".
    if (btnLogin) {
      btnLogin.textContent = "SAIR";
      btnLogin.classList.remove("btn-acao"); // Remove uma classe de estilo, se necessário.
      btnLogin.href = "#"; // Impede que o link leve para outra página.
      // Define o que acontece ao clicar no botão "SAIR".
      btnLogin.onclick = (e) => {
        e.preventDefault(); // Previne o comportamento padrão do link.
        // Remove os dados de login do sessionStorage.
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("usuarioLogado");
        alert("Você saiu da sua conta.");
        window.location.reload(); // Recarrega a página para refletir o estado de "deslogado".
      };
    }
  }
  // FIM DA LÓGICA DE AUTENTICAÇÃO

  // --- INÍCIO DA LÓGICA DO MENU HAMBÚRGUER (MOBILE)
  const menuBtn = document.querySelector(".menu-toggle");
  // Se o botão do menu existir...
  if (menuBtn) {
    // ...adiciona um evento de clique para abrir/fechar o menu.
    menuBtn.addEventListener("click", () => {
      document.body.classList.toggle("menu-aberto");
    });
  }
  // --- FIM DA LÓGICA DO MENU HAMBÚRGUER ---
});
