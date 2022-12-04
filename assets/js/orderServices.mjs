const url = "http://localhost:3000";

async function addProductsToOrder(products, type) {
  const order = {
    id: Math.floor(Math.random() * 999),
    tipo: type,
    produtos: [
      {
        products,
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

  let response = await fetch(`${url}/pedido`, initOrder);

  if (response.ok) {
    let dataOrder = await response.json();
    return dataOrder;
  } else {
    await response.text();
  }
}

const deleteOrder = (id) => {
  const order = {
    id: 100000,
    tipo: "delivery",
    total: 200.5,
    status: "Recebido",
    produtos: [
      {
        idProduto: 10,
        nome: "Pizza",
        quantidade: 7,
        valor: 200.5,
      },
    ],
  };

  const headers = new Headers();
  headers.append("content-type", "application/json");

  const initDeleteOrder = {
    headers: headers,
    method: "POST",
    body: JSON.stringify(order),
  };

  fetch(`${url}/pedido/${order.id}/deletar`, initDeleteOrder).then(
    (response) => {
      if (response.ok) {
        alert("Sucesso");
      } else {
        alert("Erro");
      }
    }
  );
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

export { addProductsToOrder, deleteOrder, searchAllOrders };
