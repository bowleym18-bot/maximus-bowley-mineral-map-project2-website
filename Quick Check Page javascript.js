const imageData = [
    {
        id: 1,
        name: "Gemstone Image 1.jpg",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500",
        answer: "More of a metal than a crystal since it's a brittle, crystalline, white metal with a slight pink tinge."
    },
    {
        id: 2,
        name: "Gemstone Image 3.jpg",
        image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=500",
        answer: "Can be mistaken for sapphire, but it is more valuable."
    },
    {
        id: 3,
        name: "Metal Image 1.jpg",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500",
        answer: "There is an average of 0.2 milligrams in the human body."
    },
    {
        id: 4,
        name: "Metal Image 4.jpg",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500",
        answer: "The go-to metal for artificial hip joints, dental implants, and bone pins."
    }
];

// 4 CORRECT ANSWERS + 16 INCORRECT ANSWERS

const correctAnswers = imageData.map(item => ({
    text: item.answer,
    correctId: item.id
}));

const incorrectAnswers = [
    "A busy city street",
    "A type of wild animal",
    "A computer game",
    "A mountain covered in snow",
    "A historical building",
    "A colourful painting",
    "A group of musicians",
    "A modern vehicle",
    "A tropical beach",
    "A science experiment",
    "A collection of books",
    "A space exploration mission",
    "A traditional festival",
    "A sporting event",
    "A flowering plant",
    "A famous monument"
];

let selectedImage = null;
let score = 0;
let matched = [];
let choices = [];

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startGame() {
    selectedImage = null;
    score = 0;
    matched = [];

    choices = shuffle([
        ...correctAnswers,
        ...incorrectAnswers.map(text => ({
            text,
            correctId: null
        }))
    ]);

    renderImages();
    renderAnswers();
    updateScore();

    document.getElementById("message").textContent =
        "Select an image to begin!";
}

function renderImages() {
    const container = document.getElementById("images");
    container.innerHTML = "";

    imageData.forEach(item => {
        const card = document.createElement("div");
        card.className = "image-card";

        if (matched.includes(item.id)) {
            card.classList.add("matched");
        }

        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name}</p>
        `;

        if (!matched.includes(item.id)) {
            card.style.cursor = "pointer";
            card.onclick = () => selectImage(item.id);
        }

        container.appendChild(card);
    });
}

function renderAnswers() {
    const container = document.getElementById("answers");
    container.innerHTML = "";

    choices.forEach((choice, index) => {
        const box = document.createElement("div");
        box.className = "answer";
        box.textContent = choice.text;

        if (choice.used) {
            box.classList.add("correct");
        } else {
            box.onclick = () => checkAnswer(index);
        }

        container.appendChild(box);
    });
}

function selectImage(id) {
    if (matched.includes(id)) return;

    selectedImage = id;

    document.getElementById("message").textContent =
        "Now select the matching information box.";

    renderImages();

    const cards = document.querySelectorAll(".image-card");
    const index = imageData.findIndex(item => item.id === id);

    cards[index].style.border = "4px solid #4285f4";
}

function checkAnswer(index) {
    if (selectedImage === null) {
        document.getElementById("message").textContent =
            "Please select an image first!";
        return;
    }

    const choice = choices[index];

    if (choice.used) return;

    if (choice.correctId === selectedImage) {
        score++;
        matched.push(selectedImage);
        choice.used = true;

        document.getElementById("message").style.color = "green";
        document.getElementById("message").textContent =
            "Correct! Well done!";

        selectedImage = null;
        renderImages();
        renderAnswers();
        updateScore();

        if (score === 4) {
            document.getElementById("message").textContent =
                "Congratulations! You matched all 4 images!";
        }

    } else {
        document.getElementById("message").style.color = "red";
        document.getElementById("message").textContent =
            "Incorrect! Try another information box.";

        const boxes = document.querySelectorAll(".answer");
        boxes[index].classList.add("wrong");

        setTimeout(() => {
            boxes[index]?.classList.remove("wrong");
        }, 700);
    }
}

function updateScore() {
    document.getElementById("score").textContent =
        "Score: " + score + " / 4";

    document.getElementById("progress").textContent =
        "Matches completed: " + score + " / 4";
}

function restartGame() {
    document.getElementById("message").style.color = "black";
    startGame();
}

startGame();

/*

</script>

const images = document.querySelectorAll('.clickable-img');
const infoBoxes = document.querySelectorAll('.info-box');

images.forEach(img => {
  img.addEventListener('click', () => {
    infoBoxes.forEach(box => box.classList.remove('active'));
    
    const targetId = img.getAttribute('data-info');
    
    const matchingBox = document.getElementById(targetId);
    if (matchingBox) {
      matchingBox.classList.add('active');
    }
}

function checkMatch() {
  if (selectedInfo && selectedImage) {
    const matchIdInfo = selectedInfo.getAttribute('data-match');
    const matchIdImage = selectedImage.getAttribute('data-match');

    if (matchIdInfo === matchIdImage) {
      // Correct Match
      selectedInfo.classList.add('matched');
      selectedImage.classList.add('matched');
      selectedInfo.classList.remove('selected');
      selectedImage.classList.remove('selected');
      
      feedback.textContent = 'Correct match!';
      selectedInfo = null;
      selectedImage = null;
    } else {
      // Wrong Match
      feedback.textContent = 'Not a match. Try again!';
      setTimeout(() => {
        selectedInfo.classList.remove('selected');
        selectedImage.classList.remove('selected');
        selectedInfo = null;
        selectedImage = null;
      }, 1000);
    }
  }
}

let selectedInfo = null;
let selectedImage = null;

const infoBoxes = document.querySelectorAll('.info-box');
const imageBoxes = document.querySelectorAll('.image-box');
const feedback = document.getElementById('feedback');

// Handle click on info boxes (left)
infoBoxes.forEach(box => {
  box.addEventListener('click', () => {
    if (box.classList.contains('matched')) return;

    infoBoxes.forEach(b => b.classList.remove('selected'));
    box.classList.add('selected');
    selectedInfo = box;

    checkMatch();
  });
});

// Handle click on image boxes (right)
imageBoxes.forEach(box => {
  box.addEventListener('click', () => {
    if (box.classList.contains('matched')) return;

    imageBoxes.forEach(b => b.classList.remove('selected'));
    box.classList.add('selected');
    selectedImage = box;

    checkMatch();
  });
});
