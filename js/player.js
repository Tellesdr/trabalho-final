class MusicPlayer {
    constructor() {
        this.audio = new Audio('audios/1andonly.mp3');
        this.isPlaying = false;
        this.albumCover = document.querySelector('.album-cover');
        this.statusText = document.querySelector('.play-status');
        this.playButton = document.querySelector('.play-button');
        
        // Tratamento de erros de carregamento do áudio
        this.audio.addEventListener('error', (e) => {
            console.error('Erro ao carregar o áudio:', e);
            this.statusText.textContent = 'Erro ao carregar a música';
            this.statusText.style.color = '#ff0000';
        });

        // Adiciona eventos
        this.initializeEvents();
    }

    initializeEvents() {
        // Verifica se os elementos existem antes de adicionar eventos
        if (this.albumCover) {
            this.albumCover.addEventListener('click', () => this.togglePlay());
        }
        
        if (this.playButton) {
            this.playButton.addEventListener('click', () => this.togglePlay());
        }
        
        if (this.audio) {
            this.audio.addEventListener('ended', () => this.stopPlaying());
            
            // Adiciona evento de carregamento
            this.audio.addEventListener('loadeddata', () => {
                this.statusText.textContent = 'Clique para tocar';
                this.playButton.disabled = false;
            });
        }
    }

    togglePlay() {
        if (this.isPlaying) {
            this.stopPlaying();
        } else {
            this.startPlaying();
        }
    }

    startPlaying() {
        this.audio.play();
        this.isPlaying = true;
        this.albumCover.classList.add('spinning');
        this.statusText.textContent = 'Tocando agora...';
        this.playButton.innerHTML = '⏸️';
    }

    stopPlaying() {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.isPlaying = false;
        this.albumCover.classList.remove('spinning');
        this.statusText.textContent = 'Clique para tocar';
        this.playButton.innerHTML = '▶️';
    }
}

// Inicializa o player quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const player = new MusicPlayer();
});
