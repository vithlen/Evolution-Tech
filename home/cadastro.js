// Selecionando os elementos do formulário que vamos manipular com o JavaScript.
const cpfInput = document.getElementById("cpf");
const cepInput = document.getElementById("cep");
const endereco = document.getElementById("endereco");
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const estado = document.getElementById("estado");
// Função para fazer a validação matemática do CPF.
function verificarCPF(cpf) {
  // Remove qualquer caractere que não seja número (pontos, traços, etc.).
  cpf = cpf.replace(/[^\d]+/g, "");
  // Verifica se o CPF tem 11 dígitos ou se todos os dígitos são iguais (ex: 111.111.111-11), o que é inválido.
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  // --- Cálculo do primeiro dígito verificador ---
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
  let resto = 11 - (soma % 11);
  let digito1 = resto === 10 || resto === 11 ? 0 : resto;
  // Compara o dígito calculado com o dígito real do CPF.
  if (digito1 !== parseInt(cpf.charAt(9))) return false;

  //Cálculo do segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
  resto = 11 - (soma % 11);
  let digito2 = resto === 10 || resto === 11 ? 0 : resto;
  // Compara o segundo dígito calculado com o dígito real.
  if (digito2 !== parseInt(cpf.charAt(10))) return false;

  // Se passou por todas as verificações, o CPF é válido.
  return true;
}
// Evento para validar o CPF assim que o usuário sai do campo.
if (cpfInput) {
  // O evento 'blur' é acionado quando o campo perde o foco.
  cpfInput.addEventListener("blur", function () {
    // Pega o valor do campo e verifica se é um CPF válido.
    const cpf = this.value;
    if (!verificarCPF(cpf)) {
      // Se for inválido, avisa o usuário e muda a cor da borda para vermelho.
      alert("CPF inválido! Verifique e tente novamente.");
      this.style.borderColor = "red";
    } else {
      // Se for válido, muda a cor da borda para verde, dando um feedback visual.
      this.style.borderColor = "green";
    }
  });
}
// Função para aplicar a máscara (formato 00000-000) no campo de CEP.
function mascaraCEP(input) {
  // Remove tudo que não for número.
  let numeros = input.value.replace(/\D/g, "");
  // Limita a 8 dígitos para não passar do tamanho de um CEP.
  if (numeros.length > 8) numeros = numeros.substring(0, 8);

  // Se tiver mais de 5 dígitos, coloca o traço.
  if (numeros.length > 5) {
    input.value = numeros.substring(0, 5) + "-" + numeros.substring(5);
  } else {
    // Senão, apenas mostra os números.
    input.value = numeros;
  }
}
// Função para buscar o endereço completo usando a API do ViaCEP.
async function buscarCEP() {
  // Pega o valor do CEP e remove qualquer caractere que não seja número.
  let cep = cepInput.value.replace(/\D/g, "");

  // Se o CEP não tiver 8 dígitos, mostra um alerta e para a função.
  if (cep.length !== 8) {
    alert("CEP inválido! Digite os 8 números corretamente.");
    limparCamposEndereco();
    return;
  }

  try {
    // Faz a requisição para a API do ViaCEP.
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!resposta.ok) throw new Error("Erro de rede");
    const dados = await resposta.json();

    // Se a API retornar um erro (CEP não encontrado), avisa o usuário.
    if (dados.erro) {
      alert("CEP não encontrado!");
      limparCamposEndereco();
      return;
    }
    // Preenche os campos de endereço com os dados recebidos da API.
    endereco.value = dados.logradouro || "";
    bairro.value = dados.bairro || "";
    cidade.value = dados.localidade || "";
    estado.value = dados.uf || "";
  } catch (erro) {
    // Se der algum erro na comunicação com a API, avisa o usuário.
    alert("Erro ao buscar o CEP. Tente novamente.");
    console.error(erro);
    limparCamposEndereco();
  }
}
// Função para limpar os campos de endereço (caso o CEP seja inválido).
function limparCamposEndereco() {
  endereco.value = "";
  bairro.value = "";
  cidade.value = "";
  estado.value = "";
}
// Adiciona os eventos no campo de CEP.
if (cepInput) {
  cepInput.addEventListener("input", function () {
    // Aplica a máscara enquanto o usuário digita.
    mascaraCEP(this);

    // Busca o endereço automaticamente quando o campo tiver 8 dígitos.
    if (this.value.replace(/\D/g, "").length === 8) {
      buscarCEP();
    }
  });
}
// Lógica para confirmar se as senhas digitadas são iguais.
const senha = document.getElementById("senha");
const confSenha = document.getElementById("confsenha");
const form = document.querySelector(".form");
const mensagemErro = document.getElementById("mensagem-erro");

// Adiciona um "ouvinte" para o evento de envio do formulário.
if (form) {
  form.addEventListener("submit", function (event) {
    // Impede que o formulário seja enviado da forma padrão (recarregando a página).
    event.preventDefault();
    // Limpa mensagens de erro de tentativas anteriores.
    mensagemErro.textContent = "";
    mensagemErro.style.display = "none";

    // Verifica se os valores dos campos de senha e confirmação são diferentes.
    if (senha.value !== confSenha.value) {
      // Se as senhas não batem, mostra um alerta e destaca os campos.
      alert("❌ As senhas não coincidem! Verifique e tente novamente.");
      senha.style.borderColor = "red";
      confSenha.style.borderColor = "red";
      return; // Para a execução se as senhas não batem
    } else {
      // Se as senhas batem, dá um feedback visual positivo e chama a função de cadastro.
      senha.style.borderColor = "green";
      confSenha.style.borderColor = "green";
      realizarCadastro();
    }
  });
}
// FUNÇÃO PARA REALIZAR O CADASTRO DO USUÁRIO
function realizarCadastro() {
  // Pega os valores dos campos de nome, e-mail e senha.
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senhaValue = document.getElementById("senha").value;

  // Pega a lista de usuários já cadastrados no localStorage ou cria uma lista vazia se não existir.
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Procura na lista se já existe um usuário com o mesmo e-mail.
  const emailExistente = usuarios.find((user) => user.email === email);

  if (emailExistente) {
    // Se o e-mail já existe, mostra uma mensagem de erro com um link para a página de login.
    mensagemErro.innerHTML = `Este e-mail já está cadastrado. <a href="login.html">Faça o login</a> ou use outro e-mail.`;
    mensagemErro.style.display = "block";
    document.getElementById("email").style.borderColor = "red";
  } else {
    // Se o e-mail é novo, adiciona os dados do novo usuário à lista.
    usuarios.push({ nome, email, senha: senhaValue });

    // Salva a lista de usuários (agora com o novo usuário) de volta no localStorage.
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Avisa que o cadastro foi um sucesso e redireciona para a tela de login.
    alert(
      "Cadastro realizado com sucesso! Você será redirecionado para a página de login."
    );
    window.location.href = "login.html";
  }
}
// Função para pegar os dados do localStorage (parece não ser usada aqui, mas está documentada).
function pegarDadosLocalStorage() {
  const userSalvo = localStorage.getItem("username");
  const senhaSalva = localStorage.getItem("password");

  return {
    usuario: userSalvo,
    senha: senhaSalva,
  };
}
// LÓGICA DO MODO ESCURO
const toggle = document.getElementById("toggle");
const body = document.body;

// Se o botão de toggle existir, adiciona o evento para alternar a classe no body.
// A classe 'dark-mode' deve estar definida no CSS para mudar as cores.
if (toggle) {
  toggle.addEventListener("change", () => body.classList.toggle("dark-mode"));
}
