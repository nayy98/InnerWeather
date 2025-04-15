
const emotions = ["joy", "grief", "anxiety", "desire", "love", "anger", "wonder", "emptiness", "clarity", "longing", "shame", "peace"];
let slidersContainer = document.getElementById("sliders");

emotions.forEach(emotion => {
    let label = document.createElement("label");
    label.innerHTML = emotion.charAt(0).toUpperCase() + emotion.slice(1);
    let slider = document.createElement("input");
    slider.type = "range";
    slider.min = "0";
    slider.max = "100";
    slider.value = "50";
    slider.classList.add("slider");
    label.appendChild(slider);
    slidersContainer.appendChild(label);
});

function generateWeather() {
    let values = document.querySelectorAll(".slider");
    let emotionalStates = [];
    values.forEach((slider, index) => {
        if (slider.value > 70) emotionalStates.push(emotions[index]);
    });
    document.getElementById("weather-output").innerText = emotionalStates.length > 0
        ? "You are moved by " + emotionalStates.join(", ") + "."
        : "Your emotional weather is calm.";
    drawSigil(emotionalStates.length);
}

function resetSliders() {
    document.querySelectorAll(".slider").forEach(slider => slider.value = "50");
    document.getElementById("weather-output").innerText = "Your emotional weather will appear here...";
    clearCanvas();
}

function toggleDeepMode() {
    document.body.style.backgroundColor = document.body.style.backgroundColor === "black" ? "#0b0033" : "black";
    document.body.style.color = document.body.style.color === "yellow" ? "cyan" : "yellow";
}

function toggleMute() {
    const audio = document.getElementById("ambientAudio");
    audio.muted = !audio.muted;
}

function drawSigil(points) {
    clearCanvas();
    const canvas = document.getElementById("sigilCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 300;
    canvas.height = 300;
    ctx.strokeStyle = "yellow";
    ctx.beginPath();
    for (let i = 0; i < points; i++) {
        let angle = (2 * Math.PI / points) * i;
        let x = 150 + 100 * Math.cos(angle);
        let y = 150 + 100 * Math.sin(angle);
        ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
}

function clearCanvas() {
    const canvas = document.getElementById("sigilCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
