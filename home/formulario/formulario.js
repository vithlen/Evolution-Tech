// Garante que o script só vai rodar depois que toda a página for carregada.
document.addEventListener("DOMContentLoaded", function () {
  // Pega os elementos do HTML que vamos usar: o formulário e os campos de input.
  const form = document.getElementById("contactForm");
  const nomeInput = document.getElementById("nome");
  const emailInput = document.getElementById("iemail");
  const telefoneInput = document.getElementById("telefone");
  const mensagemInput = document.getElementById("mensagem");

  // Função para mostrar uma mensagem de erro debaixo de um campo específico.
  function showError(input, message) {
    // Pega o elemento 'pai' do input (a div que o envolve).
    const formGroup = input.parentElement;
    // Encontra o span de erro dentro dessa div.
    const errorSpan = formGroup.querySelector(".error-message");
    errorSpan.textContent = message; // Define o texto da mensagem de erro.
    input.style.borderColor = "red"; // Deixa a borda do campo vermelha para destacar o erro.
  }

  // Função para limpar a mensagem de erro de um campo.
  function clearError(input) {
    const formGroup = input.parentElement;
    const errorSpan = formGroup.querySelector(".error-message");
    errorSpan.textContent = ""; // Remove o texto do erro.
    input.style.borderColor = "#f28705"; // Restaura a cor original da borda.
  }

  // Função principal que valida o formulário quando o usuário tenta enviar.
  function validateForm(event) {
    // Impede que o formulário seja enviado do jeito padrão, o que recarregaria a página.
    event.preventDefault();
    // Começamos assumindo que o formulário é válido. Se encontrarmos um erro, mudamos para 'false'.
    let isValid = true;

    // Limpa todos os erros da tela antes de começar uma nova validação.
    clearError(nomeInput);
    clearError(emailInput);
    clearError(telefoneInput);
    clearError(mensagemInput);

    // Expressões Regulares (Regex) para verificar se o formato dos dados está correto.
    const nomeRegex = /^[a-zA-Z\s]{3,}$/; // Deve ter pelo menos 3 caracteres, só letras e espaços.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Formato padrão de e-mail.
    const telefoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/; // Formato exato (xx) xxxxx-xxxx.

    //Validação do campo Nome
    if (nomeInput.value.trim() === "") {
      showError(nomeInput, "Por favor, preencha o campo nome.");
      isValid = false;
    } else if (!nomeRegex.test(nomeInput.value)) {
      // Se o nome não corresponder ao formato esperado.
      showError(nomeInput, "Nome inválido (use apenas letras e pelo menos 3).");
      isValid = false;
    }

    //Validação do campo E-mail
    if (emailInput.value.trim() === "") {
      showError(emailInput, "Por favor, preencha o campo e-mail.");
      isValid = false;
    } else if (!emailRegex.test(emailInput.value)) {
      // Se o e-mail não corresponder ao formato esperado.
      showError(emailInput, "Formato de e-mail inválido.");
      isValid = false;
    }

    //Validação do campo Telefone
    if (telefoneInput.value.trim() === "") {
      showError(telefoneInput, "Por favor, preencha o campo telefone.");
      isValid = false;
    } else if (!telefoneRegex.test(telefoneInput.value)) {
      // Se o telefone não corresponder ao formato da máscara.
      showError(
        telefoneInput,
        "Telefone inválido. Use o formato (xx) xxxxx-xxxx."
      );
      isValid = false;
    }

    //Validação do campo Mensagem
    if (mensagemInput.value.trim() === "") {
      showError(mensagemInput, "Por favor, digite sua mensagem.");
      isValid = false;
    }

    // Se, depois de todas as verificações, a variável 'isValid' continuar como 'true'
    if (isValid) {
      alert("Formulário enviado com sucesso!"); //mostra um alerta de sucesso
      form.submit(); //e envia o formulário de verdade.
    }
  }

  // Máscara para formatar o campo de telefone enquanto o usuário digita.
  telefoneInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, ""); // 1. Remove tudo que não for número.
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2"); // 2. Coloca os parênteses no DDD.
    value = value.replace(/(\d{5})(\d)/, "$1-$2"); // 3. Coloca o hífen depois dos 5 primeiros dígitos do celular.
    e.target.value = value.slice(0, 15); // 4. Limita o tamanho máximo para não ultrapassar o formato.
  });

  // Adiciona um "ouvinte" ao formulário. Quando o usuário tentar enviar (submit), a função 'validateForm' será chamada.
  form.addEventListener("submit", validateForm);
});
