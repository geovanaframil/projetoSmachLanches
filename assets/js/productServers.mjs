const btnSaveNewProduct = document.querySelector("#save");
const inputProductName = document.querySelector("#productName");
const inputproductPrice = document.querySelector("#productPrice");
const url = "http://localhost:3000";

const saveProduct = (cod, name, price) => {
  const product = {
    id: cod,
    nome: name,
    preco: price,
  };

  const headers = new Headers();

  headers.append("content-type", "application/json");

  const initProduct = {
    headers: headers,
    method: "POST",
    body: JSON.stringify(product),
  };

  let answer;
  fetch(`${url}/produto`, initProduct).then((response) => {
    if (response.ok) {
      answer = response.json();
      alert("Sucesso");
    } else {
      alert("Erro");
    }
  });
};

const searchAllProduct = () => {
  const headers = new Headers();

  fetch(`${url}/produto/todos`, { headers: headers, mode: "cors" })
    .then((response) => {
      return response.json();
    })
    .then((jsonData) => {
      jsonData.forEach((element) => {
        console.log(element.id, element.nome, element.preco);
      });
    });
};

export {
  searchAllProduct,
  saveProduct,
  inputProductName,
  inputproductPrice,
  url,
};
