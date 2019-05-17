require('./config');

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port    = process.env.PORT;

const RestClient = require('./models/rest_client').RestClient;
const {Order} = require('./models/order');
const {OrderResource} = require('./models/order_resource');
const {ReturnOrder} = require('./models/return_order');

let domainWhiteList = [
];

if (process.env.NODE_ENV === 'development') {
  domainWhiteList.push(`https://localhost:3000`);
  domainWhiteList.push(`https://localhost:8080`);
}

app.use(helmet());

app.use(cors({
  origin: (origin, callback) => {
    if (domainWhiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods:['GET','POST']
}));

app.use(bodyParser.json());

app.post('/returns', async (req, res) => {
  let orderResource = new OrderResource(new RestClient(), Order);

  let returnOrder = new ReturnOrder(req.body, orderResource);

  let valid = await returnOrder.valid();

  if (valid) {
    res.status(200).send({
      message: "Yay."
    });
  } else {
    res.status(422).send({
      message: "Sorry. Not Allowed"
    });
  }
});

app.listen(port, () => console.log(`PatriciaNash Returns app listening on port ${port}!`))

module.exports = app
