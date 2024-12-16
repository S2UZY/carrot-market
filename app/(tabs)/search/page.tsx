import { searchTweets } from "./action";
import ListTweet from "@/components/list-tweet";
import Header from "@/components/header";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function SearchPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const query = (searchParams.query as string) || "";
  const tweets = await searchTweets(query);

  return (
    <>
      <Header title={"검색"} />
      <form action="/search" method="get" className="my-6">
        <div className="flex gap-3 items-center">
          <input
            type="text"
            name="query"
            defaultValue={query}
            placeholder="검색하고 싶은 닉네임 또는 트윗 내용을 입력하세요."
            className="w-full px-4 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="px-4 py-2 w-20 primary-btn rounded-2xl"
          >
            검색
          </button>
        </div>
      </form>
      {query === "" ? null : tweets.length === 0 ? (
        <p className="text-gray-500">No tweets found.</p>
      ) : (
        <div className="space-y-4">
          {tweets.map((tweet) => (
            <ListTweet key={tweet.id} {...tweet} />
          ))}
        </div>
      )}
    </>
  );
}
