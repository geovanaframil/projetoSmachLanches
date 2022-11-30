const url = "http://localhost:3000";

const createNewOrder = () => {
  const order = {
    id: 100004,
    tipo: "delivery",
    produtos: [
      {
        idProduto: 18,
        quantidade: 7,
      },
    ],
  };

  const headers = new Headers();

  headers.append("content-type", "application/json");

  const initOrder = {
    headers: headers,
    method: "POST",
    body: JSON.stringify(order),
  };

  fetch(`${url}/pedido`, initOrder).then((response) => {
    if (response.ok) {
      console.log(response);
      alert("Sucesso");
    } else {
      alert("Erro");
    }
  });
};

const searchAllOrders = () => {
  const headers = new Headers();

  fetch(`${url}/pedido/todos`, { headers: headers, mode: "cors" })
    .then((response) => {
      return response.json();
    })
    .then((jsonData) => {
      jsonData.forEach((element) => {
        console.log(element.id, element.tipo, element.produtos);
      });
    });
};

export { createNewOrder, searchAllOrders };
