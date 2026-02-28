"use client";
import { BadgePercent, Leaf, ShieldCheck, ShoppingBasket, Smile, Truck } from "lucide-react";
import { AnimatePresence } from "motion/react";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";

const HeroSection = () => {
  const slides = [
    {
      id: 1,
      icon: (
        <Leaf className="w-20 h-20 sm:w-28 sm:h-28 text-green-400 drop-shadow-lg" />
      ),
      title: "Fresh Organic Groceries 🥦",
      subtitle:
        "Farm-fresh fruits, vegetables, and daily essentials delivered to you.",
      btnText: "Shop Now",
      bg: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1740&auto=format&fit=crop",
    },
    {
      id: 2,
      icon: (
        <Truck className="w-20 h-20 sm:w-28 sm:h-28 text-yellow-400 drop-shadow-lg" />
      ),
      title: "Fast & Reliable Delivery 🚚",
      subtitle: "We ensure your groceries reach your doorstep in no time.",
      btnText: "Order Now",
      bg: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1740&auto=format&fit=crop",
    },
    {
      id: 3,
      icon: (
        <ShieldCheck className="w-20 h-20 sm:w-28 sm:h-28 text-blue-400 drop-shadow-lg" />
      ),
      title: "Premium Quality Assured ✅",
      subtitle: "Hand-picked items that meet the highest standards of quality.",
      btnText: "Learn More",
      bg: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?q=80&w=1740&auto=format&fit=crop",
    },
    {
      id: 4,
      icon: (
        <BadgePercent className="w-20 h-20 sm:w-28 sm:h-28 text-red-400 drop-shadow-lg" />
      ),
      title: "Best Prices & Offers 💰",
      subtitle: "Grab the best deals on your favorite household brands.",
      btnText: "View Deals",
      bg: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1740&auto=format&fit=crop",
    },
    {
      id: 5,
      icon: (
        <Smile className="w-20 h-20 sm:w-28 sm:h-28 text-purple-400 drop-shadow-lg" />
      ),
      title: "Happy Customers 🌟",
      subtitle: "Join thousands of satisfied shoppers who trust our service.",
      btnText: "Join Us",
      bg: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=1740&auto=format&fit=crop",
    },
  ];
  const [scrollCurrentValue, setscrollCurrentValue] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setscrollCurrentValue((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="relative mx-auto mt-32 h-[80vh] w-[98%] rounded-3xl overflow-hidden shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={scrollCurrentValue}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[scrollCurrentValue]?.bg}
            fill
            alt="slide"
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-center text-center text-white px-6">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center gap-6 max-w-3xl"
        >
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-full shadow-lg ">{slides[scrollCurrentValue].icon}</div>
          <h1 className="text-3xl sm:text-5xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg  " >{slides[scrollCurrentValue].title }</h1>
          <p className="text-l sm:text-xl text-gray-200 max-w-2xl ">{slides[scrollCurrentValue].subtitle}</p>

          <motion.button 
          whileHover={{scale:1.09}}
          whileTap={{scale:1.96}}
          transition={{duration:0.2}}
          className="mt-4 bg-white text-green-700 hover:bg-green-100 px-8 py-3 flex rounded-full gap-2 font-semibold shadow-lg transition-all duration-300 items-center justify-center ">
            <ShoppingBasket className="w-5 h-5"/>
            {slides[scrollCurrentValue].btnText}
          </motion.button>

        </motion.div>

      </div>

      <div className="absolute bottom-6 left-1/2 -translate-1/2 flex gap-3">
      {slides.map((item, index ) =>(
        <button
        key={ index}
         className={`w-3  h-3 rounded-full transition-all ${
          index === scrollCurrentValue ? "bg-white w-6 ": "bg-white/50"
         }`}/>
      ))}
      </div>

    </div>
  );
};

export default HeroSection;
