"use client";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Data {
  _id: number;
  username: string;
  email: string;
}

type UserState = Data | null;

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState<UserState>(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.post("/api/users/me");
        console.log(res.data.data);
        setData(res.data.data);
      } catch (error: any) {
        console.log(error.message);
        toast.error(error.message);
      }
    };

    getUserDetails();
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout successfuly");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 text-center flex flex-col gap-5">
        <h1 className="text-3xl text-purple-700 hover:text-blue-600">
          My Profile
        </h1>
        <div className="flex gap-10">
          <h2 className="text-teal-500 font-bold">Id :</h2>
          <h3 className="text-cyan-600 font-semibold text-end">
            {data === null ? (
              "Nothing to show"
            ) : (
              <Link href={`/profile/${data._id}`}>{data._id}</Link>
            )}
          </h3>
        </div>
        <div className="flex gap-10">
          <h2 className="text-teal-500 font-bold">Username : </h2>
          <h3 className="text-cyan-600 font-semibold text-end">
            {data ? data.username : null}
          </h3>
        </div>
        <div className="flex gap-10">
          <h2 className="text-teal-500 font-bold">UserEmail : </h2>
          <h3 className="text-cyan-600 font-semibold text-end">
            {data ? data.email : null}
          </h3>
        </div>
      </BackgroundGradient>
    </div>
  );
}
