"use client"

import { SessionProvider } from "next-auth/react"
import { createContext, useEffect, useState } from "react"
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function cartProductPriceCalculator(cartProduct) {
    let price = cartProduct.basePrice;
    if (cartProduct.size) {
        price += cartProduct.size.price;
    }

    if (cartProduct.extras?.length) {
        for (const extra of cartProduct.extras) {
            price += extra.price;
        }
    }

    return price;
}

export function AppProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([]);

    const ls = typeof window !== 'undefined' ? window.localStorage : null;

    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            setCartProducts(JSON.parse(ls.getItem('cart')));
        }
    }, [])


    function saveCartToLocalStorage(cartProducts) {
        if (ls) {
            ls.setItem('cart', JSON.stringify(cartProducts))
        }
    }

    function clearCart() {
        setCartProducts([]);
        saveCartToLocalStorage([]);
    }

    function removeCartProduct(indexToRemove) {
        setCartProducts(pre => {
            const newCartProducts = pre.filter((v, i) => indexToRemove !== i);
            saveCartToLocalStorage(newCartProducts);
            return newCartProducts;
        })
        toast.success('Item removed from cart!')
    }

    function addToCart(product, size = null, extras = []) {
        setCartProducts((pre) => {
            const cartProduct = { ...product, size, extras };
            const newProducts = [...pre, cartProduct];
            saveCartToLocalStorage(newProducts);
            return newProducts;
        })
    }



    return (
        <SessionProvider>
            <CartContext.Provider value={{ cartProducts, setCartProducts, addToCart, removeCartProduct, clearCart }}>
                {children}
            </CartContext.Provider>
        </SessionProvider>
    )
}

