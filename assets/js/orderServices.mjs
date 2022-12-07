import * as indexJs from "../../index.js";

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

async function deleteOrder(id) {
  const headers = new Headers();
  headers.append("content-type", "application/json");

  const initDeleteOrder = {
    headers: headers,
    method: "POST",
  };

  let response = await fetch(`${url}/pedido/${id}/deletar`, initDeleteOrder);

  if (response.ok) {
    return await response.json();
  } else {
    return await response.text();
  }
}

const showOrdersTable = (orders) => {
  let template = "";

  orders.forEach((order, index) => {
    template += `<tr>`;
    template += `<td><input type="checkbox" id="${order.id}" value="${order.id}"/>${order.id}</td>`;
    template += `<td>${order.produtos
      .map((product) => `${product.quantidade} - ${product.nome}</br>`)
      .join("")}</td>`;
    template += `<td>${order.tipo}</td>`;
    template += `<td>${order.total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}</td>`;
    template += `<td><button class="btnStatus" data-index="btnStatus_${index}" idOrder="${order.id}" status="${order.status}">${order.status}</button></td>`;
  });
  if (template !== "") {
    tableAllOrders.innerHTML = template;
  } else {
    tableAllOrders.innerHTML = `              <tr class="imageBasket imgBasket-0">
    <td colspan="5">
      <img src="./assets/img/Icons/produtos_cesta_vazia.png" />
      <p class="textOrderTable">Não temos pedidos para mostrar</p>
    </td>`;
  }

  [...document.querySelectorAll(".btnStatus")].forEach((element) => {
    let idOrderAttribute = element.getAttribute("idOrder");
    let statusOrderAttribute = element.getAttribute("status");
    element.addEventListener("click", () => {
      changeStatusOrder(idOrderAttribute, statusOrderAttribute);
    });
  });
};

async function changeStatusOrder(idOrder, status) {
  const headers = new Headers();

  headers.append("content-type", "application/json");

  const initOrder = {
    headers: headers,
    method: "POST",
    body: JSON.stringify({
      status: indexJs.changeStatus(status),
    }),
  };

  let response = await fetch(
    `${url}/pedido/${idOrder}/mudar-status`,
    initOrder
  );

  if (response.ok) {
    searchAllOrders();
  }
}

async function searchAllOrders() {
  const headers = new Headers();

  const response = await fetch(`${url}/pedido/todos`, {
    headers: headers,
    mode: "cors",
  });
  const orders = await response.json();

  showOrdersTable(orders);
  console.log(orders);

  return orders;
}

export {
  tableAllOrders,
  addProductsToOrder,
  deleteOrder,
  searchAllOrders,
  showOrdersTable,
};
