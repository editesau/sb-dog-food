import { sortValues } from '../store/slices/sortSlice'
import { USER_STORAGE_KEY } from './storageKeys'

const errorHandler = (errorObj) => {
  switch (errorObj.response?.status) {
    case 401:
    case 400:
    case 404:
      return { status: errorObj.response.status, message: errorObj.response.data.message }
    case undefined:
      return { status: 'Unknown', message: errorObj.message }
    default:
      return { status: errorObj.response?.status || 'Unknown', message: errorObj.response?.data?.message || errorObj.message }
  }
}

const getUserTokenFromLS = () => {
  const userLS = window.localStorage.getItem(USER_STORAGE_KEY)
  if (userLS) return JSON.parse(userLS).token
  return null
}

const getUserGroupFromLS = () => {
  const userLS = window.localStorage.getItem(USER_STORAGE_KEY)
  if (userLS) return JSON.parse(userLS).group
  return null
}
const getDiscountedPrice = (price, discount) => {
  return Math.round(price * ((100 - discount) / 100))
}

const getProductRate = (product) => {
  const rating = product.reviews.length
    ? product.reviews.reduce((sum, rate) => sum + rate.rating, 0) / product.reviews.length : 0
  return rating.toFixed(1)
}

const getProductCreatedTimestamp = (timeString) => {
  const date = new Date(timeString)
  return date.valueOf()
}

const sortProducts = (products, sortValue) => {
  const comparePrice = (productOne, productTwo) => {
    const priceOne = productOne.discount
      ? getDiscountedPrice(productOne.price, productOne.discount) : productOne.price
    const priceTwo = productTwo.discount
      ? getDiscountedPrice(productTwo.price, productTwo.discount) : productTwo.price
    return priceTwo - priceOne
  }
  const compareRating = (productOne, productTwo) => {
    const rateOne = getProductRate(productOne)
    const rateTwo = getProductRate(productTwo)
    return rateTwo - rateOne
  }
  switch (sortValue) {
    case sortValues.PRICE_HIGH:
      products.sort((a, b) => comparePrice(a, b))
      break
    case sortValues.PRICE_LOW:
      products.sort((a, b) => -comparePrice(a, b))
      break
    case sortValues.RATE:
      products.sort((a, b) => compareRating(a, b))
      break
    case sortValues.POPULAR:
      products.sort((a, b) => b.likes.length - a.likes.length)
      break
    case sortValues.DISCOUNT:
      products.sort((a, b) => b.discount - a.discount)
      break
    case sortValues.NEWEST:
      products.sort((a, b) => getProductCreatedTimestamp(b.created_at)
      - getProductCreatedTimestamp(a.created_at))
      break
    default:
      break
  }
}

export {
  errorHandler,
  getDiscountedPrice,
  getProductRate,
  sortProducts,
  getUserTokenFromLS,
  getUserGroupFromLS,
}
