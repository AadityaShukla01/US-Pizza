"use client";

import { useProfile } from "@/components/getUserProfile";
import Loading from "@/components/layout/Loading";
import MenuItemform from "@/components/layout/MenuItemform";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewMenuItem = () => {
  const [menuItem, setMenuItem] = useState([]);
  const { loading, data } = useProfile();
  const [canRedirect, setCanRedirect] = useState(false);

  if (loading) {
    return <Loading />;
  }

  if (!data.admin) {
    return "Not an admin...";
  }

  

  const handleFormSubmit = async (e, data) => {
    e.preventDefault();

    data = {
      ...data,
    };

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        resolve();
      } else reject();
    });
    await toast.promise(savingPromise, {
      pending: "Wait.....",
      success: "Creating your new item...",
      error: "Error, sorry...",
    });

    setCanRedirect(true);
  };

  if (canRedirect) {
    return redirect("/menu-items");
  }
  return (
    <div>
      <div className="w-full h-screen mt-8">
        <div className="mx-auto max-w-md">
          <Link href={"/menu-items"} className="button">
            Show all menu items
          </Link>
        </div>
        <MenuItemform onSubmit={handleFormSubmit} menuItem={null} />
        <ToastContainer className="whitespace-nowrap" />
      </div>
    </div>
  );
};

export default NewMenuItem;
