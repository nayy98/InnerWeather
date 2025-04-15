
const emotions = ["joy", "grief", "anxiety", "desire", "love", "anger", "wonder", "emptiness", "clarity", "longing", "shame", "peace"];

const sliderContainer = document.getElementById('sliders');
emotions.forEach(emotion => {
    const label = emotion.charAt(0).toUpperCase() + emotion.slice(1);
    sliderContainer.innerHTML += `
        <label for="${emotion}">${label}</label>
        <input type="range" id="${emotion}" min="0" max="1" step="0.01" value="0.5">
    `;
});

function generateWeather() {
    const activeEmotions = emotions.filter(emotion => parseFloat(document.getElementById(emotion).value) > 0.7);
    document.getElementById('weatherOutput').innerText =
        activeEmotions.length
            ? 'You are moved by ' + activeEmotions.map(e => e.charAt(0).toUpperCase() + e.slice(1)).join(', ') + '.'
            : 'Your emotional weather will appear here...';
    drawSigil(activeEmotions.length);
}

function resetSliders() {
    emotions.forEach(emotion => {
        document.getElementById(emotion).value = 0.5;
    });
    document.getElementById('weatherOutput').innerText = 'Your emotional weather will appear here...';
}

function toggleDeepMode() {
    document.body.classList.toggle('deep-mode');
}

function toggleMute() {
    const audio = document.getElementById("ambientAudio");
    audio.muted = !audio.muted;
}

function drawSigil(points) {
    const sigil = document.getElementById('sigil');
    sigil.innerHTML = `<div style="color: yellow; margin-top: 20px;">[Sigil with ${points} points]</div>`;
}
