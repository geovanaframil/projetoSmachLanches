const inputProductName = document.querySelector("#productName");
const inputProductPrice = document.querySelector("#productPrice");
const inputCodProduct = document.querySelector("#productCode");
const btnSaveProduct = document.querySelector("#btnSaveProduct");
const tableBodyThirdySection = document.querySelector(
  ".tableBodyThirdySection"
);

let idProduct = 1000;

const url = "http://localhost:3000";

let cleanForm = () => {
  inputProductName.value = "";
  inputProductPrice.value = "";
};

const saveProduct = () => {
  const product = {
    id: parseInt(inputCodProduct.value),
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

  if (product.id !== idProduct) {
    updateProduct(product, initProduct);
  } else {
    includeProducts(initProduct);
  }

  console.log(idProduct);
  console.log(inputCodProduct.value);
  cleanForm();
  searchAllProduct();
};

const includeProducts = (initProduct) => {
  fetch(`${url}/produto`, initProduct)
    .then((response) => {
      if (response.ok) {
        alert("Sucesso! Produto cadastrado");
        return response.json();
      } else {
        throw new Error("ERRO! Produto já cadastrado");
      }
    })
    .catch((err) => {
      alert(err.message);
    });
};

const updateProduct = (product, initProduct) => {
  let answer;
  fetch(`${url}/produto/${product.id}/atualizar`, initProduct).then(
    async (response) => {
      if (response.ok) {
        answer = await response.json();
        console.log(answer);
        alert("Sucesso"); // Não exibe mensagem de sucesso nem erro
      } else {
        alert("Erro");
      }
    }
  );
};

const deleteProduct = (id) => {//Não entendi como prosseguir com essa função
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

const serachProductById = (id) => {//Esse tá funcionando teóricamente, ainda não consegui passar pra rodar junto com a tela
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

const showProductsTable = (products) => {
  let template = "";
  products.forEach((element, index) => {
    template += `<tr id="tr_${index}">`;
    template += `<td data-td="td_id">${element.id}</td>`;
    template += `<td>${element.nome}</td>`;
    template += `<td>${parseFloat(element.preco).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}</td>`;
    template += `<td><button class="edit"><img data-index="tr_${index}" src="./assets/img/Icons/pencil.png"/></button><button class="delete" data-index="tr_${index}"><img src="./assets/img/Icons/grayTrash.png"></button></td>`;
    template += `<tr>`;
    idProduct = element.id + 1;
    tableBodyThirdySection.innerHTML = template;
  });
  [...document.querySelectorAll(".edit")].forEach((element) => {
    element.addEventListener("click", editProductForm);
  });
  inputCodProduct.value = idProduct;
};

const searchAllProduct = () => {
  const headers = new Headers();

  fetch(`${url}/produto/todos`, { headers: headers, mode: "cors" })
    .then((response) => {
      return response.json();
    })
    .then((jsonData) => {
      showProductsTable(jsonData);
      inputCodProduct.setAttribute("placeholder", idProduct);
      return idProduct;
    });
};

const editProductForm = (button) => { //Não entendi muito bem o que aconteceu aqui
  let idElement = button.target.dataset.index;
  let trProduct = document.querySelector(`#${idElement}`);
  let tdProducts = trProduct.querySelectorAll("td");
  inputCodProduct.value = tdProducts[0].innerText;
  inputProductName.value = tdProducts[1].innerText;
  inputProductPrice.value = tdProducts[2].innerText;//Retorna um erro de que não pode ser usado parsed, não sei como resolver
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
  editProductForm,
};
