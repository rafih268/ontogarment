const productsArray = queryProductData();

console.log(productsArray);

// SPARQL query retrieving array of items from the ontology
function queryProductData() {
  return new Promise((resolve, reject) => {
    const sparqlQuery = `
            PREFIX ontogarment: <http://www.semanticweb.org/kg/ontogarment#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            Select distinct ?id ?title ?price
            where{
              ?x rdfs:subClassOf <http://purl.org/opdm/garment#Garment> .
              ?garmentInstance rdf:type ?x ;
  	            ontogarment:id ?id ;
  	            ontogarment:title ?title ;
  	            ontogarment:price ?price .
            }
            `;
    const endpointUrl =
      'http://localhost:3001/blazegraph/namespace/ontogarment/sparql';

    const headers = new Headers();
    headers.append('Content-Type', 'application/sparql-query');
    headers.append('Accept', 'application/sparql-results+json');

    fetch(endpointUrl, {
      method: 'POST',
      headers: headers,
      body: sparqlQuery,
    })
      .then((response) => response.json()) // data returned from fetch
      .then((data) => {
        const resultsArray = data.results.bindings;

        const valueArray = resultsArray.map((bindings) => ({
          id: bindings.id.value,
          title: bindings.title.value,
          price: parseFloat(bindings.price.value),
        }));

        resolve(valueArray);
      })
      .catch((error) => {
        console.error('Error querying SPARQL endpoint:', error);
        reject(error);
      });
  });
}

function getProductData(id) {
  let productData = productsArray.find(product => product.id === id);

  if (productData == undefined) {
    console.log("Product data does not exist for ID: " + id);
  }

  return productData;
}


export { productsArray, getProductData, queryProductData };
