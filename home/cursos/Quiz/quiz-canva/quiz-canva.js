// Seleciona todas as divs de pergunta do HTML
const questions = document.querySelectorAll(".question");
// Variáveis para controlar o estado do quiz
let currentQuestion = 0;
let score = 0;
let respondido = false; // Flag para evitar que o usuário responda a mesma pergunta várias vezes

// Pego todos os elementos de áudio que vou usar no quiz
const hoverSound = document.getElementById("hover-sound");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");
const celebrationSound = document.getElementById("celebration-sound");
const failedSound = document.getElementById("failed-sound");

// Elementos do mascote e da interface
const fala = document.getElementById("fala");
const mascote = document.getElementById("mascote");
const body = document.body;
const btn = document.getElementById("modeBtn");
const modeIcon = document.getElementById("modeIcon");

// Ajusto o volume dos efeitos sonoros pra não ficarem muito altos
correctSound.volume = 0.3;
wrongSound.volume = 0.5;

// Criei um array com as dicas para cada pergunta. O mascote vai usar isso.
const dicasPorPergunta = [
  {
    dicas: [
      "Pense em um programa voltado para digitação e formatação de textos.",
      "Não é uma planilha nem uma apresentação, é um editor de texto.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    dicas: [
      "Esse recurso serve para acompanhar quem fez mudanças no texto.",
      "Fica na guia 'Revisão'.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    dicas: [
      "Pense em um atalho comum para salvar documentos.",
      "É usado também em outros programas da Microsoft.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    dicas: [
      "Esse recurso ajuda a organizar itens um após o outro.",
      "Você pode escolher números, pontos ou símbolos para cada item.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    dicas: [
      "Esse recurso divide o texto em partes verticais.",
      "É usado em jornais e revistas para organizar o conteúdo.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    dicas: [
      "Procure na guia 'Inserir' algo relacionado a imagens.",
      "Você pode escolher entre imagens do computador ou da internet.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    dicas: [
      "Essa guia tem opções para mudar a aparência do texto.",
      "É a primeira guia do Word.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    dicas: [
      "Esses elementos aparecem no topo e no rodapé das páginas.",
      "Você os encontra na guia 'Inserir'.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    dicas: [
      "Esse recurso ajuda a encontrar erros de escrita automaticamente.",
      "O Word costuma sublinhar palavras erradas com linhas vermelhas.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    dicas: [
      "Esse atalho é usado para duplicar o texto selecionado.",
      "Você provavelmente usa esse comando com frequência!",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    dicas: [
      "Pense em algo relacionado à formatação automática de títulos.",
      "Ajuda a criar sumários automáticos.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    dicas: [
      "Esse comando imprime o documento.",
      "Fica em Arquivo → Imprimir ou usa o atalho Ctrl + P.",
    ],
    resposta: "Não desista você consegue.",
  },
];

// Lógica para o menu hamburguer em telas menores
// Botão menu hamburguer
const menuBtn = document.querySelector(".menu-toggle");

menuBtn.addEventListener("click", () => {
  document.body.classList.toggle("menu-aberto"); // abre/fecha menu
});

// Fecha o menu quando clicar em algum link
document.querySelectorAll(".sub-nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      document.body.classList.remove("menu-aberto");
    }
  });
});

// Lógica para o tema claro/escuro
let saved = localStorage.getItem("theme");
if (saved) applyTheme(saved);

btn.addEventListener("click", () => {
  if (body.classList.contains("light")) {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }
});

// Função que aplica o tema (light ou dark) e salva a preferência
function applyTheme(mode) {
  body.className = mode;
  btn.className = "toggle " + mode;
  localStorage.setItem("theme", mode);
}

// Função para mostrar a pergunta atual e esconder as outras
function showQuestion(index) {
  questions.forEach((q, i) => {
    q.classList.remove("active");
    if (i === index) q.classList.add("active");
  });
  respondido = false; // Reseta a flag para a nova pergunta
}

window.addEventListener("load", () => {
  // Quando a página carrega, o mascote dá uma saudação inicial
  fala.textContent =
    "Sou seu ajudante! Pode me usar quando estiver com dúvida 😄";
  fala.style.display = "block";
  balaoAtivo = true;

  tempoFala = setTimeout(() => {
    fala.style.display = "none";
    balaoAtivo = false;
  }, 2000);
});

let balaoAtivo = false; // Controla se o balão de fala do mascote está visível
let tempoFala = null; // Armazena o temporizador do balão de fala
let progressoDicas = new Array(dicasPorPergunta.length).fill(0); // Guarda quantas dicas o usuário já pediu por pergunta

// Evento de clique no mascote para pedir dicas
mascote.onmouseup = () => {
  if (balaoAtivo) return; // Se o balão já estiver ativo, não faz nada

  balaoAtivo = true;

  // Limpa o timer anterior se o usuário clicar de novo antes do balão sumir
  if (tempoFala) {
    clearTimeout(tempoFala);
    tempoFala = null;
  }

  const dadosPergunta = dicasPorPergunta[currentQuestion];
  const indice = progressoDicas[currentQuestion];

  let dicaEscolhida;

  // Verifica qual dica mostrar
  if (indice < dadosPergunta.dicas.length) {
    // Se ainda houver dicas disponíveis, mostra a próxima
    dicaEscolhida = dadosPergunta.dicas[indice];
    progressoDicas[currentQuestion]++;
  } else if (indice === dadosPergunta.dicas.length) {
    // Se todas as dicas já foram dadas, mostra a mensagem final
    dicaEscolhida = dadosPergunta.resposta;
    progressoDicas[currentQuestion]++;
  } else {
    // Se o usuário continuar clicando, volta para a primeira dica
    dicaEscolhida = dadosPergunta.dicas[0];
    progressoDicas[currentQuestion] = 1;
  }

  fala.textContent = dicaEscolhida;
  fala.style.display = "block";

  // Faz o balão de fala desaparecer depois de um tempo
  tempoFala = setTimeout(() => {
    fala.style.display = "none";
    balaoAtivo = false;
    tempoFala = null;
  }, 2000);
};

// Função para lançar confetes na tela (efeito de comemoração)
function launchConfetti() {
  const duration = 4 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// Pego todas as opções de resposta de todas as perguntas
const allOptions = document.querySelectorAll(".option");

// Adiciono os eventos para cada opção
allOptions.forEach((option) => {
  // Efeito sonoro ao passar o mouse sobre uma opção
  option.addEventListener("mouseenter", () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
  });

  // Lógica principal ao clicar em uma opção
  option.addEventListener("click", () => {
    if (respondido) return; // Se já respondeu, ignora o clique
    respondido = true;

    const parentQuestion = option.closest(".question");
    // Pego o elemento de feedback (onde aparece "Correto" ou "Errado")
    const feedback = parentQuestion.querySelector(".feedback");
    const correct = option.dataset.correct === "true";

    // Adiciona a classe 'correct' ou 'wrong' para dar o feedback visual
    parentQuestion
      .querySelectorAll(".option")
      .forEach((o) => o.classList.remove("correct", "wrong"));
    option.classList.add(correct ? "correct" : "wrong");

    feedback.textContent = correct ? "✅ Correto!" : "❌ Errado!";

    if (correct) {
      correctSound.currentTime = 0;
      // Toca o som de acerto e aumenta a pontuação
      correctSound.play();
      score++;
    } else {
      wrongSound.currentTime = 0;
      wrongSound.play();
    }

    // Espera um segundo antes de ir para a próxima pergunta ou finalizar o quiz
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < questions.length - 1) {
        showQuestion(currentQuestion);
      } else {
        // Se for a última pergunta, mostra o resultado final
        showQuestion(questions.length - 1);
        const finalText =
          score >= 8
            ? // Mensagem personalizada dependendo da pontuação
              `🎉 Parabéns! Você acertou ${score} de ${
                questions.length - 1
              } perguntas!`
            : `😢 Você acertou apenas ${score} de ${
                questions.length - 1
              } perguntas. Tente novamente!`;
        document.getElementById("final-score").textContent = finalText;
        if (score >= 7) celebrationSound.play();
        if (score >= 7) launchConfetti();
        if (score < 7) failedSound.play();
      }
    }, 1000);
  });
});

// Inicia o quiz mostrando a primeira pergunta
showQuestion(0);
