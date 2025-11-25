// Garante que o script só vai rodar depois que a página carregar completamente.
document.addEventListener("DOMContentLoaded", () => {
  // Pega os elementos do formulário de login e a área de mensagem de erro.
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const mensagemErro = document.getElementById("mensagem-erro-login");

  // Adiciona um "ouvinte" para o evento de 'submit' do formulário.
  // Usar 'submit' é melhor porque funciona tanto com clique no botão quanto com a tecla Enter.
  loginForm.addEventListener("submit", (event) => {
    // Impede que o formulário seja enviado da forma tradicional, o que recarregaria a página.
    event.preventDefault();
    // Limpa as mensagens de erro e estilos de borda de tentativas anteriores.
    mensagemErro.textContent = "";
    usernameInput.style.borderColor = "";
    passwordInput.style.borderColor = "";

    // Pega os valores dos campos de e-mail e senha, removendo espaços em branco.
    const email = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Verifica se algum dos campos está vazio.
    if (email === "" || password === "") {
      mensagemErro.textContent = "Por favor, preencha o e-mail e a senha.";
      // Interrompe a função se os campos não estiverem preenchidos.
      return;
    }

    // --- Início da Validação do Login ---
    // 1. Pega a lista de usuários que foi salva no localStorage durante o cadastro.
    // Se não houver usuários, cria uma lista vazia para evitar erros.
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // 2. Procura na lista por um usuário que tenha o mesmo e-mail que foi digitado.
    const usuarioEncontrado = usuarios.find((user) => user.email === email);

    // 3. Se nenhum usuário com aquele e-mail for encontrado...
    if (!usuarioEncontrado) {
      // ...mostra uma mensagem de erro e destaca o campo de e-mail.
      mensagemErro.textContent =
        "Usuário inválido. Verifique o e-mail digitado.";
      usernameInput.style.borderColor = "red";
      // Para a execução.
      return;
    }

    // 4. Se o usuário foi encontrado, mas a senha não bate...
    if (usuarioEncontrado.senha !== password) {
      // ...mostra uma mensagem de erro e destaca o campo de senha.
      mensagemErro.textContent = "Senha inválida. Tente novamente.";
      passwordInput.style.borderColor = "red";
      // Para a execução.
      return;
    }

    // 5. Se o e-mail e a senha estiverem corretos, o login foi um sucesso!
    // Salva no sessionStorage que o usuário está logado. Fica salvo só enquanto a aba estiver aberta.
    sessionStorage.setItem("isLoggedIn", "true");
    // Salva os dados do usuário (nome, email) para usar em outras páginas.
    sessionStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
    // Sinaliza para mostrar o pop-up de boas-vindas na página inicial.
    sessionStorage.setItem("showWelcomePopup", "true");
    alert("Login realizado com sucesso! Redirecionando para a página inicial.");
    // Redireciona o usuário para a página principal.
    window.location.href = "index.html";
  });

  // --- INÍCIO DA LÓGICA DO MODO ESCURO ---
  const toggle = document.getElementById("toggle");
  const body = document.body;
  const loginTitle = document.getElementById("login-title");

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

  // Adiciona o evento de clique no título
  if (loginTitle) {
    loginTitle.addEventListener("click", toggleDarkMode);
  }

  // Adiciona um "ouvinte" que chama a função toggleDarkMode sempre que o checkbox mudar.
  toggle.addEventListener("change", toggleDarkMode);

  // Ao carregar a página, verifica se o modo escuro estava ativado da última vez.
  if (localStorage.getItem("darkMode") === "enabled") {
    // Se sim, ativa o modo escuro e marca o checkbox.
    body.classList.add("escuro");
    toggle.checked = true;
  }
  // --- FIM DA LÓGICA DO MODO ESCURO ---
});
