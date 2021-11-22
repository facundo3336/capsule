export function findProduct(id, callback) {
  $.getJSON("../data.json", (products) => {
    const product = products.find(function (p) {
      if (p.id === id) {
        return true;
      }
    });
    callback(product);
  });
}

export function getIVA(monto) {
  return monto * 0.21;
}
