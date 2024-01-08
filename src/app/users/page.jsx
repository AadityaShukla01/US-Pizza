"use client";

import { useProfile } from "@/components/getUserProfile";
import Loading from "@/components/layout/Loading";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Users = () => {
  //checking if we are admin or not
  const { loading, data } = useProfile();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users").then((response) => {
      response.json().then((data) => {
        setUsers(data);
      });
    });
  }, []);

  if (loading) return <Loading />;

  if (!data.admin) return "Not an admin....";

  return (
    <div className="mx-auto max-w-2xl mt-8">
      <UserTabs admin={true} />
      <div className="mt-8">
        {users.length > 0 &&
          users.map((user) => (
            <div className="dark:bg-slate-700 bg-gray-200 rounded-lg mb-2 p-1 px-4 flex items-center gap-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                <span className="text-gray-500">
                  {user.name || <span className="italic">No name </span>}
                </span>
                <span>{user.email}</span>
              </div>
              <div>
                <Link className="button" href={"/users/" + user._id}>Edit</Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Users;
