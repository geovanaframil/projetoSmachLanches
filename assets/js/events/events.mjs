function createEvents(){
        document.querySelector(".newOrder").addEventListener("click", newOrder);
        document.querySelector(".search").addEventListener("click", valueInputSearch);
        document.querySelector("#add").addEventListener("click", addProduct);
        document.querySelector("#cancel").addEventListener("click", cancelOrder);
        document.querySelector("#save").addEventListener("click", saveOrder);
        document.querySelector(".print").addEventListener("click", printBtn);
        document.querySelector("#selectType").addEventListener("change", filterOrdersByType);
        document.querySelector("#selectStatus").addEventListener("change", filterOrdersByStatus);
        document.querySelector("#checkboxHeader").addEventListener("click", selectAllCheckbox);
        document.querySelector(".delete").addEventListener("click", deleteOrder);
        document.querySelector("#btnSectionOrders").addEventListener("click", sectionOrders);
        document.querySelector("#btnSectionProducts").addEventListener("click", sectionProducts);
}

export default createEvents