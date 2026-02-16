"use client"
import { ArrowLeft, Eye, EyeOff, Leaf, LockIcon, Mail, User, User2 } from "lucide-react";
import React, { useState } from "react";
import { motion } from "motion/react";

const RegisterForm = ({ nextStep }) => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Eyeone, setEyeone] = useState(false);
  const FormValidation = Name !== "" && Email !== "" && Password !== ""
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white relative bg-linear-to-b from-green-100 to-white">
      <div
        className="absolute top-6 left-6 flex items-center gap-1 text-green-700  w-20 hover:text-green-800 transition-colors cursor-pointer"
        onClick={() => nextStep(1)}
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="font-medium">Back</span>
      </div>
      {/* register curd */}

      <div className="flex flex-col justify-center items-center border p-6 rounded-2xl  border-green-600 shadow-lg/30 shadow-green-500  ">
        <motion.h1
          initial={{
            y: -10,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-4xl font-extrabold text-green-700 mb-2 "
        >
          Create Account
        </motion.h1>
        <p className="text-gray-600 mb-6 flex items-center ">
          Join GoFood today <Leaf className="w-5 h-5 text-green-600"></Leaf>
        </p>

        <motion.form
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <div className="border mb-3 flex p-3 border-gray-400 w-full rounded-xl transition-all focus-within:ring-1 focus-within:ring-green-600 focus-within:border-transparent  focus-within:bg-green-600/5 ">
            <User className="w-5 h-5 text-gray-400" />
            <input
              onChange={(e) => setName(e.target.value)}
              value={Name}
              type="text"
              placeholder="Your Name"
              className="focus:outline-none pl-1 w-full "
            />
          </div>
          <div className="border mb-3 flex p-3 border-gray-400 w-full rounded-xl transition-all focus-within:ring-1 focus-within:ring-green-600 focus-within:border-transparent focus-within:bg-green-600/5">
            <Mail className="w-5 h-5 text-gray-400" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              type="email"
              placeholder="Your Email"
              className="focus:outline-none pl-1 w-full"
            />
          </div>
          <div className="border mb-3 flex p-3 border-gray-400 w-full rounded-xl transition-all focus-within:ring-1 focus-within:ring-green-600 focus-within:border-transparent focus-within:bg-green-600/5">
            <LockIcon className="w-5 h-5 text-gray-400" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={Password}
              type={Eyeone ? "text" : "password"}
              placeholder="Your Password"
              className="focus:outline-none pl-1 w-full "
            />{Eyeone ? <Eye onClick={()=> setEyeone(false)} className="w-5 h-5 text-gray-500 "/> : <EyeOff onClick={()=>setEyeone(true)} className="w-5 h-5 text-gray-400" />} 
            
          </div>
          <button className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 shadow-md shadow-green-600/50 ${
            FormValidation
             ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"}`} > Register</button>
        </motion.form>
      <div className="flex items-center justify-center gap-2 w-full text-gray-400 text-md mt-10">
        <span className="h-px bg-gray-400 flex-1"></span>
        OR
        <span className=" flex-1 h-px bg-gray-400"> </span>
      </div>
      </div>
    </div>
  );
};

export default RegisterForm;
