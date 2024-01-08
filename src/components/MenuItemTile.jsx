import React from "react";

const MenuItemTile = ({ onAddToCart, ...item }) => {
  const { image, description, name, basePrice } = item;

  return (
    <div>
      <div className="bg-gray-100 dark:bg-slate-700 p-4 rounded-sm text-center hover:shadow-2xl hover:shadow-black dark:hover:bg-slate-600 transition-all">
        {/* <Image src={"/pizza.png"} /> */}
        <img src="/pizza.png" alt="" />
        <h3 className="font-semibold text-gray-900 dark:text-white my-2">{name}</h3>
        <p className="text-gray-500 dark:text-gray-300 text-sm mb-2 text-center">
          {description.substring(0, 150)}
        </p>
        <button
          className="text-primary p-4 font-semibold"
          onClick={onAddToCart}
        >
          Add to cart ₹{basePrice}
        </button>
      </div>
    </div>
  );
};

export default MenuItemTile;