import { findProduct, getIVA } from "../utils/products.js";

export class Carrito {
  constructor() {
    this.items = [];
    if (localStorage.getItem("cart") !== null) {
      this.items = JSON.parse(localStorage.getItem("cart"));
    }
  }

  store() {
    localStorage.setItem("cart", JSON.stringify(this.items));
  }

  agregarItem(productId, cantidad, callback) {
    const index = this.items.findIndex((p) => p.productId === productId);
    if (index === -1) {
      findProduct(productId, (product) => {
        this.items.push({
          productId: productId,
          cantidad: cantidad,
          precio: product.price,
        });
        this.store();
        callback();
      });
    } else {
      this.items[index].cantidad++;
      this.store();
    }
  }

  quitarItem(id) {
    const index = this.items.findIndex((p) => p.productId === id);

    if (index !== -1) {
      this.items.splice(index, 1);
    }
    this.store();
  }

  getSubtotal() {
    let total = 0;
    this.items.forEach(function (item) {
      total = total + item.precio * item.cantidad;
    });
    return total;
  }

  renderItems() {
    const productosCarrito = $("#productsCartContainer");
    productosCarrito.empty();
    this.items.forEach((item, index) => {
      findProduct(item.productId, (product) => {
        if (product !== null) {
          const element =
            $(`<div style="display: none;" class="productCartContainer">
          <div class="cartImg" style="background-image: url('${product.img}');"></div>
          <div class="cartTextContainer">
            <div class="productCartTextContainer">
              <h2 class="productCartTitle">${product.name}</h2>
              <span class="productCartPrice">$ ${product.price}</span>
            </div>
            <input min="1" class="cartInput" type="number" value="${item.cantidad}" />
            <div class="btn-cartContainer">
              <button class="btn-violet btn-cart">
              Actualizar
              </button>
              <i class="fas fa-trash"></i>
            </div>
            
          </div> 
          </div>`);
          productosCarrito.append(element);
          element.fadeIn(500, () => {
            element.css("background-color", "#fff2df");
          });

          // Escuchar evento del boton Actualizar
          const button = element.find("button");
          button.on("click", () => {
            const cantidad = element.find("input")[0].value;
            this.items[index].cantidad = parseInt(cantidad);
            this.renderTotals();
          });

          // Escuchar evento del boton Borrar
          const deleteButton = element.find("i");
          deleteButton.on("click", () => {
            this.quitarItem(item.productId);
            this.render();
            element.fadeIn(500);
          });
        }
      });
    });
  }

  renderTotals() {
    const subtotalElement = $("#cartSubtotal");
    const subtotal = this.getSubtotal();
    subtotalElement.html(`US$ ${subtotal.toFixed(2)}`);

    const IVAElement = $("#IVA");
    const IVA = getIVA(subtotal);
    IVAElement.html(`US$ ${IVA.toFixed(2)}`);

    const totalElement = $("#cartTotal");
    totalElement.html(`US$ ${(subtotal + IVA).toFixed(2)}`);
  }

  render() {
    this.renderItems();
    this.renderTotals();
  }
}
