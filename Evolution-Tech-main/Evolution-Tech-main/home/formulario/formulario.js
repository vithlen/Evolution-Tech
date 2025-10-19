// Espera o conteúdo da página carregar completamente antes de executar o script
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("iformulario");
  const idadeInput = document.getElementById("idade");
  const valorIdadeSpan = document.getElementById("valorIdade");
  const btnEnviar = document.getElementById("ienviar");

  // Função para atualizar o valor da idade exibido na tela
  function mudaIdade() {
    valorIdadeSpan.textContent = idadeInput.value;
  }

  // Função de validação do formulário
  function valida(event) {
    // Previne o envio padrão do formulário para podermos validar primeiro
    event.preventDefault();

    const nome = form.nome;
    const idade = form.idade;
    const endereco = form.endereco;
    const formacao = form.formacao;
    const login = form.login;
    const senha = form.senha;
    const confirmaSenha = form.confirmaSenha;
    let mensagemErro = "";

    if (nome.value.trim() === "") {
      mensagemErro += "Por favor, preencha o campo nome\n";
    }

    if (idade.value === "0") {
      mensagemErro += "Por favor, selecione uma idade válida\n";
    }

    if (endereco.value.trim() === "") {
      mensagemErro += "Por favor, preencha o campo endereço\n";
    }

    if (login.value.trim() === "") {
      mensagemErro += "Por favor, preencha o campo login\n";
    } else if (login.value.length !== 5) {
      mensagemErro += "O campo login deve ter 5 caracteres\n";
    }

    if (senha.value === "") {
      mensagemErro += "Por favor, preencha o campo senha\n";
    }

    if (senha.value !== confirmaSenha.value) {
      mensagemErro += "Os campos senha e confirma senha devem ser iguais\n";
    }

    if (formacao.value === "") {
      mensagemErro += "Por favor, preencha o campo formação\n";
    }

    if (mensagemErro !== "") {
      alert(mensagemErro);
    } else {
      alert("Formulário enviado com sucesso!"); // Mensagem de sucesso
      form.submit(); // Envia o formulário
    }
  }

  // Adiciona os "escutadores" de eventos aos elementos
  idadeInput.addEventListener("input", mudaIdade);
  btnEnviar.addEventListener("click", valida);
});
