global.td = require('testdouble');

const axios = require('axios');
const expect = require('chai').expect;

const app = require('../../index.js');

const httpClient = axios.create({baseURL: "http://localhost:8080"});

var Order = td.replace('../../models/order').Order;
var OrderResource = td.replace('../../models/order_resource').OrderResource;

describe("POST /returns", function() {
  describe("when processing a return order succeeds", function() {
    it("responds with http status code of 200", async function() {

      var orderResourceDouble = td.constructor(OrderResource)

      td.when(orderResourceDouble.prototype.getOrder(111)).thenResolve(new Order({
        created_at: new Date(),
        email: "bob@test.com",
        order_number: 111,
        shipping_address: {country_code: 'US'}
      }))

      let response = await httpClient.post("/returns", {
        email: "bob@test.com",
        orderNumber: 111
      });

      expect(response.status).to.equal(200);
    });

  });
});
