import createEvents from "./assets/js/events/events.mjs";
import * as productServers from "./assets/js/productServers.mjs";

export let menu = [
  {
    code: 1001,
    product: "Super SMACH COMBO Programado – Hambúrguer + Fritas",
    price: 55,
  },
  {
    code: 1002,
    product: "SMACH VariavelBurguer – Hambúrguer com bacon",
    price: 45,
  },
  {
    code: 1003,
    product: "SMACH BUG EM PROD – Hambúrguer meio torto",
    price: 25,
  },
  {
    code: 1004,
    product: "Combo Econômico SMACH Char 1 – Pão com Carne",
    price: 15,
  },
  {
    code: 1005,
    product: "Especial SMACH CSS – Hambúrguer colorido e alinhado",
    price: 65,
  },
  {
    code: 2001,
    product: "Refrigerante 350 ml",
    price: 8,
  },
  {
    code: 2002,
    product: "Água 500 ml",
    price: 5,
  },
  {
    code: 2003,
    product: "Suco 350 ml",
    price: 7,
  },
  {
    code: 3001,
    product: "Sorvete 300 ml",
    price: 15,
  },
  {
    code: 3002,
    product: "Sobremesa doce SMACH ARRAY",
    price: 50,
  },
];

export let sectionNewOrder = document.querySelector(".active");
export let sectionRegisterProduct = document.querySelector(".secondSection");
export let btnNewOrder = document.querySelector(".newOrder");
export let userInteractionSection = document.querySelector(".headerFunctions");
export let selectType = document.querySelector("#selectType");
export let selectStatus = document.querySelector("#selectStatus");
export let btnPrint = document.querySelector(".print");
export let bodyTable = document.querySelector("#tableBody");
export let firstCheckbox = document.querySelector("#checkboxHeader");
export let trImage = document.querySelector(".imgBasket-0");
export let sectionBtnDelete = document.querySelector(".delete");
export let btnDelete = document.querySelector("#btnDelete");

export let inputRadio = document.getElementsByName("options");
export let inputSearchProduct = document.querySelector("#inputSearch");
export let btnSearch = document.querySelector(".search");
export let inputQty = document.querySelector("#qty");
export let inputProduct = document.querySelector("#product");
export let inputPrice = document.querySelector("#price");
export let btnAdd = document.querySelector("#add");
export let tableBody = document.querySelector(".tableBody");
export let tableFooter = document.querySelector(".tableFooter");
export let trDefaultImage = document.querySelector(".imgBasket");
export let btnCancel = document.querySelector("#cancel");
export let btnSave = document.querySelector("#save");

let secondSection = document.querySelector(".secondSection");
let btnSectionOrders = document.querySelector("#btnSectionOrders");

let thirdySection = document.querySelector(".thirdSection");
let btnSectionProdutos = document.querySelector("#btnSectionProducts");

let showOrderSection = () => {
  sectionNewOrder.setAttribute("class", "inactive");
  secondSection.setAttribute("class", "active main secondSection");
};

let exibeSecaoProdutos = () => {
  sectionNewOrder.setAttribute("class", "inactive");
  thirdySection.setAttribute("class", "active main thirdSection");
  [...document.querySelectorAll(".edit")].forEach((element) => {
    element.addEventListener("click", productServers.editProductForm);
  });
  [...document.querySelectorAll(".delete")].forEach((element) => {
    element.addEventListener("click", productServers.btnDeleteProduct);
  });
};

btnSectionProdutos.addEventListener("click", exibeSecaoProdutos);
btnSectionOrders.addEventListener("click", showOrderSection);

export let objectProduct = undefined;
export let arrayOrder = [];
export let arrayMultiply = [];
export let filteredByType = [];
export let filteredByStatus = [];
export let sum = 0;

export let arrayForEach = {};

export let consumptionType = () => {
  for (let i = 0; i < inputRadio.length; i++) {
    if (inputRadio[i].checked) {
      return inputRadio[i].value;
    }
  }
};

export let total = () => {
  const total = arrayOrder.reduce((current, product) => {
    return current + product.qty * product.price;
  }, 0);
  return total;
};

export let cleanForm = () => {
  inputProduct.setAttribute("placeholder", "Nome do produto");
  inputPrice.setAttribute("placeholder", "R$00.00");
  inputSearchProduct.value = "";
  inputQty.value = "";
};

export let showOrders = () => {
  trImage.setAttribute("hidden", "true");
  let template = "";
  arrayOrders.forEach((element) => {
    template += `<tr id='numberOrder_'${element.numberOrder}>`;
    template += `<td><input type="checkbox" onclick="selectCheckbox()"> ${element.numberOrder}</td>`;
    template += "<td>";
    element.items.forEach((item) => {
      template += `${item.qty} - ${item.product} </br>`;
    });
    template += "</td>";
    template += `<td>${element.type}</td>`;
    template += `<td>${element.total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}</td>`;
    template += `<td><button class='btnStatus' onclick="changeStatusButton(${element.numberOrder})">${element.status}</button></td>`;
    template += "</tr>";
  });
  bodyTable.innerHTML = template;

  updateOrderTable();
};

export let changeStatusButton = (orderNumber) => {
  arrayOrders.map((order) => {
    if (order.numberOrder == orderNumber) {
      if (order.status == "Recebido") {
        order.status = "Pronto";
      } else if (order.status == "Pronto") {
        order.status = "Entregue";
      }
    }
    return order;
  });
  updateOrderTable();
};

export let updateOrderTable = (array = arrayOrders) => {
  let trTds = "";
  array.forEach((element) => {
    trTds += `<tr id='numberOrder_'${element.numberOrder}>`;
    trTds += `<td><input type="checkbox" id='checkbox-${element.numberOrder}' class="selectCheckbox"> ${element.numberOrder}</td>`;
    trTds += "<td>";
    element.items.forEach((item) => {
      trTds += `${item.qty} - ${item.product} </br>`;
    });
    trTds += "</td>";
    trTds += `<td>${element.type}</td>`;
    trTds += `<td>${element.total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}</td>`;
    trTds += `<td><button class='btnStatus ${validStatus(
      element.status
    )}' class="changeStatusButton">${element.status}</button></td>`;
    trTds += "</tr>";
    return (arrayForEach = element);
  });

  bodyTable.innerHTML = trTds;
};

export let validStatus = (status) => {
  let statusClass = "";
  switch (status) {
    case "Recebido":
      statusClass = "received";
      break;
    case "Pronto":
      statusClass = "ready";
      break;
    case "Entregue":
      statusClass = "delivered";
      break;
  }
  return statusClass;
};

export let filterOrdersByType = () => {
  let valueSelectType = selectType.value;

  if (valueSelectType == "type") {
    updateOrderTable();
  } else if (valueSelectType == "delivery") {
    filteredByType = arrayOrders.filter(
      (element) => element.type == "Delivery"
    );
    updateOrderTable(filteredByType);
  } else if (valueSelectType == "hall") {
    filteredByType = arrayOrders.filter((element) => element.type == "Salão");
    updateOrderTable(filteredByType);
  }
};

export let filterOrdersByStatus = () => {
  let valueSelectStatus = selectStatus.value;

  if (valueSelectStatus == "status") {
    updateOrderTable();
  } else if (valueSelectStatus == "received") {
    filteredByStatus = arrayOrders.filter(
      (element) => element.status == "Recebido"
    );
    updateOrderTable(filteredByStatus);
  } else if (valueSelectStatus == "ready") {
    filteredByStatus = arrayOrders.filter(
      (element) => element.status == "Pronto"
    );
    updateOrderTable(filteredByStatus);
  } else if (valueSelectStatus == "delivered") {
    filteredByStatus = arrayOrders.filter(
      (element) => element.status == "Entregue"
    );
    updateOrderTable(filteredByStatus);
  }
};

export let selectCheckbox = () => {
  userInteractionSection.setAttribute("class", "inactive");
  sectionBtnDelete.setAttribute("class", "active delete");
};

createEvents();
