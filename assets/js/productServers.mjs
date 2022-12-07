const inputProductName = document.querySelector("#productName");
const inputProductPrice = document.querySelector("#productPrice");
const inputCodProduct = document.querySelector("#productCode");
const btnSaveProduct = document.querySelector("#btnSaveProduct");
const tableBodyThirdySection = document.querySelector(
  ".tableBodyThirdySection"
);
const inputProductNameSecondSection = document.querySelector("#product");
const inputProductPriceSecondSection = document.querySelector("#price");

let idProduct = 1000;

const url = "http://localhost:3000";

//Limpa o formulário assim que clicar no botão Salvar Produto
let cleanForm = () => {
  inputProductName.value = "";
  inputProductPrice.value = "";
};

//Botão salvar produto, recebe o objeto da API com a chave e valor correspondete, faz o fetch com metodo POST na api e teste se o id do produto é diferente da variável idProduct que é atualizada sempre, se for diferente, vai retornar a atualização do produto e se for igual ,vai criar um novo
const saveProduct = () => {
  const product = {
    id: parseInt(inputCodProduct.value),
    nome: inputProductName.value,
    preco: parseFloat(inputProductPrice.value),
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
    searchAllProduct();
  }

  cleanForm();
  searchAllProduct();
};

//Fetch que inclui todo produto novo na api
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

//Fetch que atualiza produto já cadastrado na api
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

//Fetch para deletar produto da api
const deleteProduct = (id) => {
  fetch(`${url}/produto/${id}/deletar`, { method: "POST" })
    .then((response) => {
      if (response.ok) {
        alert("Produto excluído com sucesso");
        return response.json();
      } else {
        throw new Error("Não foi possível deletar o elemento selecionado");
      }
    })
    .catch((err) => {
      alert(err.message);
    });
};

//Esse é teste ainda
async function showOrdersForm(product) {
  product.forEach((element) => {
    inputProductNameSecondSection.value = element.nome;
    inputProductPriceSecondSection.value = element.preco;
  });
}

//Esse tbm é teste
async function serachProductById(id) {
  const headers = new Headers();

  let response = await fetch(`${url}/produto/${id}`, {
    headers: headers,
    mode: "cors",
  });

  if (response.ok) {
    let productsData = await response.json();
    return productsData;
  } else {
    await response.text();
  }
}

//Exibe tabela renderizada no html da terceira seção (seção produto)
const showProductsTable = (products) => {
  let template = "";
  products.forEach((element, index) => {
    template += `<tr id="tr_${index}">`;
    template += `<td data-td="td_id">${element.id}</td>`;
    template += `<td>${element.nome}</td>`;
    template += `<td>${element.preco}</td>`;
    template += `<td><button class="edit"><img data-index="tr_${index}" productId="${index}" src="./assets/img/Icons/pencil.png"/></button><button class="btn-delete"><img data-index="tr_${index}" src="./assets/img/Icons/grayTrash.png"></button></td>`;
    template += `<tr>`;
    idProduct = element.id + 1;
  });

  tableBodyThirdySection.innerHTML = template;
  
  [...document.querySelectorAll(".edit")].forEach((element) => {
    element.addEventListener("click", editProductForm);
  });
  [...document.querySelectorAll(".btn-delete")].forEach((element) => {
    element.addEventListener("click", btnDeleteProduct);
  });
  inputCodProduct.value = idProduct;
};

//Fetch que busca todos os produtos
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

//Botão do editar
const editProductForm = (button) => {
  let idElement = button.target.dataset.index;
  let trProduct = document.querySelector(`#${idElement}`);
  let tdProducts = trProduct.querySelectorAll("td");
  inputCodProduct.value = tdProducts[0].innerText;
  inputProductName.value = tdProducts[1].innerText;
  inputProductPrice.value = tdProducts[2].innerText;
};

//Botão excluir
const btnDeleteProduct = (button) => {
  let idElementDelete = button.target.dataset.index;
  let trProduct = document.querySelector(`#${idElementDelete}`);
  console.log(button);
  if (!trProduct) {
    return;
  }
  let tdProducts = trProduct.querySelectorAll("td");
  let idProduct = tdProducts[0].innerText;
  let msg = "Deseja realmente exluir esse produto?";

  if (confirm(msg) == true) {
    deleteProduct(idProduct);
  }

  searchAllProduct();
};

//Não pode apagar essa chamada, senão devolve um erro
searchAllProduct();

btnSaveProduct.addEventListener("click", saveProduct);

export {
  searchAllProduct,
  updateProduct,
  saveProduct,
  deleteProduct,
  serachProductById,
  inputCodProduct,
  inputProductName,
  inputProductPrice,
  url,
  editProductForm,
  btnDeleteProduct,
  showOrdersForm,
};
