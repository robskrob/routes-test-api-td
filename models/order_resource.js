class OrderResource {

  constructor(restClient, orderFactory) {
    this.orderFactory = orderFactory;
    this.restClient = restClient;
  }

  async getOrder(orderNumber) {
    console.log("Please don't execute!!!!!!!!!!!");
    let data = await this.restClient.get(`/orders.json?name=${orderNumber}`);

    return new this.orderFactory(data.orders[0]);
  }
}

module.exports.OrderResource = OrderResource;
