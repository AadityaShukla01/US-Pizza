"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }
    setCreatingUser(false);
  }
  return (
    <div className="m-8 h-screen">
      <h1 className="text-center text-primary text-4xl m-8">Register</h1>
      {userCreated && (
        <div className="my-4 text-center">
          User created.
          <br />
          Now you can{" "}
          <Link className="underline" href={"/login"}>
            Login &raquo;
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center">
          {error?.message || "An error has occurred."}
          <br />
          Please try again later
        </div>
      )}
      <form
        action=""
        className="text-center max-w-sm mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="email"
            disabled={creatingUser}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="password"
            disabled={creatingUser}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={creatingUser}>
            Submit
          </button>
          <div>Or login with Google</div>
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="flex gap-4 justify-center"
          >
            Login with google
          </button>
          <div>
            Exisiting account? <Link href={"/login"}>Login</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
