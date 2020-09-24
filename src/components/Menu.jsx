import React, { Component } from 'react'
import { getProducts } from '../modules/products'
import { createOrder } from '../modules/orders'


class Menu extends Component {
  state = {
    menu: [],
    orderDetails: {}
  }

  componentDidMount = async () => {
    const products = await getProducts()
    this.setState({ menu: products })
  }

  addToOrder = async (event) => {
    let productId = event.target.parentElement.dataset.id
    let result = await createOrder(productId)
    this.setState({ orderDetails: { id: productId, message: result.message } })
  }

  render() {
    const menu = this.state.menu;
    const authenticted = this.props.authenticted;

    return (
      <>
        { menu.length > 0 && menu.map(item => {
          return (
            <>
              <div data-id={item.id} data-cy={"product-" + item.id} id={"product-" + item.id}>
                <p>{item.name}</p>
                <p>{item.price}</p>
              </div>
            </>
          );
        })}
      </>
    )
  }
}

export default Menu
