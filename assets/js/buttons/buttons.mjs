import * as indexJs from "../../../index.js";
import * as orderService from "../orderServices.mjs";
import * as productServer from "../productServers.mjs";

let checkedAll = false;

class OrderItems {
  idProduct;
  productName;
  qty;
  price;

  constructor(idProduct, productName, qty, price) {
    this.idProduct = parseInt(idProduct);
    this.productName = productName;
    this.qty = parseInt(qty);
    this.price = parseInt(price);
  }

  get total() {
    let total = this.qty * this.price;
    return total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
}

const cleanForm = () => {
  indexJs.inputSearchProduct.value = "";
  indexJs.inputProduct.value = "";
  indexJs.inputPrice.value = "";
  indexJs.inputQty.value = "";
};

const cleanArrayOrder = () => {
  for (let i = 0; i < indexJs.arrayOrder.length; i++) {
    indexJs.arrayOrder.pop();
  }
};

const cleanTableOrderProduct = () => {
  indexJs.tableBody.innerHTML = "";
  indexJs.tableFooter.setAttribute("class", "inactive");
  indexJs.tableBody.setAttribute("class", "inactive");
  indexJs.trDefaultImage.setAttribute("class", "imageBasket active");
  indexJs.tableFooter.setAttribute("class", "inactive");
};

export let newOrder = () => {
  cleanArrayOrder();
  cleanTableOrderProduct();
  indexJs.sectionNewOrder.setAttribute("class", "inactive");
  indexJs.thirdySection.setAttribute("class", "inactive");
  indexJs.sectionRegisterProduct.setAttribute("class", "active main");
};

export async function valueInputSearch() {
  let valueInputSearchProduct = indexJs.inputSearchProduct.value;

  if (valueInputSearchProduct == "") {
    alert("Campo de código não pode estar vazio");
  }

  if (valueInputSearchProduct) {
    const productFound = await productServer.serachProductById(
      valueInputSearchProduct
    );
    if (productFound !== undefined) {
      await productServer.showOrdersForm(productFound);
    } else {
      alert("Código inválido!");
    }
  }
  qty.value = 1;
}

export let addProduct = () => {
  const idProduct = indexJs.inputSearchProduct.value;
  const productName = indexJs.inputProduct.value;
  const productPrice = indexJs.inputPrice.value.replace("R$", "");
  const valueInputQty = indexJs.inputQty.value;

  const orderItems = new OrderItems(
    idProduct,
    productName,
    valueInputQty,
    productPrice
  );

  cleanForm();

  if (valueInputQty == "") {
    alert("Digite uma quantidade");
  } else {
    indexJs.arrayOrder.push(orderItems);
    showOrders();
  }
};

const showOrders = () => {
  let template = "";
  indexJs.arrayOrder.forEach((element) => {
    template += "<tr>";
    template += `<td>${element.idProduct}</td>`;
    template += `<td>${element.productName}</td>`;
    template += `<td>${element.qty}</td>`;
    template += `<td>${element.total}</td>`;
  });

  indexJs.tableBody.innerHTML = template;
  indexJs.trDefaultImage.setAttribute("class", "inactive");
  indexJs.tableBody.setAttribute("class", "tableBody");
  indexJs.tableFooter.innerHTML = `Total do pedido: <span>${indexJs
    .total()
    .toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}</span>`;
  indexJs.tableFooter.setAttribute("class", "tableFooter active");
};

export let cancelOrder = () => {
  cleanArrayOrder();
  cleanTableOrderProduct();
};

export async function saveOrder() {
  indexJs.sectionRegisterProduct.setAttribute("class", "inactive");
  indexJs.sectionNewOrder.setAttribute("class", "active main");

  let typeOrder = document.querySelector('input[name="options"]:checked').value;

  const arrayItemsOrder = indexJs.arrayOrder.map((product) => {
    return {
      idProduto: product.idProduct,
      quantidade: product.qty,
    };
  });

  try {
    const order = await orderService.addProductsToOrder(
      arrayItemsOrder,
      typeOrder
    );

    orderService.searchAllOrders();

    alert("O pedido foi recebido!");
  } catch (err) {
    alert(`${err}`);
  }

  cleanArrayOrder();
}

export let printBtn = () => {
  window.print();
};

export let selectAllCheckbox = () => {
  let checkboxes = document.querySelectorAll(
    'input[type="checkbox"]:not([id=checkboxHeader])'
  );

  checkboxes.forEach((item) => {
    item.checked = checkedAll ? false : true;
  });

  checkedAll = checkedAll ? false : true;

  if (checkboxes.length > 0) {
    indexJs.userInteractionSection.setAttribute("class", "inactive");
    indexJs.sectionBtnDelete.setAttribute("class", "active delete");
  }
};

export async function filterOrdersByType() {
  let valueSelectType = selectType.value;

  let orders = await orderService.searchAllOrders();

  let delivery = [];

  if (valueSelectType == "delivery") {
    
  }
}

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

export let btnDeleteOrder = () => {
  let message = "Deseja realmente excluir esse item?";
  let feedBackDelete = "";
  let inputChecked = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );

  inputChecked.forEach((item) => {
    if (item.value != "on") {
      orderService.deleteOrder(item.value).then(() => {
        orderService.searchAllOrders();
      });
    }
  });

  if (inputChecked.length > 1) {
    message = "Deseja realmente excluir esses itens?";
  }

  if (inputChecked.length > 1) {
    feedBackDelete = "Pedidos excluídos com sucesso";
  } else {
    feedBackDelete = "Pedido excluído com sucesso";
  }

  if (confirm(message) == true) {
    alert(feedBackDelete);
  }

  indexJs.userInteractionSection.setAttribute(
    "class",
    "active headerFunctions"
  );
  indexJs.sectionBtnDelete.setAttribute("class", "inactive");
};
