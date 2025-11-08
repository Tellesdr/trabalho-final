// Controle de áudio do site
class AudioController {
    constructor() {
        this.currentTrack = null;
        this.playlist = new Map(); // Armazena todas as músicas
        this.isPlaying = false;
        this.volume = 0.5; // Volume padrão (50%)
    }

    // Adiciona uma música à playlist
    addTrack(id, url, title, artist) {
        const audio = new Audio(url);
        audio.volume = this.volume;
        this.playlist.set(id, {
            audio: audio,
            title: title,
            artist: artist,
            url: url
        });
    }

    // Inicializa uma música específica
    playTrack(id) {
        // Se já houver uma música tocando, para ela
        if (this.currentTrack) {
            this.currentTrack.audio.pause();
            this.currentTrack.audio.currentTime = 0;
        }

        // Pega a nova música
        const track = this.playlist.get(id);
        if (!track) return;

        this.currentTrack = track;
        this.isPlaying = true;
        track.audio.play();
        
        // Atualiza a interface
        this.updateDisplay();
    }

    // Tocar/Pausar música atual
    togglePlay() {
        if (!this.currentTrack) return;
        
        if (this.isPlaying) {
            this.currentTrack.audio.pause();
        } else {
            this.currentTrack.audio.play();
        }
        this.isPlaying = !this.isPlaying;
        this.updateDisplay();
    }

    // Ajusta o volume de todas as músicas
    setVolume(value) {
        this.volume = value;
        for (let track of this.playlist.values()) {
            track.audio.volume = value;
        }
    }

    // Atualiza a interface do player
    updateDisplay() {
        const playButton = document.getElementById('playButton');
        const trackInfo = document.getElementById('trackInfo');
        
        if (playButton) {
            playButton.innerHTML = this.isPlaying ? '⏸️' : '▶️';
        }
        
        if (trackInfo && this.currentTrack) {
            trackInfo.innerHTML = `
                <div class="track-title">${this.currentTrack.title}</div>
                <div class="track-artist">${this.currentTrack.artist}</div>
            `;
        }
    }
}

// Cria instância do controlador
const audioController = new AudioController();

// Inicializa quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Adiciona controles de áudio à página
    const audioControls = document.createElement('div');
    audioControls.className = 'audio-controls';
    audioControls.innerHTML = `
        <div id="trackInfo" class="track-info">
            <div class="track-title">Selecione um disco</div>
            <div class="track-artist"></div>
        </div>
        <div class="controls">
            <button id="playButton" onclick="audioController.togglePlay()">▶️</button>
            <input type="range" id="volumeSlider" min="0" max="1" step="0.1" value="0.5"
                   oninput="audioController.setVolume(this.value)">
        </div>
    `;

    // Adiciona os controles ao final do body
    document.body.appendChild(audioControls);
});
