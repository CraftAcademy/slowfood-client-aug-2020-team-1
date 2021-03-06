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

  render() {
    let productsList;
    if (this.state.products !== []) {
      productsList = this.state.products.map((product) => {
        return (
          <div data-cy={"product-" + product.id} key={product.id}>
            <h3 data-cy="name">{product.name}</h3>
            <p data-cy="price">{product.price}</p>
            <p data-cy="description">{product.description}</p>
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
