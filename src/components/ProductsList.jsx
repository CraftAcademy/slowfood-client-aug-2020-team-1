import React, { Component } from "react";
import { fetchProductData } from "../modules/products";
import { createOrder } from "../modules/orders";

class ProductsList extends Component {
  state = {
    products: [],
    orderDetails: {},
  };

  componentDidMount = async () => {
    const products = await fetchProductData();
    this.setState({ products: products });
  };

  addToOrder = async (event) => {
    let productId = event.target.parentElement.dataset.id;
    let result = createOrder(productId);
    this.setState({
      orderDetails: {
        id: productId,
        message: result.message,
      },
    });
  };

  render() {
    let productsList;

    if (this.state.products !== []) {
      productsList = this.state.products.map((product) => {
        return (
          <div data-cy={"product-" + product.id} key={product.id}>
            <h3 data-cy="name">{product.name}</h3>
            <p data-cy="price">{product.price}</p>
            <p data-cy="description">{product.description}</p>
            {this.props.authenticated && (
              <button onClick={this.addToOrder} data-cy="button">
                Add to order
              </button>
            )}
            {product.id === parseInt(this.state.orderDetails.id) && (
              <p>{this.state.orderDetails.message}</p>
            )}
          </div>
        );
      });
    }

    return (
      <div>
        <h1 data-cy="header">Menu</h1>
        {productsList}
      </div>
    );
  }
}

export default ProductsList;
