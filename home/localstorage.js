// Este script funciona como um "porteiro" para proteger páginas que só podem ser acessadas por usuários logados.

// Verifica no armazenamento da sessão do navegador se existe o item "isLoggedIn".
const isLoggedIn = sessionStorage.getItem("isLoggedIn");

// Se o item "isLoggedIn" não existir, significa que o usuário não está logado.
if (!isLoggedIn) {
  // Mostra uma caixa de diálogo para o usuário, perguntando se ele já é aluno.
  const jaSouAluno = confirm(
    "Para acessar, você precisa estar logado.\n\nClique em 'OK' se já for aluno, ou 'Cancelar' para se cadastrar."
  );

  if (jaSouAluno) {
    // Se o usuário clicar em "OK", ele é redirecionado para a página de login.
    window.location.href = "/login.html";
  } else {
    // Se o usuário clicar em "Cancelar", ele é redirecionado para a página de cadastro.
    window.location.href = "/cadastro.html";
  }
}
