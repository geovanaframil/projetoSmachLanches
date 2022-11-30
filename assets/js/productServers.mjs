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
        console.log(answer)
        alert("Sucesso");
      } else {
        alert("Erro");
      }
    }
  );
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
  updateProduct,
  saveProduct,
  inputProductName,
  inputproductPrice,
  url,
};
