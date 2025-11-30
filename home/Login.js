// Garante que o script só vai rodar depois que a página carregar completamente.
document.addEventListener("DOMContentLoaded", () => {
  // Adiciona um ouvinte de evento que espera o conteúdo HTML da página ser completamente carregado e analisado.
  // Pega os elementos do formulário de login e a área de mensagem de erro.
  const loginForm = document.getElementById("loginForm"); // Busca o elemento do formulário pelo seu ID.
  const usernameInput = document.getElementById("username"); // Busca o campo de entrada do nome de usuário (e-mail) pelo seu ID.
  const passwordInput = document.getElementById("password"); // Busca o campo de entrada da senha pelo seu ID.
  const mensagemErro = document.getElementById("mensagem-erro-login"); // Busca o parágrafo onde as mensagens de erro serão exibidas.

  // Adiciona um "ouvinte" para o evento de 'submit' do formulário.
  // Usar 'submit' é melhor porque funciona tanto com clique no botão quanto com a tecla Enter.
  loginForm.addEventListener("submit", (event) => {
    // Define uma função para ser executada quando o formulário for enviado.
    // Impede que o formulário seja enviado da forma tradicional, o que recarregaria a página.
    event.preventDefault(); // Previne o comportamento padrão do navegador de recarregar a página ao enviar o formulário.
    // Limpa as mensagens de erro e estilos de borda de tentativas anteriores.
    mensagemErro.textContent = ""; // Limpa qualquer texto de erro anterior.
    usernameInput.style.borderColor = ""; // Reseta a cor da borda do campo de e-mail.
    passwordInput.style.borderColor = ""; // Reseta a cor da borda do campo de senha.

    // Pega os valores dos campos de e-mail e senha, removendo espaços em branco.
    const email = usernameInput.value.trim(); // Pega o valor do campo de e-mail e remove espaços em branco do início e do fim.
    const password = passwordInput.value.trim(); // Pega o valor do campo de senha e remove espaços em branco.

    // Verifica se algum dos campos está vazio.
    if (email === "" || password === "") {
      // Se o e-mail OU a senha estiverem vazios...
      mensagemErro.textContent = "Por favor, preencha o e-mail e a senha."; // ...exibe uma mensagem de erro.
      // Interrompe a função se os campos não estiverem preenchidos.
      return; // ...e para a execução da função aqui.
    }

    // --- Início da Validação do Login ---
    // 1. Pega a lista de usuários que foi salva no localStorage durante o cadastro.
    // Se não houver usuários, cria uma lista vazia para evitar erros.
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || []; // Pega os usuários do armazenamento local e os converte de string JSON para um array de objetos.

    // 2. Procura na lista por um usuário que tenha o mesmo e-mail que foi digitado.
    const usuarioEncontrado = usuarios.find((user) => user.email === email); // Usa o método 'find' para procurar no array um usuário cujo e-mail corresponda ao digitado.

    // 3. Se nenhum usuário com aquele e-mail for encontrado...
    if (!usuarioEncontrado) {
      // Se 'usuarioEncontrado' for nulo ou indefinido...
      // ...mostra uma mensagem de erro e destaca o campo de e-mail.
      mensagemErro.textContent =
        "Usuário inválido. Verifique o e-mail digitado."; // ...exibe uma mensagem de erro.
      usernameInput.style.borderColor = "red"; // ...muda a cor da borda do campo de e-mail para vermelho.
      // Para a execução.
      return; // ...e para a execução da função.
    }

    // 4. Se o usuário foi encontrado, mas a senha não bate...
    if (usuarioEncontrado.senha !== password) {
      // Se a senha do usuário encontrado não for igual à senha digitada...
      // ...mostra uma mensagem de erro e destaca o campo de senha.
      mensagemErro.textContent = "Senha inválida. Tente novamente."; // ...exibe uma mensagem de erro.
      passwordInput.style.borderColor = "red"; // ...muda a cor da borda do campo de senha para vermelho.
      // Para a execução.
      return; // ...e para a execução da função.
    }

    // 5. Se o e-mail e a senha estiverem corretos, o login foi um sucesso!
    // Salva no sessionStorage que o usuário está logado. Fica salvo só enquanto a aba estiver aberta.
    sessionStorage.setItem("isLoggedIn", "true"); // Armazena na sessão do navegador que o login foi bem-sucedido.
    // Salva os dados do usuário (nome, email) para usar em outras páginas.
    sessionStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado)); // Armazena os dados do usuário na sessão (convertidos para string JSON).
    // Sinaliza para mostrar o pop-up de boas-vindas na página inicial.
    sessionStorage.setItem("showWelcomePopup", "true"); // Define uma flag para mostrar o pop-up de boas-vindas.
    alert("Login realizado com sucesso! Redirecionando para a página inicial."); // Exibe um alerta de sucesso.
    // Redireciona o usuário para a página principal.
    window.location.href = "index.html"; // Redireciona o navegador para a página 'index.html'.
  });

  // --- INÍCIO DA LÓGICA DO MODO ESCURO ---
  const toggle = document.getElementById("toggle"); // Busca o elemento do interruptor de modo escuro.
  const body = document.body; // Pega uma referência ao corpo da página.
  const loginTitle = document.getElementById("login-title"); // Busca o título da página de login.

  // Função que ativa ou desativa o modo escuro.
  const toggleDarkMode = () => {
    // Define a função para alternar o modo escuro.
    // Adiciona ou remove a classe 'escuro' do body.
    body.classList.toggle("escuro"); // Alterna a classe 'escuro' no elemento <body>.
    // Verifica se o modo escuro está ativo agora.
    const isDarkMode = body.classList.contains("escuro"); // Verifica se o modo escuro está ativo.
    // Sincroniza o estado do checkbox com o modo atual.
    toggle.checked = isDarkMode; // Marca ou desmarca o checkbox para corresponder ao estado.
    // Salva a preferência do usuário no localStorage para lembrar na próxima visita.
    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled"); // Salva a preferência no armazenamento local.
  };

  // Adiciona o evento de clique no título
  if (loginTitle) {
    // Se o título de login existir...
    loginTitle.addEventListener("click", toggleDarkMode); // ...adiciona um ouvinte de clique que chama a função de alternar modo.
  }

  // Adiciona um "ouvinte" que chama a função toggleDarkMode sempre que o checkbox mudar.
  toggle.addEventListener("change", toggleDarkMode); // Adiciona um ouvinte de mudança no checkbox que também alterna o modo.

  // Ao carregar a página, verifica se o modo escuro estava ativado da última vez.
  if (localStorage.getItem("darkMode") === "enabled") {
    // Se a preferência salva for "enabled"...
    // Se sim, ativa o modo escuro e marca o checkbox.
    body.classList.add("escuro"); // ...adiciona a classe 'escuro' ao body.
    toggle.checked = true; // ...e marca o checkbox.
  }
  // --- FIM DA LÓGICA DO MODO ESCURO ---
});
