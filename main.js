const emotions = [
    "joy", "grief", "anxiety", "desire", "love", "anger",
    "wonder", "emptiness", "clarity", "longing", "shame", "peace"
];

const emojis = {
    joy: "☀️", grief: "🌧️", anxiety: "⚡", desire: "🔥", love: "❤️",
    anger: "💥", wonder: "✨", emptiness: "🌌", clarity: "🔮",
    longing: "🌊", shame: "😔", peace: "🕊️"
};

let isMuted = true;

window.onload = () => {
    const container = document.getElementById("sliders-container");
    emotions.forEach(emotion => {
        const label = document.createElement("label");
        label.innerText = emotion.charAt(0).toUpperCase() + emotion.slice(1);
        const input = document.createElement("input");
        input.type = "range";
        input.min = 0;
        input.max = 10;
        input.value = 5;
        input.id = emotion;
        label.appendChild(input);
        container.appendChild(label);
    });
};

function generateWeather() {
    const topEmotions = emotions
        .map(e => ({ emotion: e, value: parseInt(document.getElementById(e).value) }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5)
        .map(e => emojis[e.emotion] + " " + e.emotion.charAt(0).toUpperCase() + e.emotion.slice(1));

    document.getElementById("output-text").innerText = "You are moved by " + topEmotions.join(", ") + ".";

    drawSigil(topEmotions.length);
}

function resetSliders() {
    emotions.forEach(e => document.getElementById(e).value = 5);
    document.getElementById("output-text").innerText = "Your emotional weather will appear here...";
    drawSigil(0);
}

function toggleDeepMode() {
    document.body.classList.toggle("deep-mode");
}

function toggleSound() {
    const audio = document.getElementById("background-audio");
    isMuted = !isMuted;
    audio.muted = isMuted;
    if (!audio.paused && isMuted) {
        audio.pause();
    } else {
        audio.play();
    }
}

function drawSigil(points) {
    const canvas = document.getElementById("sigil-canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (points < 2) return;

    const angle = (2 * Math.PI) / points;
    const radius = 100;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.beginPath();
    for (let i = 0; i <= points; i++) {
        const x = centerX + radius * Math.cos(i * angle);
        const y = centerY + radius * Math.sin(i * angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "#ffcc00";
    ctx.lineWidth = 2;
    ctx.stroke();
}
