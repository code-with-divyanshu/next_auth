"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [btnDisabled, setBtnDisabled] = useState(false);

  const [loding, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup Success", response.data);
      toast.success("Sigup Successfully first Verify Your email than Login");
      router.push("/login");
    } catch (error: any) {
      console.log("Signup Failed");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col bg-purple-400 gap-2 p-5 mt-28 text-center rounded-lg w-[370px]">
        <h1 className="text-3xl text-purple-700 hover:text-blue-600">
          {loding ? "Processing" : "Signup"}
        </h1>
        <hr />
        <label className="text-blue-800 font-bold" htmlFor="username">
          Username
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter Your Username"
          type="text"
        />
        <label className="text-blue-800 font-bold" htmlFor="email">
          Email
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter Your Email"
          type="text"
        />
        <label className="text-blue-800 font-bold" htmlFor="password">
          Password
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter Your Password"
          type="text"
        />
        <button
          onClick={onSignup}
          className="bg-purple-800 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          {btnDisabled ? "Please Fill The Form" : "Signup"}
        </button>
        <Link className="text-blue-900" href="/login">
          Visit Login Page
        </Link>
      </div>
    </div>
  );
}
