// ID for each item corresponds to the price ID in our stripe account
const productsArray = [
  {
    id: 'price_1P2j9NLDKlYtsvc4SNdBkslu',
    title: 'White Slim T-shirt',
    price: 18.99,
  },
  {
    id: 'price_1P2jB5LDKlYtsvc4A26szSec',
    title: 'The North Face T-shirt',
    price: 24,
  },
  {
    id: 'price_1P2jXiLDKlYtsvc42A2eitbw',
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