"use client";

import { useProfile } from "@/components/getUserProfile";
import UserTabs from "@/components/layout/UserTabs";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/orders").then((response) => {
      response.json().then((data) => {
        setOrders(data.reverse());
      });
    });
  }, []);

  const dateCalculator = (date) => {
    return date.replace("T", " ").substring(0, 19);
  };
  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs admin={data.admin} />
      <div className="mt-8">
        {loading && <div>Loading orders...</div>}
        {orders?.length > 0 &&
          orders.map((order) => (
            <div
              key={order._id}
              className="dark:bg-slate-700 bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6"
            >
              <div className="grow flex flex-col md:flex-row items-center gap-6">
                <div>
                  <div
                    className={
                      (order.paid ? "bg-green-500" : "bg-red-400") +
                      " p-2 rounded-md text-white w-24 text-center"
                    }
                  >
                    {order.paid ? "Paid" : "Not paid"}
                  </div>
                </div>
                <div className="grow">
                  <div className="flex gap-2 items-center mb-1">
                    <div className="grow">
                      {order.userEmail}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {dateCalculator(order.createdAt)}
                    </div>
                  </div>
                  <div className="text-gray-500 text-xs">
                    {order.cartProducts.map((p) => p.name).join(", ")}
                  </div>
                </div>
              </div>
              <div className="justify-end flex gap-2 items-center whitespace-nowrap">
                <Link href={"/orders/" + order._id} className="button">
                  Show order
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default OrderPage;
