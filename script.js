const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const clearBtn = document.getElementById('clearBtn');

let drawing = false;
let currentColor = colorPicker.value;

// Resize canvas to fill window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - document.querySelector('.toolbar').offsetHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Start drawing
canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup',()=>{
    drawing=false
    ctx.beginPath()
});
canvas.addEventListener('mouseout', () => {
  drawing = false;
  ctx.beginPath(); 
});

// Touch support
canvas.addEventListener('touchstart', () => drawing = true);
canvas.addEventListener('touchend', () => {
  drawing = false;
  ctx.beginPath(); 
});


// Draw on canvas
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchmove', drawTouch);

function draw(e) {
  if (!drawing) return;
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.strokeStyle = currentColor;

  ctx.lineTo(e.clientX, e.clientY - document.querySelector('.toolbar').offsetHeight);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX, e.clientY - document.querySelector('.toolbar').offsetHeight);
}

function drawTouch(e) {
  e.preventDefault();
  if (!drawing) return;
  const touch = e.touches[0];
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.strokeStyle = currentColor;

  ctx.lineTo(touch.clientX, touch.clientY - document.querySelector('.toolbar').offsetHeight);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(touch.clientX, touch.clientY - document.querySelector('.toolbar').offsetHeight);
}

// Change color
colorPicker.addEventListener('input', () => {
  currentColor = colorPicker.value;
  ctx.beginPath();  // prevent color bleed between strokes
});

// Clear canvas
clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
});
