export class Product {
  constructor({ name, price, sold, img, id }) {
    this.name = name;
    this.price = price;
    this.sold = sold;
    this.img = img;
    this.id = id;
  }

  render(parent) {
    const product = $(`<div class="product wow animate__fadeIn">
    <img src="${this.img}" alt="${this.name}" />
    <div class="productIcons">
      <a href="#"><i class="fas fa-shopping-bag"></i></a>
      <a href="#"><i class="fas fa-eye"></i></a>
      <a href="#"><i class="fas fa-heart"></i></a>
      <a href="#"><i class="fas fa-share"></i></a>
    </div>
    <a class="btn-violet btn" href="../productos/producto.html?id=${this.id}"
      >Ver producto</a
    >
    <span class="productPrice">U$S ${this.price}</span>
    <h4>${this.name}</h4>
    <div class="solds">
      <div></div>
      <div></div>
    </div>
    <span>sold: ${this.sold}</span>
    </div>`);
    parent.append(product);
  }
}
