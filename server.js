const express = require('express');
var cors = require('cors');

// Initialising stripe client
// Stripe account corresponds to key provided
const stripe = require('stripe')('sk_test_51P2hnDLDKlYtsvc4i76ovyEcNLzUpdjIQCNjAKbwyKLfCIYdaUeBxjd4jyf7FU01plKWJe1qtDs7sB84t5UDNnum00SB27czfz');

const app = express();
app.use(cors());
app.use(express.static("public"));

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
    message: 'Stripe session works!'
  }))
});

app.listen(4000, () => console.log("Server started on port 4000"))