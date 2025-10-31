// Array de músicas com diferentes estilos
const musicas = [
    // Rock
    {
        titulo: "Bohemian Rhapsody",
        artista: "Queen",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273ce4f1737bc8a646c8c4bd25a",
        estilo: "rock"
    },
    {
        titulo: "Sweet Child O' Mine",
        artista: "Guns N' Roses",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273e44963b8bb127552ac761873",
        estilo: "rock"
    },
    {
        titulo: "Nothing Else Matters",
        artista: "Metallica",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273af07dc851962508661bbcfce",
        estilo: "rock"
    },

    // Pop
    {
        titulo: "Bad Guy",
        artista: "Billie Eilish",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273171d97784e3b2b19d9e899c8",
        estilo: "pop"
    },
    {
        titulo: "Shape of You",
        artista: "Ed Sheeran",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
        estilo: "pop"
    },
    {
        titulo: "As It Was",
        artista: "Harry Styles",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b2732e8ed79e177ff6011076f5f7",
        estilo: "pop"
    },

    // MPB
    {
        titulo: "Garota de Ipanema",
        artista: "Tom Jobim",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b2739d28a2165203f6b4b6c2ee92",
        estilo: "mpb"
    },
    {
        titulo: "O Leãozinho",
        artista: "Caetano Veloso",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273fd3a33fd56d7b5d686456592",
        estilo: "mpb"
    },
    {
        titulo: "Construção",
        artista: "Chico Buarque",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273f71b68c1e0b4a38954522660",
        estilo: "mpb"
    },

    // Rap
    {
        titulo: "Lose Yourself",
        artista: "Eminem",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273f5e077c6d971c75c53aa84f0",
        estilo: "rap"
    },
    {
        titulo: "N.Y. State of Mind",
        artista: "Nas",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273a752a0b8836bb25a23437f32",
        estilo: "rap"
    },
    {
        titulo: "Hey Ya!",
        artista: "OutKast",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273fd1b9f6f80677f8803ddb68c",
        estilo: "rap"
    },

    // Eletrônica
    {
        titulo: "Get Lucky",
        artista: "Daft Punk ft. Pharrell Williams",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273b33d46dfa2635a47eebf63b2",
        estilo: "eletronica"
    },
    {
        titulo: "Strobe",
        artista: "Deadmau5",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273a9b8f46d947e88f6750d2c4d",
        estilo: "eletronica"
    },
    {
        titulo: "Levels",
        artista: "Avicii",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273208fb613c75c88dea55457db",
        estilo: "eletronica"
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
    
    // Filtra as músicas baseado nas preferências do usuário
    const musicasRecomendadas = musicas.filter(musica => 
        estilosPreferidos.includes(musica.estilo)
    );
    
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
    // Busca em todas as músicas
    const resultados = musicas.filter(musica => 
        musica.titulo.toLowerCase().includes(termo.toLowerCase()) ||
        musica.artista.toLowerCase().includes(termo.toLowerCase()) ||
        musica.estilo.toLowerCase().includes(termo.toLowerCase())
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