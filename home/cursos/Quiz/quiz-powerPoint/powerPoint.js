const questions = document.querySelectorAll(".question"); // Seleciona todos os elementos com a classe 'question' (cada pergunta do quiz).
let currentQuestion = 0; // Variável para rastrear o índice da pergunta atual, começando pela primeira (índice 0).
let score = 0; // Variável para armazenar a pontuação do usuário, começando em 0.
let respondido = false; // Flag (bandeira) para controlar se a pergunta atual já foi respondida.

const hoverSound = document.getElementById("hover-sound"); // Pega o elemento de áudio para o som de passar o mouse.
const correctSound = document.getElementById("correct-sound"); // Pega o elemento de áudio para o som de resposta correta.
const wrongSound = document.getElementById("wrong-sound"); // Pega o elemento de áudio para o som de resposta errada.
const celebrationSound = document.getElementById("celebration-sound"); // Pega o elemento de áudio para o som de celebração (boa pontuação).
const failedSound = document.getElementById("failed-sound"); // Pega o elemento de áudio para o som de falha (baixa pontuação).
const fala = document.getElementById("fala"); // Pega o elemento do balão de fala do mascote.
const mascote = document.getElementById("mascote"); // Pega o elemento do mascote.
const body = document.body; // Pega o elemento <body> da página.
const btn = document.getElementById("modeBtn"); // Pega o botão de alternância de modo (claro/escuro).
const modeIcon = document.getElementById("modeIcon"); // Pega o ícone dentro do botão de modo (não usado neste script).

correctSound.volume = 0.3; // Define o volume do som de acerto para 30%.
wrongSound.volume = 0.5; // Define o volume do som de erro para 50%.

const dicasPorPergunta = [
  // Array que armazena objetos, cada um contendo dicas para uma pergunta específica.

  {
    // Dicas para a Pergunta 1
    dicas: [
      "Pense em um programa voltado para digitação e formatação de textos.",
      "Não é uma planilha nem uma apresentação, é um editor de texto.",
    ],
    resposta: "Não desista você consegue.", // Mensagem final se o usuário pedir muitas dicas.
  },

  {
    // Dicas para a Pergunta 2
    dicas: [
      "Esse recurso serve para acompanhar quem fez mudanças no texto.",
      "Fica na guia 'Revisão'.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    // Dicas para a Pergunta 3
    dicas: [
      "Pense em um atalho comum para salvar documentos.",
      "É usado também em outros programas da Microsoft.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    // Dicas para a Pergunta 4
    dicas: [
      "Esse recurso ajuda a organizar itens um após o outro.",
      "Você pode escolher números, pontos ou símbolos para cada item.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    // Dicas para a Pergunta 5
    dicas: [
      "Esse recurso divide o texto em partes verticais.",
      "É usado em jornais e revistas para organizar o conteúdo.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    // Dicas para a Pergunta 6
    dicas: [
      "Procure na guia 'Inserir' algo relacionado a imagens.",
      "Você pode escolher entre imagens do computador ou da internet.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    // Dicas para a Pergunta 7
    dicas: [
      "Essa guia tem opções para mudar a aparência do texto.",
      "É a primeira guia do Word.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    // Dicas para a Pergunta 8
    dicas: [
      "Esses elementos aparecem no topo e no rodapé das páginas.",
      "Você os encontra na guia 'Inserir'.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    // Dicas para a Pergunta 9
    dicas: [
      "Esse recurso ajuda a encontrar erros de escrita automaticamente.",
      "O Word costuma sublinhar palavras erradas com linhas vermelhas.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    // Dicas para a Pergunta 10
    dicas: [
      "Esse atalho é usado para duplicar o texto selecionado.",
      "Você provavelmente usa esse comando com frequência!",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    // Dicas para a Pergunta 11 (se existir)
    dicas: [
      "Pense em algo relacionado à formatação automática de títulos.",
      "Ajuda a criar sumários automáticos.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    // Dicas para a Pergunta 12 (se existir)
    dicas: [
      "Esse comando imprime o documento.",
      "Fica em Arquivo → Imprimir ou usa o atalho Ctrl + P.",
    ],
    resposta: "Não desista você consegue.",
  },
];

// Botão menu hamburguer
const menuBtn = document.querySelector(".menu-toggle"); // Seleciona o botão do menu hambúrguer.

menuBtn.addEventListener("click", () => {
  // Adiciona um evento de clique ao botão do menu.
  document.body.classList.toggle("menu-aberto"); // Adiciona ou remove a classe 'menu-aberto' do body para mostrar/esconder o menu.
});

// Fecha o menu quando clicar em algum link
document.querySelectorAll(".sub-nav-links a").forEach((link) => {
  // Seleciona todos os links dentro da navegação.
  link.addEventListener("click", () => {
    // Adiciona um evento de clique a cada link.
    if (window.innerWidth <= 768) {
      // Verifica se a tela é de um dispositivo móvel (largura <= 768px).
      document.body.classList.remove("menu-aberto"); // Remove a classe para fechar o menu.
    }
  });
});

let saved = localStorage.getItem("theme"); // Verifica se há um tema salvo no armazenamento local do navegador.
if (saved) applyTheme(saved); // Se houver um tema salvo, aplica-o.

btn.addEventListener("click", () => {
  // Adiciona um evento de clique ao botão de alternância de modo.
  if (body.classList.contains("light")) {
    // Se o modo atual for claro...
    applyTheme("dark"); // ...muda para o modo escuro.
  } else {
    // Caso contrário (se for escuro)...
    applyTheme("light"); // ...muda para o modo claro.
  }
});

function applyTheme(mode) {
  // Função para aplicar um tema (modo).

  body.className = mode; // Define a classe do body para o modo escolhido ('light' ou 'dark').
  btn.className = "toggle " + mode; // Define a classe do botão para estilização correspondente.
  localStorage.setItem("theme", mode); // Salva o modo escolhido no armazenamento local para persistência.
}

function showQuestion(index) {
  // Função para exibir uma pergunta específica.
  questions.forEach((q, i) => {
    // Itera sobre todos os elementos de pergunta.
    q.classList.remove("active"); // Remove a classe 'active' de todas as perguntas para escondê-las.
    if (i === index) q.classList.add("active"); // Adiciona a classe 'active' apenas à pergunta do índice atual para exibi-la.
  });
  respondido = false; // Reseta a flag 'respondido' para permitir que a nova pergunta seja respondida.
}

window.addEventListener("load", () => {
  // Adiciona um evento que dispara quando a página termina de carregar.
  fala.textContent =
    "Sou seu ajudante! Pode me usar quando estiver com dúvida 😄"; // Define o texto inicial do balão de fala.
  fala.style.display = "block"; // Torna o balão de fala visível.
  balaoAtivo = true; // Define que o balão está ativo.

  tempoFala = setTimeout(() => {
    // Define um temporizador para esconder o balão.
    fala.style.display = "none"; // Esconde o balão de fala.
    balaoAtivo = false; // Define que o balão não está mais ativo.
  }, 2000); // O balão desaparecerá após 2000 milissegundos (2 segundos).
});

let balaoAtivo = false; // Flag para controlar se o balão de fala já está sendo exibido.
let tempoFala = null; // Variável para armazenar o temporizador do balão de fala.
let progressoDicas = new Array(dicasPorPergunta.length).fill(0); // Cria um array para rastrear qual dica mostrar para cada pergunta.

mascote.onmouseup = () => {
  // Define o que acontece quando o usuário clica e solta o botão do mouse sobre o mascote.

  if (balaoAtivo) return; // Se o balão já estiver ativo, não faz nada.

  balaoAtivo = true; // Define que o balão está ativo para evitar múltiplos cliques.

  if (tempoFala) {
    // Se houver um temporizador anterior rodando...
    clearTimeout(tempoFala); // ...cancela o temporizador para que o balão não desapareça prematuramente.
    tempoFala = null; // Limpa a variável do temporizador.
  }

  const dadosPergunta = dicasPorPergunta[currentQuestion]; // Pega o objeto de dicas para a pergunta atual.
  const indice = progressoDicas[currentQuestion]; // Pega o índice da próxima dica a ser mostrada para esta pergunta.

  let dicaEscolhida; // Variável para armazenar o texto da dica.

  if (indice < dadosPergunta.dicas.length) {
    // Se ainda houver dicas disponíveis no array...
    dicaEscolhida = dadosPergunta.dicas[indice]; // ...pega a próxima dica.
    progressoDicas[currentQuestion]++; // Incrementa o índice para a próxima vez.
  } else if (indice === dadosPergunta.dicas.length) {
    // Se todas as dicas já foram dadas...
    dicaEscolhida = dadosPergunta.resposta; // ...mostra a mensagem de "resposta".
    progressoDicas[currentQuestion]++; // Incrementa para que na próxima vez caia no 'else'.
  } else {
    // Se o usuário continuar clicando depois de todas as dicas e da resposta...
    dicaEscolhida = dadosPergunta.dicas[0]; // ...volta para a primeira dica.
    progressoDicas[currentQuestion] = 1; // Reseta o progresso para a segunda dica na próxima vez.
  }

  fala.textContent = dicaEscolhida; // Define o texto do balão de fala com a dica escolhida.
  fala.style.display = "block"; // Torna o balão de fala visível.

  tempoFala = setTimeout(() => {
    // Define um temporizador para esconder o balão.
    fala.style.display = "none"; // Esconde o balão.
    balaoAtivo = false; // Libera o balão para ser clicado novamente.
    tempoFala = null; // Limpa a variável do temporizador.
  }, 2000); // O balão desaparecerá após 2 segundos.
};

function launchConfetti() {
  // Função para lançar confetes na tela.
  const duration = 4 * 1000; // Define a duração da animação de confetes (4 segundos).
  const end = Date.now() + duration; // Calcula o tempo final da animação.

  (function frame() {
    // Inicia uma função de animação auto-executável.
    confetti({
      // Lança confetes do lado esquerdo.
      particleCount: 5, // Número de partículas.
      angle: 60, // Ângulo de lançamento.
      spread: 55, // Dispersão das partículas.
      origin: { x: 0 }, // Origem no canto esquerdo.
    });
    confetti({
      // Lança confetes do lado direito.
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 }, // Origem no canto direito.
    });

    if (Date.now() < end) {
      // Se a animação ainda não terminou...
      requestAnimationFrame(frame); // ...pede ao navegador para chamar a função 'frame' novamente no próximo quadro de animação.
    }
  })(); // Executa a função imediatamente.
}

const allOptions = document.querySelectorAll(".option"); // Seleciona todos os elementos de opção de resposta.

allOptions.forEach((option) => {
  // Itera sobre cada opção.

  option.addEventListener("mouseenter", () => {
    // Adiciona um evento para quando o mouse entra na área da opção.
    hoverSound.currentTime = 0; // Reinicia o som para o início.
    hoverSound.play(); // Toca o som de hover.
  });

  option.addEventListener("click", () => {
    // Adiciona um evento de clique a cada opção.
    if (respondido) return; // Se a pergunta já foi respondida, não faz nada.
    respondido = true; // Marca a pergunta como respondida para evitar múltiplos cliques.

    const parentQuestion = option.closest(".question"); // Encontra o elemento pai da pergunta.
    const feedback = parentQuestion.querySelector(".feedback"); // Encontra o elemento de feedback dentro da pergunta.
    const correct = option.dataset.correct === "true"; // Verifica se a opção clicada é a correta (usando o atributo data-correct).

    parentQuestion
      .querySelectorAll(".option")
      .forEach((o) => o.classList.remove("correct", "wrong")); // Remove classes de acerto/erro de todas as opções.
    option.classList.add(correct ? "correct" : "wrong"); // Adiciona a classe 'correct' ou 'wrong' à opção clicada.

    feedback.textContent = correct ? "✅ Correto!" : "❌ Errado!"; // Exibe o texto de feedback.

    if (correct) {
      // Se a resposta for correta...
      correctSound.currentTime = 0; // Reinicia o som de acerto.
      correctSound.play(); // Toca o som de acerto.
      score++; // Incrementa a pontuação.
    } else {
      // Se a resposta for errada...
      wrongSound.currentTime = 0; // Reinicia o som de erro.
      wrongSound.play(); // Toca o som de erro.
    }

    setTimeout(() => {
      // Aguarda 1 segundo antes de prosseguir.
      currentQuestion++; // Avança para a próxima pergunta.
      if (currentQuestion < questions.length - 1) {
        // Se ainda houver perguntas...
        showQuestion(currentQuestion); // ...mostra a próxima pergunta.
      } else {
        // Se for a última pergunta...
        showQuestion(questions.length - 1); // ...mostra a tela final (que também tem a classe 'question').
        const finalText =
          score >= 8 // Define o texto final com base na pontuação.
            ? `🎉 Parabéns! Você acertou ${score} de ${
                questions.length - 1
              } perguntas!` // Mensagem de sucesso.
            : `😢 Você acertou apenas ${score} de ${
                questions.length - 1
              } perguntas. Tente novamente!`; // Mensagem de tentativa.
        document.getElementById("final-score").textContent = finalText; // Exibe a pontuação final na tela.
        if (score >= 7) celebrationSound.play(); // Se a pontuação for 7 ou mais, toca o som de celebração.
        if (score >= 7) launchConfetti(); // Se a pontuação for 7 ou mais, lança confetes.
        if (score < 7) failedSound.play(); // Se a pontuação for menor que 7, toca o som de falha.
      }
    }, 1000); // O tempo de espera é de 1000 milissegundos (1 segundo).
  });
});

showQuestion(0); // Exibe a primeira pergunta assim que o script é carregado.
