import React, { Component } from "react";
import { fetchProductData } from "../modules/products";

class ProductsList extends Component {
  state = {
    products: [],
  };

  componentDidMount = async () => {
    const products = await fetchProductData();
    this.setState({ products: products });
  };

  addToOrder = async (event) => {
    let productId = event.target.parentElement.dataset.id
    let result = createOrder(productId)
    this.setState({orderDetails: {
      id: productId, 
      message: result.data.message,
    }})
  }

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
              <button onClick={this.addToOrder} data-cy="button">Add to order</button>
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
