import { Carrito } from "../classes/Carrito.js";

const carrito = new Carrito();
carrito.render();

const elementos = {
  cantidad: $("#inputCantidad"),
  btnActualizar: $("#btnActualizar"),
  btnAgregar: $("#btnAgregar"),
  total: $("#cartTotal"),
  dropDown: $("#productos"),
};

elementos.btnAgregar.on("click", () => {
  const option = elementos.dropDown.children(":selected")[0];
  carrito.agregarItem(option.value, 1, () => {
    carrito.render();
  });
});
