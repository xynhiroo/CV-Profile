const bioElement = document.getElementById('animatedBio');
const bioText = "Seorang Penjelajah Samudera Teknologi, Mencari misteri terdalam dunia, Untuk menemukan jati diri nya dalam luas nya teknologi";
let bioIndex = 0;
const typingSpeed = 50;

function typeBio() {
    if (bioIndex < bioText.length) {
        bioElement.innerHTML = bioText.substring(0, bioIndex + 1);
        bioIndex++;
        setTimeout(typeBio, typingSpeed);
    } else {
        bioElement.style.borderRight = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeBio, 1000);
});

const oceanBackground = document.querySelector('.ocean-background');
const numBubbles = 30;

function createBubbles() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.bottom = `${Math.random() * 10}%`;

    const size = Math.random() * 20 + 10;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    bubble.style.animationDuration = `${Math.random() * 8 + 8}s`;
    bubble.style.animationDelay = `${Math.random() * 5}s`;

    oceanBackground.appendChild(bubble);
    bubble.addEventListener('animationend', () => {
        bubble.remove();
        createBubbles();
    });
}

for (let i = 0; i < numBubbles; i++) {
    createBubbles();
}