import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { databases } from "../utils/init-appwrite";
import { v4 as uuidv4 } from "uuid";
import { ID, Permission, Role } from "appwrite";
import { useAuth } from "../context/AuthContext";

const SocialCreatePost = () => {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  const { user } = useAuth();
  const navigate = useNavigate();
  async function handleSubmit(e: FormEvent, title: string, desc: string) {
    try {
      e.preventDefault();

      const res = await databases.createDocument(
        "648026539b5d55fb352d",
        "6485adcb439eaf58aa39",
        ID.unique(),
        {
          title,
          body: JSON.stringify(desc),
          userId: user.$id,
          username: user.name
        }
      );

      console.log(JSON.stringify(desc));
      setTitle("");
      setDesc("");
      navigate("/app/social");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e, title, desc)} className="mx-4 mt-6">
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-900 ">Post Title</label>
          <input
            type="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
            placeholder="Post Title...."
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900 ">Description</label>
          <textarea
            id="message"
            rows={4}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
            placeholder="Write your thoughts here..."
          ></textarea>
          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 px-20 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-orange-300  "
          >
            Submit Post
          </button>{" "}
        </div>
      </form>
    </>
  );
};

export default SocialCreatePost;
