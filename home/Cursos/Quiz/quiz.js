
const questions = document.querySelectorAll('.question');
let currentQuestion = 0;
let score = 0;


const hoverSound = document.getElementById("hover-sound");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");
const celebrationSound = document.getElementById("celebration-sound");

correctSound.volume = 0.3; 
wrongSound.volume = 0.5; 

function showQuestion(index) {
  questions.forEach((q, i) => {
    q.classList.remove('active');
    if (i === index) q.classList.add('active');
  });
}


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
  }());
}


const allOptions = document.querySelectorAll('.option');

allOptions.forEach(option => {
  
  option.addEventListener('mouseenter', () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
  });

  
  option.addEventListener('click', () => {
    const parentQuestion = option.closest('.question');
    const feedback = parentQuestion.querySelector('.feedback');
    const correct = option.dataset.correct === "true";

  
    parentQuestion.querySelectorAll('.option').forEach(o => o.classList.remove('correct', 'wrong'));
    option.classList.add(correct ? 'correct' : 'wrong');

    feedback.textContent = correct ? "✅ Correto!" : "❌ Errado!";

    
    if (correct) {
      correctSound.currentTime = 0;
      correctSound.play();
      score++;
    } else {
      wrongSound.currentTime = 0;
      wrongSound.play();
    }

    
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < questions.length - 1) {
        showQuestion(currentQuestion);
      } else {
        showQuestion(questions.length - 1);
        document.getElementById('final-score').textContent = `Você acertou ${score} de ${questions.length - 1} perguntas!`;

        // Som de celebração e confete
        celebrationSound.play();
        launchConfetti();
      }
    }, 1000);
  });
});


showQuestion(0);
