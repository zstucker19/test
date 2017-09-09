import React, { Component } from 'react';
import Checkout from './Checkout';

class CheckoutApp extends Component {
  render() {
    return (
      <div className="CheckoutApp">
        <p className="App-intro">
          <Checkout
            name={'Make Payment'}
            description={'...'}
            amount={1}
          />
        </p>
      </div>
    );
  }
}

export default CheckoutApp;

