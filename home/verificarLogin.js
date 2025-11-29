// Garante que o script só vai rodar depois que a página carregar completamente.
document.addEventListener("DOMContentLoaded", () => {
  // Pega o botão que está dentro do card de informações do curso.
  const botao = document.querySelector(".card-info button");

  // Adiciona um "ouvinte" de evento de clique no botão.
  // A função dentro do addEventListener será executada toda vez que o botão for clicado.
  botao.addEventListener("click", function (event) {
    // Verifica no armazenamento local do navegador se existe um item chamado "usuarioLogado".
    const logado = sessionStorage.getItem("isLoggedIn");

    // Se o item "usuarioLogado" não existir (ou seja, o usuário não está logado).
    if (!logado) {
      // Impede a ação padrão do clique, que seria seguir o link do botão.
      event.preventDefault();
      // Mostra um alerta para o usuário informando que ele precisa fazer login.
      alert("Entre na sua conta para acessar este curso!");

      // Após o usuário clicar em "OK" no alerta, redireciona para a página de login.
      window.location.href = "../login.html";
      // Interrompe a execução da função aqui, para não executar o código abaixo.
      return;
    } else {
      // Se o usuário estiver logado, o código entra neste bloco.
      // Pega o link (tag <a>) que está dentro do botão que foi clicado.
      const link = this.querySelector("a");
      // Se o link existir, redireciona a página para o endereço (href) do link.
      if (link) window.location.href = link.href;
    }
  });
});
