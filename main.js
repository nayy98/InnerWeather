
const emotions = [
  "Joy", "Grief", "Anxiety", "Desire", "Love", "Anger",
  "Wonder", "Emptiness", "Clarity", "Longing", "Shame", "Peace"
];

const emojiMap = {
  Joy: "🌞", Grief: "🌧️", Anxiety: "⚡", Desire: "🔥",
  Love: "❤️", Anger: "💥", Wonder: "🌟", Emptiness: "🌌",
  Clarity: "🔮", Longing: "🌊", Shame: "😶", Peace: "🕊️"
};

window.onload = () => {
  const sliderContainer = document.getElementById("sliders");
  emotions.forEach(emotion => {
    const label = document.createElement("div");
    label.className = "slider-label";
    label.innerHTML = `<span>${emotion}</span><span id="${emotion}-val">0</span>`;
    sliderContainer.appendChild(label);

    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = 0;
    slider.max = 100;
    slider.value = 50;
    slider.id = emotion;
    slider.oninput = () => {
      document.getElementById(`${emotion}-val`).innerText = slider.value;
    };
    sliderContainer.appendChild(slider);
  });

  const audio = document.getElementById("background-audio");
  const muteButton = document.getElementById("muteButton");

  muteButton.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });

  window.addEventListener("click", () => {
    if (audio.paused) audio.play();
  }, { once: true });
};

function generateWeather() {
  const active = emotions
    .filter(emotion => document.getElementById(emotion).value > 70);
  const resultText = active.map(e => `${emojiMap[e]} ${e}`).join(", ");
  document.getElementById("result").innerText = `You are moved by ${resultText}.`;
  drawSigil(active.length);
}

function resetSliders() {
  emotions.forEach(emotion => {
    const slider = document.getElementById(emotion);
    slider.value = 50;
    document.getElementById(`${emotion}-val`).innerText = "50";
  });
  document.getElementById("result").innerText = "";
  drawSigil(0);
}

function toggleDeepMode() {
  document.body.classList.toggle("deep-mode");
}

function drawSigil(points) {
  const canvas = document.getElementById("sigil");
  const ctx = canvas.getContext("2d");
  const radius = 100;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (points < 2) return;

  ctx.beginPath();
  for (let i = 0; i < points; i++) {
    const angle = 2 * Math.PI * i / points - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.strokeStyle = "gold";
  ctx.lineWidth = 2;
  ctx.stroke();
}
