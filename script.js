const textArea = document.getElementById('text');
const languageSelect = document.getElementById('language');
const voiceSelect = document.getElementById('voice');
const speakButton = document.getElementById('speak-btn');

let voices = [];

function populateVoices() {
    voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = '';

    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.textContent = `${voice.name} (${voice.lang})`;

        if (voice.default) {
            option.textContent += ' [default]';
        }

        voiceSelect.appendChild(option);
    });
}

function populateLanguages() {
    const languages = [...new Set(voices.map(voice => voice.lang))];
    
    languages.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang;
        option.textContent = lang;
        languageSelect.appendChild(option);
    });
}

function speakText() {
    const utterance = new SpeechSynthesisUtterance(textArea.value);

    const selectedVoice = voices.find(voice => voice.name === voiceSelect.value);
    const selectedLanguage = languageSelect.value;

    utterance.voice = selectedVoice;
    utterance.lang = selectedLanguage;

    speechSynthesis.speak(utterance);
}

speakButton.addEventListener('click', speakText);

speechSynthesis.addEventListener('voiceschanged', () => {
    populateVoices();
    populateLanguages();
});

// Initialize on load
populateVoices();
populateLanguages();
