"use client";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Leaf,
  Loader,
  LockIcon,
  LogInIcon,
  Mail,

} from "lucide-react";
import React, { useState } from "react";
import { motion } from "motion/react";
import googleLogo from "@/public/assets/googleLogo.png";
import Image from "next/image";
import toast from "react-hot-toast";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

const Login = ({ nextStep }) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Eyeone, setEyeone] = useState(false);
  const FormValidation = Email !== "" && Password !== "";
  const [Loading, setLoading] = useState(false);
  const session = useSession()
  console.log(session)
  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: Email,
        password: Password,
      });
        toast.success("Login Successful!");
        setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white relative bg-linear-to-b from-green-100 to-white">
      <Link
        href={"/register"}
        className="absolute top-6 left-6 flex items-center gap-1 text-green-700  w-20 hover:text-green-800 transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="font-medium">Back</span>
      </Link>
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
          className="text-3xl font-extrabold text-green-700 mb-2 "
        >
          <span className="text-2xl">&#128075;</span>Welcome back
        </motion.h1>
        <p className="text-gray-600 mb-6 flex items-center ">
          Login to GoFood <Leaf className="w-5 h-5 text-green-600"></Leaf>
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
          <label className="border mb-3 flex p-3 border-gray-400 w-full rounded-xl transition-all focus-within:ring-1 focus-within:ring-green-600 focus-within:border-transparent focus-within:bg-green-600/5">
            <Mail className="w-5 h-5 text-gray-400" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              type="email"
              placeholder="Your Email"
              className="focus:outline-none pl-1 w-full"
            />
          </label>
          <label className="border mb-3 flex p-3 border-gray-400 w-full rounded-xl transition-all focus-within:ring-1 focus-within:ring-green-600 focus-within:border-transparent focus-within:bg-green-600/5">
            <LockIcon className="w-5 h-5 text-gray-400" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={Password}
              type={Eyeone ? "text" : "password"}
              placeholder="Your Password"
              className="focus:outline-none pl-1 w-full "
            />
            {Eyeone ? (
              <Eye
                onClick={() => setEyeone(false)}
                className="w-5 h-5 text-gray-500 "
              />
            ) : (
              <EyeOff
                onClick={() => setEyeone(true)}
                className="w-5 h-5 text-gray-400"
              />
            )}
          </label>
        </motion.form>
        <button
          disabled={!FormValidation || Loading}
          onClick={handleLogin}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 flex justify-center items-center ${
            FormValidation
              ? "bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-600/40  cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {Loading ? <Loader className="w-10 animate-spin" /> : "Login"}
        </button>
        <div className="flex items-center justify-center gap-2 w-full text-gray-400 text-md mt-10">
          <span className="h-px bg-gray-400 flex-1"></span>
          OR
          <span className=" flex-1 h-px bg-gray-400"> </span>
        </div>
        <div className="flex gap-1 text-gray-500 text-sm border w-full p-3 rounded-xl border-gray-300 justify-center items-center mt-2 cursor-pointer shadow hover:bg-green-600/5">
          <Image src={googleLogo} height={20} width={20} alt="google logo" />
          Continue with Google
        </div>
        <p className="text-gray-500 flex items-center justify-center mt-5 text-sm/tight">
          Create an Account ? <LogInIcon className="h-4" />
          <Link
            href={"/register"}
            className="text-green-600 cursor-pointer hover:text-green-800 transition-all duration-200"
          >
            sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
