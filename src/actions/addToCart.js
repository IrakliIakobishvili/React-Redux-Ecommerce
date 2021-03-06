import store from '../store'
import axios from 'axios'
import { fetchCart } from './fetchCart'
/**
 * Create fetchAbout Action
 */
const requestAddToCart = () => {
    return {
        type: 'REQUEST_ADD_TO_CART',
    }
}

const receiveAddToCart = (data) => {
    return {
        type: 'RECEIVE_ADD_TO_CART',
        payload: data,
    }
}

const checkUserOrGuest = (productId) => {
    if (localStorage.getItem('guest') || false) {
        return { id: productId, guestKey: localStorage.getItem('guest') }
    }
}

export const addToCart = (productId) => {
    return dispatch => {
        dispatch(requestAddToCart())
        return axios.post('https://ecommerce-e4289.firebaseio.com/cart.json', checkUserOrGuest(productId))
            .then(response => response)
            .then(json => {
                dispatch(receiveAddToCart(json.data))
                dispatch(fetchCart())
            })
    }
}