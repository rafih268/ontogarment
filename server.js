const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware')
var cors = require('cors');

const port = 3001

// Initialising stripe client
// Stripe account corresponds to key provided
const stripe = require('stripe')('sk_test_51P2hnDLDKlYtsvc4i76ovyEcNLzUpdjIQCNjAKbwyKLfCIYdaUeBxjd4jyf7FU01plKWJe1qtDs7sB84t5UDNnum00SB27czfz');

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// Blazegraph and Node js have different domains
// CORS issue resolved below
// Allow CORS with preflight
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use('/blazegraph', createProxyMiddleware({
  target: 'http://localhost:8080', // PORT changed accordingly based on where blazegraph is running
  changeOrigin: true,
  pathRewrite: {
    '^/blazegraph': '/blazegraph',
  },
}));

app.post("/checkout", async (req, res) => {
  const items = req.body.items;
  let itemList = [];
  items.forEach((item) => {
    itemList.push(
      {
        price: item.id, // This is how the object is formatted in stripe
        quantity: item.quantity,
      }
    )
  });

  // Initialise stripe checkout session with retrieved list
  const session = await stripe.checkout.sessions.create({
    line_items: itemList,
    mode: 'payment',
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel"
  });

  res.send(JSON.stringify({
    url: session.url,
  }));
});

app.listen(port, () => console.log(`CORS-enabled web proxy running at http://localhost:${port}`));