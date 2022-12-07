import createEvents from "./assets/js/events/events.mjs";
import * as productServers from "./assets/js/productServers.mjs";
import * as orderServices from "./assets/js/orderServices.mjs";
import { showCurrentDate } from './assets/js/date.mjs';

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

export let thirdySection = document.querySelector(".thirdSection");
let btnSectionProdutos = document.querySelector("#btnSectionProducts");

let showOrderSection = () => {
  sectionNewOrder.setAttribute("class", "inactive");
  secondSection.setAttribute("class", "active main secondSection");
  thirdySection.setAttribute("class", "inactive");
};

let exibeSecaoProdutos = () => {
  sectionNewOrder.setAttribute("class", "inactive");
  secondSection.setAttribute("class", "inactive");
  thirdySection.setAttribute("class", "active main thirdSection");
  [...document.querySelectorAll(".edit")].forEach((element) => {
    element.addEventListener("click", productServers.editProductForm);
  });
};

btnSectionProdutos.addEventListener("click", exibeSecaoProdutos);
btnSectionOrders.addEventListener("click", showOrderSection);

export let objectProduct = undefined;
export let arrayOrder = [];
export let filteredByType = [];
export let filteredByStatus = [];

export let total = () => {
  const total = arrayOrder.reduce((current, product) => {
    return current + product.qty * product.price;
  }, 0);
  return total;
};

export let changeStatus = (status) => {
  let statusClass = "";
  switch (status) {
    case "Recebido":
      statusClass = "Pronto";
      break;
    case "Pronto":
      statusClass = "Entregue";
      break;
    default:
      statusClass = "Entregue";
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

showCurrentDate()
createEvents();

window.onload = orderServices.searchAllOrders();
