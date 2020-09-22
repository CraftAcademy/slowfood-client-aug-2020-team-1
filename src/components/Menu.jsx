import React, { Component } from 'react'
import { getProducts } from '../modules/products'

class Menu extends Component {
  state = {
    menu: []
  }
  
  componentDidMount = async () => {
    const products = await getProducts()
    this.setState({menu: products})
  }

  render() {
    const menu = this.state.menu;
    const authenticted = this.props.authenticted;

    return (
      <>
        { menu.length > 0 && menu.map(item => {
          return (
            <>
              <div data-cy={"product-" + item.id} id={"product-" + item.id}>
                <p>{item.name}</p>
                <p>{item.price}</p>
                { authenticted && <button>Add to order</button>}
              </div>
            </>
          );
        })}
      </>
    )
  }
}

export default Menu
