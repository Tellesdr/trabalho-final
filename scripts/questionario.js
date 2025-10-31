// Função para salvar as preferências musicais
document.getElementById('questionarioForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obtém o usuário atual
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }
    
    // Obtém todos os checkboxes marcados
    const estilosSelecionados = Array.from(document.querySelectorAll('input[name="estilo"]:checked'))
        .map(checkbox => checkbox.value);
    
    // Verifica se pelo menos um estilo foi selecionado
    if (estilosSelecionados.length === 0) {
        alert('Por favor, selecione pelo menos um estilo musical');
        return;
    }
    
    // Obtém as preferências existentes ou cria um novo objeto
    const preferences = JSON.parse(localStorage.getItem('userPreferences')) || {};
    
    // Salva as preferências do usuário atual
    preferences[currentUser] = estilosSelecionados;
    
    // Atualiza o localStorage
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    
    // Redireciona para a home
    window.location.href = 'home.html';
});