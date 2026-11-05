const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
const glyphs = 'アァカサタナハマヤャラワ012345789ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>アイウエオ';
let columns = [];
let fontSize = 16;
function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  fontSize = window.innerWidth < 600 ? 13 : 16;
  columns = Array(Math.ceil(window.innerWidth / fontSize)).fill(1).map(() => Math.random() * -80);
}

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 8, 3, 0.075)';
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.font = fontSize + 'px monospace';
  columns.forEach((y, i) => {
    const char = glyphs[Math.floor(Math.random() * glyphs.length)];
    ctx.fillStyle = Math.random() > .975 ? '#eaffef' : '#27e85c';
    ctx.fillText(char, i * fontSize, y * fontSize);
    if (y * fontSize > window.innerHeight && Math.random() > .975) columns[i] = 0;
    columns[i] += .65 + Math.random() * .55;
  });
  requestAnimationFrame(drawMatrix);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawMatrix();
const form = document.getElementById('unlockForm');
const secret = document.getElementById('secret');
const error = document.getElementById('error');
const gate = document.getElementById('gate');
const letter = document.getElementById('letter');
const transition = document.getElementById('transition');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (secret.value.trim().toLocaleLowerCase('pt-BR').replace(/[.!?]+$/g, '') !== 'sou sua cupcake') {
    error.textContent = 'Hmm... essa não é a frase secreta. Tente novamente. 💚';
    secret.focus();
    return;
  }
  error.textContent = '';
  gate.classList.add('hidden');
  transition.classList.remove('hidden');
  setTimeout(() => {
    transition.classList.add('hidden');
    letter.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 2600);
});
document.getElementById('restart').addEventListener('click', () => {
  letter.classList.add('hidden');
  gate.classList.remove('hidden');
  secret.value = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
  secret.focus();
});