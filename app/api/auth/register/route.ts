
import { dbConnect } from "@/app/lib/db";
import UserModel from "@/app/model/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest ,) {

    await dbConnect();
    try {
        const { name, email, mobileNumber, password } = await req.json()
        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "Name, email, and password are required" },
                { status: 400 }
            );
        }

        const existingUser = await UserModel.findOne({ email });
        
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        if (mobileNumber) {
            if (mobileNumber.length !== 11 || !/^\d{11}$/.test(mobileNumber)) {
                return  NextResponse.json({ message: "Invalid mobile number format" }, { status: 400 });
            }
            const existingMobileUser = await UserModel.findOne({ mobileNumber: mobileNumber });
            if (existingMobileUser) {
                return NextResponse.json({ message: "Mobile number already in use" }, { status: 400 });
            }
        }

        if (password.length < 6) {
            return NextResponse.json({ message: "Password must be at least 6 characters long" }, { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("this is password ", hashedPassword)
        const newUser = await UserModel.create({
            name,
            email,
            password:hashedPassword,
            mobileNumber,
        });
        console.log(newUser)
        return NextResponse.json(
            newUser,
            {status: 201 }
        );
        


}catch (error) {
        console.error("Error in registration:", error);
        return NextResponse.json(
           error,
            { status: 500 });   
    }

}