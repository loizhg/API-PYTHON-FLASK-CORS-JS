document.addEventListener("DOMContentLoaded", function () {
  const apiDataList = document.getElementById("api-data");

  // Função para buscar e exibir os dados da API
  function fetchData() {
    fetch("http://localhost:5000/usuarios") // Substitua a URL pela URL da sua API Flask
      .then((response) => response.json())
      .then((data) => {
        data.forEach((usuario) => {
          const newRow = document.createElement("tr");
          newRow.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.login}</td>
          `;
          apiDataList.appendChild(newRow);
        });
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da API:", error);
      });
  }

  fetchData(); // Chame a função para buscar os dados ao carregar a página
});
