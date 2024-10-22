import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function ContributionGraph({ username }: any) {
  const { data: session } = useSession();
  const [contributions, setContributions] = useState<any>(null);

  const fetchGitHubContributions = async (
    username: string,
    accessToken: string
  ) => {
    try {
      const query = `
          query ($username: String!) {
            user(login: $username) {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                    }
                  }
                }
              }
            }
          }
        `;

      const response = await axios.post(
        `https://api.github.com/graphql`,
        {
          query,
          variables: { username },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(
        response.data.data.user.contributionsCollection.contributionCalendar
      );
      return response.data.data.user.contributionsCollection
        .contributionCalendar;
    } catch (error) {
      console.error("Error fetching contribution data:", error);
    }
  };

  const getColorForContribution = (count: number) => {
    if (count === 0) return "bg-slate-200";
    if (count < 5) return "bg-green-300";
    if (count < 10) return "bg-green-500";
    if (count < 20) return "bg-green-600";
    return "bg-green-700";
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGitHubContributions(
        username,
        session?.user.accessToken as string
      );
      setContributions(data);
    };

    fetchData();
  }, []);
  const getMonthLabel = (date: string) => {
    return format(new Date(date), "MMM");
  };
  const getWeekStartMonth = (week: any) => {
    return getMonthLabel(week.contributionDays[0].date);
  };
  const shouldShowMonthLabel = (currentWeek: any, previousWeek: any) => {
    const currentMonth = getWeekStartMonth(currentWeek);
    const previousMonth = previousWeek ? getWeekStartMonth(previousWeek) : null;
    return !previousWeek || currentMonth !== previousMonth;
  };
  if (!contributions) {
    return <p>Loading...</p>;
  }
  return (
    <div className="w-full flex flex-col items-start">
      <div className="flex w-full justify-between flex-nowrap">
        {contributions.weeks.map((week: any, weekIndex: number) => (
          <div key={weekIndex} className="week flex">
            {shouldShowMonthLabel(week, contributions.weeks[weekIndex - 1]) && (
              <p className="text-center text-[10px] font-medium mb-1">
                {getWeekStartMonth(week)}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="contribution-graph flex w-full justify-start flex-nowrap">
        {contributions.weeks.map((week: any, weekIndex: number) => (
          <div key={weekIndex} className="week flex flex-col">
            {week.contributionDays.map((day: any, dayIndex: number) => (
              <div
                key={dayIndex}
                title={`${day.date}: ${day.contributionCount} contributions`}
                className={`${getColorForContribution(
                  day.contributionCount
                )} inline-block rounded-sm m-[1px] w-3 h-3 `}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
