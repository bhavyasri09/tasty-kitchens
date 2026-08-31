import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsFilterLeft} from 'react-icons/bs'
import {FaStar} from 'react-icons/fa'
import SliderComponent from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Header from '../Header'
import Footer from '../Footer'
import './index.css'

// Safely resolve Slider for Vite / ES Modules
const Slider = SliderComponent.default || SliderComponent

const sortByOptions = [
  {id: 0, displayText: 'Highest', value: 'Highest'},
  {id: 1, displayText: 'Lowest', value: 'Lowest'},
]

const LIMIT = 9

const sliderSettings = {
  dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 500,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000,
}

const Home = () => {
  const [carouselList, setCarouselList] = useState([])
  const [carouselLoading, setCarouselLoading] = useState(true)

  const [restaurantsList, setRestaurantsList] = useState([])
  const [restaurantsLoading, setRestaurantsLoading] = useState(true)

  const [activePage, setActivePage] = useState(1)
  const [selectedSortBy, setSelectedSortBy] = useState('Lowest')
  const [totalRestaurants, setTotalRestaurants] = useState(0)

  // Get offers
  useEffect(() => {
    const getCarouselImages = async () => {
      setCarouselLoading(true)

      try {
        const token = Cookies.get('jwt_token')

        const response = await fetch(
          'https://apis.ccbp.in/restaurants-list/offers',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        if (response.ok) {
          const data = await response.json()

          const updatedOffers = data.offers.map(each => ({
            id: each.id,
            imageUrl: each.image_url,
          }))

          setCarouselList(updatedOffers)
        }
      } catch (error) {
        console.log(error)
      }

      setCarouselLoading(false)
    }

    getCarouselImages()
  }, [])

  // Get restaurants
  useEffect(() => {
    const getRestaurants = async () => {
      setRestaurantsLoading(true)

      try {
        const token = Cookies.get('jwt_token')

        const offset = (activePage - 1) * LIMIT

        const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${selectedSortBy}`

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()

          const updatedRestaurants = data.restaurants.map(each => ({
            id: each.id,
            name: each.name,
            imageUrl: each.image_url,
            cuisine: each.cuisine,
            userRating: {
              rating: each.user_rating.rating,
              totalReviews: each.user_rating.total_reviews,
            },
          }))

          setRestaurantsList(updatedRestaurants)
          setTotalRestaurants(data.total)
        }
      } catch (error) {
        console.log(error)
      }

      setRestaurantsLoading(false)
    }

    getRestaurants()
  }, [activePage, selectedSortBy])

  const totalPages = Math.ceil(totalRestaurants / LIMIT) || 1

  const onChangeSort = event => {
    setSelectedSortBy(event.target.value)
    setActivePage(1)
  }

  return (
    <>
      <Header />

      <div className="home-container">
        {/* OFFERS CAROUSEL */}
        {carouselLoading ? (
          <div
            data-testid="restaurants-offers-loader"
            className="loader-container"
          >
            <p>Loading offers...</p>
          </div>
        ) : (
          <div className="carousel-container">
            <Slider {...sliderSettings}>
              {carouselList.map(item => (
                <div key={item.id} className="offer-item">
                  <img
                    src={item.imageUrl}
                    alt="offer"
                    className="carousel-image"
                  />
                </div>
              ))}
            </Slider>
          </div>
        )}

        {/* POPULAR RESTAURANTS */}
        <div className="popular-restaurants-container">
          <div className="popular-header-container">
            <div>
              <h1>Popular Restaurants</h1>
              <p>Select Your favourite restaurant number or top categories</p>
            </div>

            <div className="sort-by-container">
              <BsFilterLeft className="sort-icon" />
              <p className="sort-by-text">Sort By</p>
              <select
                value={selectedSortBy}
                onChange={onChangeSort}
                className="sort-select"
              >
                {sortByOptions.map(option => (
                  <option key={option.id} value={option.value}>
                    {option.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <hr className="hr-line" />

          {/* RESTAURANTS */}
          {restaurantsLoading ? (
            <div
              data-testid="restaurants-list-loader"
              className="loader-container"
            >
              <p>Loading restaurants...</p>
            </div>
          ) : (
            <ul className="restaurants-list">
              {restaurantsList.map(restaurant => (
                <li
                  key={restaurant.id}
                  data-testid="restaurant-item"
                  className="restaurant-item"
                >
                  <Link
                    to={`/restaurant/${restaurant.id}`}
                    className="item-link"
                  >
                    <img
                      src={restaurant.imageUrl}
                      alt="restaurant"
                      className="restaurant-image"
                    />

                    <div className="restaurant-info">
                      <h1 className="restaurant-title">{restaurant.name}</h1>
                      <p className="cuisine-text">{restaurant.cuisine}</p>

                      <div className="rating-container">
                        <FaStar className="star-icon" />
                        <p className="rating">{restaurant.userRating.rating}</p>
                        <p className="reviews">
                          ({restaurant.userRating.totalReviews} ratings)
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* PAGINATION */}
          <div className="pagination-container">
            <button
              type="button"
              data-testid="pagination-left-button"
              disabled={activePage === 1}
              onClick={() => setActivePage(prev => Math.max(prev - 1, 1))}
            >
              &lt;
            </button>

            <span data-testid="active-page-number">{activePage}</span>
            <span>of {totalPages}</span>

            <button
              type="button"
              data-testid="pagination-right-button"
              disabled={activePage === totalPages}
              onClick={() =>
                setActivePage(prev => Math.min(prev + 1, totalPages))
              }
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Home