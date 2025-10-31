// Função para realizar o cadastro
document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obtém os valores dos campos
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
        alert('As senhas não coincidem');
        return;
    }
    
    // Obtém a lista de usuários existente ou cria uma nova
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Verifica se o usuário já existe
    if (users.some(user => user.username === username)) {
        alert('Este nome de usuário já está em uso');
        return;
    }
    
    // Adiciona o novo usuário
    users.push({
        username: username,
        password: password
    });
    
    // Salva a lista atualizada
    localStorage.setItem('users', JSON.stringify(users));
    
    // Salva o usuário atual
    localStorage.setItem('currentUser', username);
    
    // Redireciona para o questionário
    window.location.href = 'questionario.html';
});