"use client";
import React, { useState } from "react";
import { Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

function Navbar({ className }: { className?: string }) {
  const router = useRouter();

  const [active, setActive] = useState<string | null>(null);

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
    <div
      className={cn(
        "fixed top-10 inset-x-0 text-center max-w-2xl mx-auto z-50",
        className
      )}
    >
      <Menu setActive={setActive}>
        <Link href={"/"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Home"
          ></MenuItem>
        </Link>
        <Link href={"/profile"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Pofile"
          ></MenuItem>
        </Link>
        <Link href={"/signup"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Signup"
          ></MenuItem>
        </Link>
        <Link href={"/login"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Login"
          ></MenuItem>
        </Link>
        <button onClick={logout}>Logout</button>
      </Menu>
    </div>
  );
}

export default Navbar;
