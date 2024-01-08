"use client";

import { useProfile } from "@/components/getUserProfile";
import AddressInputs from "@/components/layout/AddressInputs";
import { CartContext, cartProductPriceCalculator } from "@/context/AppContext";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";
const CartPage = () => {
  // get all the cart items
  const { cartProducts, removeCartProduct } = useContext(CartContext);

  const [address, setAddress] = useState({});

  const handleAddressChange = (propName, value) => {
    setAddress((preAddress) => {
      return { ...preAddress, [propName]: value };
    });
  };

  const { data: profileData } = useProfile();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("cancelled=1")) {
        toast.error("Payment failed...");
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, postalCode, country } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country,
      };

      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let total = 0;
  for (const p of cartProducts) {
    total += cartProductPriceCalculator(p);
  }

  async function proceedToCheckout(e) {
    e.preventDefault();
    // address and shopping cart products
    const promise = new Promise(async (resolve, reject) => {
      await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        // redirect to stripe
        if (response.ok) {
          resolve();
          const link = await response.json();
          window.location = link;
        } else reject();
      });
    });

    await toast.promise(promise, {
      loading: "Preparing your order",
      success: "Redirecting to payment",
      error: "Something went wrong ..please try again later",
    });
  }

  if (cartProducts?.length === 0) {
    return (
      <section>
        <h1 className="text-center text-4xl text-primary italic mt-8">Cart</h1>
        <p className="text-center my-4">Your shopping cart is empty</p>
      </section>
    );
  }

  return (
    <div className="mt-8">
      <h1 className="text-primary italic text-4xl text-center mb-8 font-semibold">
        Cart
      </h1>
      <div className="grid grid-cols-2 gap-8">
        <div>
          {cartProducts?.length === 0 && (
            <div className="text-center text-primary">Cart is empty...</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((cartProduct, index) => (
              <div className="flex gap-4 mb-4 py-4 items-center border-b dark:border-gray-600">
                <div className="max-w-24">
                  <Image
                    width={240}
                    height={240}
                    src={cartProduct.image}
                    alt="Image"
                  />
                </div>
                <div className="grow">
                  <h3>{cartProduct.name}</h3>
                  {cartProduct.size && (
                    <div className="text-sm font-semibold">
                      <span>Size: {cartProduct.size.name}</span>
                    </div>
                  )}
                  {cartProduct.extras?.length > 0 && (
                    <div className="text-sm dark:text-gray-400 text-gray-700">
                      <span className="flex">
                        {cartProduct.extras.map((extra) => (
                          <div>
                            Extra: {extra.name} ₹{extra.price}
                          </div>
                        ))}
                      </span>
                    </div>
                  )}
                </div>
                <div>₹{cartProductPriceCalculator(cartProduct)}</div>
                <div className="ml-2">
                  <button
                    className="button"
                    onClick={() => removeCartProduct(index)}
                  >
                    {<FaTrash className="cursor-pointer" />}
                  </button>
                </div>
              </div>
            ))}
          <div className="py-4 text-right pr-16">
            Total:
            <span className="text-lg font-semibold pl-2">₹{total}</span>
            <span>+ ₹5 Delivery</span>
          </div>
        </div>
        <div className="bg-gray-200 dark:bg-slate-700 p-4 rounded-md">
          <h2 className="text-center">Checkout</h2>
          <form>
            <AddressInputs
              addressProps={address}
              setAddressProp={handleAddressChange}
            />
            <button
              className="button"
              type="submit"
              onClick={proceedToCheckout}
            >
              Pay ₹{total + 5}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
