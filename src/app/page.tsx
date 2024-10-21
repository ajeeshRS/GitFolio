"use client";
import { Pickaxe } from "lucide-react";
import { inconsolata, karla } from "./fonts/font";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState<string>("");

  return (
    <div className="bg-[#FCFCFC] w-full h-[90vh] flex flex-col items-center justify-center">
      <div
        className={`${karla.className} relative md:text-8xl text-6xl font-extrabold mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]`}
      >
        <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
          <span className="">GitFolio.</span>
        </div>
        <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
          <span className="">GitFolio.</span>
        </div>
      </div>
      <div>
        <p
          className={`${inconsolata.className} text-neutral-500 md:max-w-lg max-w-xs md:px-0 px-5 mx-auto my-2 text-sm text-center`}
        >
          Create a beautifully designed GitHub profile card that instantly
          highlights your profile, contributions, and stats with ease.
        </p>
      </div>
      <div
        className={`${karla.className} flex md:flex-row flex-col items-center`}
      >
        <input
          type="text"
          placeholder="@githubusername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="rounded-lg border border-neutral-200 outline-none w-full relative my-4 px-4 py-2 bg-neutral-100 placeholder:text-neutral-400 placeholder:text-sm"
        />
        <button className="bg-black rounded-lg mx-2 w-fit text-white px-4 py-2 flex items-center">
          Generate
          <Pickaxe className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}
