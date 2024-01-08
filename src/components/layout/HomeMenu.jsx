"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";

const HomeMenu = () => {
  const [bestSellers, setBestSellers] = useState();

  //fetching bestsellers
  useEffect(() => {
    fetch("/api/menu-items").then((response) => {
      response.json().then((data) => {
        const bestSellers = data.slice(-3);
        setBestSellers(bestSellers);
      });
    });
  }, []);

  return (
    <section>
      <div className="text-center mb-4">
        <h3 className="uppercase  text-gray-600 font-semibold text-xl">
          Check out
        </h3>
        <h2 className="text-primary italic text-4xl font-semibold">
          Our Best Sellers
        </h2>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
        {bestSellers?.length > 0 &&
          bestSellers.map((item) => <MenuItem key={item._id} {...item} />)}
      </div>
    </section>
  );
};

export default HomeMenu;
