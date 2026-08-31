import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

import {
  FaRupeeSign,
  FaCheckCircle,
} from 'react-icons/fa'

import {BsPlus} from 'react-icons/bs'
import {HiOutlineMinusSm} from 'react-icons/hi'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const Cart = () => {
  const [cartList, setCartList] = useState(() => {
    const savedCart = localStorage.getItem('cartData')

    return savedCart ? JSON.parse(savedCart) : []
  })

  const [isOrderPlaced, setIsOrderPlaced] =
    useState(false)

  useEffect(() => {
    localStorage.setItem(
      'cartData',
      JSON.stringify(cartList),
    )
  }, [cartList])

  const handleIncrement = id => {
    setCartList(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    )
  }

  const handleDecrement = id => {
    setCartList(prev =>
      prev
        .map(item =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter(item => item.quantity > 0),
    )
  }

  const calculateTotal = () =>
    cartList.reduce(
      (total, item) =>
        total + item.cost * item.quantity,
      0,
    )

  const onPlaceOrder = () => {
    setIsOrderPlaced(true)
    setCartList([])
    localStorage.removeItem('cartData')
  }

  return (
    <>
      <Header />

      <div className="cart-container">
        {isOrderPlaced ? (
          <div className="payment-success-container">
            <FaCheckCircle className="check-icon" />

            <h1>Payment Successful</h1>

            <p>
              Thank you for ordering. Your payment is
              successfully completed.
            </p>

            <Link to="/">
              <button
                type="button"
                className="home-btn"
              >
                Go To Home Page
              </button>
            </Link>
          </div>
        ) : cartList.length === 0 ? (
          <div className="empty-cart-container">
            <img
              src="https://img.magnific.com/premium-vector/supermarket-shopping-cart-concept-illustration_114360-22408.jpg?semt=ais_hybrid&w=740&q=80"
              alt="empty cart"
              className="empty-cart-img"
            />

            <h1>No Orders Yet</h1>

            <p>
              Your cart is empty. Add something from
              the menu.
            </p>

            <Link to="/">
              <button
                type="button"
                className="order-btn"
              >
                Order Now
              </button>
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-headers">
              <p>Item</p>
              <p>Quantity</p>
              <p>Price</p>
            </div>

            <ul className="cart-items-list">
              {cartList.map(item => (
                <li
                  key={item.id}
                  data-testid="cartItem"
                  className="cart-item"
                >
                  <div className="item-info">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="cart-item-img"
                    />

                    <h2 className="cart-item-name">
                      {item.name}
                    </h2>
                  </div>

                  <div className="quantity-container">
                    <button
                      type="button"
                      data-testid="decrement-quantity"
                      onClick={() =>
                        handleDecrement(item.id)
                      }
                    >
                      <HiOutlineMinusSm />
                    </button>

                    <span data-testid="item-quantity">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      data-testid="increment-quantity"
                      onClick={() =>
                        handleIncrement(item.id)
                      }
                    >
                      <BsPlus />
                    </button>
                  </div>

                  <p className="item-total-price">
                    <FaRupeeSign />{' '}
                    {item.cost * item.quantity}
                  </p>
                </li>
              ))}
            </ul>

            <hr />

            <div className="cart-summary-container">
              <h2>Order Total:</h2>

              <p
                data-testid="total-price"
                className="total-price-text"
              >
                <FaRupeeSign /> {calculateTotal()}
              </p>
            </div>

            <button
              type="button"
              className="place-order-btn"
              onClick={onPlaceOrder}
            >
              Place Order
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}

export default Cart

