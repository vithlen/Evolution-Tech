// Garante que o script só vai rodar depois que a página inteira for carregada.
document.addEventListener("DOMContentLoaded", () => {
  // Adiciona um ouvinte de evento que espera o conteúdo HTML da página ser completamente carregado e analisado.
  // MODO ESCURO

  // Pega o checkbox do modo escuro e o corpo da página.
  const toggle = document.getElementById("toggle"); // Busca o elemento HTML com o ID "toggle" (o checkbox do modo escuro).
  const body = document.body; // Pega uma referência direta ao elemento <body> da página.

  // Verifica se o checkbox existe na página antes de adicionar os eventos.
  if (toggle) {
    // Executa o bloco de código somente se o elemento 'toggle' foi encontrado na página.
    // Função que ativa ou desativa o modo escuro.
    const toggleDarkMode = () => {
      // Define uma função chamada 'toggleDarkMode'.
      // Adiciona ou remove a classe 'escuro' do body.
      body.classList.toggle("escuro"); // Alterna a classe 'escuro' no elemento <body>. Se a classe existe, ela é removida; se não, é adicionada.
      // Verifica se o modo escuro está ativo agora.
      const isDarkMode = body.classList.contains("escuro"); // Verifica se o <body> atualmente possui a classe 'escuro' e armazena o resultado (true/false).
      // Sincroniza o estado do checkbox com o modo atual.
      toggle.checked = isDarkMode; // Define o estado do checkbox (marcado/desmarcado) para corresponder ao estado do modo escuro.
      // Salva a preferência do usuário no localStorage para lembrar na próxima visita.
      localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled"); // Salva a preferência no armazenamento local do navegador.
    }; // Fim da função 'toggleDarkMode'.

    // Adiciona um "ouvinte" que chama a função toggleDarkMode sempre que o checkbox mudar.
    toggle.addEventListener("change", toggleDarkMode); // Executa a função 'toggleDarkMode' sempre que o estado do checkbox 'toggle' for alterado.

    // Ao carregar a página, verifica se o modo escuro estava ativado da última vez.
    if (localStorage.getItem("darkMode") === "enabled") {
      // Verifica se há uma preferência salva para o modo escuro como "enabled".
      // Se sim, ativa o modo escuro e marca o checkbox.
      body.classList.add("escuro"); // Adiciona a classe 'escuro' ao <body> para ativar os estilos do modo escuro.
      toggle.checked = true; // Marca o checkbox para refletir o estado ativo.
    } // Fim da verificação do modo escuro salvo.
  } // Fim do bloco 'if (toggle)'.
  // FIM DO MODO ESCURO

  //INÍCIO DA LÓGICA DE AUTENTICAÇÃO E INTERFACE DO USUÁRIO

  // Verifica no sessionStorage se o usuário está logado.
  const isLoggedIn = sessionStorage.getItem("isLoggedIn"); // Pega o valor da chave 'isLoggedIn' do armazenamento da sessão.
  // Pega os elementos do cabeçalho: botão de cadastro, botão de login e o espaço para a saudação.
  const btnCadastro = document.getElementById("btn-cadastro"); // Busca o elemento com o ID "btn-cadastro".
  const btnLogin = document.getElementById("btn-login"); // Busca o elemento com o ID "btn-login".
  const welcomeUserSpan = document.getElementById("welcome-user"); // Busca o elemento com o ID "welcome-user".

  // Se o usuário estiver logado, ajusta a interface.
  if (isLoggedIn) {
    // Executa o bloco de código se 'isLoggedIn' for verdadeiro.
    // Pega os dados do usuário que foram salvos no sessionStorage durante o login.
    const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado")); // Pega os dados do usuário e os converte de string JSON para um objeto JavaScript.

    // Mostra a mensagem de "Olá, [nome]!" no cabeçalho.
    if (welcomeUserSpan && usuarioLogado && usuarioLogado.nome) {
      // Verifica se todos os elementos e dados necessários existem.
      welcomeUserSpan.textContent = `Olá, ${usuarioLogado.nome}!`; // Define o texto do elemento de saudação com o nome do usuário.
      welcomeUserSpan.style.display = "inline"; // Torna o elemento de saudação visível.
    } // Fim da verificação da saudação.

    // Esconde o botão de "CADASTRE-SE", já que o usuário já está logado.
    if (btnCadastro) btnCadastro.style.display = "none"; // Se o botão de cadastro existir, ele é escondido.

    // Modifica o botão de "LOGIN" para virar um botão de "SAIR".
    if (btnLogin) {
      // Executa se o botão de login existir.
      btnLogin.textContent = "SAIR"; // Muda o texto do botão para "SAIR".
      btnLogin.classList.remove("btn-acao"); // Remove uma classe de estilo, se necessário.
      btnLogin.href = "#"; // Impede que o link leve para outra página.
      // Define o que acontece ao clicar no botão "SAIR".
      btnLogin.onclick = (e) => {
        // Define uma função para ser executada no clique do botão.
        e.preventDefault(); // Previne o comportamento padrão do link (que seria navegar para '#').
        // Remove os dados de login do sessionStorage.
        sessionStorage.removeItem("isLoggedIn"); // Remove a informação de que o usuário está logado.
        sessionStorage.removeItem("usuarioLogado"); // Remove os dados do usuário.
        alert("Você saiu da sua conta."); // Mostra um alerta informando que o logout foi feito.
        window.location.reload(); // Recarrega a página para refletir o estado de "deslogado".
      }; // Fim da função de clique.
    } // Fim do bloco 'if (btnLogin)'.
  } // Fim do bloco 'if (isLoggedIn)'.
  // FIM DA LÓGICA DE AUTENTICAÇÃO

  // --- INÍCIO DA LÓGICA DO MENU HAMBÚRGUER (MOBILE)
  const menuBtn = document.querySelector(".menu-toggle"); // Busca o elemento com a classe 'menu-toggle'.
  // Se o botão do menu existir...
  if (menuBtn) {
    // Executa se o botão do menu foi encontrado.
    // ...adiciona um evento de clique para abrir/fechar o menu.
    menuBtn.addEventListener("click", () => {
      // Adiciona um ouvinte de evento de clique.
      document.body.classList.toggle("menu-aberto"); // Alterna a classe 'menu-aberto' no <body> para mostrar/esconder o menu.
    }); // Fim do ouvinte de evento.
  } // Fim do bloco 'if (menuBtn)'.
  // --- FIM DA LÓGICA DO MENU HAMBÚRGUER ---
}); // Fim do ouvinte de evento 'DOMContentLoaded'.
