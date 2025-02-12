const balloon = document.getElementById('balloon');
const tapCountDisplay = document.getElementById('tapCount');
const pauseResumeButton = document.getElementById('pauseResumeButton');
const gearButton = document.getElementById('gearButton');
const gearMenu = document.getElementById('gearMenu');
const saveButton = document.getElementById('saveButton');
const resetButton = document.getElementById('resetButton');

let tapCount = 0;
let isPaused = false;
const TAPS_TO_BURST = 50;

// Balloon popping sound
const popSound = new Audio('mixkit-soccer-ball-quick-kick-2108.mp3'); // Replace with your sound file URL

// Load saved game state
function loadGame() {
  const savedTapCount = localStorage.getItem('tapCount');
  if (savedTapCount) {
    tapCount = parseInt(savedTapCount, 10);
    tapCountDisplay.textContent = tapCount;
  }
}

// Save game state
function saveGame() {
  localStorage.setItem('tapCount', tapCount);
  alert('Game saved!');
}

// Reset game state
function resetGame() {
  tapCount = 0;
  tapCountDisplay.textContent = tapCount;
  localStorage.removeItem('tapCount');
  alert('Game reset!');
}

// Update game logic
function updateGame() {
  if (isPaused) return;

  tapCount++;
  tapCountDisplay.textContent = tapCount;

  // Create bubbles
  createBubble();

  // Check if balloon should burst
  if (tapCount % TAPS_TO_BURST === 0) {
    burstBalloon();
  }
}

// Burst balloon
function burstBalloon() {
  popSound.play();
  balloon.style.animation = 'burst 0.5s ease-out';
  setTimeout(() => {
    balloon.style.animation = '';
  }, 500);
}

// Create bubbles
function createBubble() {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  bubble.style.left = `${Math.random() * 100}%`;
  balloon.appendChild(bubble);
  setTimeout(() => bubble.remove(), 1000);
}

// Toggle pause/resume
function togglePauseResume() {
  isPaused = !isPaused;
  pauseResumeButton.textContent = isPaused ? 'Resume' : 'Pause';
}

// Toggle gear menu and rotate button
gearButton.addEventListener('click', () => {
  gearButton.classList.toggle('rotate');
  gearMenu.style.display = gearMenu.style.display === 'block' ? 'none' : 'block';
});

// Save game button
saveButton.addEventListener('click', saveGame);

// Reset game button
resetButton.addEventListener('click', resetGame);

// Load game when page loads
window.addEventListener('load', loadGame);

// Event listeners
balloon.addEventListener('click', updateGame);
pauseResumeButton.addEventListener('click', togglePauseResume);