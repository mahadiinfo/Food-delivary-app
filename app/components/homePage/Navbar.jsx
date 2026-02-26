"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import logo from "@/public/assets/goFood_logo.png";
import {
  BoxesIcon,
  BoxIcon,
  CircleX,
  Cross,
  LogOut,
  Search,
  SearchAlertIcon,
  SearchIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const Navbar = ({ user }) => {
  const [mobileSearceOpen, setmobileSearceOpen] = useState(false);
  const [openMneu, setopenMneu] = useState(false);
  const openmneubar = useRef();
  const mobileSearchebar = useRef();

useEffect(() => {
    const handler = (e) => {
      if (
        (openmneubar.current && !openmneubar.current.contains(e.target)) &&
        (mobileSearchebar.current && !mobileSearchebar.current.contains(e.target))
      ) {
        setopenMneu(false);
        setmobileSearceOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);


  return (
    <div className="w-[95%] fixed top-4 h-20 left-1/2 -translate-x-1/2  bg-linear-to-r from-green-500 to-green-700 rounded-2xl shadow-lg shadow-black/30 flex justify-between items-center px-4 md:px-8 z-50 ">
      <Link
        href={"/"}
        className="bg-white rounded-full p-3 hover:scale-105 transition-transform duration-300"
      >
        <Image src={logo} alt="logo" width={95} className=" " />
      </Link>
      <form className="hidden md:flex items-center bg-white rounded-full px-4 py-2 max-w-lg shadow-md w-1/2   ">
        <Search className="text-gray-400" />
        <input
          type="text"
          className="outline-none"
          placeholder="Search in Go-Food..."
        />
      </form>

      <div className="flex items-center gap-3 md:gap-6 relative">

        <div ref={mobileSearchebar}>

        <div
          onClick={() => setmobileSearceOpen(prev=>!prev)}
          className="relative md:hidden bg-white rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:scale-105 transition cursor-pointer"
          >
          <Search className="text-green-600 h-6" />
        </div>
          <AnimatePresence>
            {mobileSearceOpen && (
              <motion.div
              
                initial={{
                  opacity: 0,
                  y: -15,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.4,
                }}
                exit={{
                  opacity: 0,
                  y: -15,
                  scale: 0.95,
                }}
                className="bg-green-100/5 border border-green-500 p-2 w-70 fixed  top-23 left-1/2 -translate-x-1/2  rounded-4xl shadow-xl z-40 flex justify-center items-center"
              >
                <SearchIcon className="text-green-600 "/>
                <input type="text" placeholder="Searche in Go-Food..." className="w-full outline-none text-sm  px-1" />
                <CircleX width={30} onClick={() => setmobileSearceOpen((prev) => !prev)} className="text-green-600  pr-1 font-semibold cursor-pointer" />

              </motion.div>
            )}
          </AnimatePresence>
          </div>
        <Link
          href={""}
          className="relative  bg-white rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:scale-105 transition"
        >
          <ShoppingCartIcon
            className="text-green-600 h-6
      w-6 "
          />
          <span className="absolute -right-1 -top-1 bg-[#fc3700] text-xs w-5 h-5 flex justify-center items-center rounded-full text-white shadow font-semibold">
            0
          </span>
        </Link>
        <div className="relative" ref={openmneubar}>
          <div
            onClick={() => setopenMneu((prev) => !prev)}
            className="bg-white rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <Image
              src={user.image || logo}
              alt="logo"
              className="rounded-full "
              width={40}
              height={40}
            />
          </div>
          <AnimatePresence>
            {openMneu && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.4,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  scale: 0.95,
                }}
                className="bg-white border border-gray-300 p-3 w-56 absolute right-0 mt-3 rounded-2xl shadow-xl z-999"
              >
                <div className="flex flex-col justify-center gap-4 items-start">
                  <div className="flex items-center gap-3">
                    <Link
                      href={"/"}
                      className="ring-2 ring-green-500 rounded-full p-0.5 flex justify-center items-center"
                    >
                      <Image
                        src={user.image || logo}
                        alt="logo"
                        className="rounded-full object-cover "
                        width={35}
                        height={35}
                      />
                    </Link>
                    <div className="">
                      <div className="font-semibold mt-2 leading-tight">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500 capitalize leading-none">
                        {user.role}
                      </div>
                    </div>
                  </div>
                  <Link href={"/"} className="flex items-center gap-1 w-full">
                    <div>
                      <BoxesIcon className="text-green-500 w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium">My Order</span>
                  </Link>
                  <Link href={"/"} className="flex items-center gap-1 w-full">
                    <div>
                      <LogOut className="text-red-700 w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium">Log Out</span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
