"use client";
import { BookCopy, Cake, Flame, GitMerge, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import ContributionGraph from "./ContributionGraph";
import { fetchMostUsedLanguages, getGitAge, getGitStreak } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { FaXTwitter } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
export default function ProfileCard({ userData, mergedPrCount, cardRef }: any) {
  const [gitAge, setGitAge] = useState<number>(0);
  const [gitStreak, setGitStreak] = useState<number | undefined>(0);
  const [topLanguages, setTopLanguages] = useState<any[] | undefined>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const getRemainingDetails = async () => {
      const streak = await getGitStreak(
        userData.login,
        session?.user.accessToken as string
      );
      setGitStreak(streak);
      setGitAge(getGitAge(userData.created_at));
      const languages = await fetchMostUsedLanguages(
        userData.login,
        session?.user.accessToken as string
      );

      setTopLanguages(languages);
    };

    getRemainingDetails();
  }, []);

  return (
    <>
      <div
        ref={cardRef}
        className="relative w-[840px] h-fit rounded-xl bg-neutral-100 p-10"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center w-1/2 justify-start">
            <img
              className="w-24 h-24 rounded-full"
              src={userData.avatar_url}
              alt="GitHub Avatar"
              crossOrigin="anonymous"
            />
            <div className="ml-4">
              <h2 className="text-xl font-semibold">{userData.name}</h2>
              <p className="text-gray-500">@{userData.login}</p>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 text-gray-600 mr-1" />
                <p className="text-gray-600">{userData.location}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center w-1/2 justify-start">
            <p className="text-gray-700 flex flex-col items-center">
              {userData.followers}
              <span className="font-semibold">Followers</span>{" "}
            </p>
            <p className="text-gray-700 flex flex-col items-center ml-10">
              {userData.following}
              <span className="font-semibold">Following</span>{" "}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-gray-700 w-fit p-5 rounded-lg bg-white flex flex-col items-center shadow-md">
            <span className="flex items-center">
              <BookCopy className="w-4 h-4 mr-1" />
              {userData.public_repos}
            </span>
            <span className="font-semibold">Public Repos</span>{" "}
          </p>
          <p className="text-gray-700 w-fit p-5 rounded-lg bg-white flex flex-col items-center shadow-md">
            <span className="flex items-center">
              <Flame className="w-4 h-4 mr-1" />
              {gitStreak} days
            </span>
            <span className="font-semibold">Git Streak</span>{" "}
          </p>
          <p className="text-gray-700 w-fit p-5 rounded-lg bg-white flex flex-col items-center shadow-md">
            <span className="flex items-center">
              <Cake className="w-4 h-4 mr-1" />
              {gitAge} years
            </span>
            <span className="font-semibold">Git Age</span>{" "}
          </p>
          <p className="text-gray-700 w-fit p-5 rounded-lg bg-white flex flex-col items-center shadow-md">
            <span className="flex items-center">
              <GitMerge className="w-4 h-4 mr-1" />
              {mergedPrCount}
            </span>
            <span className="font-semibold">PRs Merged</span>{" "}
          </p>
        </div>
        <div className="w-full flex flex-col justify-start mt-3">
          <p className="font-semibold py-2">Top used Languages</p>
          <div className="flex items-center">
            {topLanguages?.slice(0, 5)?.map((lang, i) => (
              <p key={i} className="mx-2 flex items-center">
                <GoDotFill
                  className={`w-4 h-4`}
                  style={{ color: `${lang[1].color}` }}
                />
                {lang[0]}
              </p>
            ))}
          </div>
        </div>
        {userData.twitter_username !== "" && (
          <div className="w-full flex flex-col justify-start mt-3">
            <p className="font-semibold py-2">Else where</p>
            <p className="flex items-center p-1 text-xs border w-fit rounded-lg">
              <FaXTwitter className="w-4 h-4 mr-1" />{" "}
              {userData?.twitter_username}
            </p>
          </div>
        )}
        <div className="w-full flex flex-col items-start mt-4">
          <p className="font-semibold py-2">Contribution Graph</p>
          <ContributionGraph username={userData.login} />
        </div>
      </div>
    </>
  );
}
