
const emotions = ["joy", "grief", "anxiety", "desire", "love", "anger", "wonder", "emptiness", "clarity", "longing", "shame", "peace"];
let isMuted = false;

window.onload = () => {
  const sliderContainer = document.getElementById("sliders");
  emotions.forEach(emotion => {
    const wrapper = document.createElement("div");
    wrapper.className = "slider-container";
    wrapper.innerHTML = `
      <label for="\${emotion}">\${emotion.charAt(0).toUpperCase() + emotion.slice(1)}</label>
      <input type="range" min="0" max="100" value="50" id="\${emotion}" />
    `;
    sliderContainer.appendChild(wrapper);
  });
};

function generateWeather() {
  const selected = emotions
    .map(id => ({ id, value: document.getElementById(id).value }))
    .filter(item => item.value > 70)
    .map(item => item.id.charAt(0).toUpperCase() + item.id.slice(1));

  const output = document.getElementById("output");
  if (selected.length > 0) {
    output.textContent = "You are moved by " + selected.join(", ") + ".";
  } else {
    output.textContent = "Your emotional weather is calm.";
  }

  drawSigil(selected.length);
}

function resetSliders() {
  emotions.forEach(id => {
    document.getElementById(id).value = 50;
  });
  document.getElementById("output").textContent = "Your emotional weather will appear here...";
  drawSigil(0);
}

function toggleDeepMode() {
  document.body.classList.toggle("deep");
}

function toggleMute() {
  const audio = document.getElementById("ambient");
  isMuted = !isMuted;
  audio.muted = isMuted;
  if (!audio.paused && !isMuted) {
    audio.play();
  } else {
    audio.pause();
  }
}

function drawSigil(points) {
  const canvas = document.getElementById("sigil");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (points < 2) return;

  const angle = (2 * Math.PI) / points;
  const radius = 100;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  ctx.strokeStyle = "#ffff00";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < points; i++) {
    const x = centerX + radius * Math.cos(i * angle - Math.PI / 2);
    const y = centerY + radius * Math.sin(i * angle - Math.PI / 2);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
}
