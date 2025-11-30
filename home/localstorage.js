// Este script funciona como um "porteiro" para proteger páginas que só podem ser acessadas por usuários logados.

// Verifica no armazenamento da sessão do navegador se existe o item "isLoggedIn".
const isLoggedIn = sessionStorage.getItem("isLoggedIn"); // Pega do sessionStorage o valor da chave "isLoggedIn" para verificar se o usuário fez login.

// Se o item "isLoggedIn" não existir, significa que o usuário não está logado.
if (!isLoggedIn) {
  // Inicia uma condição: se a variável 'isLoggedIn' for falsa (nula, indefinida ou vazia), o bloco de código será executado.
  // Mostra uma caixa de diálogo para o usuário, perguntando se ele já é aluno.
  const jaSouAluno = confirm(
    // Cria uma constante 'jaSouAluno' que armazenará o resultado (true para OK, false para Cancelar) da caixa de diálogo.
    "Para acessar, você precisa estar logado.\n\nClique em 'OK' se já for aluno, ou 'Cancelar' para se cadastrar." // Define o texto que será exibido na caixa de diálogo 'confirm'.
  ); // Fecha a chamada da função 'confirm'.

  if (jaSouAluno) {
    // Verifica se o usuário clicou em 'OK' (o que torna 'jaSouAluno' verdadeiro).
    // Se o usuário clicar em "OK", ele é redirecionado para a página de login.
    window.location.href = "/login.html"; // Redireciona o navegador do usuário para a página de login.
  } else {
    // Se o usuário clicar em "Cancelar", ele é redirecionado para a página de cadastro.
    window.location.href = "/cadastro.html"; // Redireciona o navegador do usuário para a página de cadastro.
  }
}
