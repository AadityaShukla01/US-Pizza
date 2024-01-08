"use client";

import AddressInputs from "@/components/layout/AddressInputs";
import { CartContext, cartProductPriceCalculator } from "@/context/AppContext";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const OrdePage = () => {
  const { clearCart } = useContext(CartContext);

  const [order, setOrder] = useState();

  //grabbing the id
  const { id } = useParams();
  // clear cart after successfull order
  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
      }
    }

    if (id) {
      fetch("/api/orders?_id=" + id).then((response) => {
        response.json().then((data) => {
          setOrder(data);
        });
      });
    }
    console.log(order);
  }, []);


  let subTotal = 0;
  if (order?.cartProducts) {
    for(const item of order?.cartProducts){
      subTotal += cartProductPriceCalculator(item);
    }
  }
  return (
    <div className="max-w-2xl">
      <h1 className="text-4xl text-primary text-center italic font-semibold mt-8">
        Your order
      </h1>
      <div className="my-8">
        <p className="text-center">Thanks for your order</p>
        <p className="text-center">
          We will call you when your order will be on the way!
        </p>
      </div>
      {order && (
        <div className="grid md:grid-cols-2 md:gap-16">
          <div className="">
            {order.cartProducts.map((item)=>(
                <div className="flex gap-4 mb-4 py-4 items-center border-b dark:border-gray-600">
                <div className="max-w-24">
                  <Image
                    width={240}
                    height={240}
                    src={item.image}
                    alt="Image"
                  />
                </div>
                <div className="grow">
                  <h3>{item.name}</h3>
                  {item.size && (
                    <div className="text-sm font-semibold">
                      <span>Size: {item.size.name}</span>
                    </div>
                  )}
                  {item.extras?.length > 0 && (
                    <div className="text-sm dark:text-gray-400 text-gray-700">
                      <span className="flex">
                        {item.extras.map((extra) => (
                          <div>
                            Extra: {extra.name} ₹{extra.price}
                          </div>
                        ))}
                      </span>
                    </div>
                  )}
                </div>
                <div>₹{cartProductPriceCalculator(item)}</div>
                
              </div>
            
            ))}
             <div className="py-4 text-right">
            SubTotal:
            <span className="ml-2 text-lg font-semibold item">₹{subTotal}</span>
            <br />
            Delivery fee:
            <span className="ml-2 text-lg font-semibold item">₹5</span>
            <br />
           
            Total:
            <span className="ml-2 text-lg font-semibold item">₹{subTotal + 5}</span>
          </div>
          </div>
          <div>
          <div className="bg-gray-200 p-4 rounded-lg mb-8">
            <AddressInputs disabled={true} addressProps={...order}/>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdePage;
