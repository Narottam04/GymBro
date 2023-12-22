import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { FaDumbbell } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { createNewRoutine } from "../../../db/dbPostFn";
import { set } from "react-hook-form";

interface props {
  openCreateRoutineModal: boolean;
  setOpenCreateRoutineModal: React.Dispatch<React.SetStateAction<boolean>>;
  refetchAllRoutines: () => void;
}
const CreateRoutineModal = ({
  openCreateRoutineModal,
  setOpenCreateRoutineModal,
  refetchAllRoutines
}: props) => {
  const [routineName, setRoutineName] = useState("");

  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpenCreateRoutineModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <>
      {openCreateRoutineModal && typeof document !== "undefined"
        ? ReactDOM.createPortal(
            <div
              className="fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-slate-300/20 backdrop-blur-sm"
              aria-labelledby="header-3a content-3a"
              aria-modal="true"
              tabIndex={-1}
              role="dialog"
            >
              {/*    <!-- Modal --> */}
              <div
                ref={wrapperRef}
                className="flex max-h-[90vh] w-11/12 max-w-xl flex-col gap-6 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10 lg:max-w-2xl"
                id="modal"
                role="document"
              >
                {/*        <!-- Modal header --> */}
                <header id="header-3a" className="flex items-center gap-4">
                  <h3 className="flex-1 text-xl font-medium text-slate-700">Create New Routine</h3>
                  <button
                    onClick={() => {
                      setOpenCreateRoutineModal(false);
                      setRoutineName("");
                    }}
                    className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded-full px-5 text-sm font-medium tracking-wide text-orange-500 transition duration-300 hover:bg-orange-100 hover:text-orange-600 focus:bg-orange-200 focus:text-orange-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-orange-300 disabled:shadow-none disabled:hover:bg-transparent"
                    aria-label="close dialog"
                  >
                    <span className="relative only:-mx-5">
                      <MdClose className="h-5 w-5" />
                    </span>
                  </button>
                </header>

                {/* Modal body */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900 ">
                    Routine Name{" "}
                  </label>
                  <div className="relative mb-6">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <FaDumbbell className="h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      id="input-group-1"
                      value={routineName}
                      onChange={(e) => setRoutineName(e.target.value)}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                      placeholder="New Routine Name..."
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      createNewRoutine(routineName);
                      refetchAllRoutines();
                      setRoutineName("");
                      setOpenCreateRoutineModal(false);
                    }}
                    className=" w-full rounded-lg bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 px-20 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-orange-300"
                  >
                    Create New Routine
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
};

export default CreateRoutineModal;
