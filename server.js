const express = require('express');
var cors = require('cors');

// Initialising stripe client
// Stripe account corresponds to key provided
const stripe = require('stripe')('sk_test_51P2hnDLDKlYtsvc4i76ovyEcNLzUpdjIQCNjAKbwyKLfCIYdaUeBxjd4jyf7FU01plKWJe1qtDs7sB84t5UDNnum00SB27czfz');

const app = express();
app.use(cors());
app.use(express.static("public"));

app.listen(4000, () => console.log("Server started on port 4000"))