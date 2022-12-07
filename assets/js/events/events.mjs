import { newOrder, cancelOrder, addProduct, valueInputSearch, saveOrder, printBtn,  selectAllCheckbox, btnDeleteOrder} from '../buttons/buttons.mjs'
import { filterOrdersByType, filterOrdersByStatus } from '../../../index.js'

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
        document.querySelector(".delete").addEventListener("click", btnDeleteOrder);
}
export default createEvents