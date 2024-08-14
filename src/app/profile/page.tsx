"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    try {
      const res = await axios.post("/api/users/me");
      console.log(res.data.data);
      setData(res.data.data._id);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

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
      <h1>My Profile</h1>
      <hr />
      <h2>
        {data === "nothing" ? (
          "Nothing to show"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logout}
        className="p-2 border border-gray-300 rounded-lg my-4 focus:outline-none focus:border-gray-600"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="bg-green-600 p-2 border border-gray-300 rounded-lg my-4 focus:outline-none focus:border-gray-600"
      >
        Get User Data
      </button>
    </div>
  );
}
