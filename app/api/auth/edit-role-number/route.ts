import { auth } from "@/app/auth";
import { dbConnect } from "@/app/lib/db";
import UserModel from "@/app/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { role, mobileNumber } = await req.json();
    const session = await auth();
    const user = await UserModel.findOneAndUpdate(
      { email: session?.user?.email },
      {
        role,
        mobileNumber,
      },
    );
    if (!user) {
      return NextResponse.json({ message: "user not found!" }, { status: 200 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message:`Edit role and mobile error ${error}`}, { status: 500 });

  }
}
