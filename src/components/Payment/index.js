import {Component} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const paymentList = [
  {
    id: 'CARD',
    displayText: 'Card',
    isDisabled: true,
  },
  {
    id: 'NET BANKING',
    displayText: 'Net Banking',
    isDisabled: true,
  },
  {
    id: 'UPI',
    displayText: 'UPI',
    isDisabled: true,
  },
  {
    id: 'WALLET',
    displayText: 'Wallet',
    isDisabled: true,
  },
  {
    id: 'CASH ON DELIVERY',
    displayText: 'Cash on Delivery',
    isDisabled: false,
  },
]

class Payment extends Component {
  state = {isOderConfirmed: false, paymentMethod: ''}

  onClickRadio = event => {
    const {id} = event.target
    this.setState({paymentMethod: id})
  }

  confirmOrder = () => {
    const {paymentMethod} = this.state
    if (paymentMethod === paymentList[4].id) {
      this.setState({isOderConfirmed: true})
    }
  }

  renderPaymentOptions = () => (
    <ul className="payment-method-inputs">
      {paymentList.map(eachMethod => (
        <li key={eachMethod.id} className="payment-method-input-container">
          <input
            className="payment-method-input"
            id={eachMethod.id}
            type="radio"
            name="paymentMethod"
            disabled={eachMethod.isDisabled}
            onChange={this.onClickRadio}
          />
          <label
            className={`payment-method-label ${
              eachMethod.isDisabled ? 'disabled' : 'label'
            }`}
            htmlFor={eachMethod.id}
          >
            {eachMethod.displayText}
          </label>
        </li>
      ))}
    </ul>
  )

  render() {
    const {isOderConfirmed, paymentMethod} = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          const quantity = cartList.length
          let total = 0
          cartList.forEach(eachCartItem => {
            total += eachCartItem.price * eachCartItem.quantity
          })
          return (
            <div className="popup-container success-container">
              {isOderConfirmed ? (
                <p className="successful">
                  Your order has been placed successfully
                </p>
              ) : (
                <div className="pay-container">
                  <h1>Payment Details</h1>
                  <p className="heading">Payment Methods</p>

                  {this.renderPaymentOptions()}
                  <div className="order-details">
                    <p className="heading">Order Details</p>
                    <p>Quentity: {quantity}</p>
                    <p>Total Price: Rs {total}</p>
                  </div>
                  <button
                    type="button"
                    onClick={this.confirmOrder}
                    className="confirm-btn"
                    disabled={paymentMethod === ''}
                  >
                    Confirm Order
                  </button>
                </div>
              )}
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Payment
