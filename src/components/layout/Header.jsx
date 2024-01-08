"use client";

import React, { useContext, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ThemeContext } from "@/context/ThemeContext";
import { CartContext } from "@/context/AppContext";
import { FaCartShopping } from "react-icons/fa6";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
const Header = () => {
  const { mode, toggle } = useContext(ThemeContext);
  // console.log(mode);
  const session = useSession();
  // console.log(session);
  const status = session.status;

  const { cartProducts } = useContext(CartContext);
  const [showHamburger, setShowHamburger] = useState(false);

  return (
    <header className="">
      <div className="flex md:hidden justify-between">
        <Link href="/" className="text-primary font-bold text-2xl">
          U.S. PIZZA
        </Link>
        <div className="flex gap-6 items-center">
          <Link href={""} onClick={toggle}>
            {mode === "dark" ? <FaSun /> : <FaMoon />}
          </Link>
          <Link href={"/cart"} className="relative">
            <FaCartShopping />
            <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
              {cartProducts.length}
            </span>
          </Link>
          <button
            className="p-1 border-0"
            onClick={() => setShowHamburger((pre) => !pre)}
          >
            {<RxHamburgerMenu />}
          </button>
        </div>
      </div>
      {showHamburger && (
        <div
          className="md:hidden p-4 dark:bg-slate-700 bg-gray-200 rounded-md my-2 flex flex-col text-center gap-8 text-2xl my-8"
          onClick={() => setShowHamburger(false)}
        >
          <Link href={"/"} className="hover:text-gray-500">
            Home
          </Link>
          <Link href={"/menu"} className="hover:text-gray-500">
            Menu
          </Link>

          {status === "unauthenticated" && (
            <>
              <Link href={"/login"} className="hover:text-gray-500">
                Login
              </Link>
              <Link href={"/register"} className="hover:text-gray-500">
                Register
              </Link>
            </>
          )}
          {status === "authenticated" && (
            <>
              <Link href={"profile"} className="hover:text-gray-500">
                Profile
              </Link>
              <button onClick={() => signOut()}>Logout</button>
            </>
          )}
        </div>
      )}
      <div className="hidden md:flex items-center justify-between">
        <nav className="flex items-center gap-8 font-semibold mt-4 justify-evenly">
          <div className="">
            <Link href="/" className="text-primary font-bold text-2xl">
              U.S. PIZZA
            </Link>
          </div>
          <div className="flex items-center gap-10">
            <Link href={""} onClick={toggle}>
              {mode === "dark" ? <FaSun /> : <FaMoon />}
            </Link>
            <Link href={"/"} className="hover:text-gray-500">
              Home
            </Link>
            <Link href={"/menu"} className="hover:text-gray-500">
              Menu
            </Link>
          </div>
        </nav>
        <nav className="flex items-center gap-4 text-black font-semibold dark:text-white">
          {status === "unauthenticated" && (
            <>
              <Link href={"/login"} className="hover:text-gray-500">
                Login
              </Link>
              <Link href={"/register"} className="hover:text-gray-500">
                Register
              </Link>
            </>
          )}
          {status === "authenticated" && (
            <>
              <Link href={"profile"} className="whitespace-nowra">
                Hi,{" "}
                {(session.data?.user?.name).substring(0, 8) ||
                  session.data?.user?.email}
              </Link>
              <button onClick={() => signOut()}>Logout</button>
            </>
          )}
          <Link href={"/cart"} className="relative text-black dark:text-white">
            <FaCartShopping />
            <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
              {cartProducts.length}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
