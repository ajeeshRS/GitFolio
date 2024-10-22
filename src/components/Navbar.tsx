"use client";
import Image from "next/image";
import github from "../public/github.svg";
import { signIn, useSession } from "next-auth/react";
export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav
      className={`${
        !session?.user && "hidden"
      } bg-[#FCFCFC] w-full h-10 py-8 flex items-center justify-end md:px-20 px-5`}
    >
      <button
        onClick={() => signIn("github")}
        className="flex items-center bg-white py-1 px-2 rounded-lg border hover:bg-slate-50"
      >
        <Image className="w-4 h-4 mr-1" src={github} alt="github-icon" />{" "}
        <span className="text-sm text-neutral-800">{session?.user.name}</span>
      </button>
    </nav>
  );
}
