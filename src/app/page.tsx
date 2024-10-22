"use client";
import { Pickaxe } from "lucide-react";
import { inconsolata, karla } from "./fonts/font";
import { useRef, useState } from "react";
import ProfileCard from "@/components/ProfileCard";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import github from "../public/github.svg";
import { fetchMergedPrCount, fetchMostUsedLanguages } from "@/lib/utils";
import { toPng } from "html-to-image";
import download from "downloadjs";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Cover } from "@/components/ui/cover";

export default function Home() {
  const { data: session } = useSession();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [mergedPrCount, setMergedPrCount] = useState(0);
  const cardRef = useRef<any>(null);

  const downloadImage = async () => {
    if (cardRef.current === null) return;

    try {
      const image = await toPng(cardRef.current);
      download(image, "github-profile-card.png");
    } catch (error) {
      console.error("Failed to download the image", error);
    }
  };

  const fetchGitHubUserDetails = async (accessToken: string) => {
    const response = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    setUserDetails(response.data);
    const mergedPRs = await fetchMergedPrCount(
      response.data.login,
      session?.user.accessToken as string
    );
    setMergedPrCount(mergedPRs);
  };

  return (
    <div className="bg-[#FCFCFC] w-full min-h-[90vh] flex flex-col items-center justify-center py-20">
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
      <div className="pb-5">
        <p
          className={`${inconsolata.className} text-neutral-500 md:max-w-lg max-w-xs md:px-0 px-5 mx-auto my-2 text-sm text-center`}
        >
          Create a beautifully designed <Cover>GitHub profile card</Cover> that
          instantly highlights your profile, contributions, and stats with ease.
        </p>
      </div>

      {userDetails === null && session?.user ? (
        <button
          onClick={() =>
            fetchGitHubUserDetails(session?.user.accessToken as string)
          }
          className={`${karla.className} bg-black rounded-lg w-fit text-white px-4 py-2 flex items-center mt-6`}
        >
          Generate
          <Pickaxe className="w-4 h-4 ml-2" />
        </button>
      ) : (
        userDetails === null && (
          <button
            onClick={() => signIn("github")}
            className={`${karla.className} bg-white border rounded-lg w-fit hover:bg-gray-50 text-neutral-800 px-4 py-2 flex items-center mt-6`}
          >
            Connect
            <Image className="w-4 h-4 ml-2" src={github} alt="github-icon" />
          </button>
        )
      )}

      {userDetails !== null && (
        <ProfileCard
          userData={userDetails}
          mergedPrCount={mergedPrCount}
          cardRef={cardRef}
        />
      )}
      {userDetails !== null && (
        <div className="flex items-center">
          <button
            className={`${karla.className} bg-black rounded-lg w-fit text-white px-4 py-2 flex items-center mt-6 mx-1`}
            onClick={downloadImage}
          >
            Download
          </button>
          <button
            className={`${karla.className} bg-black rounded-lg w-fit text-white px-4 py-2 flex items-center mt-6 mx-1`}
          >
            Share
          </button>
        </div>
      )}
    </div>
  );
}
