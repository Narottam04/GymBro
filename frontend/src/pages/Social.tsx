import { BiDownvote, BiUpvote } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Faq } from "../components/lvl0Comps/FAQ";
import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { databases } from "../utils/init-appwrite";

const Social = () => {
  const { user } = useAuth();

  async function fetchPosts() {
    const res = databases.listDocuments("648026539b5d55fb352d", "6485adcb439eaf58aa39");

    return res;
  }

  const { isLoading, isError, isSuccess, data, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts()
  });

  if (isSuccess) {
    console.log(data);
  }

  async function handlePostUpvote(postId: string) {
    console.log("postid");
  }
  async function handlePostDownvote(postId: string) {
    console.log("postid");
  }
  return (
    <section className="mx-auto grid max-w-[1600px]  grid-cols-1 py-2 lg:grid-cols-2 lg:px-4 lg:py-8">
      <div>
        <p className="font-title mb-4 ml-3 px-2 pt-6 text-2xl font-bold text-orange-500 md:px-4 md:pt-0 md:text-3xl">
          Stonks Social
        </p>
        {/* navigate to post page */}
        <Link
          to="/app/social/new"
          className=" mx-3 mb-6 flex cursor-pointer gap-3 rounded-lg  bg-gray-100 p-4 px-2 md:mx-6"
        >
          <img
            src={`https://avatars.dicebear.com/api/initials/${user?.name}.svg`}
            alt=""
            className="h-12 w-12 rounded-full dark:bg-gray-500"
          />
          <input
            type="text"
            id="default-input"
            className=" block w-full rounded-lg  border border-gray-600 bg-gray-100 p-2.5 text-sm text-black placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Create Post"
            disabled
          />
        </Link>
        {/* posts */}
        {isSuccess &&
          data?.documents?.map((post) => (
            <div
              key={post?.$id}
              className="mx-3  mb-4 max-w-3xl cursor-pointer overflow-hidden rounded-lg bg-gray-100 px-2 shadow-lg md:mx-6"
            >
              {/* <!-- Post Info --> */}
              <div className="p-4">
                <div className="mb-4 flex items-center">
                  <img
                    className="mr-2 h-8 w-8 rounded-full object-cover object-center"
                    src={`https://api.dicebear.com/6.x/fun-emoji/svg?seed=hello&mouth=cute,kissHeart,lilSmile,smileLol,smileTeeth,tongueOut,wideSmile&backgroundColor=b6e3f4,c0aede,d1d4f9`}
                    alt="Avatar of User"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Narottam</p>
                  </div>
                </div>
                <Link to={`/app/social/${post?.$id}`} state={{ data: post }}>
                  <h2 className="mb-2 text-xl font-medium text-gray-900 ">{post?.title}</h2>
                  <p className="mb-4 line-clamp-3 text-gray-600">{post?.body}</p>
                </Link>
                <div className="flex items-center">
                  <button
                    onClick={() => handlePostUpvote("postId")}
                    className="mr-1 text-gray-900 focus:outline-none"
                  >
                    <BiUpvote className="h-6 w-6 text-gray-900 " />
                  </button>
                  <span className="mx-2  text-gray-900">{post?.votes}</span>
                  <button className="mr-1 text-gray-900 focus:outline-none">
                    <BiDownvote
                      onClick={() => handlePostDownvote("postId")}
                      className="h-6 w-6 text-gray-900 "
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      {/*  */}
      <section className="hidden   lg:block">
        {/* card to welcome folks to stonks social */}

        <div className="max-w-sm  rounded-lg border border-[#1d1d1e] bg-gray-100 shadow">
          <div>
            <img className="rounded-t-lg" src="https://source.unsplash.com/zEAX0E0KJxs" alt="" />
          </div>
          <div className="p-5">
            <div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight  text-orange-500">
                Welcome To GymBro Forum
              </h5>
            </div>
            <p className="mb-3 font-normal text-gray-600">
              Join our community of like-minded traders and gain valuable insights, tips, and
              support to help you make informed decisions and grow your portfolio.
            </p>
            <Link to="/app/social/new">
              <div className="group relative  mb-2 mr-2 inline-flex w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br  from-orange-300 to-yellow-300 p-0.5 text-sm font-medium text-black hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-orange-800 group-hover:from-yellow-300  group-hover:to-orange-300">
                <span className="relative w-full rounded-md bg-gray-100 px-5 py-2.5 text-center transition-all  duration-75 ease-in group-hover:bg-opacity-0">
                  Create Post
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* stonks faq */}

        <div className="mt-8 hidden max-w-sm  rounded-lg border-[#1a1a1b] bg-gray-100 p-6 shadow lg:block">
          <h5 className="mb-5 text-2xl font-bold tracking-tight  text-black">Rules</h5>

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
    </section>
  );
};

export default Social;
