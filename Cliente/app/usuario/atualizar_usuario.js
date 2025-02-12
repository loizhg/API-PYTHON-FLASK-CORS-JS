document.addEventListener("DOMContentLoaded", function () {
    const updateForm = document.getElementById("update-form");
    const voltarButton = document.getElementById("voltar-button");
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const loginInput = document.getElementById("login");
    const senhaInput = document.getElementById("senha");

    // Preencher os campos com os dados da URL
    loginInput.value = urlParams.get("login");

    // Lidar com o envio do formulário
    updateForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const data = {
            login: loginInput.value,
            senha: senhaInput.value
        };

        fetch(`http://localhost:5000/usuarios/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.status === 200) {
                // Atualização bem-sucedida, redirecione para a página de listagem
                window.location.href = "atualizar.html";
            } else {
                console.error("Erro ao atualizar usuário.");
            }
        })
        .catch(error => {
            console.error("Erro ao atualizar usuário:", error);
        });
    });

    // Lidar com o botão "Voltar"
    voltarButton.addEventListener("click", function () {
        window.location.href = "atualizar.html";

    });
});
