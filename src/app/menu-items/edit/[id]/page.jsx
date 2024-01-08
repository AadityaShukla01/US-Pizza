"use client";

import { useProfile } from "@/components/getUserProfile";
import Loading from "@/components/layout/Loading";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import MenuItemform from "@/components/layout/MenuItemform";
import DeleteButton from "@/components/DeleteButton";

const MenuItemEdit = () => {
  const { loading, data } = useProfile();
  const [canRedirect, setCanRedirect] = useState(false);
  const { id } = useParams();
  const [menuItem, setMenuItem] = useState([]);

  useEffect(() => {
    fetch("/api/menu-items").then((response) => {
      response.json().then((data) => {
        const item = data.find((i) => i._id === id);
        setMenuItem(item);
      });
    });
  }, []);

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
      _id: id,
    };

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
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

  async function deleteHandle(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve();
      } else reject();
    });
    await toast.promise(promise, {
      pending: "Wait.....",
      success: "Deleting...",
      error: "Error, sorry...",
    });

    setCanRedirect(true);
  }

  return (
    <div>
      <div className="w-full h-screen mt-8">
        <div className="mx-auto max-w-md">
          <Link href={"/menu-items"} className="button">
            Show all menu items
          </Link>
        </div>
        <MenuItemform menuItem={menuItem} onSubmit={handleFormSubmit} />
        <div className="mx-auto max-w-xs text-center mt-5 pl-6">
          <DeleteButton label="Delete this menu item" onDelete={deleteHandle} />
        </div>
      </div>
      <ToastContainer className="whitespace-nowrap" />
    </div>
  );
};

export default MenuItemEdit;
