import { useState, Fragment } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import { Faq } from "../components/lvl0Comps/FAQ";
import { databases } from "../utils/init-appwrite";
import { ID } from "appwrite";
import { useAuth } from "../context/AuthContext";

const SocialPostDetails = () => {
  const [comment, setComment] = useState<string>("");
  const location = useLocation();
  const { user } = useAuth();

  const data = location.state.data;

  console.log(data);

  async function handleSubmit(e: FormEvent, comment: string) {
    try {
      e.preventDefault();
      const res = databases.createDocument(
        "648026539b5d55fb352d",
        "6485fb4e715203107e11",
        ID.unique(),
        {
          comment,
          userId: user.$id,
          username: user.name,
          postId: data?.$id
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  async function handlePostUpvote(postId: string) {
    console.log("postid");
  }
  async function handlePostDownvote(postId: string) {
    console.log("postid");
  }

  // todo: temp fix for extra "" in description
  const removeQuotes = data?.body?.split('"')[1];
  console.log(removeQuotes.split(/\r?\n/));

  const formatBody: JSX.Element[] = removeQuotes
    .replace(/\n/g, "<br />")
    .split("<br />")
    .map((line: string, index: number) => (
      <Fragment key={index}>
        {line}
        <br />
      </Fragment>
    ));

  return (
    <div className="mx-auto flex max-w-[1600px] items-start gap-8 py-2  lg:px-4  lg:py-8">
      <div className="max-w-[800px] rounded-md bg-gray-100 p-4">
        <div className="flex items-start gap-x-4">
          {/* upvote & downvote section */}
          <div className="flex flex-col items-center justify-center">
            <BiUpvote
              onClick={() => handlePostUpvote(data?.$id)}
              className="h-6 w-6 cursor-pointer text-gray-900"
            />
            <p className="my-1 text-gray-900">{data?.votes}</p>
            <BiDownvote
              onClick={() => handlePostDownvote(data?.$id)}
              className="h-6 w-6 cursor-pointer  text-gray-900"
            />
          </div>
          {/* post title and description */}
          <div>
            <h1 className="text-3xl font-semibold text-orange-500 ">{data?.title}</h1>
            <p className="whitespace-pre-line pt-2 text-gray-800	">{data?.body?.split('"')[1]}</p>
          </div>
        </div>

        <form onSubmit={(e) => handleSubmit(e, comment)} className="mt-4">
          <div className="mb-4 w-full rounded-lg  border border-gray-300 bg-gray-200">
            <div className="rounded-t-lg bg-gray-300  px-4 py-2">
              <label className="sr-only">Your comment</label>
              <textarea
                id="comment"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border-0 bg-gray-300  px-0 text-sm text-black placeholder-black focus:ring-0"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <div className="flex items-center justify-between border-t px-3 py-2 dark:border-gray-600">
              <button
                type="submit"
                className="inline-flex items-center rounded-lg bg-orange-500 px-4 py-2.5 text-center text-xs font-medium text-white hover:bg-orange-600 focus:ring-4  focus:ring-orange-200"
              >
                Submit Comment
              </button>
            </div>
          </div>
        </form>

        <p className="ml-auto text-xs text-gray-500 ">
          Remember, contributions to this topic should follow our{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Community Guidelines
          </a>
          .
        </p>

        <div className="border-b-2 border-gray-400 pt-4 "></div>

        {/* loader for comments */}
      </div>
      {/*  */}
      <section className="hidden lg:block">
        {/* card to welcome folks to stonks social */}

        {/* stonks faq */}
        <div className="hidden max-w-sm rounded-lg  border-gray-700  bg-gray-100 p-6 shadow lg:block">
          <h5 className="mb-2 text-2xl font-bold tracking-tight  text-orange-500">Rules</h5>

          <Faq title="No spam or self-promotion">
            Spam, ads, solicitations (including referral links), and self-promotion posts or
            comments will be removed and you might get banned. Instead, advertise here.
          </Faq>

          <Faq title="Context and Effort">
            Context and effort must be provided; empty posts or empty posts with links will be
            automatically removed. Low effort mentions for meme stocks will be removed, see here.
          </Faq>

          <Faq title="No trolling, insulting, or harassing">
            Trolling, insults, or harassment, especially in posts requesting advice, will be
            removed.
          </Faq>

          <Faq title="No penny stock or OTC discussions">
            No penny stock discussions, including OTC, microcaps, pump & dumps, low vol pumps and
            SPACs.
          </Faq>

          <Faq title="Stay on topic">
            Almost any post related to stocks and investment is welcome on stonks, including pre IPO
            news, futures & forex related to stocks, and geopolitical or corporate events indicating
            risks; outside this is offtopic and can be removed.
          </Faq>
        </div>
      </section>
    </div>
  );
};

export default SocialPostDetails;
