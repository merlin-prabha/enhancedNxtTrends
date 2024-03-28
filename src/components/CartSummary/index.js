// Write your code here
import Popup from 'reactjs-popup'
import './index.css'
import CartContext from '../../context/CartContext'
import Payment from '../Payment'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(eachCartItem => {
        total += eachCartItem.price * eachCartItem.quantity
      })

      return (
        <div className="cart-summary-container">
          <h1>
            <span>Order Total:</span> Rs {total}{' '}
          </h1>
          <p>{cartList.length} Items in cart</p>
          <Popup
            modal
            trigger={
              <button type="button" className="checkout-button">
                Checkout
              </button>
            }
            position="left center"
          >
            <Payment />
          </Popup>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
