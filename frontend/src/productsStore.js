const productsArray = [
  {
    id: '1',
    title: 'White Slim T-shirt',
    price: 18.99,
  },
  {
    id: '2',
    title: 'The North Face T-shirt',
    price: 24,
  },
  {
    id: '3',
    title: 'Crew Neck T-Shirt',
    price: 10.95,
  },
];

function getProductData(id) {
  let productData = productsArray.find(product => product.id === id);

  if (productData == undefined) {
    console.log("Product data does not exist for ID: " + id);
  }

  return productData;
}

export { productsArray, getProductData };