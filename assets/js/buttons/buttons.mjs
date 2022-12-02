import {
  filterOrdersByStatus,
  arrayItemsOrder,
  sum,
  sectionNewOrder,
  sectionRegisterProduct,
  inputSearchProduct,
  menu,
  objectProduct,
  inputProduct,
  inputPrice,
  inputQty,
} from "../../../index.js";
import * as productServer from "../productServers.mjs";

export let newOrder = () => {
  let arrayItemsOrder = [];
  let sum = 0;
  sectionNewOrder.setAttribute("class", "inactive");
  sectionRegisterProduct.setAttribute("class", "active main");
};

export let valueInputSearch = () => {
  let valueInputSearchProduct = inputSearchProduct.value;

  if (valueInputSearchProduct) {
    const productFound = productServer.serachProductById(
      valueInputSearchProduct
    );
    if (productFound !== undefined) {
      console.log(productFound);
      console.log("oi");
    }
  } else {
    alert("Código inválido");
  }
};

export let addProduct = () => {
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

export let cancelOrder = () => {
  tableBody.innerHTML = "";
  arrayItemsOrder = [];
  arrayMultiply = [];
  tableBody.setAttribute("class", "inactive");
  trDefaultImage.setAttribute("class", "imageBasket active");
  tableFooter.setAttribute("class", "inactive");
};

export let saveOrder = () => {
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

export let printBtn = () => {
  window.print();
};

export let selectAllCheckbox = () => {
  selectCheckbox();
  let allInputCheckbox = document.querySelectorAll('input[type="checkbox"]');

  for (let i = 0; i < allInputCheckbox.length; i++) {
    allInputCheckbox[i].checked = true;
  }
};

export let deleteOrder = () => {
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
