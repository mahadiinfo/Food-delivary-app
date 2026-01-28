import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import logopng from "@/public/assets/goFood_logo.png";
import { ArrowRight, Bike, ShoppingBasket } from "lucide-react";

const Welcome = ({nextStep}) => {
  return (
    <div className="flex flex-col items-center text-black text-2xl text-center justify-center min-h-screen p-6 ">
      <motion.div
        className="max-md:mt-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, }}
      >
        <Image
          src={logopng}
          alt="GoFood Logo"
          className="max-md:w-56 w-60 "
        ></Image>
      </motion.div>
      <motion.p
        className="mt-1 text-gray-700 font-medium text-sm md:text-xl max-w-lg"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 4 }}
      >
        Your favorite grocery store is now online! Find the best dezals on
        premium quality groceries,
      </motion.p>

      <motion.div
        className="text-4xl text-green-600 font-bold absolute z-10 "
       initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1, 1, 0],  
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 4,           
        times: [0, 0.1, 0.90, 1], 
        ease: "easeInOut",
      }}
      >
        Assalamu Alaikum.
      </motion.div>

      {/* this a icone div */}
      <div className=" mt-4 flex gap-2 w-full items-center justify-center">
        <motion.div
          className=" "
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 4 }}
        >
          <Bike className="w-24 h-24 md:w-32 md:h-32 text-orange-500 drop-shadow-md" />
        </motion.div>

        <motion.div
          className="flex "
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 4 }}
        >
          <ShoppingBasket className="w-24 h-24 md:w-32 md:h-32 text-green-600 drop-shadow-md" />
        </motion.div>
      </div>
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 4 }}
        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-2xl shadow-md transition-discrete duration-200 mt-10"
        onClick={()=> nextStep(2)}
      >
        Next
        <ArrowRight />
      </motion.button>
    </div>
  );
};

export default Welcome;
