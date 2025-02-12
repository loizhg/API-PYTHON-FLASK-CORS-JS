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
                        <td>
                            <button data-id="${usuario.id}" class="delete-button">Excluir</button>
                        </td>
                    `;
                    apiDataList.appendChild(newRow);
                });

                // Adicionar evento de clique para cada botão "Excluir"
                const deleteButtons = document.querySelectorAll(".delete-button");
                deleteButtons.forEach((button) => {
                    button.addEventListener("click", function () {
                        const id = button.getAttribute("data-id");
                        deleteConfirmation(id);
                    });
                });
            })
            .catch((error) => {
                console.error("Erro ao buscar dados da API:", error);
            });
    }

    // Função para mostrar uma janela de confirmação antes de excluir
    function deleteConfirmation(id) {
        if (confirm(`Deseja excluir o usuário de ID: ${id}?`)) {
            deleteUser(id);
        }
    }

    // Função para excluir o usuário
    function deleteUser(id) {
        fetch(`http://localhost:5000/usuarios/${id}`, {
            method: "DELETE"
        })
            .then((response) => {
                if (response.status === 200) {
                    // Exclusão bem-sucedida, recarregue a página para atualizar a lista
                    location.reload();
                } else {
                    console.error("Erro ao excluir usuário.");
                }
            })
            .catch((error) => {
                console.error("Erro ao excluir usuário:", error);
            });
    }

    fetchData(); // Chame a função para buscar os dados ao carregar a página
});
