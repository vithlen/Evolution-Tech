const questions = document.querySelectorAll(".question"); // Seleciona todos os elementos com a classe 'question' (cada pergunta do quiz).
let currentQuestion = 0; // Variável para rastrear o índice da pergunta atual, começando em 0.
let score = 0; // Variável para armazenar a pontuação do usuário.
let respondido = false; // Flag para controlar se a pergunta atual já foi respondida, evitando múltiplos cliques.

const hoverSound = document.getElementById("hover-sound"); // Pega o elemento de áudio para o som de passar o mouse.
const correctSound = document.getElementById("correct-sound"); // Pega o elemento de áudio para o som de resposta correta.
const wrongSound = document.getElementById("wrong-sound"); // Pega o elemento de áudio para o som de resposta errada.
const celebrationSound = document.getElementById("celebration-sound"); // Pega o elemento de áudio para o som de celebração no final.
const failedSound = document.getElementById("failed-sound"); // Pega o elemento de áudio para o som de falha no final.
const fala = document.getElementById("fala"); // Pega o elemento do balão de fala do mascote.
const mascote = document.getElementById("mascote"); // Pega o elemento do mascote.
const body = document.body; // Pega o elemento <body> do documento.
const btn = document.getElementById("modeBtn"); // Pega o botão de alternância de modo (claro/escuro).
const modeIcon = document.getElementById("modeIcon"); // Pega o ícone dentro do botão de modo (se houver).

correctSound.volume = 0.3; // Define o volume do som de acerto para 30%.
wrongSound.volume = 0.5; // Define o volume do som de erro para 50%.

const dicasPorPergunta = [
  // Array de objetos, cada objeto contém dicas para uma pergunta específica.

  {
    // Objeto para a pergunta 0.
    dicas: [
      // Array de dicas para esta pergunta.
      "Pense em um programa voltado para digitação e formatação de textos.",
      "Não é uma planilha nem uma apresentação, é um editor de texto.",
    ],
    resposta: "Não desista você consegue.", // Mensagem final se as dicas acabarem.
  },

  {
    // Objeto para a pergunta 1.
    dicas: [
      "Esse recurso serve para acompanhar quem fez mudanças no texto.",
      "Fica na guia 'Revisão'.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    // Objeto para a pergunta 2.
    dicas: [
      "Pense em um atalho comum para salvar documentos.",
      "É usado também em outros programas da Microsoft.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    // Objeto para a pergunta 3.
    dicas: [
      "Esse recurso ajuda a organizar itens um após o outro.",
      "Você pode escolher números, pontos ou símbolos para cada item.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    // Objeto para a pergunta 4.
    dicas: [
      "Esse recurso divide o texto em partes verticais.",
      "É usado em jornais e revistas para organizar o conteúdo.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    // Objeto para a pergunta 5.
    dicas: [
      "Procure na guia 'Inserir' algo relacionado a imagens.",
      "Você pode escolher entre imagens do computador ou da internet.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    // Objeto para a pergunta 6.
    dicas: [
      "Essa guia tem opções para mudar a aparência do texto.",
      "É a primeira guia do Word.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    // Objeto para a pergunta 7.
    dicas: [
      "Esses elementos aparecem no topo e no rodapé das páginas.",
      "Você os encontra na guia 'Inserir'.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    // Objeto para a pergunta 8.
    dicas: [
      "Esse recurso ajuda a encontrar erros de escrita automaticamente.",
      "O Word costuma sublinhar palavras erradas com linhas vermelhas.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    // Objeto para a pergunta 9.
    dicas: [
      "Esse atalho é usado para duplicar o texto selecionado.",
      "Você provavelmente usa esse comando com frequência!",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    // Objeto para a pergunta 10.
    dicas: [
      "Pense em algo relacionado à formatação automática de títulos.",
      "Ajuda a criar sumários automáticos.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    // Objeto para a pergunta 11.
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
  // Adiciona um ouvinte de evento de clique ao botão.
  document.body.classList.toggle("menu-aberto"); // abre/fecha menu // Adiciona ou remove a classe 'menu-aberto' no body para mostrar/esconder o menu.
});

// Fecha o menu quando clicar em algum link
document.querySelectorAll(".sub-nav-links a").forEach((link) => {
  // Seleciona todos os links dentro da navegação.
  link.addEventListener("click", () => {
    // Adiciona um ouvinte de clique a cada link.
    if (window.innerWidth <= 768) {
      // Verifica se a tela é de um dispositivo móvel (largura <= 768px).
      document.body.classList.remove("menu-aberto"); // Remove a classe para fechar o menu.
    }
  });
});

let saved = localStorage.getItem("theme"); // Verifica se há um tema salvo no armazenamento local do navegador.
if (saved) applyTheme(saved); // Se houver um tema salvo, aplica-o.

btn.addEventListener("click", () => {
  // Adiciona um ouvinte de clique ao botão de modo.
  if (body.classList.contains("light")) {
    // Se o corpo tiver a classe 'light'.
    applyTheme("dark"); // Aplica o tema escuro.
  } else {
    // Caso contrário.
    applyTheme("light"); // Aplica o tema claro.
  }
});

function applyTheme(mode) {
  // Função para aplicar um tema.

  body.className = mode; // Define a classe do corpo para o modo especificado ('light' ou 'dark').
  btn.className = "toggle " + mode; // Define a classe do botão para estilização correspondente.
  localStorage.setItem("theme", mode); // Salva o modo atual no armazenamento local.
}

function showQuestion(index) {
  // Função para exibir uma pergunta específica.
  questions.forEach((q, i) => {
    // Itera sobre todas as divs de pergunta.
    q.classList.remove("active"); // Remove a classe 'active' para esconder a pergunta.
    if (i === index) q.classList.add("active"); // Se for a pergunta do índice desejado, adiciona 'active' para mostrá-la.
  });
  respondido = false; // Reseta a flag 'respondido' para permitir que a nova pergunta seja respondida.
}

window.addEventListener("load", () => {
  // Adiciona um ouvinte para quando a página terminar de carregar.
  fala.textContent =
    "Sou seu ajudante! Pode me usar quando estiver com dúvida 😄"; // Define o texto inicial do balão de fala.
  fala.style.display = "block"; // Mostra o balão de fala.
  balaoAtivo = true; // Define que o balão está ativo.

  tempoFala = setTimeout(() => {
    // Define um temporizador para esconder o balão.
    fala.style.display = "none"; // Esconde o balão de fala.
    balaoAtivo = false; // Define que o balão não está mais ativo.
  }, 2000); // O balão desaparecerá após 2000 milissegundos (2 segundos).
});

let balaoAtivo = false; // Flag para controlar se o balão de fala está visível.
let tempoFala = null; // Variável para armazenar o temporizador do balão.
let progressoDicas = new Array(dicasPorPergunta.length).fill(0); // Cria um array para rastrear qual dica mostrar para cada pergunta.

mascote.onmouseup = () => {
  // Evento que dispara quando o clique do mouse é liberado sobre o mascote.

  if (balaoAtivo) return; // Se o balão já estiver ativo, não faz nada.

  balaoAtivo = true; // Define que o balão está ativo para evitar múltiplos cliques.

  if (tempoFala) {
    // Se houver um temporizador ativo.
    clearTimeout(tempoFala); // Cancela o temporizador anterior para que o balão não desapareça prematuramente.
    tempoFala = null; // Limpa a variável do temporizador.
  }

  const dadosPergunta = dicasPorPergunta[currentQuestion]; // Pega o objeto de dicas para a pergunta atual.
  const indice = progressoDicas[currentQuestion]; // Pega o índice da próxima dica a ser mostrada para esta pergunta.

  let dicaEscolhida; // Variável para armazenar a dica que será exibida.

  if (indice < dadosPergunta.dicas.length) {
    // Se o índice da dica for menor que o número total de dicas disponíveis.
    dicaEscolhida = dadosPergunta.dicas[indice]; // Seleciona a próxima dica.
    progressoDicas[currentQuestion]++; // Incrementa o índice para a próxima vez.
  } else if (indice === dadosPergunta.dicas.length) {
    // Se todas as dicas já foram mostradas.
    dicaEscolhida = dadosPergunta.resposta; // Mostra a mensagem final.
    progressoDicas[currentQuestion]++; // Incrementa o índice.
  } else {
    // Se até a mensagem final já foi mostrada, reinicia o ciclo.
    dicaEscolhida = dadosPergunta.dicas[0]; // Volta para a primeira dica.
    progressoDicas[currentQuestion] = 1; // Reseta o contador de progresso para 1 (pois a dica 0 já foi mostrada).
  }

  fala.textContent = dicaEscolhida; // Define o texto do balão de fala com a dica escolhida.
  fala.style.display = "block"; // Mostra o balão de fala.

  tempoFala = setTimeout(() => {
    // Define um novo temporizador.
    fala.style.display = "none"; // Esconde o balão após um tempo.
    balaoAtivo = false; // Libera o balão para ser ativado novamente.
    tempoFala = null; // Limpa a variável do temporizador.
  }, 2000); // O balão desaparecerá após 2 segundos.
};

function launchConfetti() {
  // Função para lançar confetes na tela.
  const duration = 4 * 1000; // Duração do efeito de confete em milissegundos (4 segundos).
  const end = Date.now() + duration; // Calcula o momento em que o efeito deve parar.

  (function frame() {
    // Inicia uma função de animação auto-executável.
    confetti({
      // Lança confetes do lado esquerdo.
      particleCount: 5, // Número de partículas por vez.
      angle: 60, // Ângulo de lançamento.
      spread: 55, // Dispersão das partículas.
      origin: { x: 0 }, // Ponto de origem (0 = esquerda).
    });
    confetti({
      // Lança confetes do lado direito.
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 }, // Ponto de origem (1 = direita).
    });

    if (Date.now() < end) {
      // Se o tempo atual for menor que o tempo final.
      requestAnimationFrame(frame); // Continua a animação no próximo quadro.
    }
  })(); // Executa a função de animação imediatamente.
}

const allOptions = document.querySelectorAll(".option"); // Seleciona todas as opções de resposta do quiz.

allOptions.forEach((option) => {
  // Itera sobre cada opção.

  option.addEventListener("mouseenter", () => {
    // Adiciona um ouvinte para quando o mouse entra na área da opção.
    hoverSound.currentTime = 0; // Reinicia o som para o início.
    hoverSound.play(); // Toca o som de hover.
  });

  option.addEventListener("click", () => {
    // Adiciona um ouvinte para quando a opção é clicada.
    if (respondido) return; // Se a pergunta já foi respondida, não faz nada.
    respondido = true; // Marca a pergunta como respondida para evitar múltiplos cliques.

    const parentQuestion = option.closest(".question"); // Encontra a div da pergunta pai da opção clicada.
    const feedback = parentQuestion.querySelector(".feedback"); // Encontra o elemento de feedback dentro da pergunta.
    const correct = option.dataset.correct === "true"; // Verifica se a opção clicada é a correta (usando o atributo data-correct).

    parentQuestion
      .querySelectorAll(".option")
      .forEach((o) => o.classList.remove("correct", "wrong")); // Remove as classes de acerto/erro de todas as opções.
    option.classList.add(correct ? "correct" : "wrong"); // Adiciona a classe 'correct' ou 'wrong' à opção clicada.

    feedback.textContent = correct ? "✅ Correto!" : "❌ Errado!"; // Exibe a mensagem de feedback.

    if (correct) {
      // Se a resposta for correta.
      correctSound.currentTime = 0; // Reinicia o som de acerto.
      correctSound.play(); // Toca o som de acerto.
      score++; // Incrementa a pontuação.
    } else {
      // Se a resposta for errada.
      wrongSound.currentTime = 0; // Reinicia o som de erro.
      wrongSound.play(); // Toca o som de erro.
    }

    setTimeout(() => {
      // Aguarda 1 segundo antes de passar para a próxima pergunta.
      currentQuestion++; // Incrementa o índice da pergunta atual.
      if (currentQuestion < questions.length - 1) {
        // Se ainda houver perguntas (exceto a tela final).
        showQuestion(currentQuestion); // Mostra a próxima pergunta.
      } else {
        // Se for a última pergunta (ou já passou de todas).
        showQuestion(questions.length - 1); // Mostra a tela final (que é o último elemento em 'questions').
        const finalText =
          score >= 8 // Define o texto final com base na pontuação.
            ? `🎉 Parabéns! Você acertou ${score} de ${
                questions.length - 1
              } perguntas!`
            : `😢 Você acertou apenas ${score} de ${
                questions.length - 1
              } perguntas. Tente novamente!`;
        document.getElementById("final-score").textContent = finalText; // Exibe a pontuação final na tela.
        if (score >= 7) celebrationSound.play(); // Se a pontuação for 7 ou mais, toca o som de celebração.
        if (score >= 7) launchConfetti(); // E lança confetes.
        if (score < 7) failedSound.play(); // Se a pontuação for menor que 7, toca o som de falha.
      }
    }, 1000); // A transição ocorre após 1000 milissegundos (1 segundo).
  });
});

showQuestion(0); // Exibe a primeira pergunta (índice 0) quando o script é carregado.
