// Array de músicas do BlueBeats
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
    capaUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/..." // deixei resumido
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

// Função para renderizar os cards de música na página
function renderizarMusicas() {
    // Obtém a referência do elemento onde os cards serão inseridos
    const listaDeMusicas = document.getElementById('lista-de-musicas');
    
    // forEach é um método de array que executa uma função para cada elemento do array
    // Neste caso, para cada música no array, criamos um card HTML correspondente
    musicas.forEach(musica => {
        // Cria um novo elemento div para o card
        const card = document.createElement('div');
        card.className = 'musica-card';
        
        // Define o conteúdo HTML do card usando template string
        card.innerHTML = `
            <img src="${musica.capaUrl}" alt="Capa do álbum ${musica.titulo}">
            <h3>${musica.titulo}</h3>
            <p>${musica.artista}</p>
        `;
        
        // Adiciona o card criado à lista de músicas
        listaDeMusicas.appendChild(card);
    });
}

// Chama a função quando a página carregar
document.addEventListener('DOMContentLoaded', renderizarMusicas);