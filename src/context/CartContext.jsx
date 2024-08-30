import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext()

export default function CartContextProvider(props) {
    const [cart, setCart] = useState(0)
    const [userCartId, setUserCartId] = useState(null)
    let headers = {
        token: localStorage.getItem('userToken')
    }

    // getLoggedUserCart
    function getLoggedUserCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {headers})
        .then(({data}) => {           
            return data})
        .catch((error) => error)
    }


    // addToCart
    function addToCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId: productId
        },{headers})
        .then((response) => response)
        .catch((error) => error)
    }


    // deleteSpeceficItem
    function deleteSpeceficItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers})
        .then((response) => response)
        .catch((error) => error)
    }


    // updateCartProductQuantity
    function updateCartProductQuantity(productId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            count: count
        }, {headers})
    }


    // clearCart
    function clearCart() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {headers})
        .then((response) => response)
        .catch((error) => error)
    }


    // checkOut
    function checkOut(cartId ,url ,formValues) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
            {
                shippingAddress: formValues
            }
            , {headers}
        )
        .then((response) => response)
        .catch((error) => error)
    }


    async function getCartCount() {
        let response = await getLoggedUserCart()
        setCart(response.data)
        
    }

    useEffect(() => {
        getCartCount
    }, [])

    return <CartContext.Provider value={{userCartId, setUserCartId, cart, setCart ,checkOut, getLoggedUserCart, clearCart, addToCart, updateCartProductQuantity, deleteSpeceficItem}}>
        {props.children}
    </CartContext.Provider>
} 