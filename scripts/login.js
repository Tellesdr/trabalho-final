// Função para validar o login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obtém os valores dos campos
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Obtém os usuários cadastrados
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Procura o usuário
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Salva o usuário atual
        localStorage.setItem('currentUser', username);
        
        // Verifica se o usuário já respondeu ao questionário
        const preferences = JSON.parse(localStorage.getItem('userPreferences')) || {};
        
        // Redireciona para a página apropriada
        if (preferences[username]) {
            window.location.href = 'home.html';
        } else {
            window.location.href = 'questionario.html';
        }
    } else {
        alert('Usuário ou senha incorretos');
    }
});