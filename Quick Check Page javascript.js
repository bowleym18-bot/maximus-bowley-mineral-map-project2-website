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