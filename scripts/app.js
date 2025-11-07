// Array de músicas
const musicas = [
    {
        titulo: "1&only",
        artista: "Xlov",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b2734cd68f7f2b95459e754ca2d4"
    },
    {
        titulo: "Bizness",
        artista: "Xlov",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b2734cd68f7f2b95459e754ca2d4"
    },
    {
        titulo: "I'mma be",
        artista: "Xlov",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b2738d97f01a923fcdf47b0515a0"
    },
    {
        titulo: "Garota de Ipanema",
        artista: "Tom Jobim",
        capaUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/..."
    },
    {
        titulo: "Rizz",
        artista: "Xlov",
        capaUrl: "https://images.genius.com/44a1cd03b11db58d5864ec6d8573f2fb.1000x1000x1.png"
    },
    {
        titulo: "Fear of Dark",
        artista: "Iron Maiden",
        capaUrl: "https://upload.wikimedia.org/wikipedia/pt/6/64/Fear_of_the_dark_-_iron_maiden.jpg"
    },
    {
        titulo: "Nightmare",
        artista: "Sarcófago",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b2730282f6ac78d80c6c888fb0de"
    }
];

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
    
    // Como não temos mais estilos, vamos mostrar todas as músicas
    const musicasRecomendadas = musicas;
    
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
                <img src="${musica.capaUrl}" alt="Capa do álbum ${musica.titulo}">
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
    
    // Procura as músicas da playlist no array de músicas
    playlistUsuario.forEach(tituloMusica => {
        const musica = musicas.find(m => m.titulo === tituloMusica);
        if (musica) {
            const disco = criarDiscoVinil(musica);
            playlistDiv.appendChild(disco);
        }
    });
}

// Função para buscar músicas
function buscarMusicas(termo) {
    // Busca em todas as músicas
    const resultados = musicas.filter(musica => 
        musica.titulo.toLowerCase().includes(termo.toLowerCase()) ||
        musica.artista.toLowerCase().includes(termo.toLowerCase())
    );
    
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