const inputProductName = document.querySelector("#productName");
const inputProductPrice = document.querySelector("#productPrice");
const inputCodProduct = document.querySelector("#productCode");
const btnSaveProduct = document.querySelector("#btnSaveProduct");
const tableBodyThirdySection = document.querySelector(
  ".tableBodyThirdySection"
);
const url = "http://localhost:3000";

let cleanForm = () => {
  inputProductName.value = "";
  inputProductPrice.value = "";
};

const saveProduct = (id) => {
  const product = {
    id: id,
    nome: inputProductName.value,
    preco: inputProductPrice.value,
  };

  const headers = new Headers();

  headers.append("content-type", "application/json");

  const initProduct = {
    headers: headers,
    method: "POST",
    body: JSON.stringify(product),
  };

  fetch(`${url}/produto`, initProduct).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      alert("Erro");
    }
  });

  cleanForm();
  searchAllProduct();
};

const updateProduct = (id) => {
  const product = {
    id: id,
    nome: "Oi",
    preco: 10.5,
  };

  const headers = new Headers();
  headers.append("content-type", "application/json");

  const initUpdateProduct = {
    headers: headers,
    method: "POST",
    body: JSON.stringify(product),
  };

  let answer;
  fetch(`${url}/produto/${product.id}/atualizar`, initUpdateProduct).then(
    (response) => {
      if (response.ok) {
        answer = response.json();
        console.log(answer);
        alert("Sucesso");
      } else {
        alert("Erro");
      }
    }
  );
};

const deleteProduct = (id) => {
  const product = {
    id: id,
    nome: "Oi",
    preco: 10.5,
  };

  const headers = new Headers();
  headers.append("content-type", "application/json");

  const initDeleteProduct = {
    headers: headers,
    method: "POST",
    body: JSON.stringify(product),
  };

  fetch(`${url}/produto/${product.id}/deletar`, initDeleteProduct).then(
    (response) => {
      if (response.ok) {
        alert("Sucesso");
      } else {
        alert("Erro");
      }
    }
  );
};

const serachProductById = (id) => {
  const headers = new Headers();

  const product = {
    id: id,
    nome: "",
    preco: 0,
  };

  fetch(`${url}/produto/${product.id}`)
    .then((response) => {
      return response.json();
    })
    .then((jsonData) => {
      console.log(jsonData);
    });
};

const searchAllProduct = () => {
  let template = "";
  const headers = new Headers();

  fetch(`${url}/produto/todos`, { headers: headers, mode: "cors" })
    .then((response) => {
      return response.json();
    })
    .then((jsonData) => {
      jsonData.forEach((element) => {
        template += `<tr>`;
        template += `<td>${element.id}</td>`;
        template += `<td>${element.nome}</td>`;
        template += `<td>${parseFloat(element.preco).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}</td>`;
        template += `<td><button class="edit"><img src="./assets/img/Icons/pencil.png"></button><button class="delete"><img src="./assets/img/Icons/grayTrash.png"></button></td>`;
        template += `<tr>`;
        tableBodyThirdySection.innerHTML = template;
      });
    });
};

searchAllProduct();

btnSaveProduct.addEventListener("click", saveProduct);

export {
  searchAllProduct,
  updateProduct,
  saveProduct,
  deleteProduct,
  serachProductById,
  inputProductName,
  inputProductPrice,
  url,
};
