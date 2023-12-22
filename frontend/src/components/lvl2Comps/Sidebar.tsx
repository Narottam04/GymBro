import { Link, Outlet, useNavigate } from "react-router-dom";
import { account } from "../../utils/init-appwrite";
// import { useAuth } from "../../context/AuthContext";
import { FaDumbbell } from "react-icons/fa";
import { FcGlobe, FcSearch } from "react-icons/fc";
import {
  MdOutlineLogout,
  MdOutlineSpaceDashboard,
  MdOutlineSportsGymnastics
} from "react-icons/md";

import { SiTrainerroad } from "react-icons/Si";
const Sidebar = () => {
  // const { refetchAuthState, user } = useAuth();
  const navigate = useNavigate();
  // async function logout() {
  //   try {
  //     const res = await account.deleteSession("current");
  //     console.log(res);
  //     refetchAuthState();
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const navigation = [
    {
      href: "/",
      name: "Dashboard",

      icon: <MdOutlineSpaceDashboard className="h-5 w-5" />
    },

    {
      href: "/app/exercise",
      name: "Exercise",
      icon: <FaDumbbell className="h-5 w-5" />
    },
    {
      href: "/app/exercise/search",
      name: "Search ",
      icon: <FcSearch className="h-5 w-5" />
    },
    {
      href: "/app/exercise/workout",
      name: "Your Workouts",
      icon: <MdOutlineSportsGymnastics className="h-5 w-5" />
    },
    {
      href: "/app/chatbot",
      name: "AI Personal Trainer & Nutritionist",
      icon: <SiTrainerroad className="h-5 w-5" />
    },
    {
      href: "/app/social",
      name: "Social - Connect with people",
      icon: <FcGlobe className="h-5 w-5" />
    }
  ];

  const navsFooter = [
    // {
    //   href: "javascript:void(0)",
    //   name: "Logout",
    //   icon: <MdOutlineLogout className="w-5 h-5" />
    // }
  ];

  return (
    <>
      <nav className="fixed left-0 top-0 hidden h-full w-full space-y-8 border-r bg-white sm:w-80 lg:block">
        <div className="flex h-full flex-col">
          <div className="mt-2 flex h-20 items-center px-8">
            <div className="flex items-center">
              <img src="/logo/gymbro-logo1.png" className="mx-auto w-[70px]" />
              <div className="px-2">
                <h1 className="text-3xl font-bold ">GymBro</h1>
                <p className="px-1 font-bold text-orange-500">Track. Train. Thrive.</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex h-full flex-1 flex-col overflow-auto">
            <ul className="flex-1 px-4 text-sm font-medium">
              {navigation.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.href}
                    className="flex items-center gap-x-2 rounded-lg p-2 text-gray-600  duration-150 hover:bg-gray-50 active:bg-gray-100"
                  >
                    <div className="text-gray-500">{item.icon}</div>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              <ul className="px-4 pb-4 text-sm font-medium">
                {/* {navsFooter.length > 0 &&
                  navsFooter.map((item, idx) => (
                    <li key={idx}>
                      <a
                        href={item.href}
                        className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150"
                      >
                        <div className="text-gray-500">{item.icon}</div>
                        {item.name}
                      </a>
                    </li>
                  ))} */}
                {/* <li>
                  <button
                    onClick={() => logout()}
                    className="flex items-center gap-x-2 text-red-600 p-2 rounded-lg  hover:bg-red-50 active:bg-red-100 duration-150"
                  >
                    <div className="text-red-500">
                      <MdOutlineLogout className="w-5 h-5" />
                    </div>
                    Logout
                  </button>
                </li> */}
              </ul>
              <Link to="/">
                <div className="border-t px-4 py-4">
                  <div className="flex items-center gap-x-4">
                    <img
                      src="https://randomuser.me/api/portraits/women/79.jpg"
                      className="h-12 w-12 rounded-full"
                    />
                    <div>
                      <span className="block text-sm font-semibold text-gray-700">
                        Alivika tony
                      </span>
                      <a
                        href="javascript:void(0)"
                        className="mt-px block text-xs text-gray-600 hover:text-indigo-600"
                      >
                        View profile
                      </a>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="lg:ml-80">
        <Outlet />
      </main>
    </>
  );
};

export default Sidebar;
