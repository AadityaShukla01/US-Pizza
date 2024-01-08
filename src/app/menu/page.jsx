"use client";

import React, { useEffect, useState } from "react";
import MenuItems from "../menu-items/page";
import MenuItem from "@/components/layout/MenuItem";
const Menu = () => {
  const [category, setCategory] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => setCategory(categories));
    });
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => setMenuItems(menuItems));
    });
  }, []);

  return (
    <div className="mt-8">
      {category?.length > 0 &&
        category.map((c) => (
          <div>
            <div className="text-center text-primary text-4xl italic font-semibold">
              {c.name}
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
              {menuItems
                .filter((item) => item.category === c._id)
                .map((item) => (
                  <MenuItem key={item._id} {...item} />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Menu;
