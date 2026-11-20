



/*

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
