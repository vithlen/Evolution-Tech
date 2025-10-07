const options = document.querySelectorAll('.option');
const feedback = document.getElementById('feedback');

 options.forEach(option => { 
   option.addEventListener('click', () => {
    options.forEach(o => o.classList.remove('correct', 'wrong'));

    if(option.dataset.correct === "true"){
        option.classList.add('correct');
        feedback.textContent = "✅ Correto";
    }else{
        option.classList.add('wrong');
        feedback.textContent = "❌ Errado seu otario";
    }
   });
 });