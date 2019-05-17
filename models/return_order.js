class ReturnOrder {

  constructor(params, orderResource) {
    this.params = params;
    this.orderResource = orderResource;
  }

  getEmail() {
    return this.params.email || '';
  }

  getOrderNumber() {
    return this.params.orderNumber || '';
  }

  async valid() {
    let order = await this.orderResource.getOrder(this.getOrderNumber());
    let valid = order.validForReturn(this.getEmail(), this.getOrderNumber());

    return valid;
  }
}

module.exports.ReturnOrder = ReturnOrder;
