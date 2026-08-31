import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie'

import {Oval} from 'react-loader-spinner'
import {FaStar, FaRupeeSign} from 'react-icons/fa'
import {BsPlus} from 'react-icons/bs'
import {HiOutlineMinusSm} from 'react-icons/hi'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const RestaurantDetails = () => {
  const {id} = useParams()

  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(true)

  const [cartList, setCartList] = useState(() => {
    const savedCart = localStorage.getItem('cartData')

    return savedCart ? JSON.parse(savedCart) : []
  })

  useEffect(() => {
    localStorage.setItem(
      'cartData',
      JSON.stringify(cartList),
    )
  }, [cartList])

  useEffect(() => {
    const getRestaurantDetails = async () => {
      const token = Cookies.get('jwt_token')

      try {
        const response = await fetch(
          `https://apis.ccbp.in/restaurants-list/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        const data = await response.json()

        if (response.ok) {
          const updatedData = {
            id: data.id,
            name: data.name,
            imageUrl: data.image_url,
            cuisine: data.cuisine,
            location: data.location,
            rating: data.rating,
            reviewsCount: data.reviews_count,
            costForTwo: data.cost_for_two,
            foodItems: data.food_items.map(each => ({
              id: each.id,
              name: each.name,
              cost: each.cost,
              imageUrl: each.image_url,
              rating: each.rating,
            })),
          }

          setDetails(updatedData)
        }
      } catch (error) {
        console.log(error)
      }

      setLoading(false)
    }

    getRestaurantDetails()
  }, [id])

  const getItemQuantity = itemId => {
    const item = cartList.find(
      each => each.id === itemId,
    )

    return item ? item.quantity : 0
  }

  const handleAdd = item => {
    const newItem = {
      cost: item.cost,
      quantity: 1,
      id: item.id,
      imageUrl: item.imageUrl,
      name: item.name,
    }

    setCartList(prev => [...prev, newItem])
  }

  const handleIncrement = itemId => {
    setCartList(prev =>
      prev.map(item =>
        item.id === itemId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    )
  }

  const handleDecrement = itemId => {
    setCartList(prev =>
      prev
        .map(item =>
          item.id === itemId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter(item => item.quantity > 0),
    )
  }

  if (loading) {
    return (
      <>
        <Header />

        <div
          data-testid="restaurant-details-loader"
          className="loader-container"
        >
          <Oval
            color="gold"
            height={40}
            width={50}
          />
        </div>

        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />

      <div className="restaurant-details-container">
        <div className="banner-container">
          <img
            src={details.imageUrl}
            alt="restaurant"
            className="banner-img"
          />

          <div className="banner-info">
            <h1>{details.name}</h1>
            <p>{details.cuisine}</p>
            <p>{details.location}</p>

            <div className="ratings-cost-container">
              <div>
                <p>
                  <FaStar /> {details.rating}
                </p>

                <p>
                  {details.reviewsCount}+ Ratings
                </p>
              </div>

              <div>
                <p>
                  <FaRupeeSign /> {details.costForTwo}
                </p>

                <p>Cost for two</p>
              </div>
            </div>
          </div>
        </div>

        <ul className="food-items-list">
          {details.foodItems.map(item => {
            const quantity = getItemQuantity(item.id)

            return (
              <li
                key={item.id}
                data-testid="foodItem"
                className="food-item"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="food-img"
                />

                <div className="food-info">
                  <h2>{item.name}</h2>

                  <p>
                    <FaRupeeSign /> {item.cost}
                  </p>

                  <p>
                    <FaStar /> {item.rating}
                  </p>

                  {quantity === 0 ? (
                    <button
                      type="button"
                      className="add-btn"
                      onClick={() =>
                        handleAdd(item)
                      }
                    >
                      ADD
                    </button>
                  ) : (
                    <div className="quantity-controller">
                      <button
                        type="button"
                        data-testid="decrement-count"
                        onClick={() =>
                          handleDecrement(item.id)
                        }
                      >
                        <HiOutlineMinusSm />
                      </button>

                      <span data-testid="active-count">
                        {quantity}
                      </span>

                      <button
                        type="button"
                        data-testid="increment-count"
                        onClick={() =>
                          handleIncrement(item.id)
                        }
                      >
                        <BsPlus />
                      </button>
                    </div>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <Footer />
    </>
  )
}

export default RestaurantDetails
