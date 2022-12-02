const url = "http://localhost:3000";


//Não entendi a parte de separar as responsabilidades por função e não comecei a fazer a parte de pedidos
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

export { createNewOrder, deleteOrder, searchAllOrders };
