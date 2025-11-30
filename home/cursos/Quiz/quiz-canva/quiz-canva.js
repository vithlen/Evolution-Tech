// Seleciona todas as divs de pergunta do HTML
const questions = document.querySelectorAll(".question"); // Armazena todos os elementos com a classe 'question' em uma lista.
// Variáveis para controlar o estado do quiz
let currentQuestion = 0; // Guarda o índice da pergunta atual, começando pela primeira (0).
let score = 0; // Inicia a pontuação do usuário em zero.
let respondido = false; // Flag (bandeira) para controlar se a pergunta atual já foi respondida.

// Pego todos os elementos de áudio que vou usar no quiz
const hoverSound = document.getElementById("hover-sound"); // Pega o elemento de áudio para o som de passar o mouse.
const correctSound = document.getElementById("correct-sound"); // Pega o áudio de resposta correta.
const wrongSound = document.getElementById("wrong-sound"); // Pega o áudio de resposta errada.
const celebrationSound = document.getElementById("celebration-sound"); // Pega o áudio de comemoração (boa pontuação).
const failedSound = document.getElementById("failed-sound"); // Pega o áudio de falha (baixa pontuação).

// Elementos do mascote e da interface
const fala = document.getElementById("fala"); // Pega o elemento do balão de fala do mascote.
const mascote = document.getElementById("mascote"); // Pega o elemento da imagem do mascote.
const body = document.body; // Pega o elemento <body> da página.
const btn = document.getElementById("modeBtn"); // Pega o botão de alternar modo claro/escuro.
const modeIcon = document.getElementById("modeIcon"); // Pega o ícone dentro do botão de modo.

// Ajusto o volume dos efeitos sonoros pra não ficarem muito altos
correctSound.volume = 0.3; // Define o volume do som de acerto para 30%.
wrongSound.volume = 0.5; // Define o volume do som de erro para 50%.

// Criei um array com as dicas para cada pergunta. O mascote vai usar isso.
const dicasPorPergunta = [
  // Array de objetos, onde cada objeto contém dicas para uma pergunta.
  {
    dicas: [
      // Array de dicas para a primeira pergunta.
      "Pense em um programa voltado para digitação e formatação de textos.", // Dica 1.
      "Não é uma planilha nem uma apresentação, é um editor de texto.", // Dica 2.
    ],
    resposta: "Não desista você consegue.", // Mensagem final se as dicas acabarem.
  },

  {
    dicas: [
      // Dicas para a segunda pergunta.
      "Esse recurso serve para acompanhar quem fez mudanças no texto.", // Dica 1.
      "Fica na guia 'Revisão'.", // Dica 2.
    ],
    resposta: "Não desista você consegue.", // Mensagem final.
  },

  {
    dicas: [
      // Dicas para a terceira pergunta.
      "Pense em um atalho comum para salvar documentos.", // Dica 1.
      "É usado também em outros programas da Microsoft.", // Dica 2.
    ],
    resposta: "Não desista você consegue.", // Mensagem final.
  },

  {
    dicas: [
      // Dicas para a quarta pergunta.
      "Esse recurso ajuda a organizar itens um após o outro.", // Dica 1.
      "Você pode escolher números, pontos ou símbolos para cada item.", // Dica 2.
    ],
    resposta: "Não desista você consegue.", // Mensagem final.
  },

  {
    dicas: [
      // Dicas para a quinta pergunta.
      "Esse recurso divide o texto em partes verticais.", // Dica 1.
      "É usado em jornais e revistas para organizar o conteúdo.", // Dica 2.
    ],
    resposta: "Não desista você consegue.", // Mensagem final.
  },

  {
    dicas: [
      // Dicas para a sexta pergunta.
      "Procure na guia 'Inserir' algo relacionado a imagens.", // Dica 1.
      "Você pode escolher entre imagens do computador ou da internet.", // Dica 2.
    ],
    resposta: "Não desista você consegue.", // Mensagem final.
  },

  {
    dicas: [
      // Dicas para a sétima pergunta.
      "Essa guia tem opções para mudar a aparência do texto.", // Dica 1.
      "É a primeira guia do Word.", // Dica 2.
    ],
    resposta: "Não desista você consegue.", // Mensagem final.
  },

  {
    dicas: [
      // Dicas para a oitava pergunta.
      "Esses elementos aparecem no topo e no rodapé das páginas.", // Dica 1.
      "Você os encontra na guia 'Inserir'.", // Dica 2.
    ],
    resposta: "Não desista você consegue.", // Mensagem final.
  },

  {
    dicas: [
      // Dicas para a nona pergunta.
      "Esse recurso ajuda a encontrar erros de escrita automaticamente.", // Dica 1.
      "O Word costuma sublinhar palavras erradas com linhas vermelhas.", // Dica 2.
    ],
    resposta: "Não desista você consegue.", // Mensagem final.
  },

  {
    dicas: [
      // Dicas para a décima pergunta.
      "Esse atalho é usado para duplicar o texto selecionado.", // Dica 1.
      "Você provavelmente usa esse comando com frequência!", // Dica 2.
    ],
    resposta: "Não desista você consegue.", // Mensagem final.
  },

  {
    dicas: [
      // Dicas para a décima primeira pergunta.
      "Pense em algo relacionado à formatação automática de títulos.", // Dica 1.
      "Ajuda a criar sumários automáticos.", // Dica 2.
    ],
    resposta: "Não desista você consegue.", // Mensagem final.
  },

  {
    dicas: [
      // Dicas para a décima segunda pergunta.
      "Esse comando imprime o documento.", // Dica 1.
      "Fica em Arquivo → Imprimir ou usa o atalho Ctrl + P.", // Dica 2.
    ],
    resposta: "Não desista você consegue.", // Mensagem final.
  },
];

// Lógica para o menu hamburguer em telas menores
// Botão menu hamburguer
const menuBtn = document.querySelector(".menu-toggle"); // Seleciona o botão do menu pela classe.

menuBtn.addEventListener("click", () => {
  // Adiciona um evento de clique ao botão.
  document.body.classList.toggle("menu-aberto"); // Alterna a classe 'menu-aberto' no body para mostrar/esconder o menu.
});

// Fecha o menu quando clicar em algum link
document.querySelectorAll(".sub-nav-links a").forEach((link) => {
  // Seleciona todos os links de navegação.
  link.addEventListener("click", () => {
    // Adiciona um evento de clique a cada link.
    if (window.innerWidth <= 768) {
      // Verifica se a tela é pequena (menor ou igual a 768px).
      document.body.classList.remove("menu-aberto"); // Remove a classe 'menu-aberto' para fechar o menu.
    }
  });
});

// Lógica para o tema claro/escuro
let saved = localStorage.getItem("theme"); // Verifica se há um tema salvo no armazenamento local do navegador.
if (saved) applyTheme(saved); // Se houver um tema salvo, aplica-o.

btn.addEventListener("click", () => {
  // Adiciona um evento de clique ao botão de tema.
  if (body.classList.contains("light")) {
    // Se o tema atual for 'light'...
    applyTheme("dark"); // ...aplica o tema 'dark'.
  } else {
    applyTheme("light"); // Senão, aplica o tema 'light'.
  }
});

// Função que aplica o tema (light ou dark) e salva a preferência
function applyTheme(mode) {
  // Função para aplicar um tema.
  body.className = mode; // Define a classe do body para o modo escolhido ('light' ou 'dark').
  btn.className = "toggle " + mode; // Define a classe do botão para estilização.
  localStorage.setItem("theme", mode); // Salva a preferência de tema no armazenamento local.
}

// Função para mostrar a pergunta atual e esconder as outras
function showQuestion(index) {
  // Função para exibir uma pergunta específica.
  questions.forEach((q, i) => {
    // Itera sobre todas as divs de pergunta.
    q.classList.remove("active"); // Remove a classe 'active' de todas.
    if (i === index) q.classList.add("active"); // Adiciona a classe 'active' apenas à pergunta atual para mostrá-la.
  });
  respondido = false; // Reseta a flag 'respondido' para permitir uma nova resposta.
}

window.addEventListener("load", () => {
  // Adiciona um evento que dispara quando a página termina de carregar.
  // Quando a página carrega, o mascote dá uma saudação inicial
  fala.textContent = // Define o texto do balão de fala.
    "Sou seu ajudante! Pode me usar quando estiver com dúvida 😄"; // Mensagem de saudação.
  fala.style.display = "block"; // Torna o balão de fala visível.
  balaoAtivo = true; // Define que o balão está ativo.

  tempoFala = setTimeout(() => {
    // Define um temporizador para esconder o balão.
    fala.style.display = "none"; // Esconde o balão.
    balaoAtivo = false; // Define que o balão não está mais ativo.
  }, 2000); // O balão some após 2 segundos (2000 milissegundos).
});

let balaoAtivo = false; // Flag para controlar se o balão de fala está visível.
let tempoFala = null; // Variável para armazenar o temporizador do balão de fala.
let progressoDicas = new Array(dicasPorPergunta.length).fill(0); // Cria um array para rastrear o progresso das dicas para cada pergunta.

// Evento de clique no mascote para pedir dicas
mascote.onmouseup = () => {
  // Define o que acontece quando o clique do mouse é liberado sobre o mascote.
  if (balaoAtivo) return; // Se o balão já estiver visível, interrompe a função.

  balaoAtivo = true; // Define que o balão está ativo.

  // Limpa o timer anterior se o usuário clicar de novo antes do balão sumir.
  if (tempoFala) {
    // Se existe um temporizador ativo...
    clearTimeout(tempoFala); // ...cancela o temporizador.
    tempoFala = null; // Limpa a variável do temporizador.
  }

  const dadosPergunta = dicasPorPergunta[currentQuestion]; // Pega as dicas da pergunta atual.
  const indice = progressoDicas[currentQuestion]; // Pega o índice da próxima dica a ser mostrada.

  let dicaEscolhida; // Variável para armazenar a dica que será exibida.

  // Verifica qual dica mostrar.
  if (indice < dadosPergunta.dicas.length) {
    // Se o índice for menor que o número de dicas disponíveis...
    // Se ainda houver dicas disponíveis, mostra a próxima.
    dicaEscolhida = dadosPergunta.dicas[indice]; // ...pega a próxima dica.
    progressoDicas[currentQuestion]++; // Incrementa o índice para a próxima vez.
  } else if (indice === dadosPergunta.dicas.length) {
    // Se o índice for igual ao número de dicas...
    // Se todas as dicas já foram dadas, mostra a mensagem final.
    dicaEscolhida = dadosPergunta.resposta; // ...pega a mensagem de resposta final.
    progressoDicas[currentQuestion]++; // Incrementa o índice.
  } else {
    // Se o usuário continuar clicando, volta para a primeira dica.
    dicaEscolhida = dadosPergunta.dicas[0]; // ...mostra a primeira dica novamente.
    progressoDicas[currentQuestion] = 1; // Reseta o progresso das dicas para 1.
  }

  fala.textContent = dicaEscolhida; // Define o texto do balão de fala com a dica escolhida.
  fala.style.display = "block"; // Torna o balão de fala visível.

  // Faz o balão de fala desaparecer depois de um tempo.
  tempoFala = setTimeout(() => {
    // Define um temporizador.
    fala.style.display = "none"; // Esconde o balão.
    balaoAtivo = false; // Marca o balão como inativo.
    tempoFala = null; // Limpa a variável do temporizador.
  }, 2000); // O balão some após 2 segundos.
};

// Função para lançar confetes na tela (efeito de comemoração)
function launchConfetti() {
  // Função para criar um efeito de confetes.
  const duration = 4 * 1000; // Define a duração da animação em 4 segundos.
  const end = Date.now() + duration; // Calcula o tempo final da animação.

  (function frame() {
    // Inicia uma função auto-executável para a animação.
    confetti({
      // Lança confetes do lado esquerdo.
      particleCount: 5, // Número de partículas.
      angle: 60, // Ângulo de lançamento.
      spread: 55, // Dispersão das partículas.
      origin: { x: 0 }, // Origem no canto esquerdo.
    });
    confetti({
      // Lança confetes do lado direito.
      particleCount: 5, // Número de partículas.
      angle: 120, // Ângulo de lançamento.
      spread: 55, // Dispersão.
      origin: { x: 1 }, // Origem no canto direito.
    });

    if (Date.now() < end) {
      // Se a animação ainda não terminou...
      requestAnimationFrame(frame); // ...continua a animação no próximo quadro.
    }
  })();
}

// Pego todas as opções de resposta de todas as perguntas
const allOptions = document.querySelectorAll(".option"); // Seleciona todos os elementos com a classe 'option'.

// Adiciono os eventos para cada opção
allOptions.forEach((option) => {
  // Itera sobre cada opção de resposta.
  // Efeito sonoro ao passar o mouse sobre uma opção
  option.addEventListener("mouseenter", () => {
    // Adiciona um evento para quando o mouse entra na área da opção.
    hoverSound.currentTime = 0; // Reinicia o áudio para o início.
    hoverSound.play(); // Toca o som de hover.
  });

  // Lógica principal ao clicar em uma opção
  option.addEventListener("click", () => {
    // Adiciona um evento de clique na opção.
    if (respondido) return; // Se a pergunta já foi respondida, interrompe a função.
    respondido = true; // Marca a pergunta como respondida.

    const parentQuestion = option.closest(".question"); // Encontra o elemento pai da pergunta.
    // Pego o elemento de feedback (onde aparece "Correto" ou "Errado")
    const feedback = parentQuestion.querySelector(".feedback"); // Seleciona o elemento de feedback.
    const correct = option.dataset.correct === "true"; // Verifica se a opção clicada é a correta (usando o atributo data-correct).

    // Adiciona a classe 'correct' ou 'wrong' para dar o feedback visual
    parentQuestion // A partir da pergunta pai...
      .querySelectorAll(".option") // ...seleciona todas as opções...
      .forEach((o) => o.classList.remove("correct", "wrong")); // ...e remove as classes de feedback visual.
    option.classList.add(correct ? "correct" : "wrong"); // Adiciona a classe 'correct' ou 'wrong' à opção clicada.

    feedback.textContent = correct ? "✅ Correto!" : "❌ Errado!"; // Exibe a mensagem de feedback.

    if (correct) {
      // Se a resposta for correta...
      correctSound.currentTime = 0; // Reinicia o som de acerto.
      // Toca o som de acerto e aumenta a pontuação
      correctSound.play(); // Toca o som.
      score++; // Incrementa a pontuação.
    } else {
      wrongSound.currentTime = 0; // Se for errada, reinicia o som de erro.
      wrongSound.play(); // Toca o som de erro.
    }

    // Espera um segundo antes de ir para a próxima pergunta ou finalizar o quiz
    setTimeout(() => {
      // Define um temporizador de 1 segundo.
      currentQuestion++; // Avança para a próxima pergunta.
      if (currentQuestion < questions.length - 1) {
        // Se ainda houver perguntas...
        showQuestion(currentQuestion); // ...mostra a próxima pergunta.
      } else {
        // Se for a última pergunta, mostra o resultado final
        showQuestion(questions.length - 1); // Mostra a última pergunta (a de resultado).
        const finalText = // Define o texto final com base na pontuação.
          score >= 8 // Se a pontuação for 8 ou mais...
            ? // Mensagem personalizada dependendo da pontuação
              `🎉 Parabéns! Você acertou ${score} de ${
                // ...mensagem de parabéns.
                questions.length - 1 // O total de perguntas é o tamanho do array - 1 (a última é a tela de resultado).
              } perguntas!` // Fim da mensagem de sucesso.
            : `😢 Você acertou apenas ${score} de ${
                // Senão, mensagem de tentativa.
                questions.length - 1 // Total de perguntas.
              } perguntas. Tente novamente!`; // Fim da mensagem de falha.
        document.getElementById("final-score").textContent = finalText; // Exibe o texto final na tela.
        if (score >= 7) celebrationSound.play(); // Se a pontuação for 7 ou mais, toca o som de celebração.
        if (score >= 7) launchConfetti(); // E lança confetes.
        if (score < 7) failedSound.play(); // Se for menor que 7, toca o som de falha.
      }
    }, 1000); // O temporizador espera 1000 milissegundos (1 segundo).
  });
});

// Inicia o quiz mostrando a primeira pergunta
showQuestion(0); // Chama a função para exibir a primeira pergunta (índice 0) assim que o script é executado.
