function startGame() {
  document.getElementById('start-button').style.display = 'none'; // Hide the start button
  document.getElementById('game-content').style.display = 'block'; // Display the game content
  generateQuestion(); // Start the game
}

const wordList = ['bag', 'gap', 'hat', 'bed', 'bug', 'mug', 'net', 'car', 'pig', 'lip', 'dog', 'box', 'rat'];
const hints = {
  'bag': 'You carry things in this when you go shopping.',
  'gap': 'This is a space between two objects.',
  'hat': 'You wear this on your head to protect yourself from the sun.',
  'bed': 'You sleep on this furniture.',
  'bug': 'This small creature can be annoying when it flies around you.',
  'mug': 'You drink coffee or tea from this container.',
  'net': 'This is used to catch fish or butterflies.',
  'car': 'This vehicle has four wheels and takes you from one place to another.',
  'pig': 'This farm animal is often associated with being pink and liking mud.',
  'lip': 'You use this body part to speak and kiss.',
  'dog': 'This animal is often called man\'s best friend.',
  'box': 'You put things inside this container for storage or transportation.',
  'rat': 'This rodent is known for being a pest in some environments.'
};

const vowelBox = Array.from(document.querySelectorAll('.vowel-box')); // Convert NodeList to Array
const wordDisplay = document.getElementById('word-display');
const messageEl = document.getElementById('message');
const scoreEl = document.getElementById('score');
const livesEl = document.getElementById('lives');

let answerWord, score = 0, answeredWords = [], lives = 3;

function generateQuestion() {
  const availableWords = wordList.filter(word => !answeredWords.includes(word));
  
  if (availableWords.length === 0 || lives === 0) {
    alert('Congratulations! You got it!');
    setTimeout(restartGame, 10);
    return;
  }
  
  const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
  answerWord = randomWord;
  wordDisplay.textContent = answerWord.slice(0, 1) + '_' + answerWord.slice(2);
  const hintEl = document.getElementById('hint');
  if (hintEl) {
    hintEl.textContent = `Hint: ${hints[randomWord]}`;
  }
  messageEl.textContent = '';
  
  const correctVowel = answerWord[1].toLowerCase();
  
  const availableVowels = ['a', 'e', 'i', 'o', 'u'];
  const shuffledVowelBoxes = shuffleArray(vowelBox); // Shuffle the vowel boxes
  
  const randomVowels = new Set();
  while (randomVowels.size < 2) {
    const randomIndex = Math.floor(Math.random() * availableVowels.length);
    const randomVowel = availableVowels[randomIndex].toLowerCase();
    if (randomVowel !== correctVowel) {
      randomVowels.add(randomVowel);
    }
  }
  
  shuffledVowelBoxes.forEach((box, index) => {
    if (index < 2) {
      // Ilagay ang tamang vowel sa loob ng bawat vowel box
      const randomVowel = Array.from(randomVowels)[index];
      box.textContent = randomVowel;
      // Set the dataset of vowel to remember it for the next click
      box.dataset.vowel = randomVowel;
    } else {
      // Ilagay ang tamang vowel sa gitna ng salitang dapat hulaan
      box.textContent = correctVowel;
    }
  });
  
  vowelBox.forEach(box => box.classList.remove('correct', 'wrong'));
  livesEl.textContent = `Lives: ${lives}`;
}

function restartGame() {
  score = 0;
  lives = 3;
  answeredWords = [];
  generateQuestion();
  scoreEl.textContent = `Score: ${score}`;
  livesEl.textContent = `Lives: ${lives}`;
  
  // Ipakita ang button ng simula
  document.getElementById('start-button').style.display = 'block';
  document.getElementById('game-content').style.display = 'none'; // Itago ang laman ng laro
}

vowelBox.forEach(box => box.addEventListener('click', function() {
  if (box.textContent.toLowerCase() === answerWord[1]) {
    box.classList.add('correct');
    alert('Correct!');
    score++;
    scoreEl.textContent = `Score: ${score}`;
    answeredWords.push(answerWord); // Add answered word to the list
    generateQuestion();
  } else {
    box.classList.add('wrong');
    alert('Incorrect! Guess more.');
    lives--;
    livesEl.textContent = `Lives: ${lives}`;
    if (lives === 0) {
      alert('Game Over!');
      setTimeout(restartGame, 10);
    }
  }
}));

// Function to shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}