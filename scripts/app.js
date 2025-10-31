// Base de dados de músicas (simulada)
const musicasDB = {
    rock: [
        { titulo: "Bohemian Rhapsody", artista: "Queen", capa: "capas/queen.jpg" },
        { titulo: "Sweet Child O' Mine", artista: "Guns N' Roses", capa: "capas/guns.jpg" }
    ],
    pop: [
        { titulo: "Bad Guy", artista: "Billie Eilish", capa: "capas/billie.jpg" },
        { titulo: "Shape of You", artista: "Ed Sheeran", capa: "capas/ed.jpg" }
    ],
    mpb: [
        { titulo: "Garota de Ipanema", artista: "Tom Jobim", capa: "capas/tom.jpg" },
        { titulo: "O Leãozinho", artista: "Caetano Veloso", capa: "capas/caetano.jpg" }
    ],
    // Adicione mais estilos e músicas conforme necessário
};

// Função para carregar recomendações baseadas nas preferências do usuário
function carregarRecomendacoes() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    const preferences = JSON.parse(localStorage.getItem('userPreferences')) || {};
    const estilosPreferidos = preferences[currentUser] || [];
    
    const recomendacoesDiv = document.getElementById('recomendacoes');
    const musicasRecomendadas = [];
    
    // Coleta todas as músicas recomendadas
    estilosPreferidos.forEach(estilo => {
        const musicas = musicasDB[estilo] || [];
        musicasRecomendadas.push(...musicas);
    });
    
    // Renderiza os discos de vinil
    renderizarVinis(musicasRecomendadas, recomendacoesDiv);
}

// Função para criar um disco de vinil
function criarDiscoVinil(musica) {
    const card = document.createElement('div');
    card.className = 'vinil-card';
    
    card.innerHTML = `
        <div class="vinil">
            <div class="vinil-capa">
                <img src="${musica.capa}" alt="Capa do álbum ${musica.titulo}">
            </div>
        </div>
        <div class="vinil-info">
            <h3>${musica.titulo}</h3>
            <p>${musica.artista}</p>
            <button onclick="salvarNaPlaylist('${musica.titulo}')" class="btn">
                Adicionar à Playlist
            </button>
        </div>
    `;
    
    return card;
}

// Função para renderizar os discos de vinil
function renderizarVinis(musicas, containerElement) {
    // Limpa o container
    containerElement.innerHTML = '';
    
    // Adiciona a classe container dos vinis
    containerElement.className = 'vinil-container';
    
    // Cria e adiciona cada disco de vinil
    musicas.forEach(musica => {
        const disco = criarDiscoVinil(musica);
        containerElement.appendChild(disco);
    });
}

// Função para salvar música na playlist
function salvarNaPlaylist(tituloMusica) {
    const currentUser = localStorage.getItem('currentUser');
    const playlists = JSON.parse(localStorage.getItem('playlists')) || {};
    
    if (!playlists[currentUser]) {
        playlists[currentUser] = [];
    }
    
    // Evita duplicatas
    if (!playlists[currentUser].includes(tituloMusica)) {
        playlists[currentUser].push(tituloMusica);
        localStorage.setItem('playlists', JSON.stringify(playlists));
        alert('Música adicionada à playlist!');
        carregarPlaylist();
    }
}

// Função para carregar a playlist do usuário
function carregarPlaylist() {
    const currentUser = localStorage.getItem('currentUser');
    const playlists = JSON.parse(localStorage.getItem('playlists')) || {};
    const playlistDiv = document.getElementById('playlist');
    
    playlistDiv.innerHTML = ''; // Limpa playlist anterior
    
    const playlistUsuario = playlists[currentUser] || [];
    
    // Procura as músicas da playlist em toda a base de dados
    playlistUsuario.forEach(tituloMusica => {
        Object.values(musicasDB).forEach(estilo => {
            const musica = estilo.find(m => m.titulo === tituloMusica);
            if (musica) {
                const card = criarCardMusica(musica);
                playlistDiv.appendChild(card);
            }
        });
    });
}

// Função para buscar músicas
function buscarMusicas(termo) {
    const resultados = [];
    
    // Busca em todos os estilos
    Object.values(musicasDB).forEach(estilo => {
        estilo.forEach(musica => {
            if (musica.titulo.toLowerCase().includes(termo.toLowerCase()) ||
                musica.artista.toLowerCase().includes(termo.toLowerCase())) {
                resultados.push(musica);
            }
        });
    });
    
    const recomendacoesDiv = document.getElementById('recomendacoes');
    renderizarVinis(resultados, recomendacoesDiv);
}

// Evento de busca
document.querySelector('.search-bar').addEventListener('input', function(e) {
    const termo = e.target.value;
    if (termo) {
        buscarMusicas(termo);
    } else {
        carregarRecomendacoes();
    }
});

// Carrega as recomendações e playlist quando a página é aberta
document.addEventListener('DOMContentLoaded', () => {
    carregarRecomendacoes();
    carregarPlaylist();
});