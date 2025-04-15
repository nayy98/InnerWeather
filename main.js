
document.addEventListener('DOMContentLoaded', () => {
    const emotions = ["joy", "grief", "anxiety", "desire", "love", "anger", "wonder", "emptiness", "clarity", "longing", "shame", "peace"];
    const weatherOutput = document.getElementById('weather-output');
    const container = document.getElementById('sliders-container');
    const audio = new Audio('sounds/ambient.mp3');
    audio.loop = true;

    let muted = true;

    document.getElementById('toggle-deep').addEventListener('click', () => {
        document.body.classList.toggle('deep-mode');
    });

    document.getElementById('toggle-sound').addEventListener('click', () => {
        muted = !muted;
        audio.muted = muted;
        if (!muted && audio.paused) {
            audio.play();
        }
    });

    document.getElementById('generate').addEventListener('click', () => {
        const selected = [];
        emotions.forEach(emotion => {
            const value = document.getElementById(emotion).value;
            if (value > 0.7) selected.push(emotion);
        });

        weatherOutput.textContent = selected.length > 0
            ? `You are moved by ${selected.map(e => e.charAt(0).toUpperCase() + e.slice(1)).join(', ')}.`
            : "Your emotional weather will appear here...";
    });

    document.getElementById('reset').addEventListener('click', () => {
        emotions.forEach(emotion => {
            document.getElementById(emotion).value = 0.5;
        });
        weatherOutput.textContent = "Your emotional weather will appear here...";
    });

    emotions.forEach(emotion => {
        const label = document.createElement('label');
        label.className = 'slider-label';
        label.innerHTML = `
            ${emotion.charAt(0).toUpperCase() + emotion.slice(1)}
            <input type="range" id="${emotion}" min="0" max="1" step="0.01" value="0.5">
        `;
        container.appendChild(label);
    });
});
