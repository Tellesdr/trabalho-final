// Array de objetos contendo as informações das músicas
// Um array de objetos é uma estrutura de dados que permite armazenar múltiplos itens,
// onde cada item (objeto) possui propriedades com valores específicos
const musicas = [
    {
        titulo: "Bohemian Rhapsody",
        artista: "Queen",
        capaUrl: "https://exemplo.com/capa1.jpg"
    },
    {
        titulo: "Imagine",
        artista: "John Lennon",
        capaUrl: "https://exemplo.com/capa2.jpg"
    },
    {
        titulo: "Garota de Ipanema",
        artista: "Tom Jobim",
        capaUrl: "https://exemplo.com/capa3.jpg"
    },
    // Você pode adicionar mais músicas aqui
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