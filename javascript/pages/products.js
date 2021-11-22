import { Product } from "../classes/Product.js";

function renderProducts() {
  const productsList = $("#products");
  $.getJSON("../data.json", (products) => {
    products.forEach(function (data) {
      const product = new Product({
        name: data.name,
        price: data.price,
        sold: data.sold,
        img: data.img,
        id: data.id,
      });
      product.render(productsList);
    });
  });
}

renderProducts();
