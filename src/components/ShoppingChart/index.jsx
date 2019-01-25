import React, { Component } from 'react';
import ShoppingCartItem from '../CartItem';
import ShoppingItems from '../../api/ShoppingItems';
import Products from '../../api/Products';

import './ShoppingCart.css';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: Products,
      basket: ShoppingItems,
      subTotal: 0,
      currencyType: '£'
    };
  }

  handleInputChange(e, id) {
    if (e.target.value > 100) return;
    const newList = this.state.basket.map(item => {
      if (item.id === id) {
        item[e.target.name] = Number([e.target.value]);
      }
      return item;
    });
    this.setState({ basket: newList });
  }

  removeItem({ id, name }) {
    const confirmed = window.confirm(
      `Are you sure to remove ${name} from the  shopping cart`
    );
    if (!confirmed) return;
    const newList = this.state.basket.filter(item => item.id !== id);
    this.setState({ basket: newList });
  }
  clearAll() {
    const newList = this.state.basket.map(item => {
      item.quantity = 0;
      return item;
    });
    this.setState({ items: newList });
  }

  calculateTotal() {
    const total = this.state.basket.reduce(
      (sum, { quantity, price: { value } }) => (sum += quantity * value),
      0
    );
    return total;
  }
  render() {
    const BasketList = this.state.basket.map(item => (
      <ShoppingCartItem
        key={item.id}
        item={item}
        removeItem={shoppingItem => this.removeItem(shoppingItem)}
        handleInputChange={(e, id) => this.handleInputChange(e, id)}
      />
    ));
    return (
      <div className="shopping__cart">
        <h3>Shopping Cart</h3>
        {BasketList}
        <div className="shopping__cart__footer">
          <div className="shopping__cart__total">
            {this.state.currencyType} {this.calculateTotal().toFixed(2)}
          </div>
          <div className="shopping__cart__control">
            <span onClick={() => this.clearAll()}>Clear</span>
            <button>Check out &nbsp; &gt;</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
