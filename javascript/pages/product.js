import { findProduct } from "../utils/products.js";
import { Carrito } from "../classes/Carrito.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");
const carrito = new Carrito();
const addButton = $("#addToCart");
const continueShoppingButton = $("#continueShopping");
const coverProductContainer = $(".coverProduct");

continueShoppingButton.on("click", () => {
  coverProductContainer.css("display", "none");
});

addButton.on("click", () => {
  carrito.agregarItem(productId, 1, () => {});
  coverProductContainer.css("display", "flex");
});

findProduct(productId, (product) => {
  if (product === undefined) {
    $(location).attr("href", "../pages/404.html");
    return;
  }
  renderProduct(product);
});

function renderProduct(product) {
  // Title
  $("#productTitle").text(product.name);
  // Image
  $("#productImg").attr("src", product.img);
  // Language
  renderLanguage(product);
  // Price
  $("#productPrice").text(`US$ ${product.price}`);
  // Video
  renderVideo(product);
  // Description
  renderDescription(product);
  // Details
  renderDetails(product);
}

function renderLanguage(product) {
  const languageContainer = $("#language");
  if (product.languages === undefined) {
    languageContainer.remove();
  } else {
    product.languages.forEach((language) => {
      languageContainer.append(
        `<img src="../assets/img/flags/${language}.png" alt="idioma ${language}">`
      );
    });
  }
}

function renderDescription(product) {
  if (product.description === undefined) {
    $(".descriptionSection").remove();
    return;
  }
  $("#productDescription").text(product.description);
}

function renderVideo(product) {
  if (product.video === undefined) {
    $(".videoSection").remove();
  } else {
    $("#productVideo").attr("src", product.video);
  }
}

function renderDetails(product) {
  const gameDetails = $("#gameDetails");
  if (product.details === undefined) {
    $("#detailsSection").remove();
    return;
  }

  product.details.forEach((detail) => {
    gameDetails.append(`<div class="gameDetails">
    <span>
      ${detail.label}
    </span>
    <span>
      ${detail.text}
    </span>
  </div>`);
  });
}
