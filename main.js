
const emotions = [
  "joy", "grief", "anxiety", "desire", "love", "anger",
  "wonder", "emptiness", "clarity", "longing", "shame", "peace"
];

const emojiMap = {
  joy: "✨", grief: "🌧️", anxiety: "⚡", desire: "🔥", love: "❤️",
  anger: "💥", wonder: "🌠", emptiness: "🌌", clarity: "🔮",
  longing: "🌊", shame: "🫥", peace: "🕊️"
};

const emotionValues = {};
let isMuted = false;

window.onload = () => {
  const slidersDiv = document.getElementById("sliders");
  emotions.forEach(emotion => {
    const container = document.createElement("div");
    container.className = "slider-container";

    const label = document.createElement("div");
    label.className = "slider-label";
    label.innerHTML = `<span>${emotion.charAt(0).toUpperCase() + emotion.slice(1)}</span>`;

    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = "0";
    slider.max = "1";
    slider.step = "0.01";
    slider.value = "0.5";
    slider.oninput = () => emotionValues[emotion] = parseFloat(slider.value);

    container.appendChild(label);
    container.appendChild(slider);
    slidersDiv.appendChild(container);

    emotionValues[emotion] = 0.5;
  });

  document.getElementById("ambientAudio")?.play();
};

function generateWeather() {
  const topEmotions = Object.entries(emotionValues)
    .filter(([_, val]) => val > 0.7)
    .sort((a, b) => b[1] - a[1])
    .map(([emotion]) => `${emojiMap[emotion]} ${emotion.charAt(0).toUpperCase() + emotion.slice(1)}`);

  const output = document.getElementById("weather-output");
  output.innerText = topEmotions.length
    ? "You are moved by " + topEmotions.join(", ") + "."
    : "Your emotional weather is calm.";

  drawSigil(topEmotions.length);
}

function resetSliders() {
  document.querySelectorAll("input[type=range]").forEach(slider => slider.value = 0.5);
  emotions.forEach(e => emotionValues[e] = 0.5);
  document.getElementById("weather-output").innerText = "Your emotional weather will appear here...";
  clearCanvas();
}

function toggleDeepMode() {
  document.body.classList.toggle("deep-mode");
}

function toggleMute() {
  const audio = document.getElementById("ambientAudio");
  audio.muted = !audio.muted;
}

function drawSigil(points) {
  const canvas = document.getElementById("sigil-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = 300;
  canvas.height = 300;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const radius = 100;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  ctx.beginPath();
  for (let i = 0; i < points; i++) {
    const angle = 2 * Math.PI * i / points;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.strokeStyle = "#ffcc00";
  ctx.stroke();
}

function clearCanvas() {
  const canvas = document.getElementById("sigil-canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
