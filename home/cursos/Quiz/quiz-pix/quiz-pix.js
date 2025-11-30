const questions = document.querySelectorAll(".question"); // Seleciona todos os elementos com a classe 'question' e os armazena em uma lista.
let currentQuestion = 0; // Inicializa uma variável para rastrear o índice da pergunta atual, começando pela primeira (índice 0).
let score = 0; // Inicializa a pontuação do usuário como 0.
let respondido = false; // Cria uma flag para controlar se a pergunta atual já foi respondida, evitando múltiplos cliques.

const hoverSound = document.getElementById("hover-sound"); // Pega o elemento de áudio para o som de passar o mouse.
const correctSound = document.getElementById("correct-sound"); // Pega o elemento de áudio para o som de resposta correta.
const wrongSound = document.getElementById("wrong-sound"); // Pega o elemento de áudio para o som de resposta errada.
const celebrationSound = document.getElementById("celebration-sound"); // Pega o elemento de áudio para o som de celebração (boa pontuação).
const failedSound = document.getElementById("failed-sound"); // Pega o elemento de áudio para o som de falha (baixa pontuação).
const fala = document.getElementById("fala"); // Pega o elemento do balão de fala do mascote.
const mascote = document.getElementById("mascote"); // Pega o elemento do mascote.
const body = document.body; // Pega o elemento <body> da página.
const btn = document.getElementById("modeBtn"); // Pega o botão de alternância de modo (claro/escuro).
const modeIcon = document.getElementById("modeIcon"); // Pega o ícone dentro do botão de modo.

correctSound.volume = 0.3; // Define o volume do som de acerto para 30%.
wrongSound.volume = 0.5; // Define o volume do som de erro para 50%.

const dicasPorPergunta = [
  // Array de objetos, onde cada objeto contém dicas e uma resposta final para cada pergunta do quiz.

  {
    // Dicas para a Pergunta 1
    dicas: [
      "Pense em um método de pagamento instantâneo muito usado no Brasil.",
      "É feito por aplicativo e funciona 24 horas por dia.",
    ],
    resposta: "Não desista você consegue.", // Mensagem de incentivo.
  },

  {
    // Dicas para a Pergunta 2
    dicas: [
      "Esse recurso mostra quem enviou ou recebeu dinheiro em uma transação.",
      "Você pode acessá-lo no seu extrato do Pix.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    // Dicas para a Pergunta 3
    dicas: [
      "É um dos jeitos mais rápidos de enviar Pix.",
      "Envolve apenas tocar na tela, sem digitar nada.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    // Dicas para a Pergunta 4
    dicas: [
      "É usado para organizar informações de pagamentos recorrentes.",
      "Pode incluir datas, identificação e valores definidos.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    // Dicas para a Pergunta 5
    dicas: [
      "É uma das maneiras de identificar contas Pix.",
      "Pode ser um e-mail, CPF, CNPJ ou até número de celular.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    // Dicas para a Pergunta 6
    dicas: [
      "Esse recurso permite pagar algo apontando a câmera do celular.",
      "Geralmente envolve um código quadrado preto e branco.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    // Dicas para a Pergunta 7
    dicas: [
      "É a área do app onde você personaliza limites, chaves e segurança.",
      "Quase todos os bancos têm essa tela logo na página inicial do Pix.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    // Dicas para a Pergunta 8
    dicas: [
      "São mostrados no topo e no final do comprovante de pagamento.",
      "Incluem horário, valores e identificação da conta.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    // Dicas para a Pergunta 9
    dicas: [
      "Esse recurso detecta tentativas suspeitas antes de você fazer um Pix.",
      "Muitos bancos exibem alertas amarelos ou vermelhos quando algo parece estranho.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    // Dicas para a Pergunta 10
    dicas: [
      "Serve para copiar todos os dados de pagamento rapidamente.",
      "É muito usado quando alguém manda um código de pagamento por mensagem.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    // Dicas para a Pergunta 11 (não existe no HTML, mas está aqui)
    dicas: [
      "Ajuda a organizar categorias de pagamentos feitos pelo Pix.",
      "Pode gerar relatórios ou mostrar quanto você gastou em cada tipo de compra.",
    ],
    resposta: "Não desista você consegue.",
  },

  {
    // Dicas para a Pergunta 12 (não existe no HTML, mas está aqui)
    dicas: [
      "Esse comando finaliza um pagamento enviando o comprovante.",
      "Aparece logo após concluir um Pix e pode ser enviado por WhatsApp.",
    ],
    resposta: "Não desista você consegue.",
  },
];

// Botão menu hamburguer
const menuBtn = document.querySelector(".menu-toggle"); // Seleciona o botão do menu hambúrguer.

menuBtn.addEventListener("click", () => {
  // Adiciona um evento de clique ao botão do menu.
  document.body.classList.toggle("menu-aberto"); // abre/fecha menu // Alterna a classe 'menu-aberto' no body, que mostra ou esconde o menu.
});

// Fecha o menu quando clicar em algum link
document.querySelectorAll(".sub-nav-links a").forEach((link) => {
  // Seleciona todos os links dentro da navegação.
  link.addEventListener("click", () => {
    // Adiciona um evento de clique a cada link.
    if (window.innerWidth <= 768) {
      // Verifica se a tela é pequena (mobile).
      document.body.classList.remove("menu-aberto"); // Remove a classe para fechar o menu.
    }
  });
});

let saved = localStorage.getItem("theme"); // Pega o tema salvo ('light' ou 'dark') do armazenamento local do navegador.
if (saved) applyTheme(saved); // Se houver um tema salvo, aplica-o.

btn.addEventListener("click", () => {
  // Adiciona um evento de clique ao botão de alternância de tema.
  if (body.classList.contains("light")) {
    // Se o tema atual for 'light'...
    applyTheme("dark"); // ...muda para 'dark'.
  } else {
    // Caso contrário (se for 'dark')...
    applyTheme("light"); // ...muda para 'light'.
  }
});

function applyTheme(mode) {
  // Função para aplicar um tema (modo).

  body.className = mode; // Define a classe do body para o modo escolhido ('light' ou 'dark').
  btn.className = "toggle " + mode; // Define a classe do botão para estilização correspondente.
  localStorage.setItem("theme", mode); // Salva o modo escolhido no armazenamento local para ser lembrado.
}

function showQuestion(index) {
  // Função para mostrar uma pergunta específica com base no seu índice.
  questions.forEach((q, i) => {
    // Itera sobre todas as perguntas.
    q.classList.remove("active"); // Remove a classe 'active' de todas as perguntas para escondê-las.
    if (i === index) q.classList.add("active"); // Se o índice for o da pergunta atual, adiciona a classe 'active' para mostrá-la.
  });
  respondido = false; // Reseta a flag 'respondido' para permitir que a nova pergunta seja respondida.
}

window.addEventListener("load", () => {
  // Adiciona um evento que dispara quando a página termina de carregar.
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

let balaoAtivo = false; // Flag para controlar se o balão de fala já está visível.
let tempoFala = null; // Variável para armazenar o temporizador do balão de fala.
let progressoDicas = new Array(dicasPorPergunta.length).fill(0); // Cria um array para rastrear qual dica mostrar para cada pergunta.

mascote.onmouseup = () => {
  // Define o que acontece quando o usuário clica e solta o mouse sobre o mascote.

  if (balaoAtivo) return; // Se o balão já estiver ativo, não faz nada.

  balaoAtivo = true; // Define que o balão está ativo para evitar múltiplos cliques.

  if (tempoFala) {
    // Se houver um temporizador ativo para esconder o balão...
    clearTimeout(tempoFala); // ...cancela esse temporizador.
    tempoFala = null; // Limpa a variável do temporizador.
  }

  const dadosPergunta = dicasPorPergunta[currentQuestion]; // Pega as dicas e respostas para a pergunta atual.
  const indice = progressoDicas[currentQuestion]; // Pega o índice da próxima dica a ser mostrada para esta pergunta.

  let dicaEscolhida; // Variável para armazenar a dica que será exibida.

  if (indice < dadosPergunta.dicas.length) {
    // Se ainda houver dicas para mostrar...
    dicaEscolhida = dadosPergunta.dicas[indice]; // ...pega a próxima dica.
    progressoDicas[currentQuestion]++; // Incrementa o índice para a próxima vez.
  } else if (indice === dadosPergunta.dicas.length) {
    // Se todas as dicas já foram mostradas...
    dicaEscolhida = dadosPergunta.resposta; // ...mostra a mensagem final.
    progressoDicas[currentQuestion]++; // Incrementa o índice.
  } else {
    // Se até a mensagem final já foi mostrada...
    dicaEscolhida = dadosPergunta.dicas[0]; // ...volta para a primeira dica.
    progressoDicas[currentQuestion] = 1; // Reseta o progresso para a segunda dica na próxima vez.
  }

  fala.textContent = dicaEscolhida; // Define o texto do balão com a dica escolhida.
  fala.style.display = "block"; // Mostra o balão de fala.

  tempoFala = setTimeout(() => {
    // Define um temporizador para esconder o balão.
    fala.style.display = "none"; // Esconde o balão.
    balaoAtivo = false; // Libera o balão para ser clicado novamente.
    tempoFala = null; // Limpa a variável do temporizador.
  }, 2000); // O balão desaparecerá após 2 segundos.
};

function launchConfetti() {
  // Função para lançar o efeito de confetes.
  const duration = 4 * 1000; // Duração do efeito em milissegundos (4 segundos).
  const end = Date.now() + duration; // Calcula o momento em que o efeito deve parar.

  (function frame() {
    // Inicia uma função de animação auto-executável.
    confetti({
      // Lança confetes do lado esquerdo.
      particleCount: 5, // Número de partículas.
      angle: 60, // Ângulo de lançamento.
      spread: 55, // Quão espalhados os confetes saem.
      origin: { x: 0 }, // Origem no canto esquerdo da tela.
    });
    confetti({
      // Lança confetes do lado direito.
      particleCount: 5, // Número de partículas.
      angle: 120, // Ângulo de lançamento.
      spread: 55, // Quão espalhados os confetes saem.
      origin: { x: 1 }, // Origem no canto direito da tela.
    });

    if (Date.now() < end) {
      // Se o tempo de duração ainda não acabou...
      requestAnimationFrame(frame); // ...pede ao navegador para chamar a função 'frame' novamente na próxima atualização de tela.
    }
  })(); // Executa a função de animação imediatamente.
}

const allOptions = document.querySelectorAll(".option"); // Seleciona todas as opções de resposta de todas as perguntas.

allOptions.forEach((option) => {
  // Itera sobre cada uma das opções.

  option.addEventListener("mouseenter", () => {
    // Adiciona um evento para quando o mouse entra na área da opção.
    hoverSound.currentTime = 0; // Reinicia o som para o início.
    hoverSound.play(); // Toca o som de "hover".
  });

  option.addEventListener("click", () => {
    // Adiciona um evento de clique para cada opção.
    if (respondido) return; // Se a pergunta já foi respondida, não faz nada.
    respondido = true; // Marca a pergunta como respondida.

    const parentQuestion = option.closest(".question"); // Encontra o elemento 'pai' da pergunta à qual a opção pertence.
    const feedback = parentQuestion.querySelector(".feedback"); // Seleciona a área de feedback dentro da pergunta atual.
    const correct = option.dataset.correct === "true"; // Verifica se a opção clicada é a correta (comparando o atributo data-correct).

    parentQuestion
      .querySelectorAll(".option")
      .forEach((o) => o.classList.remove("correct", "wrong")); // Remove as classes 'correct' e 'wrong' de todas as opções da pergunta.
    option.classList.add(correct ? "correct" : "wrong"); // Adiciona a classe 'correct' ou 'wrong' à opção clicada.

    feedback.textContent = correct ? "✅ Correto!" : "❌ Errado!"; // Exibe a mensagem de feedback.

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
      // Aguarda 1 segundo antes de passar para a próxima pergunta.
      currentQuestion++; // Incrementa o índice da pergunta atual.
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
              } perguntas!`
            : `😢 Você acertou apenas ${score} de ${
                questions.length - 1
              } perguntas. Tente novamente!`;
        document.getElementById("final-score").textContent = finalText; // Exibe o texto final na tela.
        if (score >= 7) celebrationSound.play(); // Se a pontuação for boa, toca o som de celebração.
        if (score >= 7) launchConfetti(); // Se a pontuação for boa, lança os confetes.
        if (score < 7) failedSound.play(); // Se a pontuação for ruim, toca o som de falha.
      }
    }, 1000); // O tempo de espera é de 1000 milissegundos (1 segundo).
  });
});

showQuestion(0); // Mostra a primeira pergunta (índice 0) quando a página carrega.
