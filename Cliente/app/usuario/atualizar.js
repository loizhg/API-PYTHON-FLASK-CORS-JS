document.addEventListener("DOMContentLoaded", function () {
    const apiDataList = document.getElementById("api-data");

    // Função para buscar e exibir os dados da API
    function fetchData() {
        fetch("http://localhost:5000/usuarios") // Substitua pela URL da sua API Flask
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao buscar dados da API.");
                }
                return response.json();
            })
            .then((data) => {
                data.forEach((usuario) => {
                    const newRow = document.createElement("tr");
                    newRow.innerHTML = `
                        <td>${usuario.id}</td>
                        <td>${usuario.login}</td>
                        <td><button data-id="${usuario.id}" data-login="${usuario.login}" class="modify-button">Modificar</button></td>
                    `;
                    apiDataList.appendChild(newRow);
                });

                // Adicionar evento de clique para cada botão "Modificar"
                const modifyButtons = document.querySelectorAll(".modify-button");
                modifyButtons.forEach((button) => {
                    button.addEventListener("click", function () {
                        const id = button.getAttribute("data-id");
                        const login = button.getAttribute("data-login");
                        modifyUser(id, login);
                    });
                });
            })
            .catch((error) => {
                console.error("Erro ao buscar dados da API:", error);
            });
    }

    // Função para redirecionar para a página de modificação com ID e Login
    function modifyUser(id, login) {
        window.location.href = `atualizar_usuario.html?id=${id}&login=${login}`;
    }

    fetchData(); // Chame a função para buscar os dados ao carregar a página
});
