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
    recomendacoesDiv.innerHTML = ''; // Limpa recomendações anteriores
    
    // Para cada estilo preferido, adiciona músicas recomendadas
    estilosPreferidos.forEach(estilo => {
        const musicas = musicasDB[estilo] || [];
        musicas.forEach(musica => {
            const card = criarCardMusica(musica);
            recomendacoesDiv.appendChild(card);
        });
    });
}

// Função para criar um card de música
function criarCardMusica(musica) {
    const card = document.createElement('div');
    card.className = 'musica-card';
    
    card.innerHTML = `
        <img src="${musica.capa}" alt="Capa do álbum ${musica.titulo}">
        <h3>${musica.titulo}</h3>
        <p>${musica.artista}</p>
        <button onclick="salvarNaPlaylist('${musica.titulo}')" class="btn">
            Adicionar à Playlist
        </button>
    `;
    
    return card;
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
    recomendacoesDiv.innerHTML = ''; // Limpa resultados anteriores
    
    resultados.forEach(musica => {
        const card = criarCardMusica(musica);
        recomendacoesDiv.appendChild(card);
    });
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