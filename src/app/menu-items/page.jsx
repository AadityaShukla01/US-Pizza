"use client";

import { useProfile } from "@/components/getUserProfile";
import Loading from "@/components/layout/Loading";
import UserTabs from "@/components/layout/UserTabs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const MenuItems = () => {
  const { loading, data } = useProfile();
  const [menuItems, setMenuItems] = useState([]);

  //fetching all the menu items always keep it at top
  useEffect(() => {
    fetch("/api/menu-items").then((response) => {
      response.json().then((data) => {
        console.log(data);
        setMenuItems(data);
      });
    });
  }, []);

  if (loading) {
    <Loading />;
  }
  if (!data.admin) {
    return "Not an admin...";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto w-full h-screen">
      <UserTabs admin={true}/>
      <div className="mt-8">
        <Link className="button flex" href={"/menu-items/new"}>
          <span>Create new menu item</span>
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                key={item._id}
                href={"/menu-items/edit/" + item._id}
                className="  dark:bg-slate-700 bg-gray-200 rounded-lg p-4"
              >
                <div className="relative">
                  <Image
                    className="rounded-md"
                    src={item.image}
                    alt={""}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="text-center">{item.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default MenuItems;
