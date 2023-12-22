import { useState } from "react";
import { deleteExerciseFromRoutine } from "../../../db/dbDelFn";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
interface props {
  id: string;
  day: string;
  refetch: () => void;
}

export default function DeleteExercise({ id, day, refetch }: props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* <!-- Component: Basic dropdown menu--> */}
      <div className="relative z-50 inline-flex" id="dropdown">
        {/*  <!--  Start Dropdown trigger --> */}
        <button
          className="inline-flex h-6 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-orange-400 px-3 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-orange-600 focus:bg-orange-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-orange-300 disabled:bg-orange-300 disabled:shadow-none "
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="relative only:-mx-5">
            {isOpen ? (
              <FaChevronUp className="h-2.5 w-2.5" />
            ) : (
              <FaChevronDown className="h-2.5 w-2.5" />
            )}
          </span>
        </button>
        {/*  <!--  End Dropdown trigger --> */}
        {/*  <!-- Start Menu list --> */}
        <ul
          className={`${
            isOpen ? "" : "hidden"
          } absolute right-0 top-full z-10 mt-1 flex w-72 list-none flex-col rounded bg-white py-2 shadow-md shadow-slate-500/10 `}
        >
          <li>
            <button
              onClick={() => {
                deleteExerciseFromRoutine(id, day);
                refetch();
                setIsOpen(false);
              }}
              className={`  z-50 flex w-full
                       cursor-pointer items-start justify-start gap-2 bg-red-50 p-2 px-5 text-red-500 transition-colors duration-300 hover:bg-red-600 hover:text-red-100 focus:bg-orange-50 focus:text-orange-600 focus:outline-none focus-visible:outline-none`}
            >
              <span className="flex flex-col gap-1 overflow-hidden whitespace-nowrap">
                <span className="truncate leading-5">Delete Exercise</span>
              </span>
            </button>
          </li>
        </ul>
        {/*  <!-- End Menu list --> */}
      </div>
      {/* <!-- End Basic dropdown menu--> */}
    </>
  );
}
