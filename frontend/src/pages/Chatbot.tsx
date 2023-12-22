import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { functions } from "../utils/init-appwrite";

const Chatbot = () => {
  const [currentInput, setCurrentInput] = useState<string>("");

  const { user } = useAuth();

  async function handleSubmit(prompt: string, input: string) {
    console.log(prompt);
  }

  async function fetchVideo() {
    const res = await functions.createExecution("64848c75b1d41924b70e");

    console.log(res);
  }

  useEffect(() => {
    fetchVideo();
  }, []);

  return (
    <>
      <h1 className="mx-4 mb-8 mt-4 text-4xl font-bold text-orange-500">
        AI Personal Trainer & Nutritionist
      </h1>
      <section className="relative mx-4 ">
        {/* chat section */}
        <div className=" h-full">
          <div className="h-full overflow-y-scroll  bg-gray-100  p-4">
            {/* question */}
            <div className="mb-4 flex flex-row-reverse">
              <div className="ml-2 flex-shrink-0">
                <img
                  src={`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user?.name}&mouth=cute,kissHeart,lilSmile,smileLol,smileTeeth,tongueOut,wideSmile&backgroundColor=b6e3f4,c0aede,d1d4f9`}
                  alt="Avatar"
                  className="h-8 w-8 rounded-full"
                />
              </div>
              <div className="rounded-lg bg-green-500 px-4 py-2 text-white">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, minima!</p>
                {/* <p className="text-sm">12:32 PM</p> */}
              </div>
            </div>
            {/* answer */}
            <div className="mb-4 flex">
              <div className="mr-2 flex-shrink-0">
                <img
                  src={`https://api.dicebear.com/6.x/fun-emoji/svg?seed='Billy'&mouth=cute,kissHeart,lilSmile,smileLol,smileTeeth,tongueOut,wideSmile&backgroundColor=b6e3f4,c0aede,d1d4f9`}
                  alt="Avatar"
                  className="h-8 w-8 rounded-full"
                />
              </div>
              <div className="rounded-lg bg-gray-300 px-4 py-2">
                <p className="text-blac">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, doloribus.
                </p>
                {/* <p className="text-gray-500 text-sm">12:30 PM</p> */}
              </div>
            </div>
            {/* chat loader */}
            <div className="mb-4 flex">
              <div className="mr-2 flex-shrink-0">
                <img
                  src={`https://api.dicebear.com/6.x/fun-emoji/svg?seed='Billy'&mouth=cute,kissHeart,lilSmile,smileLol,smileTeeth,tongueOut,wideSmile&backgroundColor=b6e3f4,c0aede,d1d4f9`}
                  alt="Avatar"
                  className="h-8 w-8 rounded-full"
                />
              </div>
              <div className="rounded-lg   bg-gray-300 px-20 py-2">
                <div className="dots-5"></div>
              </div>
            </div>
          </div>
          {/* send chat */}
          <div className="flex">
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder="Type a message"
              className="text-blac  w-full bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
            <button
              onClick={() => {
                if (currentInput?.length > 0) {
                  handleSubmit(
                    "Act like you are Billy, my personal virtual assistant for the stock market. You give me information about any company, their history, and information about investors.",
                    currentInput
                  );
                }
              }}
              className="bg-green-500 px-4 py-2 text-white "
            >
              Send
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Chatbot;
