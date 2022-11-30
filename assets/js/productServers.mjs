const inputProductName = document.querySelector("#productName");
const inputproductPrice = document.querySelector("#productPrice");
const url = "http://localhost:3000";

const saveProduct = (id, name, price) => {
  const product = {
    id: id,
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

  fetch(`${url}/produto`, initProduct).then((response) => {
    if (response.ok) {
      alert("Sucesso");
      return response.json();
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
  deleteProduct,
  serachProductById,
  inputProductName,
  inputproductPrice,
  url,
};
