let menu = [
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

let sectionNewOrder = document.querySelector(".active");
let sectionRegisterProduct = document.querySelector(".secondSection");
let btnNewOrder = document.querySelector(".newOrder");
let userInteractionSection = document.querySelector(".headerFunctions");
let selectType = document.querySelector("#selectType");
let selectStatus = document.querySelector("#selectStatus");
let btnPrint = document.querySelector(".print");
let bodyTable = document.querySelector("#tableBody");
let firstCheckbox = document.querySelector("#checkboxHeader");
let trImage = document.querySelector(".imgBasket-0");
let sectionBtnDelete = document.querySelector(".delete");
let btnDelete = document.querySelector("#btnDelete");

let inputRadio = document.getElementsByName("options");
let inputSearchProduct = document.querySelector("#inputSearch");
let btnSearch = document.querySelector(".search");
let inputQty = document.querySelector("#qty");
let inputProduct = document.querySelector("#product");
let inputPrice = document.querySelector("#price");
let btnAdd = document.querySelector("#add");
let tableBody = document.querySelector(".tableBody");
let tableFooter = document.querySelector(".tableFooter");
let trDefaultImage = document.querySelector(".imgBasket");
let btnCancel = document.querySelector("#cancel");
let btnSave = document.querySelector("#save");

let btnSectionOrders = document.querySelector("#btnSectionOrders");
let btnSectionProducts = document.querySelector("#btnSectionProducts");
let sectionCreateProducts = document.querySelector(".thirdSection");

let objectProduct = undefined;
let arrayMultiply = [];
let arrayItemsOrder = [];
let arrayOrders = [];
let filteredByType = [];
let filteredByStatus = [];
let numberOrder = 10000;
let sum = 0;

let newOrder = () => {
  arrayItemsOrder = [];
  sum = 0;
  sectionNewOrder.setAttribute("class", "inactive");
  sectionRegisterProduct.setAttribute("class", "active main");
};

let sectionOrders = () => {
  sectionNewOrder.setAttribute("class", "active main");
  sectionCreateProducts.setAttribute("class", "inactive");
};

let sectionProducts = () => {
  sectionNewOrder.setAttribute("class", "inactive");
  sectionCreateProducts.setAttribute("class", "active main thirdSection");
};

let consumptionType = () => {
  for (i = 0; i < inputRadio.length; i++) {
    if (inputRadio[i].checked) {
      return inputRadio[i].value;
    }
  }
};

let valueInputSearch = () => {
  let valueInputSearchProduct = inputSearchProduct.value;
  objectProduct = menu.find(
    (product) => product.code == valueInputSearchProduct
  );

  if (objectProduct !== undefined) {
    inputProduct.setAttribute("placeholder", `${objectProduct.product}`);
    inputPrice.setAttribute(
      "placeholder",
      `${objectProduct.price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}`
    );
  } else {
    alert("Código inválido");
  }
};

let addProduct = () => {
  valueInputSearch();
  let valueInputQty = inputQty.value;
  let multiply = valueInputQty * objectProduct.price;
  arrayMultiply.push(multiply);
  sum = total();

  cleanForm();
  arrayItemsOrder.push({
    code: objectProduct.code,
    product: objectProduct.product,
    qty: valueInputQty,
    price: multiply,
  });

  if (valueInputQty == "") {
    alert("Digite uma quantidade");
  } else {
    trDefaultImage.setAttribute("class", "inactive");
    tableBody.innerHTML += `<tr>
    <td>${objectProduct.code}</td>
    <td>${objectProduct.product}</td>
    <td>${valueInputQty}</td>
    <td>${multiply.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}</td>
    </tr>`;
    tableFooter.innerHTML = `TOTAL DO PEDIDO: <span>${sum.toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    )}</span>`;

    tableBody.setAttribute("class", "tableBody");
    tableFooter.setAttribute("class", "tableFooter active");
  }
};

let total = () => {
  return arrayMultiply.reduce((inicial, atual) => inicial + atual, 0);
};

let cleanForm = () => {
  inputProduct.setAttribute("placeholder", "Nome do produto");
  inputPrice.setAttribute("placeholder", "R$00.00");
  inputSearchProduct.value = "";
  inputQty.value = "";
};

let cancelOrder = () => {
  tableBody.innerHTML = "";
  arrayItemsOrder = [];
  arrayMultiply = [];
  tableBody.setAttribute("class", "inactive");
  trDefaultImage.setAttribute("class", "imageBasket active");
  tableFooter.setAttribute("class", "inactive");
};

let saveOrder = () => {
  numberOrder += 1;
  arrayOrders.push({
    numberOrder: numberOrder,
    items: arrayItemsOrder,
    type: consumptionType(),
    total: total(),
    status: "Recebido",
  });

  sectionRegisterProduct.setAttribute("class", "inactive");
  sectionNewOrder.setAttribute("class", "active main");

  showOrders();
  cancelOrder();
};

let showOrders = () => {
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

let changeStatusButton = (orderNumber) => {
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

let updateOrderTable = (array = arrayOrders) => {
  let trTds = "";
  array.forEach((element) => {
    trTds += `<tr id='numberOrder_'${element.numberOrder}>`;
    trTds += `<td><input type="checkbox" id='checkbox-${element.numberOrder}' onclick="selectCheckbox()"> ${element.numberOrder}</td>`;
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
    )}' onclick="changeStatusButton(${element.numberOrder})">${
      element.status
    }</button></td>`;
    trTds += "</tr>";
  });

  bodyTable.innerHTML = trTds;
};

let validStatus = (status) => {
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

let filterOrdersByType = () => {
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

let filterOrdersByStatus = () => {
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

let printBtn = () => {
  window.print();
};

let selectAllCheckbox = () => {
  selectCheckbox();
  let allInputCheckbox = document.querySelectorAll('input[type="checkbox"]');

  for (let i = 0; i < allInputCheckbox.length; i++) {
    allInputCheckbox[i].checked = true;
  }
};

let selectCheckbox = () => {
  userInteractionSection.setAttribute("class", "inactive");
  sectionBtnDelete.setAttribute("class", "active delete");
};

let deleteOrder = () => {
  let message = "Deseja realmente excluir esse item?";
  let feedBackDelete = "";
  let inputChecked = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );

  if (inputChecked.length > 1) {
    message = "Deseja realmente excluir esses itens?";
  }

  if (inputChecked.length > 1) {
    feedBackDelete = "Pedidos excluídos com sucesso";
  } else {
    feedBackDelete = "Pedido excluído com sucesso";
  }

  if (confirm(message) == true) {
    inputChecked.forEach((element) => {
      arrayOrders = arrayOrders.filter(
        (order) => order.numberOrder != element.parentNode.textContent
      );
    });
    alert(feedBackDelete);
    updateOrderTable();
  }

  userInteractionSection.setAttribute("class", "active headerFunctions");
  sectionBtnDelete.setAttribute("class", "inactive");
};

btnNewOrder.addEventListener("click", newOrder);
btnSearch.addEventListener("click", valueInputSearch);
btnAdd.addEventListener("click", addProduct);
btnCancel.addEventListener("click", cancelOrder);
btnSave.addEventListener("click", saveOrder);
btnPrint.addEventListener("click", printBtn);
selectType.addEventListener("change", filterOrdersByType);
selectStatus.addEventListener("change", filterOrdersByStatus);
firstCheckbox.addEventListener("click", selectAllCheckbox);
btnDelete.addEventListener("click", deleteOrder);
btnSectionOrders.addEventListener("click", sectionOrders);
btnSectionProducts.addEventListener("click", sectionProducts);
