import axios from "axios";
import Noty from "noty";
let addToCart = document.querySelectorAll(".add-to-cart");

let cartCounter = document.querySelector("#cartCounter");

async function updateCart(pizza) {
  await axios
    .post("/update-cart", pizza)
    .then((res) => {
      console.log(res);
      cartCounter.innerText = res.data.totalQty;
      new Noty({
        type: "success",
        text: "Item Added to Cart",
        timeout: 1000,
        progressBar: false,
        layout: "topRight",
      }).show();
    })
    .catch((err) => {
      new Noty({
        type: "error",
        text: "Something Went Wrong!",
        timeout: 1000,
        progressBar: false,
        layout: "topLeft",
      }).show();
    });
}

addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
  });
});

//Remove Alert Message

const alertMessage = document.querySelector("#success-alert");
if (alertMessage) {
  setTimeout(() => {
    alertMessage.remove();
  }, 1000);
}
