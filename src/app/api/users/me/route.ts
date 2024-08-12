import { connectDB } from "@/db_Config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFronToken";

connectDB();

export async function POST(request: NextRequest) {
  try {
    //extract data from token
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
      return NextResponse.json(
        { error: "User Doesn't exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "User Found",
        data: user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
