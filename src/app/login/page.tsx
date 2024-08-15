"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [btnDisabled, setBtnDisabled] = useState(false);

  const [loding, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success", response.data);
      toast.success("Login Successfully");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login Failed");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col bg-purple-400 gap-3 p-10 mt-20 text-center rounded-lg w-[370px]">
        <h1 className="text-3xl text-purple-700 hover:text-blue-600">
          {loding ? "Processing" : "Login"}
        </h1>
        <hr />
        <label htmlFor="email" className="text-blue-800 font-bold">
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
        <label htmlFor="password" className="text-blue-800 font-bold">
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
          onClick={onLogin}
          className="bg-purple-800 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          {btnDisabled ? "Please Fill The Form" : "Login"}
        </button>
        <Link className="text-blue-900" href="/signup">
          Visit Signup Page
        </Link>
      </div>
    </div>
  );
}
