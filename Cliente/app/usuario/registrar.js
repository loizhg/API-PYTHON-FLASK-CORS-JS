document.addEventListener("DOMContentLoaded", function () {
    const addUserForm = document.getElementById("add-user-form");

    addUserForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const login = document.getElementById("login").value;
        const senha = document.getElementById("senha").value;

        const newUser = {
            login: login,
            senha: senha
        };

        fetch("http://localhost:5000/usuarios", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(response => response.json())
            .then(data => {
                // Lógica de redirecionamento ou exibição de mensagem de sucesso
                window.location.href = "leitura.html"; // Exemplo de redirecionamento
            })
            .catch(error => {
                console.error("Erro ao adicionar usuário:", error);
            });
    });
});
