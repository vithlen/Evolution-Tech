// Selecionando os elementos do formulário que vamos manipular com o JavaScript.
const cpfInput = document.getElementById("cpf"); // Captura o elemento de input do CPF pelo seu ID.
const cepInput = document.getElementById("cep"); // Captura o elemento de input do CEP pelo seu ID.
const endereco = document.getElementById("endereco"); // Captura o elemento de input do endereço pelo seu ID.
const bairro = document.getElementById("bairro"); // Captura o elemento de input do bairro pelo seu ID.
const cidade = document.getElementById("cidade"); // Captura o elemento de input da cidade pelo seu ID.
const estado = document.getElementById("estado"); // Captura o elemento de input do estado pelo seu ID.
// Função para fazer a validação matemática do CPF.
function verificarCPF(cpf) {
  // Define a função que valida o CPF.
  // Remove qualquer caractere que não seja número (pontos, traços, etc.).
  cpf = cpf.replace(/[^\d]+/g, ""); // Limpa o CPF, deixando apenas os dígitos numéricos.
  // Verifica se o CPF tem 11 dígitos ou se todos os dígitos são iguais (ex: 111.111.111-11), o que é inválido.
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false; // Retorna falso se o CPF não tiver 11 dígitos ou se todos os dígitos forem iguais.

  // --- Cálculo do primeiro dígito verificador ---
  let soma = 0; // Inicializa a variável para a soma dos dígitos.
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i); // Calcula a soma ponderada dos primeiros 9 dígitos.
  let resto = 11 - (soma % 11); // Calcula o resto da divisão da soma por 11.
  let digito1 = resto === 10 || resto === 11 ? 0 : resto; // Determina o primeiro dígito verificador (se o resto for 10 ou 11, o dígito é 0).
  // Compara o dígito calculado com o dígito real do CPF.
  if (digito1 !== parseInt(cpf.charAt(9))) return false; // Retorna falso se o primeiro dígito verificador calculado for diferente do dígito informado.

  //Cálculo do segundo dígito verificador
  soma = 0; // Zera a variável soma para o próximo cálculo.
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i); // Calcula a soma ponderada dos primeiros 10 dígitos.
  resto = 11 - (soma % 11); // Calcula o novo resto da divisão.
  let digito2 = resto === 10 || resto === 11 ? 0 : resto; // Determina o segundo dígito verificador.
  // Compara o segundo dígito calculado com o dígito real.
  if (digito2 !== parseInt(cpf.charAt(10))) return false; // Retorna falso se o segundo dígito verificador for inválido.

  // Se passou por todas as verificações, o CPF é válido.
  return true; // Se todas as verificações passaram, o CPF é válido.
}
// Evento para validar o CPF assim que o usuário sai do campo.
if (cpfInput) {
  // Verifica se o elemento de input do CPF existe na página.
  // O evento 'blur' é acionado quando o campo perde o foco.
  cpfInput.addEventListener("blur", function () {
    // Adiciona um ouvinte de evento 'blur' (quando o usuário clica fora do campo).
    // Pega o valor do campo e verifica se é um CPF válido.
    const cpf = this.value; // Pega o valor atual do campo de CPF.
    if (!verificarCPF(cpf)) {
      // Chama a função de verificação do CPF.
      // Se for inválido, avisa o usuário e muda a cor da borda para vermelho.
      alert("CPF inválido! Verifique e tente novamente."); // Exibe um alerta de CPF inválido.
      this.style.borderColor = "red"; // Muda a cor da borda do campo para vermelho como feedback visual.
    } else {
      // Se for válido, muda a cor da borda para verde, dando um feedback visual.
      this.style.borderColor = "green"; // Muda a cor da borda para verde se o CPF for válido.
    }
  });
}
// Função para aplicar a máscara (formato 00000-000) no campo de CEP.
function mascaraCEP(input) {
  // Define a função que formata o campo de CEP.
  // Remove tudo que não for número.
  let numeros = input.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos do valor do input.
  // Limita a 8 dígitos para não passar do tamanho de um CEP.
  if (numeros.length > 8) numeros = numeros.substring(0, 8); // Garante que o CEP não tenha mais de 8 dígitos.

  // Se tiver mais de 5 dígitos, coloca o traço.
  if (numeros.length > 5) {
    // Verifica se o CEP já tem mais de 5 dígitos para adicionar o hífen.
    input.value = numeros.substring(0, 5) + "-" + numeros.substring(5); // Aplica a máscara "00000-000".
  } else {
    // Senão, apenas mostra os números.
    input.value = numeros; // Se tiver 5 ou menos dígitos, apenas exibe os números.
  }
}
// Função para buscar o endereço completo usando a API do ViaCEP.
async function buscarCEP() {
  // Define uma função assíncrona para buscar o endereço pelo CEP.
  // Pega o valor do CEP e remove qualquer caractere que não seja número.
  let cep = cepInput.value.replace(/\D/g, ""); // Limpa o valor do CEP, deixando apenas números.

  // Se o CEP não tiver 8 dígitos, mostra um alerta e para a função.
  if (cep.length !== 8) {
    // Verifica se o CEP tem exatamente 8 dígitos.
    alert("CEP inválido! Digite os 8 números corretamente."); // Alerta o usuário se o CEP for inválido.
    limparCamposEndereco(); // Limpa os campos de endereço.
    return; // Interrompe a execução da função.
  }

  try {
    // Inicia um bloco try-catch para lidar com possíveis erros na requisição.
    // Faz a requisição para a API do ViaCEP.
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`); // Faz a chamada à API ViaCEP com o CEP informado.
    if (!resposta.ok) throw new Error("Erro de rede"); // Lança um erro se a resposta da rede não for bem-sucedida.
    const dados = await resposta.json(); // Converte a resposta da API para o formato JSON.

    // Se a API retornar um erro (CEP não encontrado), avisa o usuário.
    if (dados.erro) {
      // Verifica se a API retornou um erro (indicando que o CEP não foi encontrado).
      alert("CEP não encontrado!"); // Alerta o usuário.
      limparCamposEndereco(); // Limpa os campos de endereço.
      return; // Interrompe a função.
    }
    // Preenche os campos de endereço com os dados recebidos da API.
    endereco.value = dados.logradouro || ""; // Preenche o campo de endereço com o logradouro retornado.
    bairro.value = dados.bairro || ""; // Preenche o campo de bairro.
    cidade.value = dados.localidade || ""; // Preenche o campo de cidade.
    estado.value = dados.uf || ""; // Preenche o campo de estado (UF).
  } catch (erro) {
    // Captura qualquer erro que ocorra no bloco try.
    // Se der algum erro na comunicação com a API, avisa o usuário.
    alert("Erro ao buscar o CEP. Tente novamente."); // Exibe um alerta genérico de erro.
    console.error(erro); // Registra o erro no console para depuração.
    limparCamposEndereco(); // Limpa os campos de endereço.
  }
}
// Função para limpar os campos de endereço (caso o CEP seja inválido).
function limparCamposEndereco() {
  // Define a função que limpa os campos de endereço.
  endereco.value = ""; // Define o valor do campo endereço como vazio.
  bairro.value = ""; // Define o valor do campo bairro como vazio.
  cidade.value = ""; // Define o valor do campo cidade como vazio.
  estado.value = ""; // Define o valor do campo estado como vazio.
}
// Adiciona os eventos no campo de CEP.
if (cepInput) {
  // Verifica se o elemento de input do CEP existe.
  cepInput.addEventListener("input", function () {
    // Adiciona um ouvinte de evento 'input' (disparado a cada digitação).
    // Aplica a máscara enquanto o usuário digita.
    mascaraCEP(this); // Chama a função de máscara para formatar o CEP.

    // Busca o endereço automaticamente quando o campo tiver 8 dígitos.
    if (this.value.replace(/\D/g, "").length === 8) {
      // Verifica se o CEP (apenas números) atingiu 8 dígitos.
      buscarCEP(); // Chama a função para buscar o endereço automaticamente.
    }
  });
}
// Lógica para confirmar se as senhas digitadas são iguais.
const senha = document.getElementById("senha"); // Captura o elemento de input da senha.
const confSenha = document.getElementById("confsenha"); // Captura o elemento de input da confirmação de senha.
const form = document.querySelector(".form"); // Captura o elemento do formulário pela sua classe.
const mensagemErro = document.getElementById("mensagem-erro"); // Captura o elemento onde a mensagem de erro será exibida.

// Adiciona um "ouvinte" para o evento de envio do formulário.
if (form) {
  // Verifica se o formulário existe na página.
  form.addEventListener("submit", function (event) {
    // Adiciona um ouvinte para o evento de 'submit' (envio) do formulário.
    // Impede que o formulário seja enviado da forma padrão (recarregando a página).
    event.preventDefault(); // Previne o comportamento padrão de envio do formulário, que recarregaria a página.
    // Limpa mensagens de erro de tentativas anteriores.
    mensagemErro.textContent = ""; // Limpa o texto da mensagem de erro.
    mensagemErro.style.display = "none"; // Esconde o elemento da mensagem de erro.

    // Verifica se os valores dos campos de senha e confirmação são diferentes.
    if (senha.value !== confSenha.value) {
      // Compara os valores dos campos de senha e confirmação de senha.
      // Se as senhas não batem, mostra um alerta e destaca os campos.
      alert("❌ As senhas não coincidem! Verifique e tente novamente."); // Exibe um alerta se as senhas não forem iguais.
      senha.style.borderColor = "red"; // Destaca o campo de senha com borda vermelha.
      confSenha.style.borderColor = "red"; // Destaca o campo de confirmação de senha com borda vermelha.
      return; // Interrompe a execução da função.
    } else {
      // Se as senhas batem, dá um feedback visual positivo e chama a função de cadastro.
      senha.style.borderColor = "green"; // Muda a borda do campo de senha para verde.
      confSenha.style.borderColor = "green"; // Muda a borda do campo de confirmação de senha para verde.
      realizarCadastro(); // Chama a função para efetivar o cadastro do usuário.
    }
  });
}
// FUNÇÃO PARA REALIZAR O CADASTRO DO USUÁRIO
function realizarCadastro() {
  // Define a função que processa o cadastro.
  // Pega os valores dos campos de nome, e-mail e senha.
  const nome = document.getElementById("nome").value; // Pega o valor do campo nome.
  const email = document.getElementById("email").value; // Pega o valor do campo e-mail.
  const senhaValue = document.getElementById("senha").value; // Pega o valor do campo senha.

  // Pega a lista de usuários já cadastrados no localStorage ou cria uma lista vazia se não existir.
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || []; // Obtém a lista de usuários do localStorage, ou um array vazio se não houver.

  // Procura na lista se já existe um usuário com o mesmo e-mail.
  const emailExistente = usuarios.find((user) => user.email === email); // Verifica se o e-mail informado já está na lista de usuários.

  if (emailExistente) {
    // Se o e-mail já existir...
    // Se o e-mail já existe, mostra uma mensagem de erro com um link para a página de login.
    mensagemErro.innerHTML = `Este e-mail já está cadastrado. <a href="login.html">Faça o login</a> ou use outro e-mail.`; // Define a mensagem de erro com um link para login.
    mensagemErro.style.display = "block"; // Torna a mensagem de erro visível.
    document.getElementById("email").style.borderColor = "red"; // Destaca o campo de e-mail com borda vermelha.
  } else {
    // Se o e-mail é novo, adiciona os dados do novo usuário à lista.
    usuarios.push({ nome, email, senha: senhaValue }); // Adiciona o novo usuário (nome, email, senha) ao array de usuários.

    // Salva a lista de usuários (agora com o novo usuário) de volta no localStorage.
    localStorage.setItem("usuarios", JSON.stringify(usuarios)); // Salva o array atualizado de usuários de volta no localStorage.

    // Avisa que o cadastro foi um sucesso e redireciona para a tela de login.
    alert(
      "Cadastro realizado com sucesso! Você será redirecionado para a página de login."
    ); // Exibe um alerta de sucesso.
    window.location.href = "login.html"; // Redireciona o usuário para a página de login.
  }
}
// Função para pegar os dados do localStorage (parece não ser usada aqui, mas está documentada).
function pegarDadosLocalStorage() {
  // Define uma função para obter dados do localStorage.
  const userSalvo = localStorage.getItem("username"); // Pega o item 'username' do localStorage.
  const senhaSalva = localStorage.getItem("password"); // Pega o item 'password' do localStorage.

  return {
    // Retorna um objeto com os dados obtidos.
    usuario: userSalvo, // Chave 'usuario' com o valor de 'userSalvo'.
    senha: senhaSalva, // Chave 'senha' com o valor de 'senhaSalva'.
  }; // Fim do objeto retornado.
}
// LÓGICA DO MODO ESCURO
const toggle = document.getElementById("toggle"); // Captura o elemento de switch/toggle do modo escuro.
const body = document.body; // Captura o elemento <body> do documento.

// Se o botão de toggle existir, adiciona o evento para alternar a classe no body.
// A classe 'dark-mode' deve estar definida no CSS para mudar as cores.
if (toggle) {
  // Verifica se o elemento de toggle existe.
  toggle.addEventListener("change", () => body.classList.toggle("dark-mode")); // Adiciona um ouvinte de evento 'change' que alterna a classe 'dark-mode' no body.
}
