import React, { Component, Fragment } from 'react';
import ProductDetals from '../ProductDetails';

import './CartItem.css';

class ShoppingCartItem extends Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: false };
  }

  showHideDetails() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  render() {
    const { id, name, price, quantity, description } = this.props.item;

    return (
      <Fragment>
        <div className="shopping__cart__item">
          <div>{name}</div>
          <div>
            <input
              className="shopping__item__count"
              type="number"
              name="quantity"
              min={0}
              max={500}
              maxLength={3}
              onChange={e => this.props.handleInputChange(e, id)}
              value={quantity}
            />
          </div>
          <div className="shopping__item__total">
            {price.currency}{' '}
            {(Number(price.value) * Number(quantity)).toFixed(2)}
          </div>

          <div
            className="remove__btn"
            onClick={() => this.props.removeItem(this.props.item)}
          >
            X
          </div>
          <div
            className="modal__control"
            onClick={() => this.showHideDetails()}
          >
            {this.state.modalOpen ? '-' : '+'}
          </div>
        </div>
        {this.state.modalOpen && (
          <ProductDetals
            details={{ title: name, description }}
            handleClick={() => this.showHideDetails()}
          />
        )}
      </Fragment>
    );
  }
}

export default ShoppingCartItem;
