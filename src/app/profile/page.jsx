"use client";

import Loading from "@/components/layout/Loading";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import UserTabs from "@/components/layout/UserTabs";
import UserForm from "@/components/layout/UserForm";
import { useProfile } from "@/components/getUserProfile";

const Profile = () => {
  const session = useSession();
  const { status } = session;
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [saved, setSaved] = useState();
  const { loading, data } = useProfile();

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          // console.log(data);
          setAdmin(data.admin);
          setUser(data);
          setSaved(true);
        });
      });
    }
  }, [session, status]);

  const handleProfileInfo = async (e, data) => {
    e.preventDefault();
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  };

  if (status === "loading" || !saved) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <>
      <div className="h-screen mt-8">
        <h1 className="text-primary text-4xl text-center mb-4">Profile</h1>
        <UserTabs admin={data.admin} />
        <div className="max-w-2xl mx-auto ">
          <UserForm user={user} onSave={handleProfileInfo} />
        </div>
      </div>
    </>
  );
};

export default Profile;
