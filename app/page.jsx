import React from "react";
import { dbConnect } from "./lib/db";
import { auth } from "./auth";
import UserModel from "./model/user.model";
import { redirect } from "next/navigation";
import Navbar from "@/app/components/homePage/Navbar";
import UserSection from "./components/userComponents/UserSection";
import RiderSection from "./components/riderComponents/RiderSection";
import AdminSection from "./components/adminComponents/AdminSection";

async function Home() {
  await dbConnect();
  const session = await auth();
  const jsoneUser = await UserModel.findById(session?.user?.id);
  const user = JSON.parse(JSON.stringify(jsoneUser));
  console.log(user);
  if (!user) {
    redirect("/login");
  }
  return (
    <>
      <Navbar user={user} />

      {user.role == "admin" ? (
        <AdminSection />
      ) : user.role == "rider" ? (
        <RiderSection />
      ) : <UserSection />
      }
    </>
  );
}

export default Home;
