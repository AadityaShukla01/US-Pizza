"use client";

import { useProfile } from "@/components/getUserProfile";
import Loading from "@/components/layout/Loading";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditUserPage = () => {
  const { loading, data } = useProfile();
  const [user, setUser] = useState([]);

  //get id
  const { id } = useParams();

  useEffect(() => {
    fetch("/api/profile?_id=" + id).then((response) => {
      response.json().then((user) => {
        setUser(user);
      });
    });
  }, []);

  async function handleSaveButton(e, data) {
    e.preventDefault();
    const promise = new Promise((resolve, reject) => {
      const res = fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _id: id }),
      });

      if (res.ok) resolve();
      else reject();
    });

    await toast.promise(promise, {
      loading: "Saving user...",
      success: "User saved",
      error: "Error...",
    });
  }

  if (loading) return <Loading />;
  if (!data.admin) {
    return "Not an admin.....";
  }

  return (
    <div className="mt-8 mx-auto max-w-2xl">
      <UserTabs admin={true} />
      <div className="mt-8">
        <UserForm user={user} onSave={handleSaveButton} />
      </div>
    </div>
  );
};

export default EditUserPage;
