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
    preco: parseFloat(inputProductPrice.value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    }),
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
  fetch(`${url}/produto/${product.id}/atualizar`, initProduct)
    .then(async (response) => {
      if (response.ok) {
        answer = await response.json();
        alert("Produto editado com sucesso!");
      } else {
        throw new Error("Desculpe, algo não saiu como esperado");
      }
    })
    .catch((err) => {
      alert(err.message);
    });
};

const deleteProduct = (id) => {
  fetch(`${url}/produto/${id}/deletar`, { method: "POST" })
    .then((response) => {
      if (response.ok) {
        alert("Sucesso");
        return response.json();
      } else {
        throw new Error("Não foi possível deletar o elemento selecionado");
      }
    })
    .catch((err) => {
      alert(err.message);
    });
};

const serachProductById = (id) => {
  //Esse tá funcionando teóricamente, ainda não consegui passar pra rodar junto com a tela
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
    template += `<td>${element.preco}</td>`;
    template += `<td><button class="edit"><img data-index="tr_${index}" src="./assets/img/Icons/pencil.png"/></button><button class="delete"><img data-index="tr_${index}" src="./assets/img/Icons/grayTrash.png"></button></td>`;
    template += `<tr>`;
    idProduct = element.id + 1;
    tableBodyThirdySection.innerHTML = template;
  });
  [...document.querySelectorAll(".edit")].forEach((element) => {
    element.addEventListener("click", editProductForm);
  });
  [...document.querySelectorAll(".delete")].forEach((element) => {
    element.addEventListener("click", btnDeleteProduct);
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

const editProductForm = (button) => {
  let idElement = button.target.dataset.index;
  let trProduct = document.querySelector(`#${idElement}`);
  let tdProducts = trProduct.querySelectorAll("td");
  inputCodProduct.value = tdProducts[0].innerText;
  inputProductName.value = tdProducts[1].innerText;
  inputProductPrice.value = tdProducts[2].innerText;
};

const btnDeleteProduct = (button) => {
  let idElementDelete = button.target.dataset.index;
  let trProduct = document.querySelector(`#${idElementDelete}`);
  let tdProducts = trProduct.querySelectorAll("td");
  let idProduct = tdProducts[0].innerText;
  console.log(idProduct);
  let msg = "Deseja realmente exluir esse produto?";

  if (confirm(msg) == true) {
    deleteProduct(idProduct);
    searchAllProduct();
  }
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
  btnDeleteProduct,
};
