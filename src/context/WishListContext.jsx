import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let WishListContext = createContext()

export default function WishListContextProvider(props) {
    let [like, setLike] = useState(false)
    let [wishList, setWishList] = useState([])
    let headers = {
        token: localStorage.getItem('userToken')
    }

    // getLoggedWishList
    function getLoggedWishList() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {headers})
        .then((response) => {
            // console.log(response)
            return response
        }) 
        .catch((error) => error)
    }


    // addToCart
    function addToWishList(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            productId: productId
        },{headers})
        .then((response) => response)
        .catch((error) => error)
    }


    // deleteSpeceficItem
    function deleteSpeceficItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{headers})
        .then((response) => response)
        .catch((error) => error)
    }




    return <WishListContext.Provider value={{wishList,setWishList,like, setLike,getLoggedWishList, deleteSpeceficItem, addToWishList}}>
        {props.children}
    </WishListContext.Provider>
} 