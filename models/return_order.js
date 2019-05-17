class ReturnOrder {

  constructor(params, orderResource) {
    this.params = params;
    this.orderResource = orderResource;
  }

  async valid() {
    let order = await this.orderResource.getOrder(this.getOrderNumber());
    let valid = order.validForReturn(this.getEmail(), this.getOrderNumber());

    return valid;
  }
}

module.exports.OrderResource = OrderResource;
