import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import NotFound from "../components/lvl0Comps/NotFound";
import CreateRoutineModal from "../components/lvl0Comps/Modals/CreateRoutineModal";
import { useQuery } from "@tanstack/react-query";
import { getAllRoutines } from "../db/dbGetFn";
import { deleteRoutine } from "../db/dbDelFn";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const UserAllWorkout = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const dropdownRefs = useRef<HTMLDivElement[]>([]);

  const handleDropdownToggle = (index: number) => {
    if (dropdownRefs.current[index]) {
      dropdownRefs.current[index].classList.toggle("hidden");
    }
  };

  const { isLoading, isError, isSuccess, data, error, refetch } = useQuery({
    queryKey: ["userWorkout"],
    queryFn: () => getAllRoutines()
  });

  return (
    <div className="mx-4">
      <CreateRoutineModal
        openCreateRoutineModal={openModal}
        setOpenCreateRoutineModal={setOpenModal}
        refetchAllRoutines={refetch}
      />
      {/* heading */}
      <h1 className="mb-3 mt-4   text-3xl font-bold">Your Workouts</h1>
      {/* <p className="text-lg mb-4">Find all your workouts </p> */}
      <button
        type="button"
        className="mb-12 mr-8 rounded-lg bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 px-20 py-2.5 text-center text-sm font-medium text-black text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-orange-300  "
        onClick={() => setOpenModal(true)}
      >
        Create New Routine
      </button>

      {/* workout card */}
      <div className="flex-wrap gap-4 lg:flex">
        {isSuccess &&
          data?.map((routine, index) => (
            <div className="relative">
              {/* main card */}
              <Link to={`/app/exercise/workout/${routine?.id}`} state={{ data: routine }}>
                <div className=" mb-4 rounded-xl bg-gradient-to-r from-orange-300 via-yellow-500 to-orange-600 p-0.5 shadow-xl transition hover:shadow-sm lg:w-[450px]">
                  <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
                    <time dateTime="2022-10-10" className="block text-xs text-gray-500">
                      {routine?.date}
                    </time>

                    <a href="#">
                      <h3 className="mt-0.5 text-lg font-medium text-gray-900">{routine?.name}</h3>
                    </a>
                  </div>
                </div>
              </Link>
              {/*dropdown  */}
              <div className="absolute right-4 top-3 z-50">
                <button
                  id={`dropdownDefaultButton-${index}`}
                  data-dropdown-toggle={`dropdown-${index}`}
                  className="relative inline-flex items-center rounded-full bg-orange-700 p-2 text-center text-sm font-medium text-white hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-orange-300"
                  type="button"
                  // onClick={() => setOpenDropdown(!openDropdown)}
                  onClick={() => handleDropdownToggle(index)}
                >
                  <FaChevronUp className={`${openDropdown ? "" : "hidden"} h-2.5 w-2.5`} />
                  <FaChevronDown className={`${openDropdown ? "hidden" : ""} h-2.5 w-2.5`} />
                </button>

                {/* dropdown menu */}
                <div
                  id="dropdown"
                  className={`z-10 ${
                    openDropdown ? "" : "hidden"
                  } absolute right-0 top-8 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow`}
                  ref={(ref) => (dropdownRefs.current[index] = ref)}
                >
                  <ul
                    className="py-2 text-sm text-gray-700 "
                    aria-labelledby="dropdownDefaultButton"
                  >
                    {/* Dropdown menu */}
                    <li>
                      <div
                        onClick={() => {
                          if (routine?.id) {
                            deleteRoutine(routine?.id);
                          }
                          refetch();
                        }}
                        className="block w-full px-4 py-2 text-red-600 hover:cursor-pointer hover:bg-red-100"
                      >
                        Delete Routine
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* If No workout Routine show no routine found */}
      {data?.length === 0 && <NotFound title="No Workout Routine Found!" />}
    </div>
  );
};

export default UserAllWorkout;
