let signs = ["+", "-", "*", "/"];

let question = document.querySelector('.question');
let answers = document.querySelectorAll('.answer');
let container_main = document.querySelector('.main');
let container_start = document.querySelector('.start');
let container_h3 = container_start.querySelector('h3');
let start_button = document.querySelector('.start-btn');

function randint(max) {
    return Math.round(Math.random() * max);
}

function getRandomSign() {
    return signs[randint(3)];
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

class Question {
    constructor() {
        let a = randint(30);
        let b = randint(30);
        let sign = getRandomSign();
        this.question = `${a} ${sign} ${b}`;
        if (sign == "+") { this.correct = a + b; }
        else if (sign == "-") { this.correct = a - b; }
        else if (sign == "*") { this.correct = a * b; }
        else if (sign == "/") { this.correct = parseFloat((a / b).toFixed(2)); } // ✅ Виправлено: обмежено до 2 знаків
        this.answers = [
            randint(20),
            randint(20),
            this.correct,
            randint(20),
            randint(20),
        ];
        shuffle(this.answers);
    }

    display() {
        question.innerHTML = this.question;
        for (let i = 0; i < this.answers.length; i += 1) {
            answers[i].innerHTML = this.answers[i];
        }
    }
}


let current_question;
let correct_answers_given;
let total_answers_given;
let timer;

start_button.addEventListener('click', function () {
    container_main.style.display = 'flex';
    container_start.style.display = 'none';

    correct_answers_given = 0;
    total_answers_given = 0;

    current_question = new Question();
    current_question.display();


    timer = setTimeout(function () {
        container_main.style.display = 'none';
        container_start.style.display = 'flex';
        let accuracy = total_answers_given > 0
            ? Math.round((correct_answers_given * 100) / total_answers_given)
            : 0;
        container_h3.innerHTML = `<h3>Ви дали ${correct_answers_given} правильних відповідей із ${total_answers_given}. Точність - ${accuracy}%.</h3>`;
    }, 10000);
});


for (let i = 0; i < answers.length; i += 1) {
    answers[i].addEventListener("click", function () {
        let user_answer = parseFloat(answers[i].innerHTML);
        let correct_answer = parseFloat(current_question.correct);

        if (user_answer === correct_answer) {
            correct_answers_given += 1;
            answers[i].style.background = '#00FF00'; 
        } else {
            answers[i].style.background = '#FF0000'; 
        }

        
        setTimeout(() => {
            answers.forEach(btn => btn.style.background = '');
        }, 300);

        total_answers_given += 1;
        current_question = new Question();
        current_question.display();
    });
}
