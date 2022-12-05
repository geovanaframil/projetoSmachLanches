const tableAllOrders = document.querySelector("#tableBody");

const url = "http://localhost:3000";

async function addProductsToOrder(products, type) {
  const headers = new Headers();

  headers.append("content-type", "application/json");

  const initOrder = {
    headers: headers,
    method: "POST",
    body: JSON.stringify({
      id: Math.floor(Math.random() * 999),
      tipo: type,
      produtos: products,
    }),
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

const showOrdersTable = (orders) => {
  let template = "";

  orders.forEach((order) => {
    template += `<tr>`;
    template += `<td>${order.id}</td>`;
    template += `<td>${order.produtos
      .map((product) => `${product.quantidade} - ${product.nome}</br>`)
      .join("")}</td>`;
    template += `<td>${order.tipo}</td>`;
    template += `<td>${order.total}</td>`;
    template += `<td><button class="btnStatus">${order.status}</button></td>`;
    tableAllOrders.innerHTML = template;
  });
};

async function searchAllOrders() {
  const headers = new Headers();

  const response = await fetch(`${url}/pedido/todos`, {
    headers: headers,
    mode: "cors",
  });
  const orders = await response.json();

  showOrdersTable(orders);

  return orders;
}

export { tableAllOrders, addProductsToOrder, deleteOrder, searchAllOrders, showOrdersTable };
